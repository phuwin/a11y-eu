// ARIA roles and properties
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
  'aria-required'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
}

// Focus management types
export interface FocusableElement {
  element: HTMLElement;
  originalTabIndex?: string;
}

export interface FocusTrap {
  activate: () => void;
  deactivate: () => void;
  isActive: boolean;
}

// Accessibility testing results
export interface AccessibilityViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
  }>;
}

export interface AccessibilityTestResult {
  violations: AccessibilityViolation[];
  passes: AccessibilityViolation[];
  incomplete: AccessibilityViolation[];
  inapplicable: AccessibilityViolation[];
  timestamp: string;
  url: string;
}

// Screen reader announcements
export interface AnnouncementOptions {
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  delay?: number;
}

// Keyboard navigation
export interface KeyboardNavigationConfig {
  enableArrowKeys?: boolean;
  enableHomeEnd?: boolean;
  enablePageUpDown?: boolean;
  enableTypeAhead?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'both';
}

// Color contrast
export interface ColorContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  foreground: string;
  background: string;
}

// Component accessibility props
export interface AccessibleComponentProps extends AriaProps {
  id?: string;
  className?: string;
  tabIndex?: number;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

// Skip link configuration
export interface SkipLinkConfig {
  href: string;
  text: string;
  className?: string;
}

// Form accessibility
export interface FormFieldAccessibility {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  describedBy?: string[];
}

// Media accessibility
export interface MediaAccessibility {
  altText?: string;
  caption?: string;
  transcript?: string;
  audioDescription?: string;
  signLanguage?: string;
}

// Responsive accessibility
export interface ResponsiveAccessibility {
  minTouchTarget: number; // minimum 44px for WCAG
  maxZoom: number; // should support 200% zoom
  orientation: 'portrait' | 'landscape' | 'both';
} 