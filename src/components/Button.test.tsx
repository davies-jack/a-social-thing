import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with the provided label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders loading text when disabled', () => {
    render(<Button label="Click me" disabled={true} />);
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(<Button label="Click me" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is enabled by default', () => {
    render(<Button label="Click me" />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });
});
