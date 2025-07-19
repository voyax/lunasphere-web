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
    zh: '宝宝的头型会随着发育自然变化，0–18 个月是关键观察期',
    en: 'Head shape changes naturally in the first 18 months.',
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
    zh: '常见头型变化',
    en: 'Common Head Shape Variations',
  },
  'classification.subtitle': {
    zh: '大多数头型变化都是正常发育现象，了解特征有助于科学护理',
    en: 'Most head shape variations are normal developmental phenomena. Understanding characteristics helps with scientific care',
  },
  
  // Section labels
  'classification.description_label': {
    zh: '特征描述',
    en: 'Description',
  },
  'classification.causes_label': {
    zh: '主要成因',
    en: 'Main Causes',
  },
  'classification.correction_label': {
    zh: '纠正手段',
    en: 'Correction Methods',
  },
  
  // Severity levels
  'classification.severity.common': {
    zh: '常见',
    en: 'Common',
  },
  'classification.severity.moderate': {
    zh: '中等',
    en: 'Moderate',
  },
  'classification.severity.rare': {
    zh: '少见',
    en: 'Rare',
  },
  
  // Category labels
  'classification.category.positional': {
    zh: '体位性',
    en: 'Positional',
  },
  'classification.category.pathological': {
    zh: '病理性',
    en: 'Pathological',
  },
  
  // Flat head syndrome (体位性扁头)
  'classification.flat': {
    zh: '扁头',
    en: 'Brachycephaly',
  },
  'classification.flat.image_placeholder': {
    zh: '扁头示例图片',
    en: 'Brachycephaly Example',
  },
  'classification.flat.description': {
    zh: '后脑勺出现扁平，这是婴儿期最常见的头型变化，通常在7-12周龄达到高峰。',
    en: 'Flattening of the back of the head, the most common head shape variation in infancy, typically peaking at 7-12 weeks of age.',
  },
  'classification.flat.causes': {
    zh: '主要由仰卧睡眠姿势引起。美国儿科学会推荐仰卧睡眠以降低婴儿猝死风险，但可能影响头型。',
    en: 'Primarily caused by supine sleeping position. The AAP recommends back sleeping to reduce SIDS risk, but it may affect head shape.',
  },
  'classification.flat.correction': {
    zh: '80%以上的宝宝在2岁前会自然改善。建议：清醒时多趴卧、交替睡姿、减少平躺时间。',
    en: 'Over 80% of babies naturally improve by age 2. Recommendations: more tummy time when awake, alternate sleep positions, reduce lying flat time.',
  },
  
  // Oblique head deformity (偏头畸形)
  'classification.oblique': {
    zh: '偏头畸形',
    en: 'Positional Plagiocephaly',
  },
  'classification.oblique.image_placeholder': {
    zh: '偏头畸形示例图片',
    en: 'Positional Plagiocephaly Example',
  },
  'classification.oblique.description': {
    zh: '头部一侧相对扁平，呈不对称外观。这种情况在4个月时通常达到高峰，之后开始改善。',
    en: 'One side of the head is relatively flat, showing asymmetrical appearance. This condition typically peaks at 4 months and then begins to improve.',
  },
  'classification.oblique.causes': {
    zh: '常见于偏向一侧睡眠、宫内体位限制。70%-95%的偏头宝宝伴有轻微斜颈，这是正常现象。',
    en: 'Common with preferential side sleeping and intrauterine position restrictions. 70%-95% of babies with asymmetrical heads have mild torticollis, which is normal.',
  },
  'classification.oblique.correction': {
    zh: '多数情况会自然改善。建议：鼓励向另一侧转头、增加趴卧时间、轻柔的颈部运动。',
    en: 'Most cases improve naturally. Recommendations: encourage turning to the other side, increase tummy time, gentle neck exercises.',
  },
  
  // Positional long head (姿势性长头)
  'classification.positional_long': {
    zh: '姿势性长头',
    en: 'Positional Dolichocephaly',
  },
  'classification.positional_long.image_placeholder': {
    zh: '姿势性长头示例图片',
    en: 'Positional Dolichocephaly Example',
  },
  'classification.positional_long.description': {
    zh: '头部前后较长、两侧相对较窄，但颅缝正常开放。多见于早产儿或长期侧卧的婴儿。',
    en: 'Head is longer front-to-back and relatively narrower on the sides, but with normal open sutures. Common in premature infants or babies who lie on their sides for extended periods.',
  },
  'classification.positional_long.causes': {
    zh: '主要由长期侧卧体位引起，常见于NICU早产儿。与病理性舟状头不同，颅缝发育正常。',
    en: 'Primarily caused by prolonged side-lying position, common in NICU premature infants. Unlike pathological scaphocephaly, suture development is normal.',
  },
  'classification.positional_long.correction': {
    zh: '多数情况可通过体位调整自然改善。建议：减少侧卧时间、增加仰卧和俯卧时间、头部按摩。',
    en: 'Most cases can improve naturally with position adjustments. Recommendations: reduce side-lying time, increase supine and prone time, head massage.',
  },
  
  // Pathological scaphocephaly (病理性舟状头)
  'classification.scaphocephaly': {
    zh: '舟状头',
    en: 'Scaphocephaly',
  },
  'classification.scaphocephaly.image_placeholder': {
    zh: '病理性舟状头示例图片',
    en: 'Pathological Scaphocephaly Example',
  },
  'classification.scaphocephaly.description': {
    zh: '矢状缝早闭导致的船形头颅，是最常见的颅缝早闭类型，占所有颅缝早闭的50%。',
    en: 'Boat-shaped skull caused by premature sagittal suture closure, the most common type of craniosynostosis, accounting for 50% of all craniosynostosis cases.',
  },
  'classification.scaphocephaly.causes': {
    zh: '矢状缝过早融合，阻止头颅横向生长而前后生长继续，形成狭长头型。男性发病率是女性的3倍。',
    en: 'Premature fusion of sagittal suture prevents lateral skull growth while anteroposterior growth continues, forming an elongated narrow head. Male incidence is 3 times higher than female.',
  },
  'classification.scaphocephaly.correction': {
    zh: '需要神经外科手术治疗。通常需要切除融合的矢状缝并重塑头颅形状，早期手术效果更佳。',
    en: 'Requires neurosurgical treatment. Usually involves removal of fused sagittal suture and skull reshaping, with better outcomes from early surgery.',
  },
  
  // Reminder section
  'classification.reminder_title': {
    zh: '温馨提醒：',
    en: 'Gentle Reminder: ',
  },
  'classification.reminder_content': {
    zh: '根据医学研究，大多数头型变化都会在宝宝成长过程中自然改善，无需过度担心。',
    en: 'According to medical research, most head shape variations naturally improve as babies grow, without need for excessive worry.',
  },
  'classification.reminder_note': {
    zh: '如有疑虑，建议在常规儿保检查时咨询儿科医生。早期的简单护理调整通常就很有效。',
    en: 'If concerned, consult your pediatrician during routine check-ups. Early simple care adjustments are usually very effective.',
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
 