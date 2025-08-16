// Shared types for detection page and components

export type ImageType = 'top' | 'left' | 'right'

// Model loading states
export enum ModelState {
  NOT_LOADED = 'not_loaded',
  LOADING = 'loading', 
  LOADED = 'loaded',
  ERROR = 'error'
}

// Analysis flow states
export enum AnalysisState {
  WAITING_FOR_IMAGE = 'waiting_for_image',
  READY_TO_ANALYZE = 'ready_to_analyze',
  ANALYZING = 'analyzing',
  COMPLETED = 'completed',
  ERROR = 'error'
}

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
