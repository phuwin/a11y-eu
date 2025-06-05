import { render, screen } from '@testing-library/react';
import Requirements from '../Requirements';

describe('Requirements', () => {
  it('renders the requirements list', () => {
    render(<Requirements />);
    expect(screen.getByTestId('requirements-list')).toBeInTheDocument();
  });
}); 