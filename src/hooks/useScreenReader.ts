import { useState, useEffect } from 'react';

interface ScreenReaderInfo {
  isActive: boolean;
  type: 'nvda' | 'jaws' | 'voiceover' | 'orca' | 'unknown' | null;
  hasVirtualCursor: boolean;
  supportsLiveRegions: boolean;
}

/**
 * Advanced screen reader detection and optimization hook
 * Provides detailed information about the active screen reader
 * and optimizes content delivery accordingly
 */
export const useScreenReader = (): ScreenReaderInfo => {
  const [screenReaderInfo, setScreenReaderInfo] = useState<ScreenReaderInfo>({
    isActive: false,
    type: null,
    hasVirtualCursor: false,
    supportsLiveRegions: true
  });

  useEffect(() => {
    const detectScreenReader = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      let type: ScreenReaderInfo['type'] = null;
      let isActive = false;
      let hasVirtualCursor = false;
      let supportsLiveRegions = true;

      // Check for screen reader indicators
      if (window.speechSynthesis) {
        // Basic screen reader detection
        isActive = true;
      }

      // Detect specific screen readers based on user agent or other indicators
      if (userAgent.includes('nvda') || (window as any).nvda) {
        type = 'nvda';
        isActive = true;
        hasVirtualCursor = true;
        supportsLiveRegions = true;
      } else if (userAgent.includes('jaws') || (window as any).jaws) {
        type = 'jaws';
        isActive = true;
        hasVirtualCursor = true;
        supportsLiveRegions = true;
      } else if (userAgent.includes('voiceover') || (window as any).speechSynthesis?.voiceURI?.includes('Alex')) {
        type = 'voiceover';
        isActive = true;
        hasVirtualCursor = false; // VoiceOver uses different navigation
        supportsLiveRegions = true;
      } else if (userAgent.includes('orca') || (window as any).orca) {
        type = 'orca';
        isActive = true;
        hasVirtualCursor = true;
        supportsLiveRegions = true;
      }

      // Additional heuristics for screen reader detection
      if (!isActive) {
        // Check for reduced motion preference (often indicates assistive technology)
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Check for high contrast mode
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
        
        // Check for forced colors (Windows high contrast)
        const forcedColors = window.matchMedia('(forced-colors: active)').matches;
        
        if (prefersReducedMotion || prefersHighContrast || forcedColors) {
          isActive = true;
          type = 'unknown';
          hasVirtualCursor = true; // Assume virtual cursor for unknown screen readers
        }
      }

      setScreenReaderInfo({
        isActive,
        type,
        hasVirtualCursor,
        supportsLiveRegions
      });
    };

    // Initial detection
    detectScreenReader();

    // Listen for changes in media queries
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const forcedColorsQuery = window.matchMedia('(forced-colors: active)');

    const handleMediaChange = () => {
      detectScreenReader();
    };

    reducedMotionQuery.addEventListener('change', handleMediaChange);
    highContrastQuery.addEventListener('change', handleMediaChange);
    forcedColorsQuery.addEventListener('change', handleMediaChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMediaChange);
      highContrastQuery.removeEventListener('change', handleMediaChange);
      forcedColorsQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return screenReaderInfo;
};

/**
 * Hook for optimizing content announcements based on screen reader type
 */
export const useScreenReaderAnnouncements = () => {
  const screenReaderInfo = useScreenReader();

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!screenReaderInfo.isActive) return;

    // Create announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    
    // Optimize message based on screen reader type
    let optimizedMessage = message;
    
    if (screenReaderInfo.type === 'nvda') {
      // NVDA specific optimizations
      optimizedMessage = message.replace(/\./g, '. '); // Add pauses
    } else if (screenReaderInfo.type === 'jaws') {
      // JAWS specific optimizations
      optimizedMessage = message; // JAWS handles most content well
    } else if (screenReaderInfo.type === 'voiceover') {
      // VoiceOver specific optimizations
      optimizedMessage = message.replace(/([A-Z])/g, ' $1'); // Space out abbreviations
    }

    announcement.textContent = optimizedMessage;
    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  const announceNavigation = (section: string, totalSections?: number, currentIndex?: number) => {
    let message = `Navigated to ${section} section`;
    
    if (totalSections && currentIndex !== undefined) {
      message += `. Section ${currentIndex + 1} of ${totalSections}`;
    }
    
    announce(message, 'polite');
  };

  const announceStateChange = (element: string, newState: string) => {
    announce(`${element} ${newState}`, 'assertive');
  };

  const announceError = (error: string) => {
    announce(`Error: ${error}`, 'assertive');
  };

  const announceSuccess = (success: string) => {
    announce(`Success: ${success}`, 'polite');
  };

  return {
    announce,
    announceNavigation,
    announceStateChange,
    announceError,
    announceSuccess,
    screenReaderInfo
  };
}; 