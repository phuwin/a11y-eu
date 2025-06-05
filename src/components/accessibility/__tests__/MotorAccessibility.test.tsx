import { render, screen, fireEvent } from '@testing-library/react';
import MotorAccessibility from '../MotorAccessibility';

describe('MotorAccessibility', () => {
  it('renders the motor accessibility section', () => {
    render(<MotorAccessibility>
      <h1>Motor Accessibility</h1>
      <p>Motor Accessibility is a section that helps you understand how to make your website accessible to people with motor disabilities.</p>
    </MotorAccessibility>);
    expect(screen.getByTestId('motor-accessibility')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <MotorAccessibility>
        <div>Test Content</div>
      </MotorAccessibility>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('toggles the settings panel', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    const toggleBtn = screen.getByRole('button', { name: /motor accessibility settings/i });
    const panel = screen.getByTestId('motor-settings-panel');
    // Panel should be hidden initially (translate-x-full)
    expect(panel.className).toMatch(/translate-x-full/);
    fireEvent.click(toggleBtn);
    // Panel should be visible (translate-x-0)
    expect(panel.className).toMatch(/translate-x-0/);
    fireEvent.click(toggleBtn);
    expect(panel.className).toMatch(/translate-x-full/);
  });

  it('toggles reduced motion setting', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    const toggleBtn = screen.getByRole('button', { name: /motor accessibility settings/i });
    fireEvent.click(toggleBtn);
    const reducedMotion = screen.getByLabelText(/reduce motion/i);
    expect(reducedMotion).not.toBeChecked();
    fireEvent.click(reducedMotion);
    expect(reducedMotion).toBeChecked();
    fireEvent.click(reducedMotion);
    expect(reducedMotion).not.toBeChecked();
  });

  it('toggles large targets setting', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    fireEvent.click(screen.getByRole('button', { name: /motor accessibility settings/i }));
    const largeTargets = screen.getByLabelText(/large touch targets/i);
    expect(largeTargets).not.toBeChecked();
    fireEvent.click(largeTargets);
    expect(largeTargets).toBeChecked();
    fireEvent.click(largeTargets);
    expect(largeTargets).not.toBeChecked();
  });

  it('toggles high contrast setting', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    fireEvent.click(screen.getByRole('button', { name: /motor accessibility settings/i }));
    const highContrast = screen.getByLabelText(/high contrast/i);
    expect(highContrast).not.toBeChecked();
    fireEvent.click(highContrast);
    expect(highContrast).toBeChecked();
    fireEvent.click(highContrast);
    expect(highContrast).not.toBeChecked();
  });

  it('toggles dwell click and adjusts dwell time', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    fireEvent.click(screen.getByRole('button', { name: /motor accessibility settings/i }));
    const dwellClick = screen.getByLabelText(/dwell click/i);
    expect(dwellClick).not.toBeChecked();
    fireEvent.click(dwellClick);
    expect(dwellClick).toBeChecked();
    // Dwell time slider should appear
    const dwellSlider = screen.getByLabelText(/dwell time in milliseconds/i);
    expect(dwellSlider).toBeInTheDocument();
    fireEvent.change(dwellSlider, { target: { value: '2000' } });
    expect(dwellSlider).toHaveValue('2000');
    // Uncheck dwell click
    fireEvent.click(dwellClick);
    expect(dwellClick).not.toBeChecked();
  });

  it('toggles sticky hover setting', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    fireEvent.click(screen.getByRole('button', { name: /motor accessibility settings/i }));
    const stickyHover = screen.getByLabelText(/sticky hover/i);
    expect(stickyHover).not.toBeChecked();
    fireEvent.click(stickyHover);
    expect(stickyHover).toBeChecked();
    fireEvent.click(stickyHover);
    expect(stickyHover).not.toBeChecked();
  });

  it('resets all settings to defaults', () => {
    render(<MotorAccessibility>child</MotorAccessibility>);
    fireEvent.click(screen.getByRole('button', { name: /motor accessibility settings/i }));
    // Toggle all settings
    fireEvent.click(screen.getByLabelText(/reduce motion/i));
    fireEvent.click(screen.getByLabelText(/large touch targets/i));
    fireEvent.click(screen.getByLabelText(/high contrast/i));
    fireEvent.click(screen.getByLabelText(/dwell click/i));
    fireEvent.click(screen.getByLabelText(/sticky hover/i));
    // Change dwell time
    const dwellSlider = screen.getByLabelText(/dwell time in milliseconds/i);
    fireEvent.change(dwellSlider, { target: { value: '2000' } });
    // Click reset
    fireEvent.click(screen.getByRole('button', { name: /reset to defaults/i }));
    // All checkboxes should be unchecked except reduced motion/high contrast if system prefers
    expect(screen.getByLabelText(/reduce motion/i)).not.toBeChecked();
    expect(screen.getByLabelText(/large touch targets/i)).not.toBeChecked();
    expect(screen.getByLabelText(/high contrast/i)).not.toBeChecked();
    expect(screen.getByLabelText(/dwell click/i)).not.toBeChecked();
    expect(screen.getByLabelText(/sticky hover/i)).not.toBeChecked();
  });
}); 