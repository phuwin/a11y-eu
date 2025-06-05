import React, { useState } from 'react';
import { accessibilityTimeline, TimelineEvent } from '../../data/euAccessibility';
import { manageFocus } from '../../utils/accessibility';

const Timeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleEventSelect = (eventId: string, index: number) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId);
    
    // Announce to screen readers
    const event = accessibilityTimeline.find(e => e.id === eventId);
    if (event) {
      manageFocus.announce(
        `${selectedEvent === eventId ? 'Collapsed' : 'Expanded'} timeline event: ${event.title}`
      );
    }
  };

  const handleKeyNavigation = (event: React.KeyboardEvent, index: number) => {
    const eventId = accessibilityTimeline[index].id;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleEventSelect(eventId, index);
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (index + 1) % accessibilityTimeline.length;
        const nextButton = document.getElementById(`timeline-event-${accessibilityTimeline[nextIndex].id}`);
        nextButton?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = index === 0 ? accessibilityTimeline.length - 1 : index - 1;
        const prevButton = document.getElementById(`timeline-event-${accessibilityTimeline[prevIndex].id}`);
        prevButton?.focus();
        break;
      case 'Home':
        event.preventDefault();
        const firstButton = document.getElementById(`timeline-event-${accessibilityTimeline[0].id}`);
        firstButton?.focus();
        break;
      case 'End':
        event.preventDefault();
        const lastIndex = accessibilityTimeline.length - 1;
        const lastButton = document.getElementById(`timeline-event-${accessibilityTimeline[lastIndex].id}`);
        lastButton?.focus();
        break;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-EU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventIcon = (type: TimelineEvent['type']): string => {
    switch (type) {
      case 'legislation': return '📋';
      case 'deadline': return '⏰';
      case 'enforcement': return '⚖️';
      default: return '📅';
    }
  };

  const getEventColor = (type: TimelineEvent['type']): string => {
    switch (type) {
      case 'legislation': return 'bg-blue-800';
      case 'deadline': return 'bg-yellow-800';
      case 'enforcement': return 'bg-red-800';
      default: return 'bg-gray-800';
    }
  };

  return (
    <section 
      id="timeline"
      className="timeline-section py-16 bg-white"
      aria-labelledby="timeline-heading"
      tabIndex={-1}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            id="timeline-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            EU Accessibility Legislation Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Key milestones in the European Accessibility Act implementation. 
            Select each event to learn more about the requirements and deadlines.
          </p>
        </div>

        {/* Timeline instructions for screen readers and keyboard users */}
        <div className="sr-only">
          <h3>Timeline Navigation Instructions</h3>
          <p>
            Use the arrow keys to navigate between timeline events. 
            Press Enter or Space to expand event details. 
            Press Home to go to the first event, End to go to the last event.
          </p>
        </div>

        {/* Timeline container */}
        <div 
          className="relative"
          role="list"
          aria-label="EU accessibility legislation timeline events"
        >
          {/* Timeline line */}
          <div 
            className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-1 bg-gray-300"
            aria-hidden="true"
          />

          {accessibilityTimeline.map((event, index) => {
            const isSelected = selectedEvent === event.id;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={event.id}
                className={`relative mb-12 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                role="listitem"
              >
                {/* Timeline dot */}
                <div 
                  className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 
                             w-8 h-8 rounded-full ${getEventColor(event.type)} 
                             flex items-center justify-center z-10`}
                  aria-hidden="true"
                >
                  <span className="text-white text-sm" role="img" aria-label={event.type}>
                    {getEventIcon(event.type)}
                  </span>
                </div>

                {/* Event content */}
                <div className={`ml-16 md:ml-0 ${isEven ? 'md:mr-8 md:ml-0' : 'md:ml-8'} 
                               md:w-5/12 ${isEven ? 'md:ml-auto' : ''}`}>
                  
                  {/* Event button */}
                  <button
                    id={`timeline-event-${event.id}`}
                    onClick={() => handleEventSelect(event.id, index)}
                    onKeyDown={(e) => handleKeyNavigation(e, index)}
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 
                             p-6 rounded-lg shadow-md transition-colors
                             focus:outline-none focus:ring-4 focus:ring-blue-300
                             border-l-4 border-blue-800"
                    aria-expanded={isSelected}
                    aria-controls={`timeline-details-${event.id}`}
                    aria-describedby={`timeline-date-${event.id}`}
                  >
                    {/* Date */}
                    <time 
                      id={`timeline-date-${event.id}`}
                      dateTime={event.date}
                      className="text-sm font-semibold text-blue-800 mb-2 block"
                    >
                      {formatDate(event.date)}
                    </time>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 mb-3">
                      {event.description}
                    </p>

                    {/* Impact indicator */}
                    <div className="flex items-center gap-2">
                      <span 
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          event.impact === 'high' ? 'bg-red-100 text-red-800' :
                          event.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {event.impact.toUpperCase()} IMPACT
                      </span>
                      <span 
                        className="text-gray-700"
                        aria-hidden="true"
                      >
                        {isSelected ? '▼' : '▶'}
                      </span>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isSelected && (
                    <div
                      id={`timeline-details-${event.id}`}
                      className="mt-4 p-6 bg-blue-50 rounded-lg border border-blue-200"
                      role="region"
                      aria-labelledby={`timeline-event-${event.id}`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Key Details:
                      </h4>
                      <ul className="space-y-2">
                        {event.details.map((detail, detailIndex) => (
                          <li 
                            key={detailIndex}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <span 
                              className="text-blue-600 mt-1 flex-shrink-0"
                              aria-hidden="true"
                            >
                              •
                            </span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary for quick reference */}
        <div className="mt-16 p-8 bg-blue-900 text-white rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Quick Summary: What You Need to Know
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">
                Current Status (2024)
              </h4>
              <p className="text-white">
                The European Accessibility Act has been transposed into national law 
                across all EU member states. Enforcement bodies are preparing for 
                active monitoring starting June 28, 2025.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">
                Action Required
              </h4>
              <p className="text-white">
                Begin accessibility audits immediately. Ensure all digital services 
                meet WCAG 2.1 AA standards before the June 2025 deadline to avoid 
                penalties up to €15,000.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 