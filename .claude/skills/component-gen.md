# Skill: component-gen

Generate React components with HeroUI and Tailwind CSS for Domi.

## Usage

`/component-gen <ComponentName> [options]`

Options:
- `--type <type>`: page | layout | ui | feature (default: ui)
- `--with-i18n`: Include internationalization
- `--with-motion`: Include Framer Motion animations
- `--server`: Create as Server Component (default is Client)

## Instructions

### Component Types

1. **UI Component** (`--type ui`)
   - Small, reusable components
   - Location: `/components/ui/`
   - Examples: Button, Card, Badge

2. **Feature Component** (`--type feature`)
   - Larger components with business logic
   - Location: `/components/features/`
   - Examples: MeasureCanvas, ResultCard

3. **Page Component** (`--type page`)
   - Full page layouts
   - Location: `/app/[locale]/`
   - Server Component by default

4. **Layout Component** (`--type layout`)
   - Layout wrappers
   - Location: `/components/layout/`
   - Examples: Header, Footer, Sidebar

### Template Structure

```tsx
"use client"; // Only if client component

import { FC } from "react";
// HeroUI imports
import { Button, Card } from "@heroui/react";
// Icons
import { IconName } from "lucide-react";
// Motion (if --with-motion)
import { motion } from "framer-motion";
// i18n (if --with-i18n)
import { useTranslations } from "next-intl";

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: FC<ComponentNameProps> = ({ ...props }) => {
  // i18n hook if needed
  const t = useTranslations("namespace");

  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
};
```

### Styling Guidelines

1. Use Tailwind CSS classes
2. Follow the project's color scheme (check tailwind.config.js)
3. Support dark mode with `dark:` prefix
4. Use HeroUI components where applicable
5. Ensure responsive design with `sm:`, `md:`, `lg:` breakpoints

### Naming Conventions

- Components: PascalCase
- Files: PascalCase.tsx
- Props interface: `ComponentNameProps`
- CSS classes: kebab-case (Tailwind)

### After Generation

1. Show the generated component
2. Ask if user wants to add it to an index file
3. Suggest where to import/use the component
