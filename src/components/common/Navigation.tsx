import React, { useState } from 'react';
import { manageFocus } from '../../utils/accessibility';

interface NavigationProps {
  onNavigateToSection?: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigateToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'timeline', label: 'Timeline', description: 'EU accessibility legislation timeline' },
    { id: 'requirements', label: 'WCAG Requirements', description: 'Detailed accessibility requirements with examples' },
    { id: 'compliance-checker', label: 'Compliance Checker', description: 'Interactive accessibility assessment tool' },
    { id: 'roles', label: 'Developer Roles', description: 'Role-specific responsibilities and actions' }
  ];

  const handleNavigation = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.focus();
      }
    }
    
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
    
    // Announce navigation for screen readers
    manageFocus.announce(`Navigating to ${sectionId.replace('-', ' ')} section`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    manageFocus.announce(
      `Mobile menu ${!isMobileMenuOpen ? 'opened' : 'closed'}`
    );
  };

  return (
    <nav 
      className="bg-white border-b border-gray-200 sticky top-0 z-40"
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                manageFocus.announce('Scrolled to top of page');
              }}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 
                         focus:outline-none focus:ring-4 focus:ring-blue-300 rounded
                         p-2 transition-colors"
              aria-label="Return to top of page"
            >
              EU A11y Guide
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium
                             transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300
                             focus:bg-gray-100 hover:bg-gray-100 min-h-44"
                  aria-describedby={`nav-${item.id}-desc`}
                >
                  {item.label}
                  <span id={`nav-${item.id}-desc`} className="sr-only">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md 
                         text-gray-600 hover:text-gray-900 hover:bg-gray-200 
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         min-w-44 min-h-44"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main navigation menu"
            >
              {/* Menu icon */}
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close' : 'Open'} main menu
              </span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 py-4"
            role="region"
            aria-label="Mobile navigation menu"
          >
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md 
                             text-base font-medium w-full text-left transition-colors
                             focus:outline-none focus:ring-4 focus:ring-blue-300
                             focus:bg-gray-100 hover:bg-gray-100 min-h-44"
                  aria-describedby={`mobile-nav-${item.id}-desc`}
                >
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div 
                      id={`mobile-nav-${item.id}-desc`}
                      className="text-sm text-gray-500 mt-1"
                    >
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="px-3">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  Compliance Deadline
                </div>
                <div className="text-sm text-gray-600">
                  <time dateTime="2025-06-28">June 28, 2025</time>
                  <span className="block text-xs text-red-600 mt-1">
                    ⚠️ 156 days remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: '67%' }} // Approximately 2/3 through to June 2025
          role="progressbar"
          aria-label="Time until EU accessibility compliance deadline"
          aria-valuenow={67}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext="67% of time until June 28, 2025 deadline has passed"
        />
      </div>
    </nav>
  );
};

export default Navigation; 