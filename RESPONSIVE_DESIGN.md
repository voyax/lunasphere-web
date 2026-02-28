# Responsive Design Standards

This document outlines the standard screen breakpoints and responsive design strategies for the Lunasphere web application, ensuring a premium and adaptive user experience across all devices.

## 🎯 Breakpoints & Device Targets

We utilize Tailwind CSS standard breakpoints, mapped to specific device categories and layout strategies.

| Breakpoint Prefix | Min-Width | Target Devices | Layout Strategy | Key Adjustments |
| :--- | :--- | :--- | :--- | :--- |
| **(default)** | `< 640px` | **Mobile (Portrait)**<br>iPhone SE - 15 Pro Max | **Single Column** | • Full width content<br>• Stacked elements<br>• Reduced padding (px-4/px-6)<br>• Simplified animations |
| **sm** | `640px` | **Mobile (Landscape) / Large Phones** | **Single Column** | • Slightly increased padding<br>• Feature cards may start to show grid-cols-1 |
| **md** | `768px` | **Tablets (Portrait)**<br>iPad Mini, iPad Air | **Single Column / Compact Grid** | • Maximize width usage<br>• Avoid forced 2-column layouts if content is text-heavy<br>• Padding: px-8 |
| **lg** | `1024px` | **Laptops (Small) / Tablets (Landscape)**<br>MacBook Air 13", iPad Pro 12.9" | **Compact 2-Column** ⚠️ *Critical Zone* | • **Critical Fix**: Avoid excessive gaps.<br>• Use `gap-8` or `gap-12`.<br>• Container Padding: `px-12` to prevent "edge-hugging".<br>• Text size adjustments if needed. |
| **xl** | `1280px` | **Desktops / Laptops (Large)**<br>MacBook Pro 14"/16", Monitors | **Standard 2-Column** | • Luxurious spacing (`gap-20` or `gap-24`)<br>• Full feature visibility<br>• Max-width constraints apply |
| **2xl** | `1536px` | **Large Monitors**<br>1080p+, 4K | **Constrained Center** | • Strictly capped `max-w` to prevent line-length readability issues. |

## 📏 Component Guidelines

### 1. Containers (SectionContainer)
- **Mobile (< lg)**: `px-6`
- **Laptop (lg)**: `px-12` (Added breathing room)
- **Desktop (xl)**: `px-8` or centered max-width behavior.

### 2. Grid & Flex Gaps
- **Mobile**: `gap-6` or `gap-8`
- **Laptop (lg)**: `gap-12` (approx 48px). **DO NOT use gap-24 here.**
- **Desktop (xl)**: `gap-24` (approx 96px).

### 3. Typography
- **Hero Headings**: Scale using `text-5xl md:text-7xl lg:text-8xl`.
- **Body Text**: Maintain readability. Avoid extremely wide text blocks on 2xl screens (use `max-w-prose` or specific width limits).

## ✅ Implementation Checklist

When implementing or reviewing a component:
1.  [ ] **Check `lg` breakpoint**: Does it look squeezed? If yes, reduce gap or switch to stacked layout until `xl`.
2.  [ ] **Check `md` breakpoint**: Is it trying to be a desktop site on a tablet? Usually, single column is better here.
3.  [ ] **Edge Spacing**: ensure content doesn't touch the screen edges on laptops. Use sufficient padding.
