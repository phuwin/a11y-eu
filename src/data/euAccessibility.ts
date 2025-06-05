// EU Accessibility Timeline Data
export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'legislation' | 'deadline' | 'enforcement';
  impact: 'high' | 'medium' | 'low';
  details: string[];
}

export const accessibilityTimeline: TimelineEvent[] = [
  {
    id: 'eaa-adoption',
    date: '2019-04-17',
    title: 'European Accessibility Act Adopted',
    description: 'EU Parliament and Council formally adopt the European Accessibility Act',
    type: 'legislation',
    impact: 'high',
    details: [
      'Directive 2019/882 establishes accessibility requirements for products and services',
      'Applies to private sector digital services',
      'Member states given 3 years to transpose into national law'
    ]
  },
  {
    id: 'national-transposition',
    date: '2022-06-28',
    title: 'National Transposition Deadline',
    description: 'EU member states must transpose the EAA into their national legislation',
    type: 'deadline',
    impact: 'high',
    details: [
      'All 27 EU member states must implement the directive',
      'National enforcement bodies established',
      'Penalty frameworks defined by each country'
    ]
  },
  {
    id: 'eaa-enforcement',
    date: '2025-06-28',
    title: 'EAA Enforcement Begins',
    description: 'European Accessibility Act becomes mandatory for all covered services',
    type: 'enforcement',
    impact: 'high',
    details: [
      'All digital services must comply with WCAG 2.1 AA',
      'Active enforcement by national authorities',
      'Penalties up to €15,000 for violations',
      '30-day fix window after complaints'
    ]
  }
];

// WCAG Requirements Data
export interface WCAgRequirement {
  id: string;
  principle: 'perceivable' | 'operable' | 'understandable' | 'robust';
  guideline: string;
  level: 'A' | 'AA' | 'AAA';
  title: string;
  description: string;
  examples: {
    good: string[];
    bad: string[];
  };
  testingMethods: string[];
  businessImpact: string;
}

export const wcagRequirements: WCAgRequirement[] = [
  {
    id: 'text-alternatives',
    principle: 'perceivable',
    guideline: '1.1.1',
    level: 'A',
    title: 'Non-text Content (Images)',
    description: 'All non-text content must have text alternatives that serve the equivalent purpose',
    examples: {
      good: [
        '<img src="chart.png" alt="Sales increased 25% from Q1 to Q2 2024">',
        '<button aria-label="Close dialog">×</button>',
        '<img src="decoration.png" alt="" role="presentation">'
      ],
      bad: [
        '<img src="chart.png" alt="chart">',
        '<img src="important-info.png">',
        '<button>×</button>'
      ]
    },
    testingMethods: [
      'Screen reader testing',
      'Remove images and check if content is still understandable',
      'Automated axe-core scanning'
    ],
    businessImpact: 'Critical for SEO and screen reader users (15% of EU population)'
  },
  {
    id: 'color-contrast',
    principle: 'perceivable',
    guideline: '1.4.3',
    level: 'AA',
    title: 'Color Contrast',
    description: 'Text must have a contrast ratio of at least 4.5:1 (or 3:1 for large text)',
    examples: {
      good: [
        'Dark blue (#1e3a8a) text on white background (16.75:1)',
        'White text on blue (#2563eb) background (4.56:1)',
        'Large heading text with 3:1 ratio'
      ],
      bad: [
        'Light gray (#9ca3af) text on white background (2.3:1)',
        'Yellow text on white background',
        'Low contrast placeholder text'
      ]
    },
    testingMethods: [
      'WebAIM Contrast Checker',
      'Browser DevTools contrast analysis',
      'Automated tools like axe-core'
    ],
    businessImpact: 'Affects 8% of men and 0.5% of women with color vision deficiency'
  },
  {
    id: 'keyboard-navigation',
    principle: 'operable',
    guideline: '2.1.1',
    level: 'A',
    title: 'Keyboard Navigation',
    description: 'All functionality must be available via keyboard interface',
    examples: {
      good: [
        'Tab navigation through all interactive elements',
        'Enter/Space to activate buttons and links',
        'Arrow keys for menu navigation',
        'Escape key to close dialogs'
      ],
      bad: [
        'Mouse-only hover interactions',
        'Drag-and-drop without keyboard alternative',
        'Custom controls without keyboard support'
      ]
    },
    testingMethods: [
      'Navigate entire site using only keyboard',
      'Test with Tab, Enter, Space, Arrow keys',
      'Verify focus indicators are visible'
    ],
    businessImpact: 'Essential for 2.5% of population with motor disabilities'
  },
  {
    id: 'focus-indicators',
    principle: 'operable',
    guideline: '2.4.7',
    level: 'AA',
    title: 'Focus Visible',
    description: 'Any keyboard operable interface must have visible focus indicators',
    examples: {
      good: [
        'Blue outline around focused elements',
        'High contrast focus rings (3px minimum)',
        'Custom focus styles that meet contrast requirements'
      ],
      bad: [
        'outline: none without replacement',
        'Low contrast focus indicators',
        'No visible focus state'
      ]
    },
    testingMethods: [
      'Tab through page and verify all focus states',
      'Check focus indicator contrast ratios',
      'Test with high contrast mode'
    ],
    businessImpact: 'Critical for keyboard users and motor disabilities'
  },
  {
    id: 'headings-labels',
    principle: 'understandable',
    guideline: '2.4.6',
    level: 'AA',
    title: 'Headings and Labels',
    description: 'Headings and labels must describe topic or purpose clearly',
    examples: {
      good: [
        '<h1>EU Accessibility Compliance Guide</h1>',
        '<h2>WCAG 2.1 AA Requirements</h2>',
        '<label for="email">Email Address (required)</label>'
      ],
      bad: [
        '<h2>Click Here</h2>',
        '<h3>More Info</h3>',
        '<label>Input</label>'
      ]
    },
    testingMethods: [
      'Review heading structure with screen reader',
      'Check if labels clearly describe purpose',
      'Verify logical heading hierarchy'
    ],
    businessImpact: 'Improves usability for all users and SEO ranking'
  },
  {
    id: 'error-identification',
    principle: 'understandable',
    guideline: '3.3.1',
    level: 'A',
    title: 'Error Identification',
    description: 'Form errors must be clearly identified and described to users',
    examples: {
      good: [
        'Error message: "Email is required"',
        'Field highlighted with red border and icon',
        'aria-invalid="true" and aria-describedby attributes'
      ],
      bad: [
        'Generic "Error occurred" message',
        'Only color used to indicate errors',
        'No programmatic error association'
      ]
    },
    testingMethods: [
      'Submit forms with invalid data',
      'Test with screen reader error announcements',
      'Verify error messages are descriptive'
    ],
    businessImpact: 'Reduces form abandonment and improves conversion rates'
  }
];

// Developer Role Information
export interface DeveloperRole {
  role: 'freelancer' | 'agency' | 'cto';
  responsibilities: string[];
  liability: string;
  actionItems: string[];
  timeline: string;
}

export const developerRoles: DeveloperRole[] = [
  {
    role: 'freelancer',
    responsibilities: [
      'Ensure delivered code meets WCAG 2.1 AA standards',
      'Document accessibility features implemented',
      'Provide basic accessibility training to clients',
      'Include accessibility testing in project scope'
    ],
    liability: 'Limited to contracted work, but reputation risk if client faces penalties',
    actionItems: [
      'Learn WCAG 2.1 AA guidelines thoroughly',
      'Set up automated accessibility testing tools',
      'Include accessibility clauses in contracts',
      'Build accessibility into project estimates'
    ],
    timeline: 'Start immediately - compliance required by June 28, 2025'
  },
  {
    role: 'agency',
    responsibilities: [
      'Audit all client projects for accessibility compliance',
      'Train development team on accessibility standards',
      'Establish accessibility QA processes',
      'Offer accessibility consulting services'
    ],
    liability: 'Shared responsibility with clients for delivered projects',
    actionItems: [
      'Conduct accessibility audit of existing projects',
      'Implement accessibility-first development process',
      'Train entire team on WCAG 2.1 AA',
      'Create accessibility service offerings'
    ],
    timeline: 'Q1 2025: Team training, Q2 2025: Client audits complete'
  },
  {
    role: 'cto',
    responsibilities: [
      'Ensure all digital services meet EAA requirements',
      'Implement accessibility governance framework',
      'Budget for accessibility improvements',
      'Coordinate with legal team on compliance'
    ],
    liability: 'Full corporate liability for non-compliance',
    actionItems: [
      'Conduct comprehensive accessibility audit',
      'Allocate budget for accessibility improvements',
      'Establish accessibility policy and procedures',
      'Implement continuous accessibility monitoring'
    ],
    timeline: 'Q4 2024: Strategy, Q1-Q2 2025: Implementation'
  }
]; 