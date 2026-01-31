# Skill: ux-checklist

Validate UX best practices and interaction patterns.

## Usage

`/ux-checklist [page|flow|component] [path]`

Types:
- `page`: Full page UX review
- `flow`: Multi-step flow review (e.g., measurement process)
- `component`: Individual component interactions

## Instructions

### Page UX Checklist

#### Information Architecture
- [ ] Clear visual hierarchy
- [ ] Most important content above the fold
- [ ] Logical content grouping
- [ ] Scannable layout (F-pattern or Z-pattern)

#### Navigation
- [ ] Current location is clear
- [ ] Back navigation works as expected
- [ ] Breadcrumbs for deep pages
- [ ] Mobile nav is accessible

#### Loading States
- [ ] Skeleton screens for content loading
- [ ] Progress indicators for long operations
- [ ] Optimistic UI where appropriate
- [ ] No layout shift on load

#### Empty States
- [ ] Helpful message when no content
- [ ] Clear call-to-action to add content
- [ ] Illustrations if appropriate

#### Error States
- [ ] Clear error messages (what happened, how to fix)
- [ ] Errors appear near the source
- [ ] Recovery actions provided
- [ ] No dead ends

### Interaction Patterns

#### Buttons & CTAs
- [ ] Primary action is visually prominent
- [ ] Disabled states are clear
- [ ] Loading states for async actions
- [ ] Hover/active feedback

```tsx
// Button states
<Button isLoading={isSubmitting}>
  Submit
</Button>

<Button isDisabled={!isValid}>
  Continue
</Button>
```

#### Forms
- [ ] Labels above inputs (not placeholder only)
- [ ] Inline validation feedback
- [ ] Clear required vs optional
- [ ] Logical tab order
- [ ] Submit on Enter where appropriate

```tsx
// Good form pattern
<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium mb-1">
      Email <span className="text-danger">*</span>
    </label>
    <Input
      type="email"
      isInvalid={!!errors.email}
      errorMessage={errors.email}
    />
  </div>
</div>
```

#### Modals & Dialogs
- [ ] Clear title and purpose
- [ ] Close button visible
- [ ] ESC to close
- [ ] Click outside to close (if not destructive)
- [ ] Focus trapped inside
- [ ] Confirmation for destructive actions

#### Feedback & Notifications
- [ ] Success feedback for completed actions
- [ ] Toast/snackbar for non-blocking messages
- [ ] Appropriate duration (3-5s for info, longer for errors)
- [ ] Dismissible

### Flow UX Checklist (Multi-step)

#### Progress Indication
- [ ] Clear step indicator
- [ ] Total steps visible
- [ ] Current step highlighted
- [ ] Completed steps marked

```tsx
// Step indicator
<div className="flex gap-2">
  {steps.map((step, i) => (
    <div
      key={i}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        i < currentStep && "bg-success text-white",
        i === currentStep && "bg-primary text-white",
        i > currentStep && "bg-default-200 text-default-500"
      )}
    >
      {i < currentStep ? <Check /> : i + 1}
    </div>
  ))}
</div>
```

#### Navigation Between Steps
- [ ] Back button available (except first step)
- [ ] Progress saved between steps
- [ ] Confirmation before leaving incomplete flow
- [ ] Can jump to completed steps

#### Completion
- [ ] Clear success state
- [ ] Summary of what was done
- [ ] Next steps or actions
- [ ] Share/save options if applicable

### LunaSphere Specific

#### Measurement Flow
- [ ] Clear camera positioning guidance
- [ ] Real-time feedback during capture
- [ ] Processing progress visible
- [ ] Results explained clearly
- [ ] Save/share results options
- [ ] Retry option if failed

#### Medical Results Display
- [ ] Values prominently displayed
- [ ] Normal ranges shown for context
- [ ] Color coding (green/yellow/red) with labels
- [ ] Explanations in simple language
- [ ] Option for detailed view
- [ ] Disclaimer visible

### Output Format

```
## UX Checklist: [Page/Flow/Component Name]

### Score: X/10

### Passed ✅
- Item 1
- Item 2

### Needs Attention ⚠️
1. **Issue**
   - Why it matters
   - Suggestion

### Missing ❌
1. **Feature/Pattern**
   - Recommendation
   - Example implementation

### Priority Fixes
1. [High] Description
2. [Medium] Description
3. [Low] Description
```
