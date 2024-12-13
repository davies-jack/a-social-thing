import { fireEvent, render, screen } from "@testing-library/react";
import CreateCommentForm from "./CreateCommentForm";

describe("CreateCommentForm", () => {
  it("renders correctly", () => {
    render(<CreateCommentForm handleCreateComment={() => Promise.resolve()} />);
    expect(screen.getByText("add a comment")).toBeInTheDocument();
  });

  it("applies the correct default styling classes", () => {
    render(<CreateCommentForm handleCreateComment={() => Promise.resolve()} />);

    const labelElement = screen.getByText("add a comment");
    expect(labelElement).toHaveClass("text-headline-text text-sm font-bold text-left");

    const textareaElement = screen.getByRole("textbox");
    expect(textareaElement).toHaveClass(
      "block resize-none w-full p-2 rounded-md border border-border-secondary"
    );

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("mt-4 self-end");
  });

  it("works correctly with the handleCreateComment function", () => {
    const handleCreateComment = jest.fn();
    render(<CreateCommentForm handleCreateComment={handleCreateComment} />);
    const textareaElement = screen.getByRole("textbox");
    fireEvent.change(textareaElement, { target: { value: "Test comment" } });
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleCreateComment).toHaveBeenCalledWith("Test comment");
  });
});
