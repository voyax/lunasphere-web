# Skill: responsive-check

Check and improve responsive design across breakpoints.

## Usage

`/responsive-check [file or component path]`

## Instructions

### Tailwind Breakpoints

Standard breakpoints used in Domi:
- `sm`: 640px (large phones)
- `md`: 768px (tablets)
- `lg`: 1024px (small laptops)
- `xl`: 1280px (desktops)
- `2xl`: 1536px (large screens)

### Check Process

1. **Read the component/page**
   - Identify all Tailwind classes
   - Map responsive variants used

2. **Analyze responsive patterns**
   - Layout changes at breakpoints
   - Typography scaling
   - Spacing adjustments
   - Show/hide elements

3. **Identify issues**
   - Missing mobile styles (mobile-first!)
   - Inconsistent breakpoint usage
   - Content overflow risks
   - Touch target sizes on mobile

### Common Issues to Check

#### Layout
```tsx
// Bad: Desktop-first
className="flex-row sm:flex-col"

// Good: Mobile-first
className="flex-col md:flex-row"
```

#### Typography
```tsx
// Should scale appropriately
className="text-xl md:text-2xl lg:text-3xl"
```

#### Spacing
```tsx
// Adjust padding/margin for screens
className="p-4 md:p-6 lg:p-8"
className="gap-4 md:gap-6"
```

#### Grids
```tsx
// Progressive enhancement
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

#### Navigation
- Mobile: Bottom nav or hamburger menu
- Tablet: Condensed nav
- Desktop: Full navigation

### Touch Targets

Mobile touch targets should be at least 44x44px:
```tsx
className="min-h-[44px] min-w-[44px]"
// or
className="p-3" // 12px * 2 + content
```

### Output Format

```
## Responsive Check: [Component Name]

### Breakpoint Coverage
| Breakpoint | Status | Notes |
|------------|--------|-------|
| Base (mobile) | ✅/⚠️/❌ | ... |
| sm (640px) | ✅/⚠️/❌ | ... |
| md (768px) | ✅/⚠️/❌ | ... |
| lg (1024px) | ✅/⚠️/❌ | ... |
| xl (1280px) | ✅/⚠️/❌ | ... |

### Issues Found
1. Issue description
   - Current: `current classes`
   - Suggested: `improved classes`

### Recommendations
- Recommendation 1
- Recommendation 2
```
