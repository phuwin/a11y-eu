import { render, screen, fireEvent, act } from '@testing-library/react';
import ComplianceChecker from '../ComplianceChecker';

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useRealTimers();
});

describe('ComplianceChecker', () => {
  it('renders the compliance checker section and form fields', () => {
    render(<ComplianceChecker />);
    expect(screen.getByRole('region', { name: /accessibility compliance checker/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/website url/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /images & media/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /navigation/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /content structure/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /forms & testing/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /check compliance/i })).toBeInTheDocument();
  });

  it('shows validation error for missing or invalid URL', async () => {
    render(<ComplianceChecker />);
    const submitBtn = screen.getByRole('button', { name: /check compliance/i });
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/website url is required/i)).toBeInTheDocument();

    // Enter invalid URL
    fireEvent.change(screen.getByLabelText(/website url/i), { target: { value: 'not-a-url' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText(/please enter a valid url/i)).toBeInTheDocument();
  });

  it('submits form and displays results', async () => {
    render(<ComplianceChecker />);
    fireEvent.change(screen.getByLabelText(/website url/i), { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByLabelText(/website contains images/i));
    fireEvent.click(screen.getByLabelText(/all images have descriptive alt text/i));
    fireEvent.click(screen.getByLabelText(/full keyboard navigation support/i));
    fireEvent.click(screen.getByLabelText(/skip navigation links/i));
    fireEvent.click(screen.getByLabelText(/visible focus indicators/i));
    fireEvent.click(screen.getByLabelText(/logical heading hierarchy/i));
    fireEvent.click(screen.getByLabelText(/sufficient color contrast/i));
    fireEvent.click(screen.getByLabelText(/form fields have proper labels/i));
    fireEvent.click(screen.getByLabelText(/clear error identification and handling/i));
    fireEvent.click(screen.getByLabelText(/tested with screen readers/i));
    fireEvent.click(screen.getByRole('button', { name: /check compliance/i }));
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    expect(await screen.findByRole('heading', { name: /compliance assessment results/i })).toBeInTheDocument();
    expect(screen.getByText(/overall compliance score/i)).toBeInTheDocument();
    expect(screen.getByText(/perceivable/i)).toBeInTheDocument();
    expect(screen.getByText(/operable/i)).toBeInTheDocument();
    expect(screen.getByText(/understandable/i)).toBeInTheDocument();
    expect(screen.getByText(/robust/i)).toBeInTheDocument();
  });

  it('shows issues and recommendations if some features are missing', async () => {
    render(<ComplianceChecker />);
    fireEvent.change(screen.getByLabelText(/website url/i), { target: { value: 'https://example.com' } });
    // Only check a few features
    fireEvent.click(screen.getByLabelText(/website contains images/i));
    fireEvent.click(screen.getByLabelText(/all images have descriptive alt text/i));
    fireEvent.click(screen.getByRole('button', { name: /check compliance/i }));
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    expect(await screen.findByRole('heading', { name: /compliance assessment results/i })).toBeInTheDocument();
    expect(screen.getAllByText(/issues found/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/recommendations/i).length).toBeGreaterThan(0);
  });

  it('has proper aria attributes and focus management', async () => {
    const utils = render(<ComplianceChecker />);
    fireEvent.change(screen.getByLabelText(/website url/i), { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /check compliance/i }));
    await act(async () => {
      jest.advanceTimersByTime(1500);
    });
    const resultsHeading = await screen.findByRole('heading', { name: /compliance assessment results/i });
    expect(resultsHeading).toBeInTheDocument();
    // The results container should be focusable
    const resultsContainer = screen.getByRole('region', { name: /compliance assessment results/i });
    expect(resultsContainer).toHaveAttribute('tabindex', '-1');
    // The progressbar should have correct aria attributes
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
  });
}); 