import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    // Example: check for a link, update as needed
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
}); 