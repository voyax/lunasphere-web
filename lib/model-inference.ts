import * as ort from 'onnxruntime-web'

// Device performance detection
function getOptimalThreadCount(): number {
  if (typeof window === 'undefined') return 1

  // Check if cross-origin isolation is enabled
  const isCrossOriginIsolated = window.crossOriginIsolated || false

  // Without cross-origin isolation, ONNX Runtime can only use 1 thread
  if (!isCrossOriginIsolated) {
    return 1
  }

  const cores = navigator.hardwareConcurrency || 4
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  const isLowEndDevice = cores <= 2

  // Conservative thread allocation for different device types (only when cross-origin isolated)
  if (isMobile || isLowEndDevice) {
    return Math.min(2, cores) // Mobile devices: max 2 threads
  } else if (cores <= 4) {
    return Math.min(3, cores) // Mid-range devices: max 3 threads
  } else {
    return Math.min(4, cores) // High-end devices: max 4 threads
  }
}

// Configure ONNX Runtime for Next.js
if (typeof window !== 'undefined') {
  // Client-side configuration
  ort.env.wasm.wasmPaths = `${window.location.origin}/onnx-wasm/`

  // Set execution providers with device-optimized thread count
  ort.env.wasm.numThreads = getOptimalThreadCount()
  ort.env.wasm.simd = true
  ort.env.wasm.proxy = true

  // Log configuration for debugging
  const isCrossOriginIsolated = window.crossOriginIsolated || false

  console.log(
    `ONNX Runtime configured with ${ort.env.wasm.numThreads} threads for device with ${navigator.hardwareConcurrency || 'unknown'} cores (Cross-Origin Isolated: ${isCrossOriginIsolated})`
  )
}

// Model inference types
export interface ModelPrediction {
  ci: number
  cvai: number
  confidence: number
  mask?: ImageData // Add mask output
  originalImage?: ImageData
  measurements?: {
    bpd: number // Biparietal Diameter
    ofd: number // Occipitofrontal Diameter
    bpdLine: { start: { x: number; y: number }; end: { x: number; y: number } }
    ofdLine: { start: { x: number; y: number }; end: { x: number; y: number } }
    diagonal1: {
      start: { x: number; y: number }
      end: { x: number; y: number }
    }
    diagonal2: {
      start: { x: number; y: number }
      end: { x: number; y: number }
    }
  }
}

export interface ImageTensor {
  data: Float32Array
  dims: number[]
}

// Model configuration
export interface ModelConfig {
  inputSize: [number, number] // [height, width]
  inputChannels: number
  mean: [number, number, number] // ImageNet normalization
  std: [number, number, number]
  confidenceThreshold: number // Minimum confidence threshold for detection
}

// Model manager class
export class HeadShapeModel {
  private session: ort.InferenceSession | null = null
  private modelPath: string = ''
  private config: ModelConfig

  constructor(modelPath?: string, config?: Partial<ModelConfig>) {
    if (modelPath) {
      this.modelPath = modelPath
    }

    // Default configuration based on web example
    this.config = {
      inputSize: [512, 512], // [height, width]
      inputChannels: 3,
      mean: [0.485, 0.456, 0.406], // ImageNet normalization
      std: [0.229, 0.224, 0.225],
      confidenceThreshold: 0.7, // Default high confidence threshold
      ...config,
    }
  }

  /**
   * Check if model is loaded
   */
  isModelLoaded(modelPath?: string): boolean {
    if (!this.session) return false
    if (modelPath && this.modelPath !== modelPath) return false

    return true
  }

  /**
   * Load the ONNX model
   */
  async loadModel(modelPath?: string): Promise<void> {
    const path = modelPath || this.modelPath

    if (!path) {
      throw new Error('Model path is required')
    }

    // Already loaded with the same path
    if (this.session && this.modelPath === path) {
      return
    }

    // Dispose existing session if loading a different model
    if (this.session && this.modelPath !== path) {
      this.session = null
    }

    this.modelPath = path
    this.session = await ort.InferenceSession.create(path)
  }

  /**
   * Preprocess image for model input (based on web example)
   * @param imageElement - The image element to preprocess
   * @param rotation - Rotation angle in degrees (optional)
   */
  preprocessImage(
    imageElement: HTMLImageElement,
    rotation: number = 0
  ): { tensor: ImageTensor; originalImageData: ImageData } {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const [targetHeight, targetWidth] = this.config.inputSize
    const channels = this.config.inputChannels

    canvas.width = targetWidth
    canvas.height = targetHeight

    // Calculate scale ratio to maintain aspect ratio
    const scale = Math.min(
      targetWidth / imageElement.width,
      targetHeight / imageElement.height
    )
    const scaledWidth = imageElement.width * scale
    const scaledHeight = imageElement.height * scale

    // Center the image
    const x = (targetWidth - scaledWidth) / 2
    const y = (targetHeight - scaledHeight) / 2

    // Clear canvas and apply rotation if needed
    ctx.clearRect(0, 0, targetWidth, targetHeight)

    if (rotation !== 0) {
      // Save the current context state
      ctx.save()

      // Move to center of canvas for rotation
      ctx.translate(targetWidth / 2, targetHeight / 2)

      // Apply rotation (convert degrees to radians)
      ctx.rotate((rotation * Math.PI) / 180)

      // Draw image centered at origin
      ctx.drawImage(
        imageElement,
        -scaledWidth / 2,
        -scaledHeight / 2,
        scaledWidth,
        scaledHeight
      )

      // Restore the context state
      ctx.restore()
    } else {
      // Draw image without rotation
      ctx.drawImage(imageElement, x, y, scaledWidth, scaledHeight)
    }

    // Get image data
    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
    const originalImageData = new ImageData(
      new Uint8ClampedArray(imageData.data),
      targetWidth,
      targetHeight
    )

    // Convert to tensor with ImageNet normalization
    const input = new Float32Array(channels * targetHeight * targetWidth)

    for (let y = 0; y < targetHeight; y++) {
      for (let x = 0; x < targetWidth; x++) {
        const pixelIndex = (y * targetWidth + x) * 4

        // Get RGB values and normalize to [0, 1]
        const r = imageData.data[pixelIndex] / 255.0
        const g = imageData.data[pixelIndex + 1] / 255.0
        const b = imageData.data[pixelIndex + 2] / 255.0

        // Apply ImageNet normalization
        const rNorm = (r - this.config.mean[0]) / this.config.std[0]
        const gNorm = (g - this.config.mean[1]) / this.config.std[1]
        const bNorm = (b - this.config.mean[2]) / this.config.std[2]

        // CHW format (channels first)
        const baseIndex = y * targetWidth + x

        input[baseIndex] = rNorm // R channel
        input[baseIndex + targetHeight * targetWidth] = gNorm // G channel
        input[baseIndex + 2 * targetHeight * targetWidth] = bNorm // B channel
      }
    }

    return {
      tensor: {
        data: input,
        dims: [1, channels, targetHeight, targetWidth], // NCHW format
      },
      originalImageData,
    }
  }

  /**
   * Post-process model output to create mask visualization
   */
  private postprocessOutput(
    output: ort.Tensor,
    originalImageData: ImageData
  ): ImageData {
    const [height, width] = this.config.inputSize
    const outputData = output.data as Float32Array

    // Create result image data, copy original image
    const resultImageData = new ImageData(width, height)

    resultImageData.data.set(originalImageData.data)

    // Apply heatmap color mapping overlay on original image
    // Only show high confidence regions based on configurable threshold
    for (let i = 0; i < outputData.length; i++) {
      const pixelIndex = i * 4

      if (outputData[i] > this.config.confidenceThreshold) {
        // High confidence - bright green overlay blended 50% with original
        resultImageData.data[pixelIndex] = Math.floor(
          resultImageData.data[pixelIndex] * 0.5
        )
        resultImageData.data[pixelIndex + 1] = Math.min(
          255,
          Math.floor(resultImageData.data[pixelIndex + 1] * 0.5 + 127)
        )
        resultImageData.data[pixelIndex + 2] = Math.floor(
          resultImageData.data[pixelIndex + 2] * 0.5
        )
      }
    }

    return resultImageData
  }

  /**
   * Trace a line through center in both directions, find where it exits the head mask.
   * Uses noise tolerance (3 consecutive non-head pixels) to avoid false boundaries.
   * Returns the last head pixel on each side (not first non-head pixel).
   */
  private findBoundaryIntersections(
    center: { x: number; y: number },
    angle: number,
    outputData: Float32Array,
    width: number,
    height: number,
    threshold: number
  ): { start: { x: number; y: number }; end: { x: number; y: number } } {
    // Calculate direction vector: rotate from vertical (0, -1) by the given angle
    const dirX = Math.sin(angle)
    const dirY = -Math.cos(angle)

    const intersections: { x: number; y: number; distance: number }[] = []

    const isHeadPixel = (x: number, y: number): boolean => {
      if (x < 0 || x >= width || y < 0 || y >= height) return false

      return outputData[y * width + x] > threshold
    }

    // Require multiple consecutive non-head pixels to confirm boundary,
    // avoiding false boundaries from mask noise/gaps
    const NOISE_TOLERANCE = 3

    for (const direction of [-1, 1]) {
      let lastHeadT = 0
      let consecutiveNonHead = 0

      for (let t = 1; t < Math.max(width, height); t++) {
        const x = Math.round(center.x + direction * t * dirX)
        const y = Math.round(center.y + direction * t * dirY)

        if (x < 0 || x >= width || y < 0 || y >= height) {
          // Hit image edge: use last known head pixel as boundary
          if (lastHeadT > 0) {
            const bx = Math.round(center.x + direction * lastHeadT * dirX)
            const by = Math.round(center.y + direction * lastHeadT * dirY)
            const distance = Math.sqrt(
              Math.pow(bx - center.x, 2) + Math.pow(by - center.y, 2)
            )

            intersections.push({ x: bx, y: by, distance })
          }
          break
        }

        if (isHeadPixel(x, y)) {
          lastHeadT = t
          consecutiveNonHead = 0
        } else {
          consecutiveNonHead++
          if (consecutiveNonHead >= NOISE_TOLERANCE) {
            // Boundary confirmed: use last head pixel position (not first non-head)
            const bx = Math.round(center.x + direction * lastHeadT * dirX)
            const by = Math.round(center.y + direction * lastHeadT * dirY)
            const distance = Math.sqrt(
              Math.pow(bx - center.x, 2) + Math.pow(by - center.y, 2)
            )

            intersections.push({ x: bx, y: by, distance })
            break
          }
        }
      }
    }

    if (intersections.length >= 2) {
      return {
        start: intersections[0],
        end: intersections[1],
      }
    }

    if (intersections.length === 1) {
      // Mirror the single intersection through center
      const p = intersections[0]

      return {
        start: p,
        end: {
          x: Math.round(2 * center.x - p.x),
          y: Math.round(2 * center.y - p.y),
        },
      }
    }

    // No intersections found: return center point (zero-length line)
    return {
      start: { x: center.x, y: center.y },
      end: { x: center.x, y: center.y },
    }
  }

  /**
   * Calculate head measurements from mask output
   */
  private calculateMeasurements(output: ort.Tensor): {
    bpd: number
    ofd: number
    bpdLine: { start: { x: number; y: number }; end: { x: number; y: number } }
    ofdLine: { start: { x: number; y: number }; end: { x: number; y: number } }
    diagonal1: {
      start: { x: number; y: number }
      end: { x: number; y: number }
    }
    diagonal2: {
      start: { x: number; y: number }
      end: { x: number; y: number }
    }
  } | null {
    const [height, width] = this.config.inputSize
    const outputData = output.data as Float32Array

    // Find centroid of head mask
    const centroid = this.findCentroid(outputData, width, height)

    if (!centroid) {
      return null
    }

    // Find the major axis (longest diameter = OFD direction), cached to avoid redundant ray-trace
    const majorAxis = this.findMajorAxis(
      outputData,
      width,
      height,
      centroid
    )
    const ofdAngle = majorAxis.angle
    const bpdAngle = ofdAngle + Math.PI / 2 // BPD perpendicular to OFD

    // OFD from cached major axis result
    const topPoint = majorAxis.start.y <= majorAxis.end.y ? majorAxis.start : majorAxis.end
    const bottomPoint = majorAxis.start.y <= majorAxis.end.y ? majorAxis.end : majorAxis.start
    const ofdMeasurement = { height: majorAxis.length, topPoint, bottomPoint }

    // Calculate BPD perpendicular to OFD
    const bpdMeasurement = this.calculateBPD(
      outputData,
      width,
      height,
      centroid,
      bpdAngle
    )

    // Calculate diagonal measurements at ±30° from OFD axis
    const diagonalMeasurements = this.calculateDiagonalMeasurements(
      outputData,
      width,
      height,
      centroid,
      ofdAngle
    )

    return {
      bpd: bpdMeasurement.width,
      ofd: ofdMeasurement.height,
      bpdLine: {
        start: bpdMeasurement.leftPoint,
        end: bpdMeasurement.rightPoint,
      },
      ofdLine: {
        start: ofdMeasurement.topPoint,
        end: ofdMeasurement.bottomPoint,
      },
      diagonal1: diagonalMeasurements.diagonal1,
      diagonal2: diagonalMeasurements.diagonal2,
    }
  }

  /**
   * Find centroid of head mask pixels
   */
  private findCentroid(
    outputData: Float32Array,
    width: number,
    height: number
  ): { x: number; y: number } | null {
    let sumX = 0
    let sumY = 0
    let count = 0

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (outputData[y * width + x] > this.config.confidenceThreshold) {
          sumX += x
          sumY += y
          count++
        }
      }
    }

    if (count === 0) return null

    return {
      x: Math.round(sumX / count),
      y: Math.round(sumY / count),
    }
  }

  /**
   * Find the major axis angle (OFD direction) by scanning near-vertical angles through centroid.
   * Assumes user has roughly aligned the head upright, so only scans ±15° around vertical.
   * Returns the best angle and its cached boundary points to avoid redundant ray-tracing.
   */
  private findMajorAxis(
    outputData: Float32Array,
    width: number,
    height: number,
    centroid: { x: number; y: number }
  ): {
    angle: number
    start: { x: number; y: number }
    end: { x: number; y: number }
    length: number
  } {
    let maxLength = 0
    let bestAngle = 0
    let bestStart = { x: 0, y: 0 }
    let bestEnd = { x: 0, y: 0 }

    for (let deg = -15; deg <= 15; deg++) {
      const angle = (deg * Math.PI) / 180
      const { start, end } = this.findBoundaryIntersections(
        centroid,
        angle,
        outputData,
        width,
        height,
        this.config.confidenceThreshold
      )

      const length = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      )

      if (length > maxLength) {
        maxLength = length
        bestAngle = angle
        bestStart = start
        bestEnd = end
      }
    }

    return { angle: bestAngle, start: bestStart, end: bestEnd, length: maxLength }
  }

  /**
   * Calculate BPD (Biparietal Diameter) - line perpendicular to OFD through centroid
   */
  private calculateBPD(
    outputData: Float32Array,
    width: number,
    height: number,
    centroid: { x: number; y: number },
    angle: number
  ): {
    width: number
    leftPoint: { x: number; y: number }
    rightPoint: { x: number; y: number }
  } {
    const { start, end } = this.findBoundaryIntersections(
      centroid,
      angle,
      outputData,
      width,
      height,
      this.config.confidenceThreshold
    )

    // Assign left/right by x-coordinate
    const leftPoint = start.x <= end.x ? start : end
    const rightPoint = start.x <= end.x ? end : start
    const bpdWidth = Math.sqrt(
      Math.pow(rightPoint.x - leftPoint.x, 2) +
        Math.pow(rightPoint.y - leftPoint.y, 2)
    )

    return {
      width: bpdWidth,
      leftPoint,
      rightPoint,
    }
  }

  /**
   * Calculate diagonal measurements through centroid at ±30° from OFD axis
   */
  private calculateDiagonalMeasurements(
    outputData: Float32Array,
    width: number,
    height: number,
    centroid: { x: number; y: number },
    ofdAngle: number
  ): {
    diagonal1: {
      start: { x: number; y: number }
      end: { x: number; y: number }
    }
    diagonal2: {
      start: { x: number; y: number }
      end: { x: number; y: number }
    }
  } {
    // 30° angles from OFD axis
    const angle1 = ofdAngle + Math.PI / 6 // 30° clockwise from OFD
    const angle2 = ofdAngle - Math.PI / 6 // 30° counter-clockwise from OFD

    const diagonal1Points = this.findBoundaryIntersections(
      centroid,
      angle1,
      outputData,
      width,
      height,
      this.config.confidenceThreshold
    )

    const diagonal2Points = this.findBoundaryIntersections(
      centroid,
      angle2,
      outputData,
      width,
      height,
      this.config.confidenceThreshold
    )

    return {
      diagonal1: diagonal1Points,
      diagonal2: diagonal2Points,
    }
  }

  /**
   * Run inference on preprocessed image
   * @param imageElement - The image element to analyze
   * @param rotation - Rotation angle in degrees (optional)
   */
  async predict(
    imageElement: HTMLImageElement,
    rotation: number = 0
  ): Promise<ModelPrediction> {
    if (!this.session) {
      throw new Error('Model not loaded. Call loadModel() first.')
    }

    // Preprocess image with rotation
    const { tensor, originalImageData } = this.preprocessImage(
      imageElement,
      rotation
    )

    // Create input tensor
    const inputTensor = new ort.Tensor('float32', tensor.data, tensor.dims)

    // Run inference
    const feeds = { [this.session.inputNames[0]]: inputTensor }
    const results = await this.session.run(feeds)

    // Get output tensor
    const output = results[this.session.outputNames[0]]

    // Generate mask visualization
    const maskImageData = this.postprocessOutput(output, originalImageData)

    // Calculate head measurements
    const measurements = this.calculateMeasurements(output)

    // Check if head was detected
    if (!measurements) {
      throw new Error('detection.errors.noHeadDetected')
    }

    // Calculate CI (Cephalic Index) = BPD / OFD
    const ci = measurements.ofd > 0 ? measurements.bpd / measurements.ofd : 0

    // Calculate CVAI (Cranial Vault Asymmetry Index)
    const diagonal1Length = Math.sqrt(
      Math.pow(
        measurements.diagonal1.end.x - measurements.diagonal1.start.x,
        2
      ) +
      Math.pow(
        measurements.diagonal1.end.y - measurements.diagonal1.start.y,
        2
      )
    )
    const diagonal2Length = Math.sqrt(
      Math.pow(
        measurements.diagonal2.end.x - measurements.diagonal2.start.x,
        2
      ) +
      Math.pow(
        measurements.diagonal2.end.y - measurements.diagonal2.start.y,
        2
      )
    )
    const maxDiagonal = Math.max(diagonal1Length, diagonal2Length)
    const cvai =
      maxDiagonal > 0
        ? Math.abs(diagonal1Length - diagonal2Length) / maxDiagonal
        : 0

    // Calculate confidence based on mask quality
    const outputData = output.data as Float32Array
    let maskPixels = 0

    for (let i = 0; i < outputData.length; i++) {
      if (outputData[i] > 0.5) maskPixels++
    }
    const totalPixels = outputData.length
    const confidence = Math.min(
      0.95,
      Math.max(0.5, (maskPixels / totalPixels) * 2)
    )

    return {
      ci,
      cvai,
      confidence,
      mask: maskImageData,
      originalImage: originalImageData,
      measurements,
    }
  }

  /**
   * Analyze image from URL or File
   * @param imageSource - Image source (URL string or File object)
   * @param rotation - Rotation angle in degrees (optional)
   */
  async analyzeImage(
    imageSource: string | File,
    rotation: number = 0
  ): Promise<ModelPrediction> {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.onload = async () => {
        try {
          const prediction = await this.predict(img, rotation)

          resolve(prediction)
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }

      if (typeof imageSource === 'string') {
        img.src = imageSource
      } else {
        const reader = new FileReader()

        reader.onload = e => {
          img.src = e.target?.result as string
        }
        reader.readAsDataURL(imageSource)
      }
    })
  }

  /**
   * Dispose of the model session
   */
  dispose(): void {
    if (this.session) {
      this.session.release()
      this.session = null
    }
  }
}

// Singleton instance
let modelInstance: HeadShapeModel | null = null

/**
 * Get or create model instance (singleton pattern)
 */
export function getModelInstance(
  modelPath?: string,
  config?: Partial<ModelConfig>
): HeadShapeModel {
  if (!modelInstance) {
    modelInstance = new HeadShapeModel(modelPath, config)
  } else {
    // Update model path if provided and different
    if (modelPath && modelInstance['modelPath'] !== modelPath) {
      modelInstance['modelPath'] = modelPath
    }

    // Update config if provided
    if (config) {
      modelInstance['config'] = { ...modelInstance['config'], ...config }
    }
  }

  return modelInstance
}

/**
 * Initialize model with path
 */
export async function initializeModel(
  modelPath: string
): Promise<HeadShapeModel> {
  const model = getModelInstance(modelPath)

  await model.loadModel()

  return model
}

/**
 * Dispose the singleton model instance and release resources
 */
export function disposeModelInstance(): void {
  if (modelInstance) {
    modelInstance.dispose()
    modelInstance = null
  }
}

/**
 * Check if model instance exists
 */
export function hasModelInstance(): boolean {
  return modelInstance !== null
}
