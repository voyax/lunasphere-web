/**
 * Canvas drawing utilities for head shape analysis visualization
 * Pure functions for drawing measurement lines and annotations
 */

interface Point {
  x: number
  y: number
}

interface Line {
  start: Point
  end: Point
}

interface Measurements {
  bpd: number
  ofd: number
  bpdLine: Line
  ofdLine: Line
  diagonal1: Line
  diagonal2: Line
}

interface DrawingConfig {
  lineWidth: number
  fontSize: string
  colors: {
    bpd: string
    ofd: string
    diagonal: string
    pointBorder: string
  }
  pointRadius: number
  labelOffsets: {
    bpd: { x: number; y: number }
    ofd: { x: number; y: number }
  }
}

// Default drawing configuration
const DEFAULT_CONFIG: DrawingConfig = {
  lineWidth: 2,
  fontSize: '12px Arial',
  colors: {
    bpd: '#FFDC00',
    ofd: '#F24C62',
    diagonal: '#6B7280',
    pointBorder: 'white',
  },
  pointRadius: 3,
  labelOffsets: {
    bpd: { x: 90, y: -10 },
    ofd: { x: 30, y: -90 },
  },
}

/**
 * Calculate the midpoint of a line
 */
function getMidpoint(line: Line): Point {
  return {
    x: (line.start.x + line.end.x) / 2,
    y: (line.start.y + line.end.y) / 2,
  }
}

/**
 * Draw a line on canvas with specified color
 */
function drawLine(
  ctx: CanvasRenderingContext2D,
  line: Line,
  color: string,
  isDashed = false
): void {
  ctx.strokeStyle = color
  ctx.fillStyle = color

  if (isDashed) {
    ctx.setLineDash([5, 5])
  }

  ctx.beginPath()
  ctx.moveTo(line.start.x, line.start.y)
  ctx.lineTo(line.end.x, line.end.y)
  ctx.stroke()

  if (isDashed) {
    ctx.setLineDash([])
  }
}

/**
 * Draw a point (circle) on canvas
 */
function drawPoint(
  ctx: CanvasRenderingContext2D,
  point: Point,
  color: string,
  radius: number,
  borderColor: string
): void {
  // Fill the point
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
  ctx.fill()

  // Draw border
  ctx.strokeStyle = borderColor
  ctx.lineWidth = 1
  ctx.stroke()
}

/**
 * Draw text label on canvas
 */
function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  position: Point,
  color: string
): void {
  ctx.fillStyle = color
  ctx.fillText(text, position.x, position.y)
}

/**
 * Draw BPD (Biparietal Diameter) line with label
 */
function drawBPDLine(
  ctx: CanvasRenderingContext2D,
  measurements: Measurements,
  config: DrawingConfig
): void {
  const { bpdLine, bpd } = measurements
  const { colors, labelOffsets } = config

  // Draw line
  drawLine(ctx, bpdLine, colors.bpd)

  // Draw label
  const midpoint = getMidpoint(bpdLine)
  const labelPosition = {
    x: midpoint.x + labelOffsets.bpd.x,
    y: midpoint.y + labelOffsets.bpd.y,
  }

  drawLabel(ctx, `BPD: ${bpd.toFixed(1)}px`, labelPosition, colors.bpd)

  // Draw points
  drawPoint(
    ctx,
    bpdLine.start,
    colors.bpd,
    config.pointRadius,
    colors.pointBorder
  )
  drawPoint(
    ctx,
    bpdLine.end,
    colors.bpd,
    config.pointRadius,
    colors.pointBorder
  )
}

/**
 * Draw OFD (Occipitofrontal Diameter) line with label
 */
function drawOFDLine(
  ctx: CanvasRenderingContext2D,
  measurements: Measurements,
  config: DrawingConfig
): void {
  const { ofdLine, ofd } = measurements
  const { colors, labelOffsets } = config

  // Draw line
  drawLine(ctx, ofdLine, colors.ofd)

  // Draw label
  const midpoint = getMidpoint(ofdLine)
  const labelPosition = {
    x: midpoint.x + labelOffsets.ofd.x,
    y: midpoint.y + labelOffsets.ofd.y,
  }

  drawLabel(ctx, `OFD: ${ofd.toFixed(1)}px`, labelPosition, colors.ofd)

  // Draw points
  drawPoint(
    ctx,
    ofdLine.start,
    colors.ofd,
    config.pointRadius,
    colors.pointBorder
  )
  drawPoint(
    ctx,
    ofdLine.end,
    colors.ofd,
    config.pointRadius,
    colors.pointBorder
  )
}

/**
 * Draw diagonal lines
 */
function drawDiagonalLines(
  ctx: CanvasRenderingContext2D,
  measurements: Measurements,
  config: DrawingConfig
): void {
  const { diagonal1, diagonal2 } = measurements
  const { colors } = config

  // Draw both diagonal lines as dashed
  drawLine(ctx, diagonal1, colors.diagonal, true)
  drawLine(ctx, diagonal2, colors.diagonal, true)

  // Draw points for diagonals
  drawPoint(
    ctx,
    diagonal1.start,
    colors.diagonal,
    config.pointRadius,
    colors.pointBorder
  )
  drawPoint(
    ctx,
    diagonal1.end,
    colors.diagonal,
    config.pointRadius,
    colors.pointBorder
  )
  drawPoint(
    ctx,
    diagonal2.start,
    colors.diagonal,
    config.pointRadius,
    colors.pointBorder
  )
  drawPoint(
    ctx,
    diagonal2.end,
    colors.diagonal,
    config.pointRadius,
    colors.pointBorder
  )
}

/**
 * Main function to draw all measurement annotations on canvas
 */
export function drawMeasurementAnnotations(
  canvas: HTMLCanvasElement,
  mask: ImageData,
  measurements: Measurements,
  customConfig?: Partial<DrawingConfig>
): void {
  const config = { ...DEFAULT_CONFIG, ...customConfig }
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Failed to get canvas 2D context')
  }

  // Set canvas dimensions
  canvas.width = mask.width
  canvas.height = mask.height

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Set drawing style
  ctx.lineWidth = config.lineWidth
  ctx.font = config.fontSize
  ctx.textAlign = 'center'

  // Draw all measurement elements
  drawBPDLine(ctx, measurements, config)
  drawOFDLine(ctx, measurements, config)
  drawDiagonalLines(ctx, measurements, config)
}

/**
 * Create a downloadable canvas with mask and measurements
 */
export function createDownloadableCanvas(
  mask: ImageData,
  measurements?: Measurements
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  canvas.width = mask.width
  canvas.height = mask.height

  // Draw the mask
  ctx.putImageData(mask, 0, 0)

  // Draw measurements if provided
  if (measurements) {
    drawMeasurementAnnotations(canvas, mask, measurements)
  }

  return canvas
}

/**
 * Download canvas as PNG file
 */
export function downloadCanvasAsPNG(
  canvas: HTMLCanvasElement,
  filename = 'head-analysis-result.png'
): void {
  const link = document.createElement('a')

  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

// Export types for external use
export type { Point, Line, Measurements, DrawingConfig }
