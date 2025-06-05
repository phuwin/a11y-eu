import { render, screen } from '@testing-library/react';
import EducationalContent from '../EducationalContent';

describe('EducationalContent', () => {
  it('renders the educational content section', () => {
    render(<EducationalContent />);
    expect(screen.getByTestId('educational-content')).toBeInTheDocument();
  });
}); 