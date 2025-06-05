import { render, screen, fireEvent } from '@testing-library/react';
import { AccessibleInput } from '../AccessibleInput';

describe('AccessibleInput', () => {
  it('renders with provided label', () => {
    render(<AccessibleInput label="Name" value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<AccessibleInput label="Name" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
    expect(handleChange).toHaveBeenCalled();
  });
}); 