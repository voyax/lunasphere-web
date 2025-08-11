import * as ort from 'onnxruntime-web'

// Configure ONNX Runtime for Next.js
if (typeof window !== 'undefined') {
  // Client-side configuration
  ort.env.wasm.wasmPaths = '/_next/static/chunks/pages/'

  // Set execution providers
  ort.env.wasm.numThreads = 1
  ort.env.wasm.simd = true
}

// Model inference types
export interface ModelPrediction {
  ci: number
  cvai: number
  headShape: string
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

// Performance statistics
export interface PerformanceStats {
  preprocessTime: number
  inferenceTime: number
  postprocessTime: number
  totalTime: number
}

// Model manager class
export class HeadShapeModel {
  private session: ort.InferenceSession | null = null
  private modelPath: string = ''
  private config: ModelConfig
  private performanceStats: PerformanceStats

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

    this.performanceStats = {
      preprocessTime: 0,
      inferenceTime: 0,
      postprocessTime: 0,
      totalTime: 0,
    }
  }

  /**
   * Load the ONNX model
   */
  async loadModel(modelPath?: string): Promise<void> {
    try {
      const path = modelPath || this.modelPath

      if (!path) {
        throw new Error('Model path is required')
      }

      this.session = await ort.InferenceSession.create(path)
      console.log('Model loaded successfully')
    } catch (error) {
      console.error('Failed to load model:', error)
      throw error
    }
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
    const startTime = performance.now()

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

    this.performanceStats.preprocessTime = performance.now() - startTime

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
    const startTime = performance.now()

    const [height, width] = this.config.inputSize
    const outputData = output.data as Float32Array

    // Create result image data, copy original image
    const resultImageData = new ImageData(width, height)

    resultImageData.data.set(originalImageData.data)

    // Apply heatmap color mapping overlay on original image
    // Only show high confidence regions based on configurable threshold
    for (let i = 0; i < outputData.length; i++) {
      const value = Math.max(0, Math.min(1, outputData[i]))
      const pixelIndex = i * 4

      if (value > this.config.confidenceThreshold) {
        // High confidence - bright green with transparency
        resultImageData.data[pixelIndex] = Math.min(
          255,
          Math.floor(resultImageData.data[pixelIndex] * 0.5 + 0 * 0.5)
        )
        resultImageData.data[pixelIndex + 1] = Math.min(
          255,
          Math.floor(resultImageData.data[pixelIndex + 1] * 0.5 + 255 * 0.5)
        )
        resultImageData.data[pixelIndex + 2] = Math.min(
          255,
          Math.floor(resultImageData.data[pixelIndex + 2] * 0.5 + 0 * 0.5)
        )
      }
      // Remove medium and low confidence overlays - only keep original image
    }

    this.performanceStats.postprocessTime = performance.now() - startTime

    return resultImageData
  }

  /**
   * Find intersection points of a diagonal line with head boundary
   * @param center - Center point (OFD midpoint)
   * @param angle - Angle in radians from vertical axis
   * @param headPixels - Array of head boundary pixels
   * @param width - Image width
   * @param height - Image height
   */
  private findDiagonalIntersections(
    center: { x: number; y: number },
    angle: number,
    outputData: Float32Array,
    width: number,
    height: number,
    threshold: number = 0.5
  ): { start: { x: number; y: number }; end: { x: number; y: number } } {
    // Calculate direction vector for the diagonal line
    // Since OFD is vertical, we rotate from vertical (0, -1) by the given angle
    const dirX = Math.sin(angle)
    const dirY = -Math.cos(angle)

    // Find intersection points by extending the line in both directions
    const intersections: { x: number; y: number; distance: number }[] = []

    // Helper function to check if a pixel is part of the head
    const isHeadPixel = (x: number, y: number): boolean => {
      if (x < 0 || x >= width || y < 0 || y >= height) return false
      const index = y * width + x

      return outputData[index] > threshold
    }

    // Extend line in both directions to find boundary intersections
    for (let direction of [-1, 1]) {
      let lastWasHead = true // Start from center which should be inside head

      for (let t = 1; t < Math.max(width, height); t++) {
        const x = Math.round(center.x + direction * t * dirX)
        const y = Math.round(center.y + direction * t * dirY)

        // Check if point is within image bounds
        if (x < 0 || x >= width || y < 0 || y >= height) {
          break
        }

        const currentIsHead = isHeadPixel(x, y)

        // Detect boundary crossing (from head to non-head)
        if (lastWasHead && !currentIsHead) {
          const distance = Math.sqrt(
            Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)
          )

          intersections.push({ x, y, distance })
          break
        }

        lastWasHead = currentIsHead
      }
    }

    // If we found intersections, return the two farthest points
    if (intersections.length >= 2) {
      intersections.sort((a, b) => b.distance - a.distance)

      return {
        start: intersections[0],
        end: intersections[1],
      }
    }

    // Fallback: return points along the diagonal direction
    const fallbackDistance = Math.min(width, height) / 4

    return {
      start: {
        x: Math.round(center.x - fallbackDistance * dirX),
        y: Math.round(center.y - fallbackDistance * dirY),
      },
      end: {
        x: Math.round(center.x + fallbackDistance * dirX),
        y: Math.round(center.y + fallbackDistance * dirY),
      },
    }
  }

  /**
   * Calculate head measurements from mask output
   */
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

    // Find head bounding box
    const boundingBox = this.findHeadBoundingBox(outputData, width, height)

    if (!boundingBox) {
      return null
    }

    console.log('Head bounding box:', boundingBox)

    // Calculate BPD (Biparietal Diameter) - maximum horizontal width
    const bpdMeasurement = this.calculateBPD(outputData, width, boundingBox)

    // Calculate OFD (Occipitofrontal Diameter) - maximum vertical height
    const ofdMeasurement = this.calculateOFD(outputData, width, boundingBox)

    // Calculate diagonal measurements
    const diagonalMeasurements = this.calculateDiagonalMeasurements(
      outputData,
      width,
      height,
      ofdMeasurement
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
   * Find the bounding box of head pixels
   */
  private findHeadBoundingBox(
    outputData: Float32Array,
    width: number,
    height: number
  ): { minX: number; maxX: number; minY: number; maxY: number } | null {
    let minX = width
    let maxX = -1
    let minY = height
    let maxY = -1
    let hasHeadPixels = false

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x

        if (outputData[index] > this.config.confidenceThreshold) {
          hasHeadPixels = true
          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
          minY = Math.min(minY, y)
          maxY = Math.max(maxY, y)
        }
      }
    }

    return hasHeadPixels ? { minX, maxX, minY, maxY } : null
  }

  /**
   * Calculate BPD (Biparietal Diameter) by finding maximum horizontal width
   */
  private calculateBPD(
    outputData: Float32Array,
    width: number,
    boundingBox: { minX: number; maxX: number; minY: number; maxY: number }
  ): {
    width: number
    leftPoint: { x: number; y: number }
    rightPoint: { x: number; y: number }
  } {
    const { minX, maxX, minY, maxY } = boundingBox
    let maxHorizontalWidth = 0
    let bpdLeftPoint = { x: minX, y: Math.floor((minY + maxY) / 2) }
    let bpdRightPoint = { x: maxX, y: Math.floor((minY + maxY) / 2) }

    for (let y = minY; y <= maxY; y++) {
      const rowBounds = this.findRowBounds(outputData, width, y, minX, maxX)

      if (rowBounds) {
        const horizontalWidth = rowBounds.rightMost - rowBounds.leftMost

        if (horizontalWidth > maxHorizontalWidth) {
          maxHorizontalWidth = horizontalWidth
          bpdLeftPoint = { x: rowBounds.leftMost, y }
          bpdRightPoint = { x: rowBounds.rightMost, y }
        }
      }
    }

    return {
      width: maxHorizontalWidth,
      leftPoint: bpdLeftPoint,
      rightPoint: bpdRightPoint,
    }
  }

  /**
   * Calculate OFD (Occipitofrontal Diameter) by finding maximum vertical height
   */
  private calculateOFD(
    outputData: Float32Array,
    width: number,
    boundingBox: { minX: number; maxX: number; minY: number; maxY: number }
  ): {
    height: number
    topPoint: { x: number; y: number }
    bottomPoint: { x: number; y: number }
  } {
    const { minX, maxX, minY, maxY } = boundingBox
    let maxVerticalHeight = 0
    let ofdTopPoint = { x: Math.floor((minX + maxX) / 2), y: minY }
    let ofdBottomPoint = { x: Math.floor((minX + maxX) / 2), y: maxY }

    for (let x = minX; x <= maxX; x++) {
      const colBounds = this.findColumnBounds(outputData, width, x, minY, maxY)

      if (colBounds) {
        const verticalHeight = colBounds.bottomMost - colBounds.topMost

        if (verticalHeight > maxVerticalHeight) {
          maxVerticalHeight = verticalHeight
          ofdTopPoint = { x, y: colBounds.topMost }
          ofdBottomPoint = { x, y: colBounds.bottomMost }
        }
      }
    }

    return {
      height: maxVerticalHeight,
      topPoint: ofdTopPoint,
      bottomPoint: ofdBottomPoint,
    }
  }

  /**
   * Calculate diagonal measurements based on OFD midpoint and 30° angles
   */
  private calculateDiagonalMeasurements(
    outputData: Float32Array,
    width: number,
    height: number,
    ofdMeasurement: {
      topPoint: { x: number; y: number }
      bottomPoint: { x: number; y: number }
    }
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
    const ofdMidpoint = {
      x: (ofdMeasurement.topPoint.x + ofdMeasurement.bottomPoint.x) / 2,
      y: (ofdMeasurement.topPoint.y + ofdMeasurement.bottomPoint.y) / 2,
    }

    // 30° angles from vertical axis
    const angle1 = Math.PI / 6 // 30° clockwise
    const angle2 = -Math.PI / 6 // 30° counter-clockwise

    const diagonal1Points = this.findDiagonalIntersections(
      ofdMidpoint,
      angle1,
      outputData,
      width,
      height,
      this.config.confidenceThreshold
    )

    const diagonal2Points = this.findDiagonalIntersections(
      ofdMidpoint,
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
   * Find leftmost and rightmost head pixels in a row
   */
  private findRowBounds(
    outputData: Float32Array,
    width: number,
    y: number,
    minX: number,
    maxX: number
  ): { leftMost: number; rightMost: number } | null {
    let leftMost = -1
    let rightMost = -1

    // Find leftmost pixel
    for (let x = minX; x <= maxX; x++) {
      const index = y * width + x

      if (outputData[index] > this.config.confidenceThreshold) {
        leftMost = x
        break
      }
    }

    // Find rightmost pixel
    for (let x = maxX; x >= minX; x--) {
      const index = y * width + x

      if (outputData[index] > this.config.confidenceThreshold) {
        rightMost = x
        break
      }
    }

    return leftMost !== -1 && rightMost !== -1 ? { leftMost, rightMost } : null
  }

  /**
   * Find topmost and bottommost head pixels in a column
   */
  private findColumnBounds(
    outputData: Float32Array,
    width: number,
    x: number,
    minY: number,
    maxY: number
  ): { topMost: number; bottomMost: number } | null {
    let topMost = -1
    let bottomMost = -1

    // Find topmost pixel
    for (let y = minY; y <= maxY; y++) {
      const index = y * width + x

      if (outputData[index] > this.config.confidenceThreshold) {
        topMost = y
        break
      }
    }

    // Find bottommost pixel
    for (let y = maxY; y >= minY; y--) {
      const index = y * width + x

      if (outputData[index] > this.config.confidenceThreshold) {
        bottomMost = y
        break
      }
    }

    return topMost !== -1 && bottomMost !== -1 ? { topMost, bottomMost } : null
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

    try {
      const totalStartTime = performance.now()

      // Preprocess image with rotation
      const { tensor, originalImageData } = this.preprocessImage(
        imageElement,
        rotation
      )

      // Create input tensor
      const inputTensor = new ort.Tensor('float32', tensor.data, tensor.dims)

      // Run inference
      const inferenceStartTime = performance.now()
      const feeds = { [this.session.inputNames[0]]: inputTensor }
      const results = await this.session.run(feeds)

      this.performanceStats.inferenceTime =
        performance.now() - inferenceStartTime

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

      // Calculate CI (Cephalic Index) = BPD / OFD * 100
      const ci = measurements.bpd / measurements.ofd

      // Calculate CVAI (Cranial Vault Asymmetry Index)
      // CVAI is typically calculated from diagonal measurements
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
      const cvai =
        Math.abs(diagonal1Length - diagonal2Length) /
        Math.max(diagonal1Length, diagonal2Length)

      this.performanceStats.totalTime = performance.now() - totalStartTime

      // Calculate confidence based on mask quality
      const outputData = output.data as Float32Array
      const maskPixels = outputData.filter(val => val > 0.5).length
      const totalPixels = outputData.length
      const confidence = Math.min(
        0.95,
        Math.max(0.5, (maskPixels / totalPixels) * 2)
      )

      // Determine head shape based on CI value (medical standards)
      let headShape = 'detection.classification.normal'

      if (ci < 0.75) {
        headShape = 'detection.classification.brachycephaly'
      } else if (ci > 0.85) {
        headShape = 'detection.classification.dolichocephaly'
      } else if (cvai > 0.1) {
        headShape = 'detection.classification.plagiocephaly'
      }

      return {
        ci,
        cvai,
        headShape,
        confidence,
        mask: maskImageData,
        originalImage: originalImageData,
        measurements,
      }
    } catch (error) {
      console.error('Inference failed:', error)
      throw error
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
 * Get or create model instance
 */
export function getModelInstance(
  modelPath?: string,
  config?: Partial<ModelConfig>
): HeadShapeModel {
  if (!modelInstance) {
    modelInstance = new HeadShapeModel(modelPath, config)
  } else if (config) {
    // Update config if provided
    modelInstance['config'] = { ...modelInstance['config'], ...config }
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
