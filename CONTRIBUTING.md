# Contributing to Head Start

🙏 Thank you for your interest in contributing to Head Start! This project aims to provide authoritative and accurate information about infant head shape development.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Medical Content Guidelines](#medical-content-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 🤝 Code of Conduct

This project adheres to a code of conduct that promotes a welcoming and inclusive environment. By participating, you agree to:

- Be respectful and considerate
- Focus on constructive feedback
- Prioritize medical accuracy and safety
- Respect diverse perspectives and experiences

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/head-start-web.git
   cd head-start-web
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Contributing Guidelines

### Types of Contributions

- 🐛 **Bug fixes**: Fix issues or improve functionality
- ✨ **Features**: Add new features or enhance existing ones
- 📚 **Documentation**: Improve documentation or add examples
- 🌍 **Translations**: Add or improve language translations
- 🎨 **UI/UX**: Improve user interface and experience
- ⚡ **Performance**: Optimize performance and accessibility

### Before You Start

1. **Check existing issues** to avoid duplicate work
2. **Create an issue** for significant changes to discuss the approach
3. **Keep changes focused** - one feature/fix per pull request
4. **Follow the project structure** and existing patterns

## 🏥 Medical Content Guidelines

**⚠️ CRITICAL: Medical Accuracy is Paramount**

This platform provides health-related information. All medical content must be:

### Content Requirements

- **Evidence-based**: Backed by peer-reviewed research
- **Reviewed**: Verified by healthcare professionals when possible
- **Current**: Based on up-to-date medical guidelines
- **Clear**: Written in accessible language
- **Balanced**: Present information objectively

### Medical Content Process

1. **Research thoroughly** using reputable medical sources
2. **Cite sources** for all medical claims
3. **Include disclaimers** where appropriate
4. **Avoid diagnosis language** - use educational terms
5. **Encourage professional consultation** for medical concerns

### Prohibited Content

- ❌ Medical diagnosis or treatment recommendations
- ❌ Unsubstantiated health claims
- ❌ Content that could cause harm if misinterpreted
- ❌ Promotional content for specific products/services

## 💻 Code Style

### General Principles

- **Follow React best practices** to minimize re-renders
- **Use TypeScript** for type safety
- **Write accessible code** following WCAG guidelines
- **Maintain component reusability**
- **Use English for comments** and documentation

### Code Standards

```typescript
// ✅ Good: Clear, typed, accessible component
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  'aria-label'?: string
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  'aria-label': ariaLabel
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
}
```

### Linting and Formatting

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Format code
npm run format
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features and bug fixes
- Test accessibility features
- Test internationalization functionality
- Include edge cases and error scenarios

## 📝 Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run quality checks**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

3. **Update documentation** if needed

### PR Requirements

- ✅ **Clear title** describing the change
- ✅ **Detailed description** explaining what and why
- ✅ **Link related issues** using "Fixes #123" or "Closes #123"
- ✅ **Screenshots** for UI changes
- ✅ **Tests pass** and coverage is maintained
- ✅ **No linting errors**
- ✅ **Medical content reviewed** (if applicable)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Medical content update

## Testing
- [ ] Tests pass locally
- [ ] Added tests for new functionality
- [ ] Manual testing completed

## Medical Content (if applicable)
- [ ] Content is evidence-based
- [ ] Sources are cited
- [ ] Appropriate disclaimers included
- [ ] Reviewed by healthcare professional (if possible)

## Screenshots (if applicable)
[Add screenshots here]

## Additional Notes
[Any additional information]
```

## 🐛 Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Clear title** and description
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (browser, device, OS)
- **Screenshots** if applicable
- **Console errors** if any

### Feature Requests

For feature requests, include:

- **Problem description** - what need does this address?
- **Proposed solution** - how should it work?
- **Alternatives considered** - other approaches?
- **Medical relevance** - how does it serve the project's mission?

## 🌍 Internationalization

### Adding Translations

1. **Add translation keys** to `lib/i18n.ts`
2. **Provide translations** for all supported languages
3. **Test language switching** functionality
4. **Ensure medical accuracy** across languages

### Translation Guidelines

- Maintain medical accuracy in all languages
- Use culturally appropriate terminology
- Consider regional medical practice differences
- Provide context for translators when needed

## 📞 Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs and request features
- 📧 **Email**: Contact maintainers for sensitive issues
- 📖 **Documentation**: Check the project wiki

## 🏆 Recognition

Contributors are recognized in:

- Project README
- Release notes
- Contributors page (when available)

---

**Thank you for helping make infant health information more accessible! 🍼**

*Remember: This project deals with health information. When in doubt about medical content, always err on the side of caution and encourage professional medical consultation.*