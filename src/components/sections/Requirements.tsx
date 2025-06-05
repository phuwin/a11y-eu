import React, { useState } from 'react';
import { wcagRequirements, WCAgRequirement } from '../../data/euAccessibility';
import { manageFocus } from '../../utils/accessibility';

const Requirements: React.FC = () => {
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'testing' | 'impact'>('examples');
  const [filteredPrinciple, setFilteredPrinciple] = useState<string>('all');

  const handleRequirementSelect = (requirementId: string) => {
    const isCurrentlySelected = selectedRequirement === requirementId;
    setSelectedRequirement(isCurrentlySelected ? null : requirementId);
    setActiveTab('examples'); // Reset to examples tab
    
    const requirement = wcagRequirements.find(r => r.id === requirementId);
    if (requirement) {
      manageFocus.announce(
        `${isCurrentlySelected ? 'Collapsed' : 'Expanded'} requirement: ${requirement.title}`
      );
    }
  };

  const handleTabChange = (tab: 'examples' | 'testing' | 'impact') => {
    setActiveTab(tab);
    manageFocus.announce(`Switched to ${tab} tab`);
  };

  const handleFilterChange = (principle: string) => {
    setFilteredPrinciple(principle);
    setSelectedRequirement(null); // Close any open requirements
    manageFocus.announce(`Filtered to ${principle === 'all' ? 'all principles' : principle} requirements`);
  };

  const filteredRequirements = filteredPrinciple === 'all' 
    ? wcagRequirements 
    : wcagRequirements.filter(req => req.principle === filteredPrinciple);

  const getPrincipleColor = (principle: WCAgRequirement['principle']): string => {
    switch (principle) {
      case 'perceivable': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'operable': return 'bg-green-100 text-green-800 border-green-200';
      case 'understandable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'robust': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level: WCAgRequirement['level']): string => {
    switch (level) {
      case 'A': return 'bg-green-800 text-white';
      case 'AA': return 'bg-yellow-800 text-white';
      case 'AAA': return 'bg-red-800 text-white';
      default: return 'bg-gray-800 text-white';
    }
  };

  const principles = [
    { key: 'all', label: 'All Principles', count: wcagRequirements.length },
    { key: 'perceivable', label: 'Perceivable', count: wcagRequirements.filter(r => r.principle === 'perceivable').length },
    { key: 'operable', label: 'Operable', count: wcagRequirements.filter(r => r.principle === 'operable').length },
    { key: 'understandable', label: 'Understandable', count: wcagRequirements.filter(r => r.principle === 'understandable').length },
    { key: 'robust', label: 'Robust', count: wcagRequirements.filter(r => r.principle === 'robust').length }
  ];

  return (
    <section 
      id="requirements"
      className="requirements-section py-16 bg-gray-50"
      aria-labelledby="requirements-heading"
      tabIndex={-1}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            id="requirements-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            WCAG 2.1 AA Requirements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential accessibility requirements with practical examples, testing methods, 
            and business impact analysis. These standards become mandatory under the EU 
            Accessibility Act from June 2025.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
                      <div 
              className="flex flex-wrap gap-2 justify-center"
              role="tablist"
              aria-label="Filter WCAG requirements by principle"
            >
            {principles.map((principle) => (
              <button
                key={principle.key}
                onClick={() => handleFilterChange(principle.key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors
                           focus:outline-none focus:ring-4 focus:ring-blue-300
                           min-h-44 ${
                  filteredPrinciple === principle.key
                    ? 'bg-blue-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                role="tab"
                aria-selected={filteredPrinciple === principle.key}
                aria-controls="requirements-list"
              >
                {principle.label}
                <span className="ml-2 text-sm opacity-75">
                  ({principle.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Requirements list */}
        <div 
          id="requirements-list"
          className="space-y-6"
          role="tabpanel"
          aria-labelledby={`filter-${filteredPrinciple}`}
        >
          {filteredRequirements.map((requirement) => {
            const isSelected = selectedRequirement === requirement.id;
            
            return (
              <div
                key={requirement.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Requirement header */}
                <button
                  onClick={() => handleRequirementSelect(requirement.id)}
                  className="w-full text-left p-6 hover:bg-gray-50 focus:bg-gray-50
                           transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                  aria-expanded={isSelected}
                  aria-controls={`requirement-details-${requirement.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Title and guideline */}
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {requirement.title}
                        </h3>
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {requirement.guideline}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${getLevelColor(requirement.level)}`}>
                          Level {requirement.level}
                        </span>
                      </div>

                      {/* Principle badge */}
                      <div className="mb-3">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getPrincipleColor(requirement.principle)}`}>
                          {requirement.principle.charAt(0).toUpperCase() + requirement.principle.slice(1)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed">
                        {requirement.description}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <div className="flex-shrink-0">
                      <span 
                        className="text-gray-400 text-xl"
                        aria-hidden="true"
                      >
                        {isSelected ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {isSelected && (
                  <div
                    id={`requirement-details-${requirement.id}`}
                    className="border-t border-gray-200"
                    role="region"
                    aria-labelledby={`requirement-${requirement.id}-tabs`}
                  >
                    {/* Tab navigation */}
                    <div 
                      className="flex border-b border-gray-200 bg-gray-50"
                      role="tablist"
                      aria-label={`${requirement.title} details`}
                    >
                      {[
                        { key: 'examples', label: 'Code Examples' },
                        { key: 'testing', label: 'Testing Methods' },
                        { key: 'impact', label: 'Business Impact' }
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => handleTabChange(tab.key as any)}
                          className={`px-6 py-3 font-semibold transition-colors
                                     focus:outline-none focus:ring-4 focus:ring-blue-300
                                     ${activeTab === tab.key
                                       ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                                       : 'text-gray-600 hover:text-gray-900'
                                     }`}
                          role="tab"
                          aria-selected={activeTab === tab.key}
                          aria-controls={`${requirement.id}-${tab.key}-panel`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab content */}
                    <div className="p-6">
                      {/* Examples tab */}
                      {activeTab === 'examples' && (
                        <div
                          id={`${requirement.id}-examples-panel`}
                          role="tabpanel"
                          aria-labelledby={`${requirement.id}-examples-tab`}
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Good examples */}
                            <div>
                              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                <span aria-hidden="true">✅</span>
                                Good Examples
                              </h4>
                              <ul className="space-y-3">
                                {requirement.examples.good.map((example, index) => (
                                  <li key={index} className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                                    <code className="text-sm text-green-800 break-all">
                                      {example}
                                    </code>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Bad examples */}
                            <div>
                              <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                                <span aria-hidden="true">❌</span>
                                Avoid These
                              </h4>
                              <ul className="space-y-3">
                                {requirement.examples.bad.map((example, index) => (
                                  <li key={index} className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                                    <code className="text-sm text-red-800 break-all">
                                      {example}
                                    </code>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Testing tab */}
                      {activeTab === 'testing' && (
                        <div
                          id={`${requirement.id}-testing-panel`}
                          role="tabpanel"
                          aria-labelledby={`${requirement.id}-testing-tab`}
                        >
                          <h4 className="font-semibold text-gray-900 mb-4">
                            How to Test This Requirement
                          </h4>
                          <ul className="space-y-3">
                            {requirement.testingMethods.map((method, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-blue-600 mt-1 flex-shrink-0" aria-hidden="true">
                                  🔍
                                </span>
                                <span className="text-gray-700">{method}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Impact tab */}
                      {activeTab === 'impact' && (
                        <div
                          id={`${requirement.id}-impact-panel`}
                          role="tabpanel"
                          aria-labelledby={`${requirement.id}-impact-tab`}
                        >
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Why This Matters for Your Business
                          </h4>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-blue-900">
                              {requirement.businessImpact}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick action section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Testing?
          </h3>
          <p className="text-gray-600 mb-6">
            Use these tools to begin auditing your websites for WCAG 2.1 AA compliance:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Automated Testing</h4>
              <p className="text-gray-600 text-sm">axe-core browser extension for quick scans</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Manual Testing</h4>
              <p className="text-gray-600 text-sm">Keyboard navigation and screen reader testing</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Expert Review</h4>
              <p className="text-gray-600 text-sm">Professional accessibility audit and remediation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements; 