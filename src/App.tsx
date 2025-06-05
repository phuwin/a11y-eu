import React from 'react';
import Navigation from './components/common/Navigation';
import Hero from './components/sections/Hero';
import Timeline from './components/sections/Timeline';
import Requirements from './components/sections/Requirements';
import ComplianceChecker from './components/accessibility/ComplianceChecker';
import DeveloperRoles from './components/sections/DeveloperRoles';

function App() {
  return (
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

        {/* Phase 3 Complete Section */}
        <section className="py-16 bg-white" aria-labelledby="phase3-heading">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h2 
                id="phase3-heading"
                className="text-3xl font-bold text-gray-900 mb-6"
              >
                🎉 Phase 3 Complete: Interactive Features
              </h2>
              
              <div className="bg-green-50 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  ✅ Interactive Features Implemented
                </h3>
                
                <ul className="space-y-2 text-green-800 text-left">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Accessibility Compliance Checker with form validation and results
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Interactive assessment tool with WCAG 2.1 AA scoring
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Role-based Developer Guide (Freelancer, Agency, CTO)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Tabbed interface with keyboard navigation and ARIA support
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Liability warnings and role-specific action items
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Implementation timelines and resource recommendations
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Universal compliance checklist and role comparison table
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Ready for Phase 4
                  </h4>
                  <p className="text-blue-800">
                    Interactive features are complete with comprehensive developer guidance. 
                    Next: Advanced accessibility features (screen reader optimization, keyboard navigation enhancements).
                  </p>
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
  );
}

export default App;
