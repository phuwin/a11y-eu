import { render, screen } from '@testing-library/react';
import DeveloperRoles from '../DeveloperRoles';

describe('DeveloperRoles', () => {
  it('renders the developer roles section', () => {
    render(<DeveloperRoles />);
    expect(screen.getByTestId('developer-roles')).toBeInTheDocument();
  });
}); 