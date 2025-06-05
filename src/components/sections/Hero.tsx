import React from 'react';
import { manageFocus } from '../../utils/accessibility';

interface HeroProps {
  onNavigateToSection?: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToSection }) => {
  const handleNavigation = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      // Fallback to scroll behavior
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.focus();
      }
    }
    
    // Announce navigation for screen readers
    manageFocus.announce(`Navigating to ${sectionId.replace('-', ' ')} section`);
  };

  return (
    <section 
      className="hero-section relative bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 lg:py-24"
      aria-labelledby="hero-heading"
    >
      {/* Background pattern for visual enhancement (decorative) */}
      <div 
        className="absolute inset-0 bg-blue-900 opacity-90" 
        aria-hidden="true"
      />
      
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 
            id="hero-heading"
            className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            EU Accessibility Compliance
            <span className="block text-yellow-400 mt-2">
              From June 2025
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl mb-8 text-white leading-relaxed">
            The European Accessibility Act becomes mandatory on{' '}
            <time dateTime="2025-06-28" className="font-semibold text-yellow-400">
              June 28, 2025
            </time>
            . Learn how to ensure your digital services comply with WCAG 2.1 AA standards.
          </p>

          {/* Key statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 text-center">
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">87M</div>
              <div className="text-white">
                EU citizens with disabilities who benefit from accessibility
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">€15K</div>
              <div className="text-white">
                Maximum penalty for non-compliance in some EU countries
              </div>
            </div>
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">156</div>
              <div className="text-white">
                Days remaining until mandatory compliance
              </div>
            </div>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleNavigation('timeline')}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold 
                         hover:bg-yellow-300 focus:bg-yellow-300 transition-colors
                         focus:outline-none focus:ring-4 focus:ring-yellow-200
                         min-w-44 min-h-44"
              aria-describedby="timeline-button-desc"
            >
              View Timeline
            </button>
            <span id="timeline-button-desc" className="sr-only">
              Navigate to the EU accessibility legislation timeline section
            </span>

            <button
              onClick={() => handleNavigation('requirements')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold
                         hover:bg-white hover:text-blue-900 focus:bg-white focus:text-blue-900
                         transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300
                         min-w-44 min-h-44"
              aria-describedby="requirements-button-desc"
            >
              WCAG Requirements
            </button>
            <span id="requirements-button-desc" className="sr-only">
              Navigate to the WCAG 2.1 AA requirements section with practical examples
            </span>
          </div>

          {/* Urgency indicator */}
          <div className="mt-10 p-4 bg-yellow-400 bg-opacity-20 rounded-lg border border-yellow-400">
            <div className="flex items-center justify-center gap-3">
              <span 
                className="text-yellow-400 text-2xl" 
                aria-hidden="true"
                role="img"
              >
                ⚠️
              </span>
              <p className="text-yellow-100 font-medium">
                <strong>Action Required:</strong> Start accessibility audits now to meet the June 2025 deadline
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Screen reader summary */}
      <div className="sr-only">
        <h2>Page Summary for Screen Readers</h2>
        <p>
          This page provides comprehensive information about EU accessibility compliance 
          requirements that become mandatory on June 28, 2025. The page includes an 
          interactive timeline of legislation, detailed WCAG 2.1 AA requirements with 
          examples, and role-specific guidance for developers, agencies, and CTOs.
        </p>
        <p>
          Key sections include: Timeline of EU accessibility legislation, WCAG requirements 
          with practical examples, developer role responsibilities, and compliance testing tools.
        </p>
      </div>
    </section>
  );
};

export default Hero; 