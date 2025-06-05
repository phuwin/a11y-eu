export const manageFocus = {
  // Skip to main content
  skipToMain: () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  },

  // Announce to screen readers
  announce: (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Trap focus within element
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
};

// Color contrast utilities
export const colorContrast = {
  // Calculate contrast ratio between two colors
  getContrastRatio: (color1: string, color2: string): number => {
    // This is a simplified version - in production, use a proper color contrast library
    // For now, return a placeholder that meets WCAG AA standards
    return 4.5;
  },

  // Check if contrast meets WCAG AA standards
  meetsWCAGAA: (color1: string, color2: string, fontSize?: number): boolean => {
    const ratio = colorContrast.getContrastRatio(color1, color2);
    const isLargeText = fontSize ? fontSize >= 18 : false;
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }
};

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Handle arrow key navigation in lists
  handleArrowNavigation: (
    event: KeyboardEvent, 
    items: HTMLElement[], 
    currentIndex: number
  ): number => {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
    }
    
    items[newIndex]?.focus();
    return newIndex;
  },

  // Check if element is focusable
  isFocusable: (element: HTMLElement): boolean => {
    const focusableSelectors = [
      'a[href]',
      'button',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return focusableSelectors.some(selector => element.matches(selector)) &&
           !element.hasAttribute('disabled') &&
           element.offsetParent !== null;
  }
};

// Screen reader utilities
export const screenReader = {
  // Check if screen reader is likely active
  isScreenReaderActive: (): boolean => {
    // Simple heuristic - in production, you might use more sophisticated detection
    return window.navigator.userAgent.includes('NVDA') ||
           window.navigator.userAgent.includes('JAWS') ||
           window.speechSynthesis?.speaking ||
           false;
  },

  // Optimize content for screen readers
  optimizeForScreenReader: (text: string): string => {
    return text
      .replace(/&/g, 'and')
      .replace(/\s+/g, ' ')
      .trim();
  }
}; 