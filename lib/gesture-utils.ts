/**
 * Utility functions for gesture calculations
 * These functions are pure and can be easily tested
 */

export interface Point {
  x: number
  y: number
}

/**
 * Calculate the distance between two points
 * @param p1 First point
 * @param p2 Second point
 * @returns Distance between the points
 */
export const getDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

/**
 * Calculate the center point between two points
 * @param p1 First point
 * @param p2 Second point
 * @returns Center point
 */
export const getCenter = (p1: Point, p2: Point): Point => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }
}

/**
 * Calculate the angle between two points in degrees
 * @param p1 First point
 * @param p2 Second point
 * @returns Angle in degrees
 */
export const getAngle = (p1: Point, p2: Point): number => {
  return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
}

/**
 * Calculate the movement distance between two center points
 * @param center1 First center point
 * @param center2 Second center point
 * @returns Movement distance
 */
export const getCenterMovement = (center1: Point, center2: Point): number => {
  return Math.sqrt(
    Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2)
  )
}

/**
 * Normalize rotation change to handle wrap-around
 * @param rotationChange Raw rotation change
 * @returns Normalized rotation change
 */
export const normalizeRotationChange = (rotationChange: number): number => {
  if (rotationChange > 180) return rotationChange - 360
  if (rotationChange < -180) return rotationChange + 360

  return rotationChange
}

/**
 * Gesture configuration constants
 */
export const GESTURE_CONFIG = {
  SCALE_SENSITIVITY: 1.5,
  ROTATION_SENSITIVITY: 2.0,
  POSITION_SENSITIVITY: 0.5,
  MIN_DISTANCE_THRESHOLD: 2,
  MIN_ROTATION_THRESHOLD: 1,
  MIN_POSITION_THRESHOLD: 3,
  GESTURE_TIMEOUT: 200,
  HINT_DISPLAY_DURATION: 2000,
  DEBOUNCE_DELAY: 100,
} as const
