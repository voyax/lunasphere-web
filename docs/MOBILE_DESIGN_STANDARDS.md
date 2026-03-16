# Domi 移动端设计标准

> 参考微信小程序设计规范、WeDesign 设计系统制定

---

## 🎯 设计原则

### 微信设计三原则

| 原则 | 说明 | 实践 |
|------|------|------|
| **便捷** | 减少用户输入和操作步骤 | 使用选择器替代输入框，默认值填充 |
| **优雅** | 避免误操作，提供清晰反馈 | 触摸区域≥44px，操作有明确反馈 |
| **一致** | 保持页面风格统一 | 统一的间距、字号、圆角系统 |

---

## 📐 尺寸规范

### 触摸目标 (重要)

| 元素 | 最小尺寸 | 推荐尺寸 | Tailwind |
|-----|---------|---------|----------|
| 按钮/图标 | **44×44px** | 48×48px | `min-h-[44px] min-w-[44px]` |
| 列表项 | 44px 高 | 48-56px 高 | `min-h-[44px]` |
| 输入框 | 36px 高 | 44px 高 | `h-11` |

> ⚠️ 微信规范：所有可点击元素必须 ≥ 44px，这是最重要的规范

### 导航栏

| 元素 | 尺寸 | Tailwind | 说明 |
|-----|------|----------|------|
| 顶部导航栏高度 | **44px** | `h-11` | 微信标准高度 |
| 底部导航栏高度 | 50-56px | `h-14` | 含图标+文字 |
| 状态栏高度 | 20-47px | - | 系统控制 |
| 导航栏图标 | 24×24px | `w-6 h-6` | 标准图标尺寸 |

### 间距系统 (8px 基准)

| 层级 | 间距 | 用途 | Tailwind |
|-----|------|------|----------|
| xs | 4px | 紧密元素间 | `gap-1` / `p-1` |
| sm | 8px | 相关元素间 | `gap-2` / `p-2` |
| md | 12px | 卡片内元素 | `gap-3` / `p-3` |
| lg | 16px | 卡片内边距 | `gap-4` / `p-4` |
| xl | 24px | 区块间距 | `gap-6` / `p-6` |
| 2xl | 32px | 页面区块间 | `gap-8` / `p-8` |

### 页面边距

| 场景 | 移动端 | 桌面端 | Tailwind |
|-----|--------|--------|----------|
| 页面水平边距 | 16px | 24px | `px-4 md:px-6` |
| 列表项水平边距 | 16px | 16px | `px-4` |
| 卡片内边距 | 12-16px | 16-24px | `p-3 md:p-4` |

---

## 🔤 字体规范

### 字号系统

| 层级 | 字号 | 行高 | 用途 | Tailwind |
|-----|------|------|------|----------|
| 特大标题 | 20px | 28px | 页面主标题 | `text-xl leading-7` |
| 大标题 | 17px | 24px | 区块标题 | `text-[17px] leading-6` |
| 标准正文 | 17px | 24px | 主要内容 | `text-[17px] leading-6` |
| 次要正文 | 14px | 20px | 辅助说明 | `text-sm leading-5` |
| 辅助文字 | 12px | 16px | 时间、标签 | `text-xs leading-4` |
| 极小文字 | 10px | 14px | 版权、备注 | `text-[10px] leading-[14px]` |

> 微信规范：正文建议使用 17px，这是 iOS 标准正文字号

### 字重

| 用途 | 字重 | Tailwind |
|-----|------|----------|
| 标题 | 500-600 | `font-medium` / `font-semibold` |
| 正文 | 400 | `font-normal` |
| 强调 | 500 | `font-medium` |

---

## 🎨 颜色规范

### 品牌色 (Domi)

```css
/* 主色 - 暖橙 */
--primary: #f97316;        /* orange-500 */
--primary-light: #fed7aa;  /* orange-200 */
--primary-dark: #ea580c;   /* orange-600 */

/* 强调色 - 玫红 */
--accent: #f43f5e;         /* rose-500 */
```

### 中性色 (参考微信)

| 用途 | 浅色模式 | 深色模式 | Tailwind |
|-----|---------|---------|----------|
| 主文字 | #1f2937 | #f3f4f6 | `text-gray-800 dark:text-gray-100` |
| 次要文字 | #6b7280 | #9ca3af | `text-gray-500 dark:text-gray-400` |
| 辅助文字 | #9ca3af | #6b7280 | `text-gray-400 dark:text-gray-500` |
| 分隔线 | #f3f4f6 | #374151 | `border-gray-100 dark:border-gray-700` |
| 背景色 | #f9fafb | #111827 | `bg-gray-50 dark:bg-gray-900` |

### 背景透明度

| 用途 | 透明度 | Tailwind |
|-----|--------|----------|
| 导航栏 | 60% | `bg-white/60 dark:bg-gray-900/60` |
| 卡片 | 40-60% | `bg-white/50 dark:bg-gray-800/50` |
| 蒙层 | 50% | `bg-black/50` |

---

## ⬜ 圆角规范

### 微信风格圆角 (偏小)

| 元素 | 圆角 | Tailwind | 说明 |
|-----|------|----------|------|
| 大卡片 | 12px | `rounded-xl` | 页面级容器 |
| 普通卡片 | 8px | `rounded-lg` | 列表、表单 |
| 按钮 | 4-8px | `rounded` / `rounded-lg` | 根据按钮大小 |
| 输入框 | 4px | `rounded` | 保持简洁 |
| 小标签 | 4px | `rounded` | 标签、徽章 |
| 头像 | 4px / 圆形 | `rounded` / `rounded-full` | 方形或圆形 |

> 注意：微信风格圆角普遍较小 (4-12px)，避免使用过大圆角

---

## 📦 组件规范

### 列表项 (微信风格)

```tsx
<div className="bg-white dark:bg-gray-800">
  {items.map((item, i) => (
    <div 
      key={i}
      className={`
        flex items-center
        px-4 py-3
        min-h-[44px]
        active:bg-gray-100 dark:active:bg-gray-700
        ${i < items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}
      `}
    >
      {/* 左侧图标 */}
      <div className="w-6 h-6 mr-3 flex-shrink-0">
        <Icon className="w-6 h-6 text-gray-400" />
      </div>
      
      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <p className="text-[17px] text-gray-800 dark:text-gray-100">{item.title}</p>
        {item.desc && (
          <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
        )}
      </div>
      
      {/* 右侧箭头 */}
      <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
    </div>
  ))}
</div>
```

### 卡片 (Domi 风格)

```tsx
<div className="
  bg-white/50 dark:bg-gray-800/50
  backdrop-blur-sm
  rounded-xl
  p-4
  border border-white/60 dark:border-gray-700/50
">
  {/* 卡片内容 */}
</div>
```

### 按钮

| 类型 | 高度 | 圆角 | Tailwind |
|-----|------|------|----------|
| 主要按钮 | 44px | 8px | `h-11 rounded-lg bg-orange-500 text-white` |
| 次要按钮 | 44px | 8px | `h-11 rounded-lg border border-gray-300` |
| 小按钮 | 32px | 4px | `h-8 rounded px-3 text-sm` |
| 文字按钮 | auto | 0 | `text-orange-500` |

---

## 🖱️ 交互反馈

### 点击态

```css
/* 列表项点击态 */
active:bg-gray-100 dark:active:bg-gray-700

/* 按钮点击态 */
active:opacity-80
```

### 触觉反馈 (可选)

| 场景 | 振动模式 | 代码 |
|-----|---------|------|
| 轻触 | 10ms | `navigator.vibrate(10)` |
| 操作确认 | 20ms | `navigator.vibrate(20)` |
| 成功 | 模式振动 | `navigator.vibrate([10, 50, 20])` |

---

## 📱 安全区域

### iOS 适配

```css
/* 顶部安全区 (刘海) */
padding-top: env(safe-area-inset-top);

/* 底部安全区 (Home Indicator) */
padding-bottom: env(safe-area-inset-bottom);
```

### Tailwind 配置

```tsx
// 顶部
className="pt-safe"

// 底部
className="pb-safe"
```

---

## 📏 响应式策略

### 断点

| 断点 | 宽度 | 设备 | 策略 |
|-----|------|------|------|
| 默认 | <640px | 手机 | 移动优先设计 |
| sm | ≥640px | 大屏手机 | 微调间距 |
| md | ≥768px | 平板/桌面 | 切换布局 |

### 常用模式

```tsx
// 移动端单列，桌面多列
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// 移动端隐藏
className="hidden md:block"

// 移动端显示
className="md:hidden"
```

---

## ✅ 设计检查清单

### 必须满足

- [ ] 所有可点击元素 ≥ 44×44px
- [ ] 正文字号 ≥ 14px
- [ ] 页面边距 ≥ 16px
- [ ] 点击有视觉反馈
- [ ] 内容不被刘海/底部遮挡

### 建议满足

- [ ] 使用 8px 间距基准
- [ ] 圆角保持 4-12px (微信风格)
- [ ] 列表项高度 44-56px
- [ ] 正文行高 ≥ 1.4

---

## 📊 与微信规范对比

| 规范项 | 微信标准 | Domi | 差异说明 |
|--------|---------|------------|----------|
| 触摸目标 | ≥44px | ≥44px | ✅ 一致 |
| 导航栏高度 | 44px | 48px | 略高，浮动样式需要 |
| 正文字号 | 17px | 14-17px | 可调整 |
| 圆角 | 4-8px | 8-12px | 略大，品牌风格 |
| 主色调 | 绿色 | 橙色 | 品牌差异 |
| 列表分隔 | 细线 | 细线 | ✅ 一致 |

---

*基于微信小程序设计规范 v2.0 整理*  
*最后更新: 2026-01-11*
