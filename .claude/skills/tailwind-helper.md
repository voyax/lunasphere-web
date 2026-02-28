# Skill: tailwind-helper

Assist with Tailwind CSS styling, optimization, and best practices.

## Usage

`/tailwind-helper <command> [options]`

Commands:
- `convert <css>`: Convert CSS to Tailwind classes
- `optimize <file>`: Optimize Tailwind usage in a file
- `theme`: Show project theme configuration
- `suggest <description>`: Suggest classes for a design requirement

## Instructions

### Project Tailwind Setup

1. First, read the project's Tailwind config:
   - `tailwind.config.js` or `tailwind.config.ts`
   - Check for custom colors, spacing, fonts

2. Understand HeroUI integration:
   - HeroUI provides its own theme tokens
   - Use HeroUI color semantics when available

### Convert CSS to Tailwind

When user provides CSS:
```css
.card {
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

Convert to:
```
p-4 rounded-lg bg-white shadow-sm
```

### Optimize Tailwind Usage

Scan for:
1. Redundant classes
2. Classes that can be combined
3. Non-standard values that should use theme
4. Missing responsive variants
5. Missing dark mode variants

### Common Patterns for LunaSphere

**Cards:**
```
bg-white dark:bg-content1 rounded-xl shadow-sm p-4 md:p-6
```

**Buttons:**
```
px-4 py-2 rounded-lg font-medium transition-colors
```

**Text Hierarchy:**
```
// Heading
text-2xl md:text-3xl font-bold text-foreground

// Subheading
text-lg text-default-600

// Body
text-base text-default-500
```

**Layout:**
```
// Container
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

// Grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6
```

**Responsive Images:**
```
w-full h-auto object-cover rounded-lg
```

### Dark Mode

Always consider dark mode variants:
- `bg-white dark:bg-gray-800`
- `text-gray-900 dark:text-gray-100`
- `border-gray-200 dark:border-gray-700`

### Accessibility

Ensure sufficient contrast and focus states:
```
focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
```

### Output

Provide:
1. The optimized/converted classes
2. Explanation of choices
3. Any warnings about potential issues
