# React UI Component Library

A modern, accessible, and customizable React UI component library built with TypeScript, Tailwind CSS, and Storybook. This library provides a comprehensive set of reusable components designed for rapid application development.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Full type safety and excellent developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Storybook** - Interactive component documentation and testing
- **Vite** - Fast build tool and development server
- **Jest & Testing Library** - Comprehensive testing framework
- **ESLint** - Code quality and consistency

## ✨ Features

- ✅ **Fully Typed**: Built with TypeScript for excellent developer experience
- ✅ **Tailwind CSS**: Utility-first styling with custom design tokens
- ✅ **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- ✅ **Responsive**: Mobile-first design that works on all screen sizes
- ✅ **Customizable**: Easy to customize with Tailwind classes and CSS variables
- ✅ **Storybook**: Interactive component documentation and testing
- ✅ **Performance**: Optimized with React best practices
- ✅ **Modern**: Built with the latest React patterns and hooks
- ✅ **Interactive**: Components with real-time state management and animations
- ✅ **Human-Designed**: Thoughtfully crafted UI with attention to detail

## 🎨 Components

### Button
Versatile button component with multiple variants, sizes, and states.

```tsx
import { Button } from 'react-ui-components';

<Button variant="primary" size="lg" loading>
  Click me!
</Button>
```

**Variants**: `default`, `secondary`, `outline`, `destructive`, `ghost`, `link`
**Sizes**: `sm`, `default`, `lg`, `icon`
**States**: `loading`, `disabled`

### Card
Flexible card component with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from 'react-ui-components';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### DataTable
Fully featured data table with sorting, selection, and responsive design.

```tsx
import { DataTable } from 'react-ui-components';

<DataTable 
  data={userData} 
  columns={columns}
  selectable={true}
  onRowSelect={handleSelection}
/>
```

**Features**: Sorting, row selection, loading states, empty states, responsive design

## 📦 Installation

```bash
npm install react-ui-components
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { Button, Card, DataTable } from 'react-ui-components';

function App() {
  return (
    <div className="p-6">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Start building your UI with our components!</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🎯 Storybook

Explore all components interactively with Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to:
- See all component variants
- Test interactive controls
- View code examples
- Check accessibility
- Explore responsive behavior

### 📱 Deploy Storybook

#### Option 1: Chromatic (Recommended)
Chromatic provides automatic visual testing and deployment:

```bash
# Install Chromatic
npm install -D chromatic

# Deploy to Chromatic
npx chromatic --project-token=<your-project-token>
```

**Benefits:**
- ✅ Automatic visual regression testing
- ✅ GitHub integration
- ✅ Team collaboration features
- ✅ Free tier available
- ✅ Built-in accessibility testing

#### Option 2: Vercel
Deploy Storybook to Vercel for fast, global hosting:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy Storybook
npm run build-storybook
vercel --prod
```

**Benefits:**
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ GitHub integration
- ✅ Free tier available
- ✅ Custom domains

#### Option 3: GitHub Pages
Deploy to GitHub Pages for free hosting:

```bash
# Add to package.json scripts
"deploy-storybook": "npm run build-storybook && gh-pages -d storybook-static"

# Deploy
npm run deploy-storybook
```

### 🚀 Deployment Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "deploy-chromatic": "chromatic --project-token=$CHROMATIC_PROJECT_TOKEN",
    "deploy-vercel": "npm run build-storybook && vercel --prod",
    "deploy-gh-pages": "npm run build-storybook && gh-pages -d storybook-static"
  }
}
```

📖 **For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

The library includes tests for:
- Component rendering
- User interactions
- Accessibility features
- Edge cases
- Responsive behavior

## 🛠️ Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm test

# Build library
npm run build

# Lint code
npm run lint
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run build` - Build the library

## 🎨 Customization

### Tailwind CSS

The library uses Tailwind CSS with custom design tokens. You can customize:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### CSS Variables

Override component styles with CSS custom properties:

```css
:root {
  --button-primary-bg: #3b82f6;
  --button-primary-hover: #2563eb;
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:

- **Mobile**: Optimized for small screens with touch-friendly interactions
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience for large screens

## ♿ Accessibility

The library follows WCAG 2.1 AA guidelines:

- **ARIA Labels**: Proper labels for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper HTML structure
- **Color Contrast**: Meets accessibility standards

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (with polyfills)

## 📚 Documentation

- **Storybook**: Interactive component examples
- **TypeScript**: Full type definitions
- **Props**: Comprehensive prop documentation
- **Examples**: Real-world usage examples
- **Accessibility**: A11y guidelines and testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and stories
5. Update documentation
6. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Add Storybook stories for new components
- Ensure accessibility compliance
- Use Tailwind CSS for styling
- Follow React best practices

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: [Storybook](http://localhost:6006)

## 📝 Changelog

### 1.0.0
- Initial release
- Button component with variants and states
- Card component with flexible sections
- DataTable component with sorting and selection
- Tailwind CSS integration
- Storybook documentation
- Comprehensive testing
- Accessibility features
- Interactive examples with real-time state management

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Storybook](https://storybook.js.org/) - Component development
- [TypeScript](https://www.typescriptlang.org/) - Type safety 