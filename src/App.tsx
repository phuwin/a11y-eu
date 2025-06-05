import React from 'react';
import Navigation from './components/common/Navigation';
import Hero from './components/sections/Hero';
import Timeline from './components/sections/Timeline';
import Requirements from './components/sections/Requirements';
import ComplianceChecker from './components/accessibility/ComplianceChecker';
import DeveloperRoles from './components/sections/DeveloperRoles';
import MotorAccessibility from './components/accessibility/MotorAccessibility';
import EducationalContent from './components/sections/EducationalContent';

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

          {/* Educational Content Section */}
          <EducationalContent />
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
