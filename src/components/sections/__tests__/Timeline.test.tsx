import { render, screen } from '@testing-library/react';
import Timeline from '../Timeline';

describe('Timeline', () => {
  it('renders the timeline container', () => {
    render(<Timeline />);
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
  });
}); 