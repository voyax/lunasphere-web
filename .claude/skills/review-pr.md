# Skill: review-pr

Review pull requests for code quality, best practices, and potential issues.

## Usage

`/review-pr [PR number or URL]`

If no PR is specified, review the current branch against main.

## Instructions

1. Get PR information:
   - If PR number provided: `gh pr view <number> --json title,body,files,additions,deletions`
   - If URL provided: Extract PR number and use gh
   - If neither: `git diff main...HEAD`

2. Review the changes for:

### Code Quality
- [ ] TypeScript types are properly defined
- [ ] No `any` types without justification
- [ ] Proper error handling
- [ ] No console.log left in production code

### React/Next.js Best Practices
- [ ] Components are properly memoized when needed
- [ ] useEffect dependencies are correct
- [ ] No memory leaks (cleanup in useEffect)
- [ ] Server/Client component boundaries are correct

### Styling (Tailwind/HeroUI)
- [ ] Consistent use of design tokens
- [ ] Responsive design considered
- [ ] Dark mode support maintained

### Accessibility
- [ ] Proper ARIA labels
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient

### Performance
- [ ] Images are optimized
- [ ] No unnecessary re-renders
- [ ] Lazy loading where appropriate

### Security
- [ ] No sensitive data exposed
- [ ] Input validation present
- [ ] XSS prevention

### i18n
- [ ] New strings are internationalized
- [ ] Translation keys follow naming convention

3. Provide feedback in this format:
   - **Critical**: Must fix before merge
   - **Suggestion**: Recommended improvements
   - **Nitpick**: Minor style preferences
   - **Praise**: Good practices observed

4. Give an overall assessment: Approve, Request Changes, or Comment
