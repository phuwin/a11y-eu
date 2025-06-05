import { useCallback } from 'react';

export const useAccessibilityAnnouncements = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  const announceNavigation = useCallback((sectionName: string) => {
    announce(`Navigated to ${sectionName} section`);
  }, [announce]);

  const announceUpdate = useCallback((updateMessage: string) => {
    announce(updateMessage, 'assertive');
  }, [announce]);

  return {
    announce,
    announceNavigation,
    announceUpdate
  };
}; 