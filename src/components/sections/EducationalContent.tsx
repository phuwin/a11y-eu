import React from 'react';

const EducationalContent: React.FC = () => {
  return (
    <section 
      className="educational-content py-16 px-4 bg-gray-50"
      aria-labelledby="education-heading"
      data-testid="educational-content"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          id="education-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Understanding EU Accessibility Enforcement
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Legal Framework */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Legal Framework Evolution
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Directive 2016/2102 (2018)
                </h4>
                <p className="text-gray-700">
                  Initially applied only to public sector websites and mobile applications. 
                  Established the foundation for accessibility requirements across the EU.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  European Accessibility Act (June 2025)
                </h4>
                <p className="text-gray-700">
                  Extends accessibility obligations to private sector digital services. 
                  Covers e-commerce, banking, e-books, and more consumer-facing platforms.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Affected Services
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• E-commerce platforms</li>
                  <li>• Online banking and financial services</li>
                  <li>• E-booking platforms</li>
                  <li>• E-learning and e-book platforms</li>
                  <li>• Software with user interfaces</li>
                </ul>
              </div>
            </div>
          </div>
          {/* General Enforcement & Penalties */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Enforcement & Penalties
            </h3>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-500 pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  How Enforcement Works
                </h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Users can file accessibility complaints with national authorities</li>
                  <li>• Authorities investigate and notify companies of violations</li>
                  <li>• Organizations typically have 30 days to address issues</li>
                  <li>• Penalties are imposed for non-compliance</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Penalty Information
                </h4>
                <p className="text-gray-700">
                  Fines for non-compliance can reach up to €15,000 or more, depending on the country and severity of the violation. Repeat offenses may result in higher penalties and public disclosure of non-compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalContent; 