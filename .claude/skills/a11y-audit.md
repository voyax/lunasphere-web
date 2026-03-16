# Skill: a11y-audit

Comprehensive accessibility (a11y) audit for components and pages.

## Usage

`/a11y-audit [file or component path]`

If no path provided, audit the currently discussed component.

## Instructions

### Audit Categories

#### 1. Color & Contrast
- [ ] Text contrast ratio ≥ 4.5:1 (WCAG AA)
- [ ] Large text contrast ≥ 3:1
- [ ] Non-text elements contrast ≥ 3:1
- [ ] Information not conveyed by color alone
- [ ] Focus indicators visible (contrast ≥ 3:1)

**Check Tailwind classes:**
```tsx
// Potential issues
text-gray-400  // May be too light
text-default-300  // Check against background

// Better alternatives
text-gray-600 dark:text-gray-300
text-default-600
```

#### 2. Keyboard Navigation
- [ ] All interactive elements are focusable
- [ ] Focus order is logical (DOM order)
- [ ] No keyboard traps
- [ ] Skip links for main content
- [ ] Custom components have proper keyboard handling

**Check for:**
```tsx
// Missing tabIndex
<div onClick={...}>  // Bad: not focusable

// Should be
<button onClick={...}>  // Good: naturally focusable
// or
<div role="button" tabIndex={0} onKeyDown={...}>
```

#### 3. Screen Reader Support
- [ ] Images have alt text
- [ ] Icons have aria-label or sr-only text
- [ ] Form inputs have associated labels
- [ ] Error messages linked to inputs
- [ ] Live regions for dynamic content

**Patterns:**
```tsx
// Icon buttons need labels
<button aria-label="Close menu">
  <X className="w-5 h-5" />
</button>

// Decorative icons
<Icon aria-hidden="true" />

// Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Error messages
<input aria-describedby="email-error" aria-invalid="true" />
<span id="email-error" role="alert">Invalid email</span>
```

#### 4. Touch & Motor
- [ ] Touch targets ≥ 44x44px
- [ ] Adequate spacing between targets
- [ ] No hover-only interactions
- [ ] Drag operations have alternatives

**Touch target classes:**
```tsx
className="min-h-[44px] min-w-[44px] p-2"
// or use HeroUI size props
<Button size="lg">
```

#### 5. Motion & Animation
- [ ] Respect prefers-reduced-motion
- [ ] No auto-playing animations > 5s
- [ ] Pause/stop controls for motion
- [ ] No flashing content (< 3 flashes/sec)

**Check Framer Motion:**
```tsx
import { useReducedMotion } from "framer-motion";

const shouldReduceMotion = useReducedMotion();
```

#### 6. Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Lists use ul/ol/li
- [ ] Tables have headers
- [ ] Landmarks used (main, nav, aside)
- [ ] Buttons vs links used correctly

### Medical App Specifics

For Domi:
- [ ] Measurement results announced to screen readers
- [ ] Medical terms have explanations (title or aria-describedby)
- [ ] Critical data has sufficient contrast
- [ ] Camera/photo features have alternatives

### Output Format

```
## Accessibility Audit: [Component Name]

### Score: X/10

### Critical Issues (Must Fix)
1. **[Category]** Issue description
   - Location: `file:line`
   - Current: `code snippet`
   - Fix: `suggested fix`

### Warnings
1. Issue description
   - Recommendation

### Passed Checks
- ✅ Check 1
- ✅ Check 2

### Testing Recommendations
- [ ] Test with VoiceOver/NVDA
- [ ] Test keyboard-only navigation
- [ ] Test at 200% zoom
```
