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
      ...config
    }
    
    this.performanceStats = {
      preprocessTime: 0,
      inferenceTime: 0,
      postprocessTime: 0,
      totalTime: 0
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
  preprocessImage(imageElement: HTMLImageElement, rotation: number = 0): { tensor: ImageTensor; originalImageData: ImageData } {
    const startTime = performance.now()
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    
    const [targetHeight, targetWidth] = this.config.inputSize
    const channels = this.config.inputChannels
    
    canvas.width = targetWidth
    canvas.height = targetHeight
    
    // Calculate scale ratio to maintain aspect ratio
    const scale = Math.min(targetWidth / imageElement.width, targetHeight / imageElement.height)
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
        dims: [1, channels, targetHeight, targetWidth] // NCHW format
      },
      originalImageData
    }
  }

  /**
   * Post-process model output to create mask visualization
   */
  private postprocessOutput(output: ort.Tensor, originalImageData: ImageData): ImageData {
    const startTime = performance.now()
    
    const [height, width] = this.config.inputSize
    const outputData = output.data as Float32Array
    
    // Create result image data, copy original image
    const resultImageData = new ImageData(width, height)
    resultImageData.data.set(originalImageData.data)
    
    // Apply heatmap color mapping overlay on original image
    for (let i = 0; i < outputData.length; i++) {
      const value = Math.max(0, Math.min(1, outputData[i]))
      const pixelIndex = i * 4
      
      if (value > 0.7) {
        // High confidence - red overlay
        resultImageData.data[pixelIndex] = Math.min(255, Math.floor(resultImageData.data[pixelIndex] * 0.3 + 180))
        resultImageData.data[pixelIndex + 1] = Math.floor(resultImageData.data[pixelIndex + 1] * 0.3)
        resultImageData.data[pixelIndex + 2] = Math.floor(resultImageData.data[pixelIndex + 2] * 0.3)
      } else if (value > 0.3) {
        // Medium confidence - orange overlay
        resultImageData.data[pixelIndex] = Math.min(255, Math.floor(resultImageData.data[pixelIndex] * 0.5 + 128))
        resultImageData.data[pixelIndex + 1] = Math.min(255, Math.floor(resultImageData.data[pixelIndex + 1] * 0.5 + 64))
        resultImageData.data[pixelIndex + 2] = Math.floor(resultImageData.data[pixelIndex + 2] * 0.5)
      }
    }
    
    this.performanceStats.postprocessTime = performance.now() - startTime
    
    return resultImageData
  }

  /**
   * Run inference on preprocessed image
   * @param imageElement - The image element to analyze
   * @param rotation - Rotation angle in degrees (optional)
   */
  async predict(imageElement: HTMLImageElement, rotation: number = 0): Promise<ModelPrediction> {
    if (!this.session) {
      throw new Error('Model not loaded. Call loadModel() first.')
    }

    try {
      const totalStartTime = performance.now()
      
      // Preprocess image with rotation
      const { tensor, originalImageData } = this.preprocessImage(imageElement, rotation)
      
      // Create input tensor
      const inputTensor = new ort.Tensor('float32', tensor.data, tensor.dims)
      
      // Run inference
      const inferenceStartTime = performance.now()
      const feeds = { [this.session.inputNames[0]]: inputTensor }
      const results = await this.session.run(feeds)
      this.performanceStats.inferenceTime = performance.now() - inferenceStartTime
      
      // Get output tensor
      const output = results[this.session.outputNames[0]]
      
      // Generate mask visualization
      const maskImageData = this.postprocessOutput(output, originalImageData)
      
      this.performanceStats.totalTime = performance.now() - totalStartTime
      
      // For now, return mock CI/CVAI values - these should be calculated from actual model output
      const outputData = output.data as Float32Array
      const ci = 0.75 + Math.random() * 0.2
      const cvai = 0.85 + Math.random() * 0.1
      const confidence = 0.9 + Math.random() * 0.1
      
      // Determine head shape based on CI value
      let headShape = '正常'
      if (ci < 0.75) {
        headShape = '轻微扁头'
      } else if (ci < 0.70) {
        headShape = '中度扁头'
      } else if (ci < 0.65) {
        headShape = '重度扁头'
      }
      
      return {
        ci,
        cvai,
        headShape,
        confidence,
        mask: maskImageData,
        originalImage: originalImageData
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
  async analyzeImage(imageSource: string | File, rotation: number = 0): Promise<ModelPrediction> {
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
        reader.onload = (e) => {
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
export function getModelInstance(modelPath?: string): HeadShapeModel {
  if (!modelInstance) {
    modelInstance = new HeadShapeModel(modelPath)
  }
  return modelInstance
}

/**
 * Initialize model with path
 */
export async function initializeModel(modelPath: string): Promise<HeadShapeModel> {
  const model = getModelInstance(modelPath)
  await model.loadModel()
  return model
}