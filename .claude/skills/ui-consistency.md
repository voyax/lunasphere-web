# Skill: ui-consistency

Check and enforce UI consistency across components and pages.

## Usage

`/ui-consistency [check|fix|report] [path]`

Commands:
- `check [path]`: Check specific file or directory
- `fix [path]`: Suggest fixes for inconsistencies
- `report`: Generate full project consistency report

## Instructions

### What to Check

#### 1. Color Usage
Scan for hardcoded colors vs design tokens:

```tsx
// Inconsistent (hardcoded)
className="text-[#333333] bg-[#f5f5f5]"
style={{ color: '#666' }}

// Consistent (design tokens)
className="text-foreground bg-default-100"
className="text-gray-700 dark:text-gray-200"
```

**Project color tokens to use:**
- Read `tailwind.config.js` for custom colors
- Use HeroUI semantic colors: `primary`, `secondary`, `success`, `warning`, `danger`
- Use `default-50` to `default-900` for neutrals
- Use `foreground`, `background`, `content1-4`

#### 2. Spacing System
Check for consistent spacing:

```tsx
// Inconsistent
className="p-[13px] mt-[22px] gap-[18px]"

// Consistent (4px grid)
className="p-3 mt-5 gap-4"  // 12px, 20px, 16px
```

**Standard spacing scale:**
- `1` = 4px, `2` = 8px, `3` = 12px, `4` = 16px
- `5` = 20px, `6` = 24px, `8` = 32px
- `10` = 40px, `12` = 48px, `16` = 64px

#### 3. Typography
Check text styling consistency:

```tsx
// Page titles
className="text-2xl md:text-3xl font-bold"

// Section headings
className="text-xl md:text-2xl font-semibold"

// Card titles
className="text-lg font-semibold"

// Body text
className="text-base text-default-600"

// Small/caption
className="text-sm text-default-500"
```

#### 4. Border Radius
Ensure consistent rounding:

```tsx
// Standard values
rounded-sm   // 2px - subtle
rounded      // 4px - default
rounded-md   // 6px - cards
rounded-lg   // 8px - buttons, inputs
rounded-xl   // 12px - large cards
rounded-2xl  // 16px - modals
rounded-full // pills, avatars
```

#### 5. Shadow Usage
Check shadow consistency:

```tsx
shadow-sm    // subtle elevation
shadow       // cards
shadow-md    // dropdowns
shadow-lg    // modals, popovers
```

#### 6. Component Patterns
Ensure similar components look similar:

**Buttons:**
- Primary: `bg-primary text-primary-foreground`
- Secondary: `bg-default-100 text-default-700`
- Ghost: `bg-transparent hover:bg-default-100`

**Cards:**
- `bg-content1 rounded-xl p-4 md:p-6`
- Optional: `shadow-sm` or `border border-default-200`

**Inputs:**
- Use HeroUI Input component
- Consistent sizing across forms

#### 7. Icon Sizes
Standardize icon dimensions:

```tsx
// In text: match line height
className="w-4 h-4"  // 16px - inline with text
className="w-5 h-5"  // 20px - buttons
className="w-6 h-6"  // 24px - standalone
className="w-8 h-8"  // 32px - feature icons
```

### Output Format

```
## UI Consistency Report

### Summary
- Files checked: X
- Issues found: Y
- Severity: Low/Medium/High

### Inconsistencies Found

#### Colors
| File | Line | Current | Should Be |
|------|------|---------|-----------|
| ... | ... | ... | ... |

#### Spacing
| File | Line | Current | Should Be |
|------|------|---------|-----------|
| ... | ... | ... | ... |

#### Typography
...

### Recommendations
1. Create shared style constants
2. Use component variants
3. Document design tokens

### Quick Fixes
[Provide code snippets to fix issues]
```
