import React from 'react';

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

      {/* Navigation will be added in Phase 2 */}
      <nav 
        className="bg-white border-b border-gray-200"
        role="navigation" 
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-gray-500">Navigation will be implemented in Phase 2</p>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        id="main-content"
        tabIndex={-1}
        className="flex-1 py-8"
        role="main"
        aria-label="Main content"
      >
        <div className="max-w-6xl mx-auto px-4">
          <section aria-labelledby="welcome-heading">
            <h2 
              id="welcome-heading"
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Phase 1 Complete: Foundation Setup
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ✅ Accessibility Foundation Ready
              </h3>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  React TypeScript project initialized
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Tailwind CSS configured with accessibility-focused colors
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  ESLint with jsx-a11y rules active
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Axe-core automated testing enabled
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Project structure with accessibility utilities
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Semantic HTML structure with ARIA landmarks
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Skip links and focus management implemented
                </li>
              </ul>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Ready for Phase 2
                </h4>
                <p className="text-blue-800">
                  The accessibility foundation is now in place. You can proceed to 
                  Phase 2 to implement the core content sections (Hero, Timeline, and Requirements).
                </p>
              </div>
            </div>
          </section>
        </div>
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
