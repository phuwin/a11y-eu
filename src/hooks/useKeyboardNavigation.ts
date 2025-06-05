import { useEffect, useCallback } from 'react';

interface KeyboardNavigationOptions {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
}

export const useKeyboardNavigation = (
  ref: React.RefObject<HTMLElement>,
  options: KeyboardNavigationOptions
) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (options.onEnter) {
          e.preventDefault();
          options.onEnter();
        }
        break;
      case 'Escape':
        if (options.onEscape) {
          e.preventDefault();
          options.onEscape();
        }
        break;
      case 'ArrowUp':
        if (options.onArrowUp) {
          e.preventDefault();
          options.onArrowUp();
        }
        break;
      case 'ArrowDown':
        if (options.onArrowDown) {
          e.preventDefault();
          options.onArrowDown();
        }
        break;
      case 'ArrowLeft':
        if (options.onArrowLeft) {
          e.preventDefault();
          options.onArrowLeft();
        }
        break;
      case 'ArrowRight':
        if (options.onArrowRight) {
          e.preventDefault();
          options.onArrowRight();
        }
        break;
      case 'Home':
        if (options.onHome) {
          e.preventDefault();
          options.onHome();
        }
        break;
      case 'End':
        if (options.onEnd) {
          e.preventDefault();
          options.onEnd();
        }
        break;
    }
  }, [options]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }
  }, [ref, handleKeyDown]);
}; 