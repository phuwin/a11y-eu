# EU Accessibility Compliance Guide

A React TypeScript application demonstrating accessibility best practices and providing guidance on EU accessibility requirements that become mandatory from June 2025.

## 🎯 Project Overview

This application is both:
- **Educational Resource**: Learn about the European Accessibility Act (EAA) and WCAG 2.1 AA requirements
- **Practical Example**: See accessibility best practices implemented in a real React application, with interactive tools and real-world code

## 🏗️ Key Features & Structure

### Main Sections & Components
- **Hero Section**: Overview of EU accessibility law, key statistics, and urgent compliance call-to-action
- **Educational Content**: Legal framework, affected services, and enforcement/penalties explained
- **Timeline**: Interactive, keyboard-navigable timeline of EU accessibility legislation milestones
- **WCAG Requirements**: Expandable, filterable list of all WCAG 2.1 AA requirements with code examples, testing methods, and business impact
- **Developer Roles**: Role-based guidance for Freelancers, Agencies, and CTOs, including liability warnings and action items
- **Accessibility Compliance Checker**: Interactive tool for self-assessing site compliance across WCAG principles, with scoring and recommendations
- **Motor Accessibility Panel**: User-adjustable settings for reduced motion, large touch targets, dwell click, and high contrast
- **Accessible Navigation**: Responsive navigation with mobile menu, progress indicator, and skip links
- **Reusable Accessible Components**: AccessibleButton and AccessibleInput with built-in a11y features

### Accessibility & Usability
- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`)
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels, descriptions, and live regions
- Focus management utilities and visible focus indicators
- Screen reader announcements and optimizations for NVDA, JAWS, VoiceOver, ORCA
- High contrast and reduced motion support
- Minimum touch target sizes (44px+)
- Full keyboard navigation for all interactive elements

### Custom React Hooks
- `useAccessibilityAnnouncements`: Announces updates and navigation for screen readers
- `useFocusManagement`: Trap, save, restore, and move focus programmatically
- `useKeyboardNavigation`: Declarative keyboard navigation for complex widgets
- `useScreenReader`: Detects and adapts to active screen readers, with advanced announcement logic

### Utilities & Types
- `utils/accessibility.ts`: Focus management, ARIA helpers, and a11y utilities
- `types/accessibility.ts`: TypeScript interfaces for accessibility data and requirements
- `data/euAccessibility.ts`: Static content for requirements, timeline, and roles

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Lint for accessibility issues
npm run lint

# Run Playwright accessibility tests
npm run test:a11y
# Run keyboard navigation tests
npm run test:keyboard
# Run color contrast tests
npm run test:contrast
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # AccessibleButton, AccessibleInput, Navigation
│   ├── sections/        # Hero, Timeline, Requirements, DeveloperRoles, EducationalContent
│   └── accessibility/   # ComplianceChecker, MotorAccessibility
├── hooks/               # useAccessibilityAnnouncements, useFocusManagement, useKeyboardNavigation, useScreenReader
├── utils/               # accessibility.ts (focus & ARIA helpers)
├── types/               # accessibility.ts (interfaces for a11y)
├── data/                # euAccessibility.ts (requirements, timeline, roles)
├── styles/              # (custom styles if needed)
└── tests/               # Playwright specs for a11y, keyboard, contrast
```

## 🧪 Testing

- **ESLint jsx-a11y**: Catches accessibility issues during development
- **Axe-core**: Runtime accessibility testing in development mode
- **Playwright**: Automated E2E tests for accessibility, keyboard navigation, and color contrast (`tests/` directory)
- **Manual Testing**: Encouraged with screen readers and keyboard

Open browser console in development mode to see axe-core accessibility results.

## 🔧 Technical Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Accessibility**: Axe-core, ESLint jsx-a11y, custom a11y utilities
- **Testing**: Playwright, Jest, React Testing Library
- **Build Tool**: Create React App

## 🎨 Design System

- **Colors**: WCAG AA compliant palette (primary blue, dark blue, accent yellow, text gray)
- **Typography**: 16px base, 44px+ touch targets, visible focus indicators

## 🌐 Browser & AT Support

- Modern browsers (ES2017+)
- Screen readers: NVDA, JAWS, VoiceOver, ORCA
- Keyboard navigation and 200% zoom fully supported

## 📚 References

- [European Accessibility Act (EAA)](https://ec.europa.eu/social/main.jsp?catId=1202)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?levels=aaa)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
---

**This application includes:**
- Interactive compliance checker with scoring and recommendations
- Role-based developer guidance with liability and action items
- Timeline of EU accessibility legislation
- Expandable WCAG 2.1 AA requirements with code/testing/impact
- Motor accessibility settings (reduced motion, large targets, dwell click)
- Accessible navigation, forms, and tabbed interfaces
- Comprehensive a11y coverage for all interactive elements

**Next up:** Further screen reader optimization, content polish, and deployment documentation. 