# Skill: design-review

Review UI/UX design and provide feedback on visual design, usability, and accessibility.

## Usage

`/design-review [file or component path]`

If no path provided, review the currently discussed component or page.

## Instructions

### Review Checklist

#### Visual Design
- [ ] Consistent spacing and alignment
- [ ] Typography hierarchy is clear
- [ ] Color usage follows brand guidelines
- [ ] Visual balance and composition
- [ ] Appropriate use of whitespace
- [ ] Icons and imagery are consistent

#### Usability
- [ ] Clear call-to-action buttons
- [ ] Intuitive navigation
- [ ] Form inputs have clear labels
- [ ] Error states are helpful
- [ ] Loading states are present
- [ ] Empty states are designed

#### Accessibility (a11y)
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] Focus indicators are visible
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable (min 16px for body)
- [ ] Alt text for images
- [ ] ARIA labels where needed

#### Responsive Design
- [ ] Mobile-first approach
- [ ] Breakpoints are appropriate
- [ ] Touch-friendly on mobile
- [ ] Content reflows properly
- [ ] No horizontal scroll on mobile

#### Medical App Specific
- [ ] Important data is prominently displayed
- [ ] Results are easy to understand
- [ ] Medical terminology is explained
- [ ] Trust indicators are present
- [ ] Privacy/security is communicated

### Review Process

1. If reviewing a component file:
   - Read the component code
   - Identify UI patterns used
   - Check Tailwind classes for issues

2. If reviewing a .pen design file:
   - Use Pencil MCP tools to analyze
   - Check layout and spacing
   - Verify component usage

3. If reviewing a screenshot:
   - Analyze visual hierarchy
   - Check alignment and spacing
   - Identify usability issues

### Output Format

```
## Design Review: [Component/Page Name]

### Summary
Brief overall assessment

### Strengths
- Point 1
- Point 2

### Issues Found

#### Critical
- Issue description
  - Recommendation

#### Improvements
- Suggestion description
  - How to implement

### Accessibility Notes
- Finding 1
- Finding 2

### Score: X/10
```
