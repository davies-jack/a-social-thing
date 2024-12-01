import { render, screen } from '@testing-library/react';
import InputField from './InputField';

describe('InputField', () => {
  it('renders with the provided value', () => {
    render(<InputField type="text" value="Test Value" onChange={() => {}} placeholder="Test Placeholder" />);
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('renders with the provided placeholder', () => {
    render(<InputField type="text" value="" onChange={() => {}} placeholder="Test Placeholder" />);
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('renders with the correct default type', () => {
    render(<InputField value="" onChange={() => {}} placeholder="Test Placeholder" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with the correct type', () => {
    render(<InputField type="text" value="" onChange={() => {}} placeholder="Test Placeholder" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with the correct default styling classes', () => {
    render(<InputField type="text" value="" onChange={() => {}} placeholder="Test Placeholder" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveClass('w-full');
    expect(inputElement).toHaveClass('block');
  });
});
