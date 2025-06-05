import React, { useState } from 'react';
import { developerRoles, DeveloperRole } from '../../data/euAccessibility';
import { manageFocus } from '../../utils/accessibility';

const DeveloperRoles: React.FC = () => {
  const [activeRole, setActiveRole] = useState<DeveloperRole['role']>('freelancer');

  const handleRoleChange = (role: DeveloperRole['role']) => {
    setActiveRole(role);
    manageFocus.announce(`Switched to ${role} role guidance`);
  };

  const handleKeyNavigation = (event: React.KeyboardEvent, roles: DeveloperRole['role'][]) => {
    const currentIndex = roles.indexOf(activeRole);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex === 0 ? roles.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % roles.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = roles.length - 1;
        break;
    }

    if (newIndex !== currentIndex) {
      setActiveRole(roles[newIndex]);
      manageFocus.announce(`Switched to ${roles[newIndex]} role guidance`);
    }
  };

  const getRoleIcon = (role: DeveloperRole['role']): string => {
    switch (role) {
      case 'freelancer': return '👤';
      case 'agency': return '🏢';
      case 'cto': return '⚡';
      default: return '💼';
    }
  };

  const getRoleTitle = (role: DeveloperRole['role']): string => {
    switch (role) {
      case 'freelancer': return 'Freelancer Developer';
      case 'agency': return 'Agency Team';
      case 'cto': return 'CTO / Tech Leader';
      default: return 'Developer';
    }
  };

  const getLiabilityColor = (role: DeveloperRole['role']): string => {
    switch (role) {
      case 'freelancer': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'agency': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'cto': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const currentRole = developerRoles.find(role => role.role === activeRole);
  const roleKeys = developerRoles.map(role => role.role);

  return (
    <section 
      id="roles"
      className="py-16 bg-white"
      aria-labelledby="roles-heading"
      tabIndex={-1}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            id="roles-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Developer Role Responsibilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand your specific responsibilities and action items based on your role 
            in the development process. Each role has different levels of liability and requirements.
          </p>
        </div>

        {/* Role selector tabs */}
        <div className="mb-8">
          <div 
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Developer role selection"
          >
            {developerRoles.map((role) => (
              <button
                key={role.role}
                onClick={() => handleRoleChange(role.role)}
                onKeyDown={(e) => handleKeyNavigation(e, roleKeys)}
                className={`px-6 py-4 rounded-lg font-semibold transition-colors
                           focus:outline-none focus:ring-4 focus:ring-blue-300
                           min-h-44 ${
                  activeRole === role.role
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                role="tab"
                aria-selected={activeRole === role.role}
                aria-controls={`role-panel-${role.role}`}
                id={`role-tab-${role.role}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {getRoleIcon(role.role)}
                  </span>
                  <div className="text-left">
                    <div className="font-bold">{getRoleTitle(role.role)}</div>
                    <div className={`text-sm ${
                      activeRole === role.role ? 'text-white' : 'text-gray-700'
                    }`}>
                      {role.role === 'freelancer' && 'Individual developers'}
                      {role.role === 'agency' && 'Development teams'}
                      {role.role === 'cto' && 'Technical leadership'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Tab navigation instructions */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Use arrow keys to navigate between roles, or click to select
            </p>
          </div>
        </div>

        {/* Role content */}
        {currentRole && (
          <div
            id={`role-panel-${activeRole}`}
            role="tabpanel"
            aria-labelledby={`role-tab-${activeRole}`}
            className="bg-gray-50 rounded-lg p-8"
          >
            {/* Role header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl" role="img" aria-hidden="true">
                {getRoleIcon(activeRole)}
              </span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {getRoleTitle(activeRole)}
                </h3>
                <p className="text-gray-600 mt-1">
                  Specific guidance for your role in EU accessibility compliance
                </p>
              </div>
            </div>

            {/* Liability warning */}
            <div className={`p-6 rounded-lg border-2 mb-8 ${getLiabilityColor(activeRole)}`}>
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <span aria-hidden="true">⚖️</span>
                Liability & Risk Level
              </h4>
              <p className="leading-relaxed">
                {currentRole.liability}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Responsibilities */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-800" aria-hidden="true">📋</span>
                  Your Responsibilities
                </h4>
                <ul className="space-y-3">
                  {currentRole.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-800 mt-1 flex-shrink-0" aria-hidden="true">
                        •
                      </span>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-800" aria-hidden="true">✅</span>
                  Action Items
                </h4>
                <ul className="space-y-3">
                  {currentRole.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-800 mt-1 flex-shrink-0" aria-hidden="true">
                        {index + 1}.
                      </span>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-600" aria-hidden="true">📅</span>
                Implementation Timeline
              </h4>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-purple-800 font-medium">
                  {currentRole.timeline}
                </p>
              </div>
            </div>

            {/* Quick tools section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="text-xl font-bold text-blue-900 mb-4">
                Quick Start Tools & Resources
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold text-gray-900 mb-2">Testing Tools</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• axe-core browser extension</li>
                    <li>• WAVE accessibility checker</li>
                    <li>• Lighthouse accessibility audit</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold text-gray-900 mb-2">Screen Readers</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• NVDA (Windows, free)</li>
                    <li>• JAWS (Windows, commercial)</li>
                    <li>• VoiceOver (macOS, built-in)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold text-gray-900 mb-2">Guidelines</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• WCAG 2.1 AA guidelines</li>
                    <li>• EU Web Accessibility Directive</li>
                    <li>• MDN Accessibility docs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Common checklist for all roles */}
        <div className="mt-12 bg-gray-900 text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Universal Checklist: Before June 28, 2025
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Q4 2024</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Accessibility strategy planning</li>
                <li>• Team training initiation</li>
                <li>• Audit existing projects</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Q1 2025</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Implement accessibility fixes</li>
                <li>• Establish testing processes</li>
                <li>• Document compliance measures</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">Q2 2025</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Final compliance verification</li>
                <li>• Professional audit (recommended)</li>
                <li>• Staff training completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-3">June 28, 2025</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Full compliance required</strong></li>
                <li>• Active enforcement begins</li>
                <li>• Penalty risk becomes real</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Role comparison */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Role Comparison Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Aspect
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Freelancer
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Agency
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    CTO
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Liability Level
                  </td>
                  <td className="px-6 py-4 text-yellow-800">
                    Limited/Reputation risk
                  </td>
                  <td className="px-6 py-4 text-orange-800">
                    Shared responsibility
                  </td>
                  <td className="px-6 py-4 text-red-800">
                    Full corporate liability
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Primary Focus
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Code compliance
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Team processes
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Strategic governance
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Timeline Priority
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Immediate learning
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Q1 2025 readiness
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    Q4 2024 strategy
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperRoles; 