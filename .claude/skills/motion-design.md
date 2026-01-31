# Skill: motion-design

Create and optimize Framer Motion animations for LunaSphere.

## Usage

`/motion-design <command> [options]`

Commands:
- `add <type>`: Add animation to a component (fade, slide, scale, stagger)
- `optimize <file>`: Optimize existing animations
- `suggest <description>`: Suggest animation for a UX scenario
- `preset`: Show available animation presets

## Instructions

### Animation Presets for LunaSphere

```tsx
// Fade In
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 }
};

// Slide Up (for cards, modals)
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Scale (for buttons, interactive elements)
const scale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

// Stagger Children (for lists)
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

### UX Animation Guidelines

1. **Page Transitions**
   - Duration: 200-300ms
   - Use fade + subtle slide
   - Consider reduced motion preferences

2. **Micro-interactions**
   - Duration: 100-200ms
   - Buttons: scale on hover/tap
   - Feedback: immediate response

3. **Content Loading**
   - Skeleton screens with pulse
   - Staggered reveal for lists
   - Progress indicators

4. **Medical Results Display**
   - Draw attention to important metrics
   - Use subtle animations for data visualization
   - Avoid distracting animations during analysis

### Reduced Motion Support

Always include reduced motion fallback:

```tsx
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();

const animation = prefersReducedMotion
  ? { opacity: 1 }
  : { opacity: 1, y: 0 };
```

### Performance Tips

1. Use `transform` and `opacity` only (GPU accelerated)
2. Avoid animating `width`, `height`, `top`, `left`
3. Use `layout` prop sparingly
4. Consider `will-change` for complex animations

### Implementation Template

```tsx
"use client";

import { motion } from "framer-motion";

export const AnimatedComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  );
};
```

### Output

When adding animations:
1. Show the motion component code
2. Explain the animation choice
3. Include reduced motion fallback
4. Note any performance considerations
