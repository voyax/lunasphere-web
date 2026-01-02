/**
 * SchematicHeadGuide - SVG 蓝图风格引导图
 * 来自 design2 的极简引导图样式
 */
const SchematicHeadGuide = () => (
    <svg viewBox="0 0 400 500" className="w-full h-full pointer-events-none absolute inset-0 opacity-80">
        <defs>
            <linearGradient id="guideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdba74" stopOpacity="0.8" /> {/* orange-300 */}
                <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.8" /> {/* rose-300 */}
            </linearGradient>
        </defs>

        {/* 中轴参考线 */}
        <line x1="200" y1="40" x2="200" y2="460" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="6 4" />

        {/* 头型轮廓 - 虚线圈 */}
        <g transform="translate(200, 250)">
            {/* 外轮廓 */}
            <ellipse cx="0" cy="0" rx="120" ry="150" fill="none" stroke="url(#guideGradient)" strokeWidth="1.5" strokeDasharray="8 8" strokeLinecap="round" />

            {/* 细微的内圈纹理，增加层次感 */}
            <ellipse cx="0" cy="0" rx="100" ry="130" fill="none" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        </g>

        {/* 鼻尖指示器 - 位于顶部 */}
        <g transform="translate(200, 100)">
            {/* 一个小小的弧线代表鼻子位置 */}
            <path d="M-12,5 Q0,-5 12,5" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="0" r="3" fill="#fb923c" />
        </g>

        {/* 耳朵示意 (极简线条) */}
        <path d="M75,230 Q60,250 75,270" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
        <path d="M325,230 Q340,250 325,270" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />

        {/* 标注引线系统 */}

        {/* 1. 前额/鼻尖引线 */}
        <path d="M200,90 L200,60 L240,60" fill="none" stroke="#fb923c" strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="90" r="2" fill="#fb923c" opacity="0.6" />

        {/* 2. 后枕引线 */}
        <path d="M200,400 L200,430 L160,430" fill="none" stroke="#fca5a5" strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="400" r="2" fill="#fca5a5" opacity="0.6" />
    </svg>
)

export default SchematicHeadGuide
