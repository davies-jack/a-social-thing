import { render, screen } from '@testing-library/react';
import CreateCommentForm from './CreateCommentForm';

describe('CreateCommentForm', () => {
  it('renders correctly', () => {
    render(<CreateCommentForm />);
    expect(screen.getByText('add a comment')).toBeInTheDocument();
  });

  it('applies the correct default styling classes', () => {
    render(<CreateCommentForm />);

    const formElement = screen.getByRole('form');
    const formElementChild = formElement.firstChild;

    const outerDiv = formElementChild as HTMLDivElement;
    expect(outerDiv).toHaveClass('flex flex-col items-center justify-center w-1/2 mx-auto');
    
    const labelElement = screen.getByText('add a comment');
    expect(labelElement).toHaveClass('text-headline-text text-sm font-bold text-left');

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveClass('w-full h-24 p-2 rounded-md border border-border-secondary');

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('mt-4');
  });
});