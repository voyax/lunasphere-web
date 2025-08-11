// Reference data that can be shared between server and client components
export interface ReferenceData {
  id: string
  source: {
    zh: string
    en: string
  }
  url: string
}

export const references: Record<string, ReferenceData> = {
  'aap-fontanelles': {
    id: 'aap-fontanelles',
    source: {
      zh: 'American Family Physician - 后囟门闭合时间',
      en: 'American Family Physician - Posterior Fontanelle Closure',
    },
    url: 'https://www.aafp.org/pubs/afp/issues/2003/0615/p2547.html#:~:text=The%20fontanel%20usually%20is%20completely%20closed%20by%20two%20months%20of%20age',
  },
  'who-fontanelles': {
    id: 'who-fontanelles',
    source: {
      zh: 'American Family Physician - 前囟门闭合时间',
      en: 'American Family Physician - Anterior Fontanelle Closure',
    },
    url: 'https://www.aafp.org/pubs/afp/issues/2003/0615/p2547.html#:~:text=the%20median%20age%20of%20closure%20is%2013.8%20months',
  },
  'pediatrics-growth': {
    id: 'pediatrics-growth',
    source: {
      zh: 'Scientific Reports - 婴幼儿大脑发育研究',
      en: 'Scientific Reports - Infant Brain Development Study',
    },
    url: 'https://www.nature.com/articles/s41598-024-69085-0#:~:text=Growth%20of%20the%20cranium%20is%20triggered%20by%20brain%20growth%2C%20two%20thirds%20of%20which%20occurs%20by%20two%20years%20of%20age',
  },
  'medical-plasticity': {
    id: 'medical-plasticity',
    source: {
      zh: 'Deutsches Ärzteblatt - 体位性颅骨畸形',
      en: 'Deutsches Ärzteblatt - Positional Skull Deformities',
    },
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5624275/#:~:text=The%20skull%20is%20easily%20moldable%20in%20the%20first%20months%20of%20life',
  },
  'birth-recovery': {
    id: 'birth-recovery',
    source: {
      zh: 'Contemporary Pediatrics - 新生儿颅型评估',
      en: 'Contemporary Pediatrics - Newborn Head Shape Assessment',
    },
    url: 'https://www.contemporarypediatrics.com/view/evaluating-fontanels-newborn-skull#:~:text=The%20newborn%E2%80%99s%20skull%20is%20molded%20during%20birth%20and%20usually%20resolve%20after%20three%20to%20five%20days',
  },
}