/**
 * Head shape classification configuration
 * Pure classification logic without UI styles
 */

export interface ClassificationRange {
  min: number
  max: number
  label: string
  severity: 'normal' | 'mild' | 'moderate' | 'severe'
}

export interface ClassificationResult {
  classification: string
  severity: 'normal' | 'mild' | 'moderate' | 'severe'
}

export interface ClassificationConfig {
  ranges: ClassificationRange[]
  scaleLabels: number[]
}

// CI (Cephalic Index) Classification Configuration
export const CI_CLASSIFICATION_CONFIG: ClassificationConfig = {
  ranges: [
    {
      min: 0,
      max: 72,
      label: '重度长头',
      severity: 'severe',
    },
    {
      min: 72,
      max: 74,
      label: '中度长头',
      severity: 'moderate',
    },
    {
      min: 74,
      max: 76,
      label: '轻度长头',
      severity: 'mild',
    },
    {
      min: 76,
      max: 90,
      label: '正常',
      severity: 'normal',
    },
    {
      min: 90,
      max: 93,
      label: '轻度扁头',
      severity: 'mild',
    },
    {
      min: 93,
      max: 97,
      label: '中度扁头',
      severity: 'moderate',
    },
    {
      min: 97,
      max: Infinity,
      label: '重度扁头',
      severity: 'severe',
    },
  ],
  scaleLabels: [65, 72, 74, 76, 90, 93, 97, 105],
}

// CVAI (Cranial Vault Asymmetry Index) Classification Configuration
export const CVAI_CLASSIFICATION_CONFIG: ClassificationConfig = {
  ranges: [
    {
      min: 0,
      max: 3.5,
      label: '正常',
      severity: 'normal',
    },
    {
      min: 3.5,
      max: 6.25,
      label: '轻度斜头',
      severity: 'mild',
    },
    {
      min: 6.25,
      max: 8.75,
      label: '中度斜头',
      severity: 'moderate',
    },
    {
      min: 8.75,
      max: Infinity,
      label: '重度斜头',
      severity: 'severe',
    },
  ],
  scaleLabels: [0, 3.5, 6.25, 8.75, 11],
}

/**
 * Classify CI value and return result
 * @param ci - CI value (0-1 range, will be converted to percentage)
 * @returns Classification result
 */
export function classifyCI(ci: number): ClassificationResult {
  const ciPercentage = ci * 100

  for (const range of CI_CLASSIFICATION_CONFIG.ranges) {
    if (ciPercentage >= range.min && ciPercentage < range.max) {
      return {
        classification: range.label,
        severity: range.severity,
      }
    }
  }

  // Fallback to last range if no match found
  const lastRange =
    CI_CLASSIFICATION_CONFIG.ranges[CI_CLASSIFICATION_CONFIG.ranges.length - 1]

  return {
    classification: lastRange.label,
    severity: lastRange.severity,
  }
}

/**
 * Classify CVAI value and return result
 * @param cvai - CVAI value (0-1 range, will be converted to percentage)
 * @returns Classification result
 */
export function classifyCVAI(cvai: number): ClassificationResult {
  const cvaiPercentage = cvai * 100

  for (const range of CVAI_CLASSIFICATION_CONFIG.ranges) {
    if (cvaiPercentage >= range.min && cvaiPercentage < range.max) {
      return {
        classification: range.label,
        severity: range.severity,
      }
    }
  }

  // Fallback to last range if no match found
  const lastRange =
    CVAI_CLASSIFICATION_CONFIG.ranges[
      CVAI_CLASSIFICATION_CONFIG.ranges.length - 1
    ]

  return {
    classification: lastRange.label,
    severity: lastRange.severity,
  }
}
