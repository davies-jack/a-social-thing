import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct default styling classes', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );

    const containerElement = screen.getByText('Test Content').parentElement;
    expect(containerElement).toHaveClass('bg-bg-secondary');
    expect(containerElement).toHaveClass('rounded-md');
    expect(containerElement).toHaveClass('p-4');
  });
});
