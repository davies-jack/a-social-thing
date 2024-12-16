import { render, screen } from '@testing-library/react';
import ContainerTitle from '.';

describe('ContainerTitle', () => {
  it('renders with the provided value', () => {
    render(<ContainerTitle value="Test Title" level="h2" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with the specified heading level', () => {
    render(<ContainerTitle value="Test Title" level="h1" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('applies the correct default styling classes', () => {
    render(<ContainerTitle value="Test Title" level="h2" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-base text-headline-text font-bold');
  });

  it('handles long text with break-words', () => {
    const longText = 'ThisIsAVeryLongTitleWithNoSpacesToTestWordBreaking';
    render(<ContainerTitle value={longText} level="h2" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('break-words');
  });

  it('has correct margin and line height', () => {
    render(<ContainerTitle value="Test Title" level="h2" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('leading-4 mb-2');
  });
});
