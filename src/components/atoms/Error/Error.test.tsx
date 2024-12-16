import { render, screen } from '@testing-library/react';
import Error from '.';

describe('Error', () => {
  it('renders with the provided message', () => {
    render(<Error message="Test Error" />);
    expect(screen.getByText('Test Error!')).toBeInTheDocument();
  });

  it('applies the correct default styling classes', () => {
    render(<Error message="Test Error" />);
    const errorElement = screen.getByText('Test Error!');
    expect(errorElement).toHaveClass('bg-red-700 text-xs');
  });

  it('applies custom className when provided', () => {
    render(<Error message="Test Error" className="custom-class" />);
    const errorElement = screen.getByText('Test Error!');
    expect(errorElement).toHaveClass('custom-class');
  });
});