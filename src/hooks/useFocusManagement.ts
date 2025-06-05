import { useCallback, useRef } from 'react';

export const useFocusManagement = () => {
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
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
    };
    container.addEventListener('keydown', handleTabKey);
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  const saveFocus = useCallback(() => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, []);

  const moveFocusToStart = useCallback((container: HTMLElement) => {
    const firstFocusable = container.querySelector(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, []);

  return {
    trapFocus,
    saveFocus,
    restoreFocus,
    moveFocusToStart
  };
}; 