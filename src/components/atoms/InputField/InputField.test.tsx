import { render, screen } from '@testing-library/react';
import InputField from '.';

describe('InputField', () => {
  it('renders with the provided value', () => {
    render(<InputField type="text" value="Test Value" onChange={() => {}} placeholder="Test Placeholder" id="input-field-id" label="Input Field Label" />);
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('renders with the provided placeholder', () => {
    render(<InputField type="text" value="" onChange={() => {}} placeholder="Test Placeholder" id="input-field-id" label="Input Field Label" />);
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('renders with the correct default type', () => {
    render(<InputField value="" onChange={() => {}} placeholder="Test Placeholder" id="input-field-id" label="Input Field Label" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with the correct type', () => {
    render(<InputField type="text" value="" onChange={() => {}} placeholder="Test Placeholder" id="input-field-id" label="Input Field Label" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders with the correct default styling classes', () => {
    render(<InputField type="text" value="" onChange={() => {}} placeholder="Test Placeholder" id="input-field-id" label="Input Field Label" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder');
    expect(inputElement).toHaveClass('w-full block');
  });
});
