// import { Fira_Code as FontMono, Inter as FontSans } from 'next/font/google'

// export const fontSans = FontSans({
//   subsets: ['latin'],
//   variable: '--font-sans',
// })

// export const fontMono = FontMono({
//   subsets: ['latin'],
//   variable: '--font-mono',
// })

// Optimized System Font Stack
export const fontSans = {
  // Use a modern sans-serif stack that prioritizes clean rendering
  style: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
  },
  className: 'font-sans',
  variable: '--font-sans',
}

export const fontMono = {
  style: {
    fontFamily: '"Fira Code", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  className: 'font-mono',
  variable: '--font-mono',
}

// Add a serif definition so Tailwind's font-serif picks up a nice system serif instead of Times New Roman
// This needs to be consistent with how Tailwind is configured, but since we are mocking the next/font object,
// we rely on the CSS variable being set correctly. 
// Note: Tailwind config uses var(--font-sans) for sans. 
// For serif, it likely uses default system serif unless configured.
