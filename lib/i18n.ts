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
    zh: '小月颅',
    en: 'XiaoYueLu',
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
  'nav.detection': {
    zh: '头型检测',
    en: 'Head Shape Detection',
  },
  'nav.profileMatch': {
    zh: '轮廓匹配',
    en: 'Profile Match',
  },
  'nav.faq': {
    zh: '常见问题',
    en: 'FAQ',
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
    en: "Most head shape concerns are part of normal development and improve naturally with proper care. We help new parents understand what's normal and reduce unnecessary worry.",
  },
  'hero.cta': {
    zh: '头型自测',
    en: 'Head Shape Assessment',
  },
  'hero.consultation': {
    zh: '如有疑虑，可尝试我们的AI头型分析，一张照片即可测出宝宝的头型指标',
    en: 'If you have any concerns, try our AI head shape analysis. Simply upload one photo to get professional insights',
  },

  // Development section
  'development.title': {
    zh: '头型是如何发育的',
    en: 'How Head Shape Develops',
  },
  'development.subtitle': {
    zh: '宝宝的头型会随着发育自然变化，0–18 个月是关键观察期',
    en: "Baby's head shape changes naturally during development, with 0-18 months being the key observation period",
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
    en: "Baby's brain grows most rapidly from birth to 1 year old, driving rapid head circumference expansion.",
  },
  'development.growth.period': {
    zh: '宝宝的大脑在出生到1岁期间增长最快',
    en: "Baby's brain grows most rapidly from birth to 1 year old",
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
    en: "Since the skull hasn't closed yet, posture greatly affects head shape.",
  },
  'development.plasticity.reason': {
    zh: '因为头骨还未闭合，姿势对头型影响很大',
    en: "Since the skull hasn't closed yet, posture greatly affects head shape",
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
    en: 'Most head shape variations are normal developmental changes. Understanding their characteristics helps with proper care',
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
  'classification.reminder_title': {
    zh: '体位性头型变化是正常现象',
    en: 'Positional Head Shape Changes Are Normal',
  },
  'classification.reminder_content': {
    zh: '大多数头型变化属于体位性，通过调整睡姿、增加俯卧时间等方法可以自然改善，无需过度担心',
    en: 'Most head shape changes are positional and improve naturally by adjusting sleep positions, increasing tummy time, and other simple methods - no need to worry excessively',
  },
  'classification.reminder_note': {
    zh: '💡 建议：定期变换宝宝睡觉和玩耍的姿势，促进头型自然发育',
    en: "💡 Tip: Regularly vary baby's sleeping and play positions to encourage natural head shape development",
  },
  'classification.medical_warning_title': {
    zh: '病理性头型需要医疗关注',
    en: 'Pathological Head Shapes Require Medical Attention',
  },
  'classification.medical_warning_content': {
    zh: '病理性头型（如舟状头）无法通过调整睡姿、使用矫正头盔等方式治疗。这类情况需要专业的医疗诊断和外科治疗，如发现头型异常严重、头围增长异常或伴有其他症状，必须及时咨询儿科医生或头颅外科专家进行专业评估。',
    en: 'Pathological head shapes (such as scaphocephaly) cannot be treated through sleep position adjustments or corrective helmets. These conditions require professional medical diagnosis and surgical treatment. If severe head shape abnormalities, abnormal head circumference growth, or other symptoms are observed, immediate consultation with a pediatrician or cranial specialist for professional evaluation is essential.',
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
  'classification.category.normal': {
    zh: '正常',
    en: 'Normal',
  },
  'classification.category.positional': {
    zh: '体位性',
    en: 'Positional',
  },
  'classification.category.pathological': {
    zh: '病理性',
    en: 'Pathological',
  },

  // Normal head shape (正常头型)
  'classification.normal': {
    zh: '正常头型',
    en: 'Normal Head Shape',
  },
  'classification.normal.image_placeholder': {
    zh: '正常头型示例图片',
    en: 'Normal Head Shape Example',
  },
  'classification.normal.description': {
    zh: '头部呈现自然圆润的形状，前后、左右基本对称，符合正常发育标准。',
    en: 'Head shows natural rounded shape with basic symmetry front-to-back and left-to-right, meeting normal developmental standards.',
  },
  'classification.normal.causes': {
    zh: '正常的胎儿发育和出生后适当的体位变换，头骨在自然生长过程中形成理想形状。',
    en: 'Normal fetal development and appropriate position changes after birth, with skull forming ideal shape during natural growth process.',
  },
  'classification.normal.correction': {
    zh: '无需特殊干预，继续保持良好的护理习惯，定期体位变换，确保健康发育。',
    en: 'No special intervention needed, continue good care habits, regular position changes, ensure healthy development.',
  },

  // Brachycephaly (体位性扁头)
  'classification.brachycephaly': {
    zh: '扁头',
    en: 'Brachycephaly',
  },
  'classification.brachycephaly.image_placeholder': {
    zh: '扁头示例图片',
    en: 'Brachycephaly Example',
  },
  'classification.brachycephaly.image_alt': {
    zh: '扁头畸形示例图片，显示后脑勺扁平的特征',
    en: 'Brachycephaly example image showing flattened back of head characteristics',
  },
  'classification.brachycephaly.description': {
    zh: '后脑勺出现扁平，这是婴儿期最常见的头型变化，通常在7-12周龄达到高峰。',
    en: 'Flattening of the back of the head, the most common head shape variation in infancy, typically peaking at 7-12 weeks of age.',
  },
  'classification.brachycephaly.causes': {
    zh: '主要由仰卧睡眠姿势引起。美国儿科学会推荐仰卧睡眠以降低婴儿猝死风险，但可能影响头型。',
    en: 'Primarily caused by supine sleeping position. The AAP recommends back sleeping to reduce SIDS risk, but it may affect head shape.',
  },
  'classification.brachycephaly.correction': {
    zh: '80%以上的宝宝在2岁前会自然改善。建议：清醒时多趴卧、交替睡姿、减少平躺时间。',
    en: 'Over 80% of babies naturally improve by age 2. Recommendations: more tummy time when awake, alternate sleep positions, reduce lying flat time.',
  },

  // Plagiocephaly (偏头畸形)
  'classification.plagiocephaly': {
    zh: '偏头畸形',
    en: 'Plagiocephaly',
  },
  'classification.plagiocephaly.image_placeholder': {
    zh: '偏头畸形示例图片',
    en: 'Plagiocephaly Example',
  },
  'classification.plagiocephaly.image_alt': {
    zh: '偏头畸形示例图片，显示头部一侧扁平的不对称特征',
    en: 'Plagiocephaly example image showing asymmetrical head shape with one side flattened',
  },
  'classification.plagiocephaly.description': {
    zh: '头部一侧相对扁平，呈不对称外观。这种情况在4个月时通常达到高峰，之后开始改善。',
    en: 'One side of the head is relatively flat, showing asymmetrical appearance. This condition typically peaks at 4 months and then begins to improve.',
  },
  'classification.plagiocephaly.causes': {
    zh: '常见于偏向一侧睡眠、宫内体位限制。70%-95%的偏头宝宝伴有轻微斜颈，这是正常现象。',
    en: 'Common with preferential side sleeping and intrauterine position restrictions. 70%-95% of babies with asymmetrical heads have mild torticollis, which is normal.',
  },
  'classification.plagiocephaly.correction': {
    zh: '多数情况会自然改善。建议：鼓励向另一侧转头、增加趴卧时间、轻柔的颈部运动。',
    en: 'Most cases improve naturally. Recommendations: encourage turning to the other side, increase tummy time, gentle neck exercises.',
  },

  // Dolichocephaly (姿势性长头)
  'classification.dolichocephaly': {
    zh: '姿势性长头',
    en: 'Dolichocephaly',
  },
  'classification.dolichocephaly.image_placeholder': {
    zh: '姿势性长头示例图片',
    en: 'Dolichocephaly Example',
  },
  'classification.dolichocephaly.image_alt': {
    zh: '姿势性长头示例图片，显示头部前后较长、两侧较窄的特征',
    en: 'Dolichocephaly example image showing elongated head shape that is longer front-to-back and narrower on sides',
  },
  'classification.dolichocephaly.description': {
    zh: '头部前后较长、两侧相对较窄，但颅缝正常开放。多见于早产儿或长期侧卧的婴儿。',
    en: 'Head is longer front-to-back and relatively narrower on the sides, but with normal open sutures. Common in premature infants or babies who lie on their sides for extended periods.',
  },
  'classification.dolichocephaly.causes': {
    zh: '主要由长期侧卧体位引起，常见于NICU早产儿。与病理性舟状头不同，颅缝发育正常。',
    en: 'Primarily caused by prolonged side-lying position, common in NICU premature infants. Unlike pathological scaphocephaly, suture development is normal.',
  },
  'classification.dolichocephaly.correction': {
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
  'classification.scaphocephaly.image_alt': {
    zh: '病理性舟状头示例图片，显示矢状缝早闭导致的船形头颅特征',
    en: 'Pathological scaphocephaly example image showing boat-shaped skull caused by premature sagittal suture closure',
  },
  'classification.scaphocephaly.description': {
    zh: '矢状缝早闭导致，顶上有一道自前向后隆起的骨脊，前后尖，头型如舟，是最常见的颅缝早闭类型。',
    en: 'Caused by premature sagittal suture closure, characterized by a prominent bony ridge running from front to back on top of the head, with pointed front and back, resembling a boat shape, the most common type of craniosynostosis.',
  },
  'classification.scaphocephaly.causes': {
    zh: '矢状缝过早融合，阻止头颅横向生长而前后生长继续，形成狭长头型。男性发病率是女性的3倍。',
    en: 'Premature fusion of sagittal suture prevents lateral skull growth while anteroposterior growth continues, forming an elongated narrow head. Male incidence is 3 times higher than female.',
  },
  'classification.scaphocephaly.correction': {
    zh: '病理性舟状头属于颅缝早闭，必须通过神经外科手术治疗，无法通过调整睡姿、物理治疗或矫正头盔等保守方式改善。手术通常需要切除融合的矢状缝并重塑头颅形状，早期诊断和手术治疗效果更佳，需要由专业的神经外科医生进行评估和治疗',
    en: 'Pathological scaphocephaly is a form of craniosynostosis that must be treated through neurosurgical intervention and cannot be improved through conservative methods such as sleep position adjustments, physical therapy, or corrective helmets. Surgery typically involves removal of the fused sagittal suture and skull reshaping, with better outcomes from early diagnosis and surgical treatment, requiring evaluation and treatment by specialized neurosurgeons',
  },

  // Sleep tips section
  'sleep.title': {
    zh: '帮助宝宝睡出好头型',
    en: 'Helping Your Baby Develop a Beautiful Head Shape',
  },
  'sleep.subtitle': {
    zh: '看完我们整理的内容，多观察，循序渐进，宝宝就能轻松睡出漂亮圆头',
    en: 'With careful observation and gradual implementation of these guidelines, your baby can naturally develop a beautifully rounded head shape',
  },

  // 核心原则
  'sleep.principle1': {
    zh: '安全第一，科学护理',
    en: 'Safety First, Scientific Care',
  },
  'sleep.principle1.desc': {
    zh: '始终遵循安全睡眠原则，仰睡可以降低婴儿猝死综合征（SIDS）的风险，避免俯睡，无论何时，都应该把安全放置在第一位',
    en: 'Always follow safe sleep guidelines. Back sleeping significantly reduces SIDS risk. Never place babies on their stomach to sleep - safety must always come first.',
  },
  'sleep.principle2': {
    zh: '勤换睡姿，均匀受力',
    en: 'Frequent Position Changes, Even Pressure Distribution',
  },
  'sleep.principle2.desc': {
    zh: '新生儿颅骨柔软可塑，长时间固定睡姿易致头型偏平。两个方向的侧睡、仰睡轮流进行，让头部各个部位均匀受力，促进头型自然圆润发育',
    en: 'Newborn skulls are soft and moldable, making them susceptible to flattening from prolonged fixed positions. Rotate between left side, right side, and back sleeping to distribute pressure evenly and encourage natural head rounding.',
  },
  'sleep.principle3': {
    zh: '床垫适度，稳固支撑',
    en: 'Appropriate Mattress, Stable Support',
  },
  'sleep.principle3.desc': {
    zh: '选用硬度适中的床垫，既能提供充分支撑，又不会过度下陷。过软的床垫会使宝宝的头部受力不均，某一侧长时间陷入，反而容易导致扁头或偏头等问题，且不利于婴儿脊椎发育',
    en: "Select a firm mattress that provides proper support without excessive sinking. Soft mattresses can create uneven pressure on your baby's head, causing one side to sink in and potentially leading to flat spots or asymmetry, while also hindering healthy spinal development.",
  },
  'sleep.principle4': {
    zh: '细心观察，及时调整',
    en: 'Careful Observation, Timely Adjustment',
  },
  'sleep.principle4.desc': {
    zh: '前6个月是头型塑造的黄金期，家长应密切关注宝宝头型变化。发现偏平或不对称时，及时调整护理方式。6个月后随着宝宝活动增加，头型会逐渐趋于圆润',
    en: "The first 6 months are crucial for head shape development. Monitor your baby's head shape closely and adjust care practices immediately if you notice flattening or asymmetry. After 6 months, increased mobility naturally helps round out the head shape.",
  },

  // 分龄指导
  'sleep.newborn_title': {
    zh: '新生儿期护理',
    en: 'Newborn Care',
  },
  'sleep.newborn_desc': {
    zh: '重点关注睡姿变换，避免长时间仰卧，每2小时调整一次头部位置',
    en: 'Focus on sleep position changes, avoid prolonged supine position, adjust head position every 2 hours',
  },
  'sleep.infant_title': {
    zh: '婴儿期护理',
    en: 'Infant Care',
  },
  'sleep.infant_desc': {
    zh: '增加趴卧时间，开始进行颈部运动，注意观察头型对称性',
    en: 'Increase tummy time, start neck exercises, pay attention to head shape symmetry',
  },
  'sleep.toddler_title': {
    zh: '幼儿期护理',
    en: 'Toddler Care',
  },
  'sleep.toddler_desc': {
    zh: '鼓励多种睡姿，减少长时间固定姿势，关注头型最终定型',
    en: 'Encourage various sleep positions, reduce prolonged fixed postures, focus on final head shape formation',
  },
  'sleep.mobile_title': {
    zh: '活动期注意事项',
    en: 'Mobile Period Considerations',
  },
  'sleep.mobile_desc': {
    zh: '宝宝开始翻身和坐立，头型基本定型，重点转向维护和预防不良习惯',
    en: 'Babies begin to roll over and sit up, head shape is basically set, focus shifts to maintenance and prevention of bad habits',
  },

  // 实用技巧
  'sleep.technique1': {
    zh: '趴卧时间练习',
    en: 'Tummy Time Practice',
  },
  'sleep.technique1.desc': {
    zh: '在宝宝清醒且有人看护时，从新生儿期开始每天进行3-5次趴卧练习，每次2-5分钟。趴卧能有效减轻后脑勺压力，促进颈背部肌肉发育，预防扁头综合征。注意选择硬实平整的表面，确保宝宝呼吸道畅通',
    en: 'Start from the newborn period with 3-5 supervised tummy time sessions daily, 2-5 minutes each. This relieves pressure on the back of the head, strengthens neck muscles, and prevents flat head syndrome. Always use a firm, flat surface and ensure clear breathing',
  },
  'sleep.technique2': {
    zh: '多样化喂养姿势',
    en: 'Varied Feeding Positions',
  },
  'sleep.technique2.desc': {
    zh: '采用多种喂养姿势，包括摇篮式、橄榄球式、侧卧式等，每次喂养交替使用左右手臂。避免长时间固定同一姿势，这样不仅能减少头部单侧受压，还能促进宝宝视觉和空间感知能力的全面发展',
    en: 'Alternate between cradle hold, football hold, and side-lying positions. Switch arms with each feeding to prevent prolonged pressure on one side of the head while promoting visual and spatial development',
  },
  'sleep.technique3': {
    zh: '环境引导转头',
    en: 'Environmental Encouragement',
  },
  'sleep.technique3.desc': {
    zh: '合理布置婴儿床周围环境，定期更换玩具、音乐盒或彩色图案的位置，利用宝宝的好奇心引导其主动转头。每隔几天调换宝宝睡觉的方向（头脚位置对调），这样光线和环境刺激就会从不同方向吸引宝宝转头，简单有效地避免头部总是偏向同一侧',
    en: "Strategically arrange your baby's environment by regularly moving toys, music boxes, or colorful patterns around the crib to encourage natural head turning. Every few days, alternate which end of the crib your baby's head faces, so light and visual stimuli naturally draw their attention in different directions.",
  },
  'sleep.technique4': {
    zh: '侧睡小妙招',
    en: 'Side Sleeping Tips',
  },
  'sleep.technique4.desc': {
    zh: '让宝宝侧睡时要做到侧头侧身睡，避免只侧头不侧身的错误姿势。只侧头不侧身会让颈部承受过大压力，可能导致颈部不适或加重头型偏斜。可以在宝宝背后垫一个卷起来的小毛巾或小枕头，帮助其保持稳定的侧卧姿势，左右两侧要轮流进行',
    en: "When positioning your baby on their side, ensure both head and body face the same direction—never just turn the head while keeping the body straight. This misalignment strains the neck and can worsen head asymmetry. Use a rolled towel or small pillow behind your baby's back for support, and remember to alternate between left and right sides.",
  },

  // Head shape examples section
  'examples.title': {
    zh: '典型头型图片展示',
    en: 'Typical Head Shape Examples',
  },
  'examples.subtitle': {
    zh: '通过真实图片了解不同头型的特征',
    en: 'Learn to recognize different head shape characteristics through real examples',
  },

  // Image captions
  'examples.normal.3month': {
    zh: '正常头型 — 3个月',
    en: 'Normal head shape — 3 months old',
  },
  'examples.normal.6month': {
    zh: '正常头型 — 6个月',
    en: 'Normal head shape — 6 months old',
  },
  'examples.normal.9month': {
    zh: '正常头型 — 9个月',
    en: 'Normal head shape — 9 months old',
  },
  'examples.brachycephaly.front_view': {
    zh: '扁头 - 正视',
    en: 'Brachycephaly - Front view',
  },
  'examples.brachycephaly.profile_view': {
    zh: '扁头 - 侧视',
    en: 'Brachycephaly - Profile view',
  },
  'examples.brachycephaly.top_view': {
    zh: '扁头 - 俯视',
    en: 'Brachycephaly - Top view',
  },
  'examples.plagiocephaly.front_view': {
    zh: '斜头 - 正视',
    en: 'Plagiocephaly - Front view',
  },
  'examples.plagiocephaly.profile_view': {
    zh: '斜头 - 侧视',
    en: 'Plagiocephaly - Profile view',
  },
  'examples.plagiocephaly.top_view': {
    zh: '斜头俯视',
    en: 'Plagiocephaly - Top view',
  },
  'examples.dolichocephaly.front_view': {
    zh: '姿势性长头正视',
    en: 'Dolichocephaly - Front view',
  },
  'examples.dolichocephaly.profile_view': {
    zh: '姿势性长头侧视',
    en: 'Dolichocephaly - Profile view',
  },
  'examples.dolichocephaly.top_view': {
    zh: '姿势性长头俯视',
    en: 'Dolichocephaly - Top view',
  },
  'examples.scaphocephaly.3D_1': {
    zh: '舟状头 - 3D',
    en: 'Scaphocephaly - 3D',
  },
  'examples.scaphocephaly.3D_2': {
    zh: '舟状头 - 3D',
    en: 'Scaphocephaly - 3D',
  },
  'examples.scaphocephaly.3D_3': {
    zh: '舟状头 - 3D',
    en: 'Scaphocephaly - 3D',
  },
  'examples.scaphocephaly.medical_note': {
    zh: '舟状头 ≠ 体位性长头，必须经专业的医学判断。医学影像参考：https://radiopaedia.org/articles/scaphocephaly',
    en: 'Scaphocephaly ≠ positional dolichocephaly, requires medical assessment. Medical imaging ref: https://radiopaedia.org/articles/scaphocephaly ',
  },
  'examples.image_placeholder': {
    zh: '图片占位符',
    en: 'Image Placeholder',
  },

  // Sleep tips section titles and descriptions
  'sleep.principles_title': {
    zh: '四个核心原则',
    en: 'Four Core Principles',
  },
  'sleep.principles_subtitle': {
    zh: '掌握这些基本原则，为宝宝创造最佳的头型发育环境',
    en: 'Master these essential principles to create the ideal environment for healthy head shape development',
  },
  'sleep.techniques_title': {
    zh: '实用护理技巧',
    en: 'Practical Care Techniques',
  },
  'sleep.techniques_subtitle': {
    zh: '日常生活中简单易行的头型护理方法',
    en: 'Simple, effective techniques you can easily incorporate into daily care',
  },
  'sleep.cta_title': {
    zh: '如果您仍有疑惑',
    en: 'Still Have Questions?',
  },
  'sleep.cta_description': {
    zh: '欢迎尝试我们的在线头型测试，或者发送邮件给我们。我们会尽力为每一位家长提供帮助和解答，这些服务都是免费的。',
    en: "Try our free online head shape assessment or reach out via email. We're here to support every parent with personalized guidance and answers.",
  },

  // Buttons and interactions
  'button.learn-more': {
    zh: '了解更多',
    en: 'Learn More',
  },
  'button.contact': {
    zh: '发送邮件',
    en: 'Contact Us',
  },
  'button.test-now': {
    zh: '立即测试',
    en: 'Get Started',
  },

  // Detection page
  'detection.hero.title': {
    zh: 'AI头型智能分析',
    en: 'AI Head Shape Analysis',
  },
  'detection.hero.subtitle': {
    zh: '深度学习 · 隐私安全 · 本地处理',
    en: 'Deep Learning · Privacy Secure · Local Processing',
  },
  'detection.hero.description': {
    zh: '基于先进深度学习算法的专业头型评估系统，所有数据处理均在您的设备本地完成，无需上传任何照片，确保您和宝宝的隐私安全。',
    en: "Professional head shape assessment system based on advanced deep learning algorithms. All data processing is completed locally on your device without uploading any photos, ensuring your and your baby's privacy and security.",
  },
  'detection.hero.features.ai': {
    zh: '深度学习算法',
    en: 'Deep Learning Algorithm',
  },
  'detection.hero.features.privacy': {
    zh: '本地处理，隐私安全',
    en: 'Local Processing, Privacy Secure',
  },
  'detection.topView.features.medical': {
    zh: '专业医学标准',
    en: 'Clinical-Grade Standards',
  },

  // Detection model
  'detection.model.loading': {
    zh: 'AI模型加载中，请稍候...',
    en: 'AI model loading, please wait...',
  },
  'detection.model.notLoaded': {
    zh: 'AI模型准备加载中',
    en: 'AI model initializing',
  },
  'detection.model.ready': {
    zh: 'AI模型已就绪',
    en: 'AI model ready',
  },
  'detection.model.loadingButton': {
    zh: '模型加载中...',
    en: 'Model loading...',
  },
  'detection.model.notLoadedMessage': {
    zh: 'AI模型准备加载中，请稍候',
    en: 'AI model is initializing, please wait a moment',
  },
  'detection.model.imageLoadFailed': {
    zh: '图片加载失败，请重新上传',
    en: 'Image loading failed, please re-upload',
  },
  'detection.model.loadingHint': {
    zh: '首次加载可能需要较长时间，请耐心等待',
    en: 'First-time loading may take longer, please be patient',
  },
  'detection.model.notLoadedHint': {
    zh: '请等待模型自动加载完成后再进行检测',
    en: 'Please wait for the model to load automatically before detection',
  },
  'detection.model.readyHint': {
    zh: '现在可以上传图片进行头型检测分析',
    en: 'You can now upload images for head shape detection analysis',
  },
  'detection.model.loadingTooltip': {
    zh: '模型正在加载中，请稍候...',
    en: 'Model is loading, please wait...',
  },
  'detection.model.notLoadedTooltip': {
    zh: 'AI模型准备加载中，请稍候',
    en: 'AI model is initializing, please wait',
  },
  'detection.model.loadFailed': {
    zh: '模型加载失败',
    en: 'Model Loading Failed',
  },
  'detection.model.loadFailedHint': {
    zh: '模型加载遇到问题，请尝试刷新页面。如问题持续存在，请联系技术支持',
    en: 'Model loading encountered an issue. Please try refreshing the page. If the problem persists, please contact technical support',
  },
  'detection.model.closeBanner': {
    zh: '关闭提示',
    en: 'Close banner',
  },
  'detection.model.detailedError': {
    zh: '详细错误信息',
    en: 'Detailed Error Information',
  },

  // Detection top view
  'detection.topView.title': {
    zh: '婴儿头型测量',
    en: 'Baby Head Shape Measurement',
  },
  'detection.topView.subtitle': {
    zh: '俯视图上传',
    en: 'Top View Upload',
  },
  'detection.topView.description': {
    zh: '上传宝宝头部俯视图，获得专业AI分析',
    en: "Upload your baby's top view photo for professional AI analysis",
  },
  'detection.pageSubtitle': {
    zh: '基于深度学习的头型评估算法，所有计算在浏览器本地完成，照片不会上传到任何服务器，确保您和宝宝的隐私安全',
    en: 'Powered by advanced AI technology, all analysis happens right in your browser. Your photos stay private and secure - nothing is ever uploaded to our servers.',
  },
  'detection.topView.features.deepLearning': {
    zh: '深度学习算法',
    en: 'Advanced AI Technology',
  },
  'detection.topView.features.deepLearningDesc': {
    zh: '先进AI技术，精准识别头型轮廓',
    en: 'Advanced AI technology for precise head shape recognition',
  },
  'detection.topView.features.privacy': {
    zh: '本地处理，隐私安全',
    en: 'Complete Privacy Protection',
  },
  'detection.topView.features.privacyDesc': {
    zh: '所有分析均在本地进行，数据不会离开您的设备',
    en: 'All analysis performed locally, your data never leaves your device',
  },

  'detection.topView.features.medicalDesc': {
    zh: '基于临床测量标准，提供可靠的分析结果',
    en: 'Based on clinical measurement standards, providing reliable results',
  },
  'detection.topView.tooltips.analyzing': {
    zh: 'AI正在分析图片，请稍候...',
    en: 'AI is analyzing the image, please wait...',
  },
  'detection.topView.tooltips.readyToAnalyze': {
    zh: '点击开始AI分析',
    en: 'Click to start AI analysis',
  },
  'detection.topView.tooltips.reupload': {
    zh: '重新上传图片',
    en: 'Re-upload image',
  },
  'detection.topView.shootingTips.title': {
    zh: '拍摄要点',
    en: 'Photo guidelines',
  },
  'detection.topView.shootingTips.tip1': {
    zh: '微微透出鼻尖',
    en: 'Nose tip should be barely visible',
  },
  'detection.topView.shootingTips.tip2': {
    zh: '光线充足，避免阴影',
    en: 'Good lighting, avoid shadows',
  },
  'detection.topView.shootingTips.tip3': {
    zh: '手机与头部平行',
    en: 'Keep phone level with head',
  },
  'detection.topView.shootingTips.tip4': {
    zh: '避免头发遮挡',
    en: 'Avoid hair covering',
  },
  'detection.topView.shootingTips.tip1Detail': {
    zh: '确保能看到一点鼻尖，但不要露出太多面部',
    en: "Ensure nose tip is barely visible, but don't show too much face",
  },
  'detection.topView.shootingTips.tip2Detail': {
    zh: '保持手机与宝宝头部在同一水平线上',
    en: "Keep phone level with baby's head",
  },
  'detection.topView.shootingTips.tip3Detail': {
    zh: '确保前额朝上，头部轮廓清晰可见',
    en: 'Ensure forehead points upward with clear head contour',
  },
  'detection.topView.shootingTips.tip4Detail': {
    zh: '如头发较多，可用水润湿贴在头上，或洗澡后拍摄',
    en: 'If hair is thick, wet it to stick to the head, or take photos after bathing',
  },
  'detection.topView.shootingTips.safety': {
    zh: '所有拍摄请确保宝宝安全、健康！',
    en: 'Ensure baby safety and health during all photography!',
  },
  'detection.topView.annotations.forehead': {
    zh: '前额',
    en: 'Forehead',
  },
  'detection.topView.annotations.noseVisible': {
    zh: '刚刚漏出鼻子',
    en: 'Just showing nose',
  },
  'detection.topView.annotations.occiput': {
    zh: '后枕',
    en: 'Occiput',
  },
  'detection.topView.upload.clickOrDrag': {
    zh: '点击或拖拽图片到此处',
    en: 'Click or drag image here',
  },
  'detection.topView.upload.supportFormat': {
    zh: '支持 JPG、PNG 格式，最大 10MB',
    en: 'Supports JPG, PNG formats, max 10MB',
  },
  'detection.topView.upload.rotation': {
    zh: '旋转调整',
    en: 'Rotation',
  },
  'detection.topView.upload.rotationTip': {
    zh: '💡 调整图片角度，确保前额朝上',
    en: '💡 Rotate image so forehead points upward',
  },
  'detection.topView.exampleImageAlt': {
    zh: '正确拍摄示例图片',
    en: 'Correct shooting example image',
  },
  'detection.topView.originalImageAlt': {
    zh: '原始上传图片',
    en: 'Original uploaded image',
  },
  'detection.topView.analysisResult': {
    zh: '分析结果',
    en: 'Analysis Results',
  },
  'detection.topView.analysisDescription': {
    zh: '基于识别的头型轮廓，计算头颅指数和不对称指数',
    en: 'Calculate CI and CVAI based on identified head contour',
  },
  'detection.topView.buttons.analyzing': {
    zh: '分析中...',
    en: 'Analyzing...',
  },
  'detection.topView.buttons.startAnalysis': {
    zh: '开始分析',
    en: 'Analyze Now',
  },
  'detection.topView.buttons.reupload': {
    zh: '重新上传',
    en: 'Upload New Photo',
  },
  'detection.topView.buttons.downloadResult': {
    zh: '下载结果',
    en: 'Download Result',
  },
  'detection.topView.analysis.startAnalysis': {
    zh: '开始分析',
    en: 'Analyze Now',
  },
  'detection.topView.analysis.reupload': {
    zh: '重新上传',
    en: 'Upload New Photo',
  },
  'detection.topView.analysis.downloadResult': {
    zh: '下载结果',
    en: 'Save Results',
  },
  'detection.topView.upload.modelLoading': {
    zh: '模型加载中...',
    en: 'Model loading...',
  },
  'detection.topView.analysis.title': {
    zh: '分析结果',
    en: 'Analysis Results',
  },
  'detection.topView.analysis.description': {
    zh: '根据识别的头型轮廓，计算 CI、CVAI',
    en: 'Calculate CI, CVAI based on identified head shape contour',
  },
  'detection.topView.analysis.waitingUpload': {
    zh: '等待图片上传',
    en: 'Waiting for image upload',
  },
  'detection.topView.analysis.waitingUploadDesc': {
    zh: '上传图片后开始AI智能分析',
    en: 'Start AI intelligent analysis after uploading image',
  },
  'detection.topView.analysis.readyToAnalyze': {
    zh: '图片已上传，准备分析',
    en: 'Image uploaded, ready to analyze',
  },
  'detection.topView.analysis.readyToAnalyzeDesc': {
    zh: '点击分析按钮开始AI智能分析',
    en: 'Click the analyze button to start AI intelligent analysis',
  },
  'detection.topView.analysis.analyzing': {
    zh: 'AI正在分析中',
    en: 'AI is analyzing',
  },
  'detection.topView.analysis.analyzingDesc': {
    zh: '深度学习算法正在处理您的图片...',
    en: 'Deep learning algorithm is processing your image...',
  },
  'detection.topView.analysis.completed': {
    zh: 'AI分析完成',
    en: 'AI analysis completed',
  },
  'detection.topView.analysis.completedDesc': {
    zh: '基于深度学习的头型识别',
    en: 'Based on deep learning head shape recognition',
  },
  'detection.topView.analysis.measurementAnnotations': {
    zh: '测量标注',
    en: 'Measurement Annotations',
  },
  'detection.topView.analysis.bpd': {
    zh: 'BPD (双顶径)',
    en: 'BPD (Biparietal Diameter)',
  },
  'detection.topView.analysis.ofd': {
    zh: 'OFD (枕额径)',
    en: 'OFD (Occipitofrontal Diameter)',
  },
  'detection.topView.analysis.diagonal': {
    zh: '对角线',
    en: 'Diagonal',
  },
  'detection.topView.analysis.detectionFailed': {
    zh: '检测失败',
    en: 'Detection Failed',
  },

  // Detection profile view
  'detection.profileView.title': {
    zh: '侧面轮廓对比',
    en: 'Profile Contour Comparison',
  },
  'detection.profileView.description': {
    zh: '上传宝宝左右侧面照片，与标准轮廓进行精确对比',
    en: 'Upload left and right profile photos of your baby for precise comparison with standard head contours',
  },
  'detection.profileView.pageDescription': {
    zh: '手动比对宝宝侧面轮廓与标准轮廓，作为CI、CVAI测量补充，帮助家长直观理解宝宝头型发育特征',
    en: 'Compare your baby\'s profile against standard contours to complement CI and CVAI measurements, giving parents clear insights into head shape development',
  },
  'detection.profileView.shootingTips.title': {
    zh: '拍摄要点',
    en: 'Photo guidelines',
  },
  'detection.profileView.shootingTips.tip1': {
    zh: '侧头侧身',
    en: 'Side head and body',
  },
  'detection.profileView.shootingTips.tip1Desc': {
    zh: '确保宝宝侧面完全朝向镜头',
    en: "Ensure baby's profile completely faces the camera",
  },
  'detection.profileView.shootingTips.tip2': {
    zh: '避免头发遮挡',
    en: 'Avoid hair covering',
  },
  'detection.profileView.shootingTips.tip2Desc': {
    zh: '如头发较多，可用水润湿贴在头上，或洗澡后拍摄',
    en: 'If hair is thick, wet it to stick to the head, or take photos after bathing',
  },
  'detection.profileView.shootingTips.tip3': {
    zh: '保持自然姿态',
    en: 'Maintain natural posture',
  },
  'detection.profileView.shootingTips.tip3Desc': {
    zh: '让宝宝保持舒适放松的状态，避免强迫摆姿势',
    en: 'Keep baby comfortable and relaxed, avoid forcing poses',
  },
  'detection.profileView.shootingTips.safety': {
    zh: '所有拍摄请确保宝宝安全、健康！',
    en: 'Ensure baby safety and health during all photography!',
  },
  'detection.profileView.shootingTips': {
    zh: '拍摄要点',
    en: 'Shooting Tips',
  },
  'detection.profileView.leftProfile': {
    zh: '左侧轮廓',
    en: 'Left Profile',
  },
  'detection.profileView.rightProfile': {
    zh: '右侧轮廓',
    en: 'Right Profile',
  },
  'detection.profileView.showTemplate': {
    zh: '显示模板',
    en: 'Show Template',
  },
  'detection.profileView.hideTemplate': {
    zh: '隐藏模板',
    en: 'Hide Template',
  },
  'detection.profileView.resetImage': {
    zh: '重置图片',
    en: 'Reset Image',
  },
  'detection.profileView.reuploadImage': {
    zh: '重新上传',
    en: 'Re-upload',
  },
  'detection.profileView.scale': {
    zh: '缩放',
    en: 'Scale',
  },
  'detection.profileView.rotation': {
    zh: '旋转',
    en: 'Rotation',
  },

  'detection.profileView.uploadPrompt': {
    zh: '点击或拖拽图片到此处',
    en: 'Click or drag image here',
  },
  'detection.profileView.uploadHint': {
    zh: '支持 JPG、PNG 格式，最大 10MB',
    en: 'Support JPG, PNG format, max 10MB',
  },
  'detection.profileView.instructions.title': {
    zh: '操作说明',
    en: 'Instructions',
  },
  'detection.profileView.instructions.clickToSelect': {
    zh: '点击图片选中后可进行操作',
    en: 'Click image to select for operations',
  },
  'detection.profileView.instructions.dragToMove': {
    zh: '拖拽图片可移动位置',
    en: 'Drag image to move position',
  },
  'detection.profileView.instructions.dragToResize': {
    zh: '拖拽角落控制点可缩放图片',
    en: 'Drag corner control points to resize image',
  },
  'detection.profileView.instructions.dragToRotate': {
    zh: '拖拽旋转控制点可旋转图片',
    en: 'Drag rotation control point to rotate image',
  },
  'detection.profileView.instructions.clickToDeselect': {
    zh: '点击空白区域取消选中',
    en: 'Click empty area to deselect',
  },

  // Analysis results
  'detection.analysis.ci.title': {
    zh: '头颅宽长比 (CI)',
    en: 'Cephalic Index (CI)',
  },
  'detection.analysis.ci.longHead': {
    zh: '长头',
    en: 'Dolichocephaly',
  },
  'detection.analysis.ci.flatHead': {
    zh: '扁头',
    en: 'Brachycephaly',
  },
  'detection.analysis.cvai.title': {
    zh: '颅穹不对称指数 (CVAI)',
    en: 'Cranial Vault Asymmetry Index (CVAI)',
  },
  'detection.analysis.cvai.diagonal1': {
    zh: '对角线1',
    en: 'Diagonal 1',
  },
  'detection.analysis.cvai.diagonal2': {
    zh: '对角线2',
    en: 'Diagonal 2',
  },

  // Detection profile view - additional keys
  'detection.profileView.leftTemplateAlt': {
    zh: '左侧轮廓模板',
    en: 'Left Profile Template',
  },
  'detection.profileView.rightTemplateAlt': {
    zh: '右侧轮廓模板',
    en: 'Right Profile Template',
  },
  'detection.profileView.clickOrDrag': {
    zh: '点击或拖拽图片到此处',
    en: 'Click or drag image here',
  },

  // Detection model manager
  'detection.modelManager.title': {
    zh: '模型管理 (调试模式)',
    en: 'Model Management (Debug Mode)',
  },
  'detection.modelManager.openDebugMode': {
    zh: '打开调试模式',
    en: 'Open Debug Mode',
  },
  'detection.modelManager.closeDebugMode': {
    zh: '关闭调试模式',
    en: 'Close Debug Mode',
  },
  'detection.modelManager.debugModeTitle': {
    zh: '调试模式 (快捷键: Ctrl+Shift+D)',
    en: 'Debug Mode (Shortcut: Ctrl+Shift+D)',
  },
  'detection.modelManager.loadModel': {
    zh: '加载模型',
    en: 'Load Model',
  },
  'detection.modelManager.modelPathPlaceholder': {
    zh: 'ONNX模型文件路径',
    en: 'ONNX model file path',
  },
  'detection.modelManager.confidenceThreshold': {
    zh: '置信度阈值',
    en: 'Confidence Threshold',
  },
  'detection.modelManager.error': {
    zh: '错误',
    en: 'Error',
  },
  'detection.modelManager.status.loading': {
    zh: '加载中...',
    en: 'Loading...',
  },
  'detection.modelManager.status.loaded': {
    zh: '模型已加载',
    en: 'Model Loaded',
  },
  'detection.modelManager.status.notLoaded': {
    zh: '模型准备加载中',
    en: 'Initializing',
  },
  'detection.modelManager.status.loadFailed': {
    zh: '加载失败',
    en: 'Load Failed',
  },
  'detection.modelManager.errors.enterModelPath': {
    zh: '请输入模型路径',
    en: 'Please enter model path',
  },
  'detection.modelManager.errors.unknownError': {
    zh: '未知错误',
    en: 'Unknown error',
  },
  'detection.modelManager.tips.defaultModel': {
    zh: '💡 提示：默认模型 model_weights_best.onnx 会自动加载，您也可以指定其他模型路径',
    en: '💡 Tip: Default model model_weights_best.onnx will load automatically, or you can specify another model path',
  },
  'detection.modelManager.tips.confidenceThreshold': {
    zh: '🎯 置信度阈值：只保留高于此阈值的检测结果，建议值 0.7-0.8',
    en: '🎯 Confidence Threshold: Only keep detection results above this threshold, recommended value 0.7-0.8',
  },

  // Additional error messages
  'detection.errors.noHeadDetected': {
    zh: '未检测到头型，请确保图像中包含清晰的头部轮廓',
    en: 'No head shape detected, please ensure the image contains a clear head contour',
  },

  // Additional classification labels
  'detection.classification.normal': {
    zh: '正常',
    en: 'Normal',
  },
  'detection.classification.brachycephaly': {
    zh: '短头型 (Brachycephaly)',
    en: 'Brachycephaly',
  },
  'detection.classification.dolichocephaly': {
    zh: '长头型 (Dolichocephaly)',
    en: 'Dolichocephaly',
  },
  'detection.classification.plagiocephaly': {
    zh: '偏头型 (Plagiocephaly)',
    en: 'Plagiocephaly',
  },

  // Error messages
  'detection.errors.modelNotLoaded': {
    zh: 'AI模型准备加载中，请稍候',
    en: 'AI model is still initializing, please wait',
  },
  'detection.errors.analysisFailed': {
    zh: '分析失败',
    en: 'Analysis failed',
  },
  'detection.errors.unknownError': {
    zh: '未知错误',
    en: 'Unknown error',
  },
  'detection.errors.imageLoadFailed': {
    zh: '图片加载失败，请重新上传',
    en: 'Image loading failed, please re-upload',
  },
  'detection.errors.noImageUploaded': {
    zh: '请先上传图片',
    en: 'Please upload an image first',
  },
  'detection.errors.modelStillLoading': {
    zh: '模型正在加载中，请稍候再试',
    en: 'Model is still loading, please try again later',
  },

  // Classification labels
  'detection.classification.unknown': {
    zh: '未知',
    en: 'Unknown',
  },
  'detection.classification.ci.severeLong': {
    zh: '重度',
    en: 'Severe',
  },
  'detection.classification.ci.moderateLong': {
    zh: '中度',
    en: 'Moderate',
  },
  'detection.classification.ci.mildLong': {
    zh: '轻度',
    en: 'Mild',
  },
  'detection.classification.ci.normal': {
    zh: '正常',
    en: 'Normal',
  },
  'detection.classification.ci.mildFlat': {
    zh: '轻度',
    en: 'Mild',
  },
  'detection.classification.ci.moderateFlat': {
    zh: '中度',
    en: 'Moderate',
  },
  'detection.classification.ci.severeFlat': {
    zh: '重度',
    en: 'Severe',
  },
  'detection.classification.cvai.normal': {
    zh: '正常',
    en: 'Normal',
  },
  'detection.classification.cvai.mildAsymmetric': {
    zh: '轻度斜头',
    en: 'Mild Plagiocephaly',
  },
  'detection.classification.cvai.moderateAsymmetric': {
    zh: '中度斜头',
    en: 'Moderate Plagiocephaly',
  },
  'detection.classification.cvai.severeAsymmetric': {
    zh: '重度斜头',
    en: 'Severe Plagiocephaly',
  },

  // FAQ Page
  'faq.title': {
    zh: '常见问题',
    en: 'Frequently Asked Questions',
  },
  'faq.subtitle': {
    zh: '关于婴儿头型发育的常见疑问解答，帮助新手父母科学护理',
    en: 'Common questions about infant head shape development, helping new parents with scientific care',
  },
  'faq.commonQuestions': {
    zh: '常见问题解答',
    en: 'Common Questions & Answers',
  },

  // FAQ Categories
  'faq.category.basic_knowledge': {
    zh: '基础知识',
    en: 'Basic Knowledge',
  },
  'faq.category.daily_care': {
    zh: '日常护理',
    en: 'Daily Care',
  },
  'faq.category.treatment_timeline': {
    zh: '治疗与时间',
    en: 'Treatment & Timeline',
  },

  // FAQ Questions and Answers
  'faq.normalDevelopment.question': {
    zh: '什么是正常的婴儿头型发育？',
    en: 'What is normal infant head shape development?',
  },
  'faq.normalDevelopment.answer': {
    zh: '正常的婴儿头型发育是一个渐进的过程。新生儿的头骨由多块骨板组成，通过颅缝连接，这使得头部能够随着大脑的快速发育而增长。\n\n在出生后的前几个月，由于头骨的可塑性，宝宝的头型可能会因为睡姿、喂养姿势等因素而发生轻微变化。这些变化大多是暂时的，随着宝宝活动能力的增强和头骨的逐渐硬化，头型会趋于稳定。\n\n正常情况下，宝宝的头型应该是相对圆润和对称的，前后、左右基本平衡。',
    en: "Normal infant head shape development is a gradual process. A newborn's skull consists of multiple bone plates connected by cranial sutures, allowing the head to grow with rapid brain development.\n\nIn the first few months after birth, due to skull plasticity, a baby's head shape may change slightly due to factors like sleeping position and feeding posture. These changes are mostly temporary and will stabilize as the baby becomes more active and the skull gradually hardens.\n\nNormally, a baby's head shape should be relatively round and symmetrical, with basic balance front-to-back and left-to-right.",
  },

  'faq.whenToWorry.question': {
    zh: '什么时候需要担心宝宝的头型？',
    en: "When should I be concerned about my baby's head shape?",
  },
  'faq.whenToWorry.answer': {
    zh: '虽然大多数头型变化都是正常的，但以下情况需要引起注意：\n\n• 头型严重不对称，一侧明显扁平或突出\n• 头围增长过快或过慢\n• 囟门过早闭合或异常凸起\n• 伴有发育迟缓、喂养困难等其他症状\n• 6个月后头型仍无改善趋势\n\n如果出现这些情况，建议及时咨询儿科医生或头颅外科专家，进行专业评估。早期发现和干预可以获得更好的效果。',
    en: "While most head shape changes are normal, the following situations require attention:\n\n• Severe head asymmetry with one side noticeably flat or protruding\n• Head circumference growing too fast or too slow\n• Fontanelles closing too early or abnormally bulging\n• Accompanied by developmental delays, feeding difficulties, or other symptoms\n• No improvement trend in head shape after 6 months\n\nIf these situations occur, it's recommended to consult a pediatrician or cranial specialist promptly for professional evaluation. Early detection and intervention can achieve better results.",
  },

  'faq.tummyTime.question': {
    zh: '俯卧时间对头型发育有什么帮助？',
    en: 'How does tummy time help with head shape development?',
  },
  'faq.tummyTime.answer': {
    zh: '俯卧时间对婴儿头型发育非常重要，具有多重益处：\n\n• 减轻后脑勺压力：让宝宝脱离仰卧姿势，减少对后脑勺的持续压迫\n• 促进颈部肌肉发育：增强颈部和背部肌肉力量\n• 鼓励头部活动：促使宝宝主动转动头部，锻炼颈部灵活性\n• 预防扁头综合征：有效预防位置性扁头的发生\n\n建议从新生儿期开始，每天进行多次短时间的俯卧练习。开始时每次2-3分钟，随着宝宝适应逐渐增加时间。务必在宝宝清醒且有成人监督的情况下进行。',
    en: "Tummy time is very important for infant head shape development and has multiple benefits:\n\n• Relieves pressure on the back of the head: Gets baby off their back, reducing continuous pressure on the occiput\n• Promotes neck muscle development: Strengthens neck and back muscles\n• Encourages head movement: Prompts baby to actively turn their head, exercising neck flexibility\n• Prevents flat head syndrome: Effectively prevents positional brachycephaly\n\nIt's recommended to start from the newborn period with multiple short tummy time sessions daily. Begin with 2-3 minutes each time, gradually increasing as baby adapts. Always ensure baby is awake and under adult supervision.",
  },

  'faq.improvementTime.question': {
    zh: '头型改善需要多长时间？',
    en: 'How long does it take for head shape to improve?',
  },
  'faq.improvementTime.answer': {
    zh: '头型改善的时间因个体差异而不同，一般遵循以下规律：\n\n• 轻度头型问题：通过体位调整，通常在2-4个月内看到明显改善\n• 中度头型问题：可能需要4-8个月的持续护理和观察\n• 重度头型问题：可能需要专业干预，改善时间较长\n\n影响改善速度的因素包括：\n• 宝宝的年龄（越小改善越快）\n• 头型问题的严重程度\n• 护理措施的执行情况\n• 个体的生长发育速度\n\n重要的是保持耐心和坚持，大多数头型问题都会随着时间逐渐改善。',
    en: "Head shape improvement time varies by individual, generally following these patterns:\n\n• Mild head shape issues: Usually see significant improvement within 2-4 months through position adjustments\n• Moderate head shape issues: May require 4-8 months of continuous care and observation\n• Severe head shape issues: May require professional intervention with longer improvement times\n\nFactors affecting improvement speed include:\n• Baby's age (younger babies improve faster)\n• Severity of head shape issues\n• Implementation of care measures\n• Individual growth and development rate\n\nIt's important to remain patient and persistent, as most head shape issues gradually improve over time.",
  },

  'faq.prevention.question': {
    zh: '如何预防婴儿头型问题？',
    en: 'How can infant head shape problems be prevented?',
  },
  'faq.prevention.answer': {
    zh: '预防婴儿头型问题的关键在于早期建立良好的护理习惯：\n\n• 多样化体位：避免宝宝长时间保持同一姿势\n• 规律俯卧时间：每天进行适当的俯卧练习\n• 交替喂养姿势：左右交替抱宝宝喂奶\n• 减少器械依赖：限制在汽车座椅、摇椅等设备中的时间\n• 鼓励活动：随着宝宝成长，鼓励更多的自主活动\n• 定期检查：关注宝宝头型变化，及时调整护理方式\n\n预防比治疗更重要，从新生儿期开始就要注意这些细节。',
    en: 'The key to preventing infant head shape problems is establishing good care habits early:\n\n• Diversified positioning: Avoid baby staying in the same position for long periods\n• Regular tummy time: Conduct appropriate tummy time exercises daily\n• Alternate feeding positions: Alternate left and right when holding baby for feeding\n• Reduce equipment dependence: Limit time in car seats, bouncers, and other devices\n• Encourage movement: As baby grows, encourage more independent movement\n• Regular monitoring: Pay attention to head shape changes and adjust care methods promptly\n\nPrevention is more important than treatment, so attention to these details should start from the newborn period.',
  },

  'faq.doctorConsultation.question': {
    zh: '什么时候应该咨询医生？',
    en: 'When should I consult a doctor?',
  },
  'faq.doctorConsultation.answer': {
    zh: '以下情况建议及时咨询医生：\n\n• 头型严重不对称或持续恶化\n• 囟门异常（过早闭合、异常凸起或凹陷）\n• 头围增长异常（过快或过慢）\n• 伴有其他发育问题或神经症状\n• 6个月后头型仍无改善\n• 家长对头型发育有严重担忧\n\n建议咨询的医生类型：\n• 儿科医生：进行初步评估和常规检查\n• 神经外科医生：处理复杂的颅骨问题\n• 整形外科医生：提供头型矫正方案\n\n当任何疑惑、不安，咨询医生是最快捷、安全的解决方案。',
    en: 'The following situations warrant prompt medical consultation:\n\n• Severe head asymmetry or continuous worsening\n• Abnormal fontanelles (premature closure, abnormal bulging or depression)\n• Abnormal head circumference growth (too fast or too slow)\n• Accompanied by other developmental issues or neurological symptoms\n• No improvement in head shape after 6 months\n• Parents have serious concerns about head shape development\n\nRecommended types of doctors to consult:\n• Pediatrician: For initial assessment and routine examinations\n• Neurosurgeon: For complex cranial issues\n• Plastic surgeon: For head shape correction options\n\nEarly consultation helps identify problems promptly and develop appropriate treatment plans.',
  },

  'faq.brainDevelopment.question': {
    zh: '头型问题是否影响大脑发育？',
    en: 'Do head shape problems affect brain development?',
  },
  'faq.brainDevelopment.answer': {
    zh: '这是家长们最关心的问题之一。根据目前的医学研究：\n\n• 轻度到中度的体位性头型异常（如扁头、斜头）通常不会影响大脑发育和智力\n• 这类头型问题主要是外观上的变化，不会损害大脑容积或神经功能\n• 现有研究显示，头型异常与智力问题之间可能存在关联，但无法证明因果关系\n• 大多数研究认为，在排除疾病因素后，单纯的头型异常不会导致认知神经发育问题\n\n需要注意的是：\n• 病理性头型异常（如颅缝早闭）可能影响大脑发育，需要及时医疗干预\n• 如果头型异常伴有其他发育迟缓症状，应及时就医评估\n\n总的来说，家长不必过度担心轻度头型问题对智力的影响。',
    en: 'This is one of the most concerning questions for parents. According to current medical research:\n\n• Mild to moderate positional head shape abnormalities (such as flat head, tilted head) usually do not affect brain development and intelligence\n• These head shape problems are mainly cosmetic changes and do not damage brain volume or neurological function\n• Existing studies show there may be associations between head shape abnormalities and intelligence issues, but cannot prove causation\n• Most research suggests that after excluding disease factors, simple head shape abnormalities do not cause cognitive neurological developmental problems\n\nImportant considerations:\n• Pathological head shape abnormalities (such as craniosynostosis) may affect brain development and require prompt medical intervention\n• If head shape abnormalities are accompanied by other developmental delay symptoms, seek medical evaluation promptly\n\nOverall, parents should not be overly concerned about the impact of mild head shape problems on intelligence.',
  },

  'faq.pillowEffect.question': {
    zh: '枕头能改善头型吗？',
    en: 'Can pillows improve head shape?',
  },
  'faq.pillowEffect.answer': {
    zh: '新生宝宝是不需要枕头的。\n\n新生宝宝的脊椎骨，尤其是靠近颈椎的部位是直的，宝宝平躺时后背和后脑勺在同一个平面。\n\n给宝宝睡枕头会使头部高过身体，颈部形成弯曲，下巴更靠近胸口，这样会限制呼吸甚至造成呼吸道紧闭，还会影响宝宝骨骼、脊椎的生长发育。\n\n美国儿科学会建议一岁以上才给宝宝用枕头，如果可以的话延迟到18个月更好。\n\n市面上打着"让宝宝头型更漂亮"旗号的产品缺乏科学依据，具有"定型"、"防偏头"功能的婴儿枕头并不能让宝宝拥有更好的头型，这些产品反而会束缚宝宝，像"紧箍咒"一样限制宝宝的睡姿。任何声称能"改善头型"的婴儿枕头都存在安全风险。',
    en: 'Newborn babies do not need pillows.\n\nNewborn babies\' spines, especially near the cervical vertebrae, are straight, and when lying flat, the back and back of the head are on the same plane.\n\nUsing pillows makes the baby\'s head higher than the body, creating neck curvature with chin closer to chest, which restricts breathing and potentially causes airway closure, and also affects baby\'s bone and spinal development.\n\nThe American Academy of Pediatrics recommends using pillows only after 1 year of age, preferably delayed to 18 months if possible.\n\nProducts marketed as "making baby\'s head shape more beautiful" lack scientific basis. Baby pillows with "shaping" or "anti-flat head" functions cannot give babies better head shapes. These products actually restrain babies, limiting sleep positions like a "tight band". Any baby pillows claiming to "improve head shape" pose safety risks.',
  },
  // Additional FAQ items for the new design
  'faq.sleepPosition.question': {
    zh: '什么样的睡姿有助于改善宝宝的头型？',
    en: "What sleeping positions help improve baby's head shape?",
  },
  'faq.sleepPosition.answer': {
    zh: '为了改善头型，建议经常变换宝宝的睡姿。虽然仰卧是最安全的睡姿，但可以在宝宝清醒时让他们侧卧或俯卧。睡觉时可以轮流让宝宝的头朝向不同方向，避免总是压迫同一个部位。使用适当的枕头和床垫也很重要。',
    en: "To improve head shape, it is recommended to frequently change your baby's sleeping position. While back sleeping is the safest, you can have them lie on their side or stomach when awake. During sleep, alternate the direction your baby's head faces to avoid always putting pressure on the same area. Using appropriate pillows and mattresses is also important.",
  },

  'faq.helmetTreatment.question': {
    zh: '什么时候需要考虑头盔治疗？',
    en: 'When should helmet treatment be considered?',
  },
  'faq.helmetTreatment.answer': {
    zh: '头盔治疗通常在以下情况下考虑：宝宝4-6个月大时头型仍然严重不对称、保守治疗（如改变睡姿、增加俯卧时间）效果不佳、医生评估认为有必要进行矫正。头盔治疗的最佳时机通常是4-12个月，因为这时宝宝的头骨还比较柔软，容易塑形。',
    en: "Helmet treatment is usually considered in the following situations: when the baby's head shape remains severely asymmetrical at 4-6 months old, when conservative treatments (such as changing sleep positions, increasing tummy time) are ineffective, and when a doctor evaluates that correction is necessary. The optimal timing for helmet treatment is usually 4-12 months, as the baby's skull is still relatively soft and easy to reshape.",
  },

  'faq.medicalDisclaimer': {
    zh: '本页面提供的信息仅供教育和参考目的，不能替代专业医疗建议、诊断或治疗。如果您对宝宝的头型发育有任何担忧，请及时咨询合格的医疗专业人员。',
    en: "The information provided on this page is for educational and reference purposes only and cannot replace professional medical advice, diagnosis, or treatment. If you have any concerns about your baby's head shape development, please consult qualified medical professionals promptly.",
  },

  'faq.references.title': {
    zh: '参考来源',
    en: 'References',
  },
  // Reference sources data
  'faq.references.source1.text': {
    zh: '美国儿科学会 (AAP) - 体位性头型异常',
    en: 'American Academy of Pediatrics (AAP) - Positional Skull Deformities',
  },
  'faq.references.source1.url': {
    zh: 'https://www.healthychildren.org/English/health-issues/conditions/Cleft-Craniofacial/Pages/Positional-Skull-Deformities-and-Torticollis.aspx',
    en: 'https://www.healthychildren.org/English/health-issues/conditions/Cleft-Craniofacial/Pages/Positional-Skull-Deformities-and-Torticollis.aspx',
  },
  'faq.references.source2.text': {
    zh: 'PMC - 体位性斜头畸形的诊断和治疗',
    en: 'PMC - Diagnosis and Treatment of Positional Plagiocephaly',
  },
  'faq.references.source2.url': {
    zh: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7206465/',
    en: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7206465/',
  },
  'faq.references.source3.text': {
    zh: '约翰霍普金斯医学院 - 变形性斜头畸形',
    en: 'Johns Hopkins Medicine - Deformational Plagiocephaly',
  },
  'faq.references.source3.url': {
    zh: 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/deformational-plagiocephaly',
    en: 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/deformational-plagiocephaly',
  },
  'faq.references.source4.text': {
    zh: '约翰霍普金斯医学院 - 婴儿头盔治疗',
    en: 'Johns Hopkins Medicine - Helmet Therapy for Your Baby',
  },
  'faq.references.source4.url': {
    zh: 'https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/helmet-therapy-for-your-baby',
    en: 'https://www.hopkinsmedicine.org/health/treatment-tests-and-therapies/helmet-therapy-for-your-baby',
  },
  'faq.references.source5.text': {
    zh: '梅奥诊所 - 婴儿头型不对称治疗',
    en: 'Mayo Clinic - Treating Infants with Head Shape Asymmetry',
  },
  'faq.references.source5.url': {
    zh: 'https://newsnetwork.mayoclinic.org/discussion/mayo-clinic-expert-available-to-talk-about-treating-infants-with-head-shape-asymmetry/',
    en: 'https://newsnetwork.mayoclinic.org/discussion/mayo-clinic-expert-available-to-talk-about-treating-infants-with-head-shape-asymmetry/',
  },
  'faq.references.source6.text': {
    zh: 'PMC - 体位性斜头畸形和短头畸形儿童的头型发育',
    en: 'PMC - Head Shape Development in Children with Positional Plagiocephaly and Brachycephaly',
  },
  'faq.references.source6.url': {
    zh: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5832631/',
    en: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5832631/',
  },
  'faq.references.source7.text': {
    zh: 'Columbia Asia - 枕头如何危害婴儿',
    en: 'Columbia Asia - How Pillows Endanger Babies',
  },
  'faq.references.source7.url': {
    zh: 'https://www.columbiaasia.com/malaysia/health-articles/how-pillows-endanger-babies/',
    en: 'https://www.columbiaasia.com/malaysia/health-articles/how-pillows-endanger-babies/',
  },

  // FAQ UI Text
  'faq.searchPlaceholder': {
    zh: '搜索问题...',
    en: 'Search questions...',
  },
  'faq.allQuestions': {
    zh: '全部问题',
    en: 'All Questions',
  },
  'faq.searchResults.prefix': {
    zh: '找到',
    en: 'Found',
  },
  'faq.searchResults.suffix': {
    zh: '个相关问题',
    en: 'related questions',
  },
  'faq.noResults.title': {
    zh: '未找到相关问题',
    en: 'No related questions found',
  },
  'faq.noResults.description': {
    zh: '请尝试其他关键词或选择不同的分类',
    en: 'Please try other keywords or select a different category',
  },
  'faq.medicalDisclaimerTitle': {
    zh: '医疗免责声明',
    en: 'Medical Disclaimer',
  },
}

// Import dev tools in development to enable automatic monitoring
if (process.env.NODE_ENV === 'development') {
  import('./i18n-dev-tools')
}
