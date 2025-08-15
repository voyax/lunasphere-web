// Shared types for detection page and components

export type ImageType = 'top' | 'left' | 'right'

export interface ImageUploadData {
  file: File
  url: string
  rotation: number
  scale: number
}

export interface AnalysisResult {
  ci?: number
  cvai?: number
  headShape?: string
  confidence?: number
  mask?: ImageData
  originalImage?: ImageData
  measurements?: {
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
  }
  error?: string
}
