export type Locale = 'zh' | 'en'

export const locales: Locale[] = ['zh', 'en']

export const defaultLocale: Locale = 'zh'

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
}

export interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
  t: (key: string) => string
}

// Multi-language structure: each field contains all language variants
export interface TranslationValue {
  zh: string
  en: string
}

export interface TranslationKeys {
  [key: string]: TranslationValue
}

export const translations: TranslationKeys = {
  // Site basic information
  'site.title': {
    zh: '婴儿头型发育指南',
    en: 'Infant Head Shape Development Guide',
  },
  'site.description': {
    zh: '科学认知婴儿头型发育，理性护理减少焦虑',
    en: 'Scientific understanding and rational care for infant head shape development',
  },

  // Navigation
  'nav.home': {
    zh: '首页',
    en: 'Home',
  },
  'nav.language': {
    zh: '语言',
    en: 'Language',
  },

  // Hero section
  'hero.title': {
    zh: '婴儿头型发育指南',
    en: 'Infant Head Shape Development Guide',
  },
  'hero.subtitle': {
    zh: '科学认知 · 理性护理',
    en: 'Scientific Understanding · Rational Care',
  },
  'hero.description': {
    zh: '大多数头型问题属于正常发育现象，通过科学的护理方法可以自然改善。我们帮助新手父母建立正确认知，减少不必要的焦虑。',
    en: 'Most head shape issues are normal developmental phenomena that can be naturally improved through scientific care methods. We help new parents build correct understanding and reduce unnecessary anxiety.',
  },
  'hero.cta': {
    zh: '头型自测',
    en: 'Head Shape Assessment',
  },
  'hero.consultation': {
    zh: '如有疑虑，可尝试我们的AI头型分析，仅需提供三张照片即可获得专业建议',
    en: 'If you have concerns, try our AI head shape analysis. Just provide three photos to get professional advice',
  },

  // Development section
  'development.title': {
    zh: '头型是如何发育的',
    en: 'How Head Shape Develops',
  },
  'development.subtitle': {
    zh: '了解婴儿头骨发育的科学过程',
    en: 'Understanding the scientific process of infant skull development',
  },
  'development.structure': {
    zh: '头骨结构',
    en: 'Skull Structure',
  },
  'development.structure.desc': {
    zh: '宝宝的头骨由多块骨板组成，通过"颅缝"连接，方便头部随着大脑发育而增长。',
    en: 'Baby\'s skull consists of multiple bone plates connected by "cranial sutures", allowing the head to grow with brain development.',
  },
  'development.fontanelles': {
    zh: '囟门闭合',
    en: 'Fontanelle Closure',
  },
  'development.fontanelles.desc': {
    zh: '后囟（头后的小软点）通常在2个月左右闭合，前囟（头顶中间的软点）一般在12–18个月闭合。',
    en: 'The posterior fontanelle (small soft spot at the back) usually closes around 2 months, while the anterior fontanelle (soft spot at the top) typically closes at 12-18 months.',
  },
  'development.fontanelles.posterior': {
    zh: '后囟（头后的小软点）通常在',
    en: 'The posterior fontanelle (small soft spot at the back) usually closes around',
  },
  'development.fontanelles.anterior': {
    zh: '，前囟（头顶中间的软点）一般在',
    en: ', while the anterior fontanelle (soft spot at the top) typically closes at',
  },
  'development.fontanelles.closure': {
    zh: '闭合',
    en: ' months',
  },
  'development.fontanelles.around': {
    zh: '2个月左右闭合',
    en: '2 months',
  },
  'development.fontanelles.period': {
    zh: '12–18个月闭合',
    en: '12-18 months',
  },

  'development.growth': {
    zh: '大脑发育',
    en: 'Brain Development',
  },
  'development.growth.desc': {
    zh: '宝宝的大脑在出生到1岁期间增长最快，推动头围快速扩大。',
    en: 'Baby\'s brain grows most rapidly from birth to 1 year old, driving rapid head circumference expansion.',
  },
  'development.growth.period': {
    zh: '宝宝的大脑在出生到1岁期间增长最快',
    en: 'Baby\'s brain grows most rapidly from birth to 1 year old',
  },
  'development.growth.result': {
    zh: '，推动头围快速扩大。',
    en: ', driving rapid head circumference expansion.',
  },
  'development.plasticity': {
    zh: '头型可塑性',
    en: 'Head Shape Plasticity',
  },
  'development.plasticity.desc': {
    zh: '因为头骨还未闭合，姿势对头型影响很大。',
    en: 'Since the skull hasn\'t closed yet, posture greatly affects head shape.',
  },
  'development.plasticity.reason': {
    zh: '因为头骨还未闭合，姿势对头型影响很大',
    en: 'Since the skull hasn\'t closed yet, posture greatly affects head shape',
  },
  'development.birth': {
    zh: '出生恢复',
    en: 'Birth Recovery',
  },
  'development.birth.desc': {
    zh: '出生时，婴儿头骨柔软可塑，可经分娩管道变形，一般产后3–5天内形状可自然恢复。',
    en: 'At birth, the infant skull is soft and malleable, can deform through the birth canal, and typically returns to normal shape within 3-5 days postpartum.',
  },
  'development.birth.condition': {
    zh: '出生时，婴儿头骨柔软可塑，可经分娩管道变形，',
    en: 'At birth, the infant skull is soft and malleable, can deform through the birth canal, and typically',
  },
  'development.birth.recovery': {
    zh: '一般产后3–5天内形状可自然恢复',
    en: 'returns to normal shape within 3-5 days postpartum',
  },

  // Development badges
  'development.badge.scientific': {
    zh: '科学',
    en: 'Scientific',
  },
  'development.badge.authoritative': {
    zh: '权威',
    en: 'Authoritative',
  },

  // Development timeline
  'development.timeline.birth': {
    zh: '出生',
    en: 'Birth',
  },
  'development.timeline.3_6months': {
    zh: '3-6月',
    en: '3-6 months',
  },
  'development.timeline.12_18months': {
    zh: '12-18月',
    en: '12-18 months',
  },
  'development.timeline.birth.detail': {
    zh: '形状恢复',
    en: 'Shape Recovery',
  },
  'development.timeline.3_6months.detail': {
    zh: '后囟闭合',
    en: 'Posterior Fontanelle Closure',
  },
  'development.timeline.12_18months.detail': {
    zh: '前囟闭合',
    en: 'Anterior Fontanelle Closure',
  },

  // Punctuation and connectors
  'punctuation.period': {
    zh: '。',
    en: '.',
  },
  'punctuation.comma': {
    zh: '，',
    en: ', ',
  },

  // Reference component
  'reference.source-link': {
    zh: '来源链接:',
    en: 'Source Link:',
  },

  // Classification section
  'classification.title': {
    zh: '常见头型分类',
    en: 'Common Head Shape Classifications',
  },
  'classification.subtitle': {
    zh: '了解不同头型的特征和成因',
    en: 'Understanding the characteristics and causes of different head shapes',
  },
  'classification.normal': {
    zh: '正常头型',
    en: 'Normal Head Shape',
  },
  'classification.normal.desc': {
    zh: '头部两侧对称，额头和后脑勺呈自然弧形',
    en: 'Symmetrical sides with natural curves on forehead and back of head',
  },
  'classification.flat': {
    zh: '扁头综合征',
    en: 'Flat Head Syndrome',
  },
  'classification.flat.desc': {
    zh: '后脑勺较平，通常由长时间仰卧造成',
    en: 'Flattened back of head, usually caused by prolonged lying on back',
  },
  'classification.oblique': {
    zh: '斜头畸形',
    en: 'Oblique Head Deformity',
  },
  'classification.oblique.desc': {
    zh: '头部一侧较平，呈不对称形状',
    en: 'One side of head is flatter, creating asymmetrical shape',
  },
  'classification.boat': {
    zh: '舟状头',
    en: 'Boat-shaped Head',
  },
  'classification.boat.desc': {
    zh: '头部前后较长，两侧较窄',
    en: 'Head is longer front-to-back and narrower on sides',
  },

  // Stages section
  'stages.title': {
    zh: '头型发育阶段',
    en: 'Head Shape Development Stages',
  },
  'stages.subtitle': {
    zh: '不同月龄的头型特征和注意事项',
    en: 'Head shape characteristics and considerations at different ages',
  },
  'stages.1month': {
    zh: '1个月',
    en: '1 Month',
  },
  'stages.1month.desc': {
    zh: '头骨柔软，容易受到外力影响，需要注意睡姿',
    en: 'Soft skull, easily affected by external forces, need to pay attention to sleeping position',
  },
  'stages.3months': {
    zh: '3个月',
    en: '3 Months',
  },
  'stages.3months.desc': {
    zh: '开始抬头，颈部肌肉发育，可以减少仰卧时间',
    en: 'Begin to lift head, neck muscles develop, can reduce supine time',
  },
  'stages.6months': {
    zh: '6个月',
    en: '6 Months',
  },
  'stages.6months.desc': {
    zh: '能够独立坐立，头型基本定型，轻微不对称仍可改善',
    en: 'Able to sit independently, head shape basically set, minor asymmetry can still improve',
  },
  'stages.12months': {
    zh: '12个月',
    en: '12 Months',
  },
  'stages.12months.desc': {
    zh: '头骨逐渐硬化，重大的头型问题需要专业干预',
    en: 'Skull gradually hardens, major head shape issues require professional intervention',
  },

  // Sleep tips section
  'sleep.title': {
    zh: '帮助婴儿睡出好头型',
    en: 'Helping Baby Sleep for Good Head Shape',
  },
  'sleep.subtitle': {
    zh: '科学的睡姿和护理方法',
    en: 'Scientific sleeping positions and care methods',
  },
  'sleep.tip1': {
    zh: '交替睡姿',
    en: 'Alternate Positions',
  },
  'sleep.tip1.desc': {
    zh: '定期改变宝宝的睡觉和休息姿势',
    en: "Regularly change baby's sleeping and resting positions",
  },
  'sleep.tip2': {
    zh: '趴卧练习',
    en: 'Tummy Time',
  },
  'sleep.tip2.desc': {
    zh: '在清醒时进行监督下的趴卧练习',
    en: 'Supervised tummy time practice when awake',
  },
  'sleep.tip3': {
    zh: '减少躺卧时间',
    en: 'Reduce Lying Time',
  },
  'sleep.tip3.desc': {
    zh: '避免长时间使用婴儿座椅和摇篮',
    en: 'Avoid prolonged use of baby seats and cradles',
  },
  'sleep.tip4': {
    zh: '定期检查',
    en: 'Regular Check-ups',
  },
  'sleep.tip4.desc': {
    zh: '观察头型变化，必要时咨询儿科医生',
    en: 'Observe head shape changes, consult pediatrician when necessary',
  },

  // Buttons and interactions
  'button.learn-more': {
    zh: '了解更多',
    en: 'Learn More',
  },
  'button.contact': {
    zh: '联系我们',
    en: 'Contact Us',
  },
  'button.test-now': {
    zh: '立即测试',
    en: 'Test Now',
  },
}

// Import dev tools in development to enable automatic monitoring
if (process.env.NODE_ENV === 'development') {
  import('./i18n-dev-tools')
}
 