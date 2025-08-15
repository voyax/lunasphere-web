# Head Start - Infant Head Shape Education Platform

🍼 A comprehensive educational platform dedicated to infant head shape development, providing authoritative information and AI-powered detection tools for parents and healthcare professionals.

## 🌟 Features

- **📚 Educational Content**: Comprehensive information about infant head shape development
- **🔍 AI Detection**: Advanced machine learning model for head shape analysis
- **🌍 Multilingual Support**: Available in multiple languages
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🎨 Modern UI**: Built with HeroUI for beautiful user experience
- **♿ Accessibility**: WCAG compliant design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/voyax/baby-head-web.git
cd baby-head-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **UI Library**: [HeroUI v2](https://heroui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI/ML**: [ONNX Runtime](https://onnxruntime.ai/) for model inference
- **Internationalization**: Custom i18n implementation
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (home)/            # Home page components
│   ├── detection/         # AI detection feature
│   └── faq/              # FAQ page
├── components/            # Reusable UI components
├── lib/                   # Utility functions and AI model
├── public/               # Static assets
│   ├── images/           # Image assets
│   └── models/           # AI model files
├── deployment/           # Docker and deployment configs
└── types/                # TypeScript type definitions
```

## 🌐 Deployment

### Docker Deployment

1. Build the Docker image:
```bash
./deployment/build.sh v1.0.0
```

2. Run with Docker Compose:
```bash
cd deployment
docker-compose up -d
```

For detailed deployment instructions, see [deployment/README.md](deployment/README.md).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

- Follow React best practices
- Use TypeScript for type safety
- Write tests for new features
- Ensure accessibility compliance
- Maintain medical content accuracy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security concerns, please see our [Security Policy](SECURITY.md).

## 📞 Support

- 📧 Email: hi@melolib.com
- 🐛 Issues: [GitHub Issues](https://github.com/voyax/baby-head-web/issues)
- 📖 Documentation: [Wiki](https://github.com/voyax/baby-head-web/wiki)

## ⚠️ Medical Disclaimer

This platform is for educational purposes only and should not replace professional medical advice. Always consult with healthcare professionals for medical concerns.

---

**Made with ❤️ for infant health education**
