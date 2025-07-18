# Hero Section Images

## 如何替换 Hero Section 图片

### 1. 准备图片文件

将你的图片文件放在 `public/images/` 目录下，支持以下格式：
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.svg`

### 2. 推荐的图片规格

- **尺寸比例**: 1:1 (正方形)
- **推荐分辨率**: 800x800px 或更高
- **文件大小**: 建议小于 500KB
- **内容**: 与婴儿头型相关的温和、专业的图片

### 3. 修改图片路径

在 `app/(home)/components/hero-section.tsx` 文件中，找到以下代码并修改 `src` 属性：

```tsx
<Image
  src='/images/your-image-name.jpg'  // 修改这里的文件名
  alt={t('hero.title')}
  fill
  className='object-cover'
  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  priority
/>
```

### 4. 图片示例

你可以放置以下类型的图片：
- `hero-image.jpg` - 主图片
- `hero-image-mobile.jpg` - 移动端专用图片（可选）
- `hero-image-dark.jpg` - 深色模式图片（可选）

### 5. 响应式图片（可选）

如果你想为不同设备提供不同的图片，可以这样修改：

```tsx
<Image
  src='/images/hero-image.jpg'
  alt={t('hero.title')}
  fill
  className='object-cover'
  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  priority
/>
```

### 6. 当前设置

目前代码中设置的图片路径是：`/images/placeholder.svg`（占位符图片）

**替换步骤：**
1. 将你的图片文件放在 `public/images/` 目录下
2. 在 `app/(home)/components/hero-section.tsx` 中修改第 85 行：
   ```tsx
   src='/images/your-image-name.jpg'  // 替换为你的图片文件名
   ```

### 7. 高级功能

**支持深色模式：**
如果你有专门的深色模式图片，可以取消注释代码中的深色模式部分：

```tsx
{/* 取消这些注释来启用深色模式图片 */}
<Image
  src='/images/hero-image-dark.jpg'
  alt={t('hero.title')}
  fill
  className='object-cover dark:block hidden'
  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  priority
/>
<Image
  src='/images/hero-image.jpg'
  alt={t('hero.title')}
  fill
  className='object-cover dark:hidden block'
  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  priority
/>
```

### 8. 图片优化建议

- 使用现代格式（WebP）以获得更好的压缩效果
- 确保图片内容适合在圆角矩形中显示
- 考虑图片的焦点位置，确保重要内容在中心区域
- 测试深色和浅色模式下的显示效果

---

## 头型发育部分图片

### 当前图片
- **路径**: `/images/head-development.svg`
- **用途**: 头型发育部分的示意图
- **格式**: SVG 矢量图

### 替换说明
如果需要替换头型发育图片，请在 `app/(home)/components/development-section.tsx` 文件中修改：

```tsx
<Image
  src='/images/your-development-image.jpg'  // 替换为你的图片
  alt={t('development.title')}
  fill
  className='object-contain'  // 对于示意图使用 object-contain
  sizes='(max-width: 768px) 100vw, 50vw'
/>
```

### 推荐的头型发育图片
- **内容**: 婴儿头骨结构示意图、囟门位置、颅缝等
- **风格**: 医学插图、科学示意图
- **颜色**: 柔和的蓝色系、医学色调
- **背景**: 浅色或透明背景 