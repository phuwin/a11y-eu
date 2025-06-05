import React from 'react';
import Navigation from './components/common/Navigation';
import Hero from './components/sections/Hero';
import Timeline from './components/sections/Timeline';
import Requirements from './components/sections/Requirements';
import ComplianceChecker from './components/accessibility/ComplianceChecker';
import DeveloperRoles from './components/sections/DeveloperRoles';
import MotorAccessibility from './components/accessibility/MotorAccessibility';

function App() {
  return (
    <MotorAccessibility>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                     bg-blue-600 text-white px-4 py-2 rounded-md font-semibold z-50
                     focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector('#main-content');
            if (target) {
              (target as HTMLElement).focus();
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Skip to main content
        </a>

        {/* Header */}
        <header 
          className="bg-white shadow-sm border-b border-gray-200"
          role="banner"
        >
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              EU Accessibility Compliance Guide
            </h1>
            <p className="text-gray-600 mt-2">
              Learn about mandatory accessibility requirements from June 2025
            </p>
          </div>
        </header>

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main 
          id="main-content"
          tabIndex={-1}
          className="flex-1"
          role="main"
          aria-label="Main content"
        >
          {/* Hero Section */}
          <Hero />

          {/* Timeline Section */}
          <Timeline />

          {/* Requirements Section */}
          <Requirements />

          {/* Compliance Checker Section */}
          <ComplianceChecker />

          {/* Developer Roles Section */}
          <DeveloperRoles />

          {/* Phase 4 Complete Section */}
          <section className="py-16 bg-white" aria-labelledby="phase4-heading">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center">
                <h2 
                  id="phase4-heading"
                  className="text-3xl font-bold text-blue-900 mb-6"
                >
                  🚀 Phase 4 Complete: Advanced Accessibility
                </h2>
                <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    Advanced Accessibility Features Now Live
                  </h3>
                  <ul className="space-y-2 text-blue-800 text-left">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      ARIA landmarks and skip links for screen readers
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      Live region announcements for dynamic content
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      Enhanced keyboard navigation and focus management
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      Motor accessibility accommodations (large targets, reduced motion, dwell click)
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      High-contrast mode and visible focus indicators
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-100 rounded-lg text-blue-900">
                    <strong>Tip:</strong> Try the accessibility settings panel (gear icon) in the top right to explore motor and visual accommodations.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer 
          className="bg-gray-800 text-white py-8 mt-auto"
          role="contentinfo"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>EU Accessibility Compliance Guide - Built with accessibility in mind</p>
          </div>
        </footer>
      </div>
    </MotorAccessibility>
  );
}

export default App;
