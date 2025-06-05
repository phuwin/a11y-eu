import React, { useState, useEffect } from 'react';
import { useScreenReaderAnnouncements } from '../../hooks/useScreenReader';

interface MotorAccessibilityProps {
  children: React.ReactNode;
}

interface MotorSettings {
  reducedMotion: boolean;
  largeTargets: boolean;
  stickyHover: boolean;
  dwellClick: boolean;
  dwellTime: number;
  highContrast: boolean;
}

const MotorAccessibility: React.FC<MotorAccessibilityProps> = ({ children }) => {
  const [settings, setSettings] = useState<MotorSettings>({
    reducedMotion: false,
    largeTargets: false,
    stickyHover: false,
    dwellClick: false,
    dwellTime: 1000,
    highContrast: false
  });
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dwellTarget, setDwellTarget] = useState<HTMLElement | null>(null);
  const [dwellTimer, setDwellTimer] = useState<NodeJS.Timeout | null>(null);
  
  const { announceStateChange, announceSuccess } = useScreenReaderAnnouncements();

  // Detect user preferences on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    setSettings(prev => ({
      ...prev,
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast
    }));
  }, []);

  // Apply CSS custom properties based on settings
  useEffect(() => {
    const root = document.documentElement;
    
    // Reduced motion
    root.style.setProperty('--animation-duration', settings.reducedMotion ? '0s' : '0.3s');
    root.style.setProperty('--transition-duration', settings.reducedMotion ? '0s' : '0.2s');
    
    // Large targets
    root.style.setProperty('--min-target-size', settings.largeTargets ? '56px' : '44px');
    root.style.setProperty('--target-padding', settings.largeTargets ? '16px' : '12px');
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Large targets class
    if (settings.largeTargets) {
      document.body.classList.add('large-targets');
    } else {
      document.body.classList.remove('large-targets');
    }
  }, [settings]);

  // Dwell click functionality
  useEffect(() => {
    if (!settings.dwellClick) return;

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Only trigger on interactive elements
      if (!target.matches('button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]')) {
        return;
      }

      setDwellTarget(target);
      
      // Add visual indicator
      target.style.outline = '3px solid #fbbf24';
      target.style.outlineOffset = '2px';
      
      const timer = setTimeout(() => {
        target.click();
        announceSuccess('Dwell click activated');
        setDwellTarget(null);
      }, settings.dwellTime);
      
      setDwellTimer(timer);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (dwellTimer) {
        clearTimeout(dwellTimer);
        setDwellTimer(null);
      }
      
      // Remove visual indicator
      target.style.outline = '';
      target.style.outlineOffset = '';
      setDwellTarget(null);
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (dwellTimer) {
        clearTimeout(dwellTimer);
      }
    };
  }, [settings.dwellClick, settings.dwellTime, dwellTimer, announceSuccess]);

  const toggleSetting = (key: keyof MotorSettings) => {
    setSettings(prev => {
      const newValue = !prev[key];
      setSettings({ ...prev, [key]: newValue });
      announceStateChange(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`, newValue ? 'enabled' : 'disabled');
      return { ...prev, [key]: newValue };
    });
  };

  const updateDwellTime = (time: number) => {
    setSettings(prev => ({ ...prev, dwellTime: time }));
    announceStateChange('Dwell time', `${time / 1000} seconds`);
  };

  const resetSettings = () => {
    setSettings({
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      largeTargets: false,
      stickyHover: false,
      dwellClick: false,
      dwellTime: 1000,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches
    });
    announceSuccess('Motor accessibility settings reset to defaults');
  };

  return (
    <div className="motor-accessibility-wrapper">
      {/* Accessibility Settings Panel */}
      <div className={`fixed bottom-20 right-4 z-50 transition-transform duration-300 ${
        isSettingsOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Motor Accessibility Settings
          </h3>
          
          <div className="space-y-4">
            {/* Reduced Motion */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="reduced-motion"
                checked={settings.reducedMotion}
                onChange={() => toggleSetting('reducedMotion')}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-4 focus:ring-blue-300 
                         border-gray-300 rounded"
              />
              <label htmlFor="reduced-motion" className="cursor-pointer">
                <div className="font-medium text-gray-900">Reduce Motion</div>
                <div className="text-sm text-gray-600">
                  Minimize animations and transitions
                </div>
              </label>
            </div>

            {/* Large Targets */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="large-targets"
                checked={settings.largeTargets}
                onChange={() => toggleSetting('largeTargets')}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-4 focus:ring-blue-300 
                         border-gray-300 rounded"
              />
              <label htmlFor="large-targets" className="cursor-pointer">
                <div className="font-medium text-gray-900">Large Touch Targets</div>
                <div className="text-sm text-gray-600">
                  Increase button and link sizes (56px minimum)
                </div>
              </label>
            </div>

            {/* High Contrast */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="high-contrast"
                checked={settings.highContrast}
                onChange={() => toggleSetting('highContrast')}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-4 focus:ring-blue-300 
                         border-gray-300 rounded"
              />
              <label htmlFor="high-contrast" className="cursor-pointer">
                <div className="font-medium text-gray-900">High Contrast</div>
                <div className="text-sm text-gray-600">
                  Enhance color contrast for better visibility
                </div>
              </label>
            </div>

            {/* Dwell Click */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="dwell-click"
                checked={settings.dwellClick}
                onChange={() => toggleSetting('dwellClick')}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-4 focus:ring-blue-300 
                         border-gray-300 rounded"
              />
              <label htmlFor="dwell-click" className="cursor-pointer">
                <div className="font-medium text-gray-900">Dwell Click</div>
                <div className="text-sm text-gray-600">
                  Activate elements by hovering for a set time
                </div>
              </label>
            </div>

            {/* Dwell Time Setting */}
            {settings.dwellClick && (
              <div className="ml-8 pt-2 border-l-2 border-gray-200 pl-4">
                <label className="block">
                  <div className="font-medium text-gray-900 mb-2">
                    Dwell Time: {settings.dwellTime / 1000}s
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="3000"
                    step="250"
                    value={settings.dwellTime}
                    onChange={(e) => updateDwellTime(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                             focus:outline-none focus:ring-4 focus:ring-blue-300"
                    aria-label="Dwell time in milliseconds"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0.5s</span>
                    <span>3.0s</span>
                  </div>
                </label>
              </div>
            )}

            {/* Sticky Hover */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.stickyHover}
                onChange={() => toggleSetting('stickyHover')}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-4 focus:ring-blue-300 
                         border-gray-300 rounded"
              />
              <span className="font-medium text-gray-900">Sticky Hover</span>
              <span className="block text-sm text-gray-600">
                Maintain hover states until clicked elsewhere
              </span>
            </label>
          </div>

          {/* Reset Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={resetSettings}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg
                       hover:bg-gray-200 focus:bg-gray-200 transition-colors
                       focus:outline-none focus:ring-4 focus:ring-gray-300
                       font-medium text-sm"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Settings Toggle Button */}
      <button
        onClick={() => {
          setIsSettingsOpen(!isSettingsOpen);
          announceStateChange('Motor accessibility settings', isSettingsOpen ? 'closed' : 'opened');
        }}
        className="fixed bottom-4 right-4 z-50 bg-blue-800 text-white p-3 rounded-full
                   hover:bg-blue-900 focus:bg-blue-900 transition-colors
                   focus:outline-none focus:ring-4 focus:ring-blue-300
                   shadow-lg min-w-12 min-h-12"
        aria-label={`${isSettingsOpen ? 'Close' : 'Open'} motor accessibility settings`}
        title="Motor Accessibility Settings"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>

      {/* Dwell Progress Indicator */}
      {settings.dwellClick && dwellTarget && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg font-medium">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Dwell click activating...
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`motor-accessibility-content ${settings.largeTargets ? 'large-targets' : ''}`}>
        {children}
      </div>

      {/* CSS Styles */}
      <style>{`

      `}</style>
    </div>
  );
};

export default MotorAccessibility; 