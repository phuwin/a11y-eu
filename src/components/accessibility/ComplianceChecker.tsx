import React, { useState, useRef } from 'react';
import { manageFocus } from '../../utils/accessibility';

interface ComplianceResult {
  category: string;
  score: number;
  maxScore: number;
  issues: string[];
  recommendations: string[];
}

interface FormData {
  websiteUrl: string;
  hasImages: boolean;
  hasImagesWithAlt: boolean;
  hasKeyboardNavigation: boolean;
  hasSkipLinks: boolean;
  hasFocusIndicators: boolean;
  hasHeadingStructure: boolean;
  hasColorContrast: boolean;
  hasFormLabels: boolean;
  hasErrorHandling: boolean;
  hasScreenReaderTesting: boolean;
}

const ComplianceChecker: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    websiteUrl: '',
    hasImages: false,
    hasImagesWithAlt: false,
    hasKeyboardNavigation: false,
    hasSkipLinks: false,
    hasFocusIndicators: false,
    hasHeadingStructure: false,
    hasColorContrast: false,
    hasFormLabels: false,
    hasErrorHandling: false,
    hasScreenReaderTesting: false
  });

  const [results, setResults] = useState<ComplianceResult[] | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.websiteUrl.trim()) {
      newErrors.websiteUrl = 'Website URL is required';
    } else if (!isValidUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const calculateCompliance = (): ComplianceResult[] => {
    const results: ComplianceResult[] = [
      {
        category: 'Perceivable',
        score: 0,
        maxScore: 3,
        issues: [],
        recommendations: []
      },
      {
        category: 'Operable',
        score: 0,
        maxScore: 3,
        issues: [],
        recommendations: []
      },
      {
        category: 'Understandable',
        score: 0,
        maxScore: 2,
        issues: [],
        recommendations: []
      },
      {
        category: 'Robust',
        score: 0,
        maxScore: 2,
        issues: [],
        recommendations: []
      }
    ];

    // Perceivable checks
    if (formData.hasImages && !formData.hasImagesWithAlt) {
      results[0].issues.push('Images missing alternative text');
      results[0].recommendations.push('Add descriptive alt text to all images');
    } else if (formData.hasImagesWithAlt || !formData.hasImages) {
      results[0].score += 1;
    }

    if (formData.hasColorContrast) {
      results[0].score += 1;
    } else {
      results[0].issues.push('Color contrast may not meet WCAG AA standards');
      results[0].recommendations.push('Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text');
    }

    if (formData.hasHeadingStructure) {
      results[0].score += 1;
    } else {
      results[0].issues.push('Heading structure not properly implemented');
      results[0].recommendations.push('Use logical heading hierarchy (h1 → h2 → h3)');
    }

    // Operable checks
    if (formData.hasKeyboardNavigation) {
      results[1].score += 1;
    } else {
      results[1].issues.push('Keyboard navigation not fully implemented');
      results[1].recommendations.push('Ensure all interactive elements are keyboard accessible');
    }

    if (formData.hasSkipLinks) {
      results[1].score += 1;
    } else {
      results[1].issues.push('Skip links missing');
      results[1].recommendations.push('Add skip navigation links for keyboard users');
    }

    if (formData.hasFocusIndicators) {
      results[1].score += 1;
    } else {
      results[1].issues.push('Focus indicators not visible');
      results[1].recommendations.push('Implement high-contrast focus indicators');
    }

    // Understandable checks
    if (formData.hasFormLabels) {
      results[2].score += 1;
    } else {
      results[2].issues.push('Form labels missing or inadequate');
      results[2].recommendations.push('Associate labels with form controls using proper markup');
    }

    if (formData.hasErrorHandling) {
      results[2].score += 1;
    } else {
      results[2].issues.push('Error identification and handling needs improvement');
      results[2].recommendations.push('Provide clear error messages and recovery suggestions');
    }

    // Robust checks
    if (formData.hasScreenReaderTesting) {
      results[3].score += 1;
    } else {
      results[3].issues.push('Screen reader testing not performed');
      results[3].recommendations.push('Test with NVDA, JAWS, or VoiceOver screen readers');
    }

    // Additional robust check (semantic markup)
    const semanticScore = (formData.hasHeadingStructure && formData.hasFormLabels) ? 1 : 0;
    results[3].score += semanticScore;
    if (semanticScore === 0) {
      results[3].issues.push('Semantic markup needs improvement');
      results[3].recommendations.push('Use proper HTML semantics and ARIA landmarks');
    }

    return results;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      manageFocus.announce('Form has validation errors. Please review and correct.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const complianceResults = calculateCompliance();
      setResults(complianceResults);
      setIsSubmitting(false);
      
      // Focus and announce results
      if (resultsRef.current) {
        resultsRef.current.focus();
        manageFocus.announce('Compliance check complete. Results are now displayed.');
      }
    }, 1500);
  };

  const handleInputChange = (field: keyof FormData, value: boolean | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getOverallScore = (): { score: number; maxScore: number; percentage: number } => {
    if (!results) return { score: 0, maxScore: 0, percentage: 0 };
    
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalMaxScore = results.reduce((sum, result) => sum + result.maxScore, 0);
    const percentage = Math.round((totalScore / totalMaxScore) * 100);
    
    return { score: totalScore, maxScore: totalMaxScore, percentage };
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <section 
      id="compliance-checker"
      className="compliance-checker py-16 bg-gray-50"
      aria-labelledby="checker-heading"
      tabIndex={-1}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            id="checker-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Accessibility Compliance Checker
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Evaluate your website's accessibility compliance with WCAG 2.1 AA standards. 
            This tool provides a preliminary assessment to help identify areas for improvement.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} noValidate>
            {/* Website URL */}
            <div className="mb-6">
              <label 
                htmlFor="website-url"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Website URL <span className="text-red-600" aria-label="required">*</span>
              </label>
              <input
                type="url"
                id="website-url"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-4 
                           focus:ring-blue-300 transition-colors min-h-44 ${
                  errors.websiteUrl 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="https://example.com"
                aria-invalid={!!errors.websiteUrl}
                aria-describedby={errors.websiteUrl ? 'url-error' : 'url-hint'}
                required
              />
              {errors.websiteUrl && (
                <div 
                  id="url-error"
                  className="mt-2 text-sm text-red-600"
                  role="alert"
                >
                  {errors.websiteUrl}
                </div>
              )}
              <div id="url-hint" className="mt-2 text-sm text-gray-600">
                Enter the full URL of the website you want to check
              </div>
            </div>

            {/* Accessibility Checklist */}
            <fieldset className="mb-8">
              <legend className="text-lg font-semibold text-gray-900 mb-4">
                Accessibility Features Assessment
              </legend>
              <p className="text-sm text-gray-600 mb-6">
                Check all features that are currently implemented on your website:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Images */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-base">Images & Media</h3>
                  
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasImages}
                      onChange={(e) => handleInputChange('hasImages', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Website contains images
                    </span>
                  </label>

                  {formData.hasImages && (
                    <label className="flex items-start gap-3 ml-7">
                      <input
                        type="checkbox"
                        checked={formData.hasImagesWithAlt}
                        onChange={(e) => handleInputChange('hasImagesWithAlt', e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                                 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        All images have descriptive alt text
                      </span>
                    </label>
                  )}
                </div>

                {/* Navigation */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-base">Navigation</h3>
                  
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasKeyboardNavigation}
                      onChange={(e) => handleInputChange('hasKeyboardNavigation', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Full keyboard navigation support
                    </span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasSkipLinks}
                      onChange={(e) => handleInputChange('hasSkipLinks', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Skip navigation links
                    </span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasFocusIndicators}
                      onChange={(e) => handleInputChange('hasFocusIndicators', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Visible focus indicators
                    </span>
                  </label>
                </div>

                {/* Content Structure */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-base">Content Structure</h3>
                  
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasHeadingStructure}
                      onChange={(e) => handleInputChange('hasHeadingStructure', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Logical heading hierarchy (h1, h2, h3...)
                    </span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasColorContrast}
                      onChange={(e) => handleInputChange('hasColorContrast', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Sufficient color contrast (4.5:1 ratio)
                    </span>
                  </label>
                </div>

                {/* Forms & Testing */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-base">Forms & Testing</h3>
                  
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasFormLabels}
                      onChange={(e) => handleInputChange('hasFormLabels', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Form fields have proper labels
                    </span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasErrorHandling}
                      onChange={(e) => handleInputChange('hasErrorHandling', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Clear error identification and handling
                    </span>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.hasScreenReaderTesting}
                      onChange={(e) => handleInputChange('hasScreenReaderTesting', e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-4 focus:ring-blue-300 
                               border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Tested with screen readers
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold
                         hover:bg-blue-700 focus:bg-blue-700 transition-colors
                         focus:outline-none focus:ring-4 focus:ring-blue-300
                         disabled:bg-gray-400 disabled:cursor-not-allowed
                         min-w-44 min-h-44"
                aria-describedby="submit-hint"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" 
                          aria-hidden="true"></span>
                    Analyzing...
                  </span>
                ) : (
                  'Check Compliance'
                )}
              </button>
              <div id="submit-hint" className="mt-2 text-sm text-gray-600">
                This will analyze your responses and provide a compliance assessment
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        {results && (
          <div 
            ref={resultsRef}
            className="mt-12 bg-white rounded-lg shadow-md p-8"
            tabIndex={-1}
            aria-labelledby="results-heading"
          >
            <h3 id="results-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Compliance Assessment Results
            </h3>

            {/* Overall Score */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(getOverallScore().percentage)}`}>
                  {getOverallScore().percentage}%
                </div>
                <div className="text-gray-600">
                  Overall Compliance Score ({getOverallScore().score}/{getOverallScore().maxScore})
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      getOverallScore().percentage >= 80 ? 'bg-green-500' :
                      getOverallScore().percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${getOverallScore().percentage}%` }}
                    role="progressbar"
                    aria-valuenow={getOverallScore().percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Compliance score: ${getOverallScore().percentage} percent`}
                  />
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div key={result.category} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {result.category}
                    </h4>
                    <span className={`text-lg font-bold ${
                      result.score === result.maxScore ? 'text-green-800' :
                      result.score > result.maxScore / 2 ? 'text-yellow-800' : 'text-red-800'
                    }`}>
                      {result.score}/{result.maxScore}
                    </span>
                  </div>

                  {result.issues.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-semibold text-red-700 mb-2">Issues Found:</h5>
                      <ul className="space-y-1">
                        {result.issues.map((issue, issueIndex) => (
                          <li key={issueIndex} className="text-sm text-red-600 flex items-start gap-2">
                            <span aria-hidden="true">•</span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.recommendations.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-blue-700 mb-2">Recommendations:</h5>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="text-sm text-blue-600 flex items-start gap-2">
                            <span aria-hidden="true">→</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Next Steps */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">
                Next Steps for EU Compliance
              </h4>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">1.</span>
                  Address high-priority issues identified above
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">2.</span>
                  Conduct automated testing with axe-core or similar tools
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">3.</span>
                  Perform manual testing with screen readers (NVDA, JAWS, VoiceOver)
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">4.</span>
                  Consider professional accessibility audit before June 28, 2025
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComplianceChecker; 