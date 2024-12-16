import { render, screen } from "@testing-library/react";
import Alert from ".";

describe("Alert", () => {
  it("renders with the provided message", () => {
    render(<Alert type="error">Test Error!</Alert>);
    expect(screen.getByText("Test Error!")).toBeInTheDocument();
  });

  it("applies the correct default styling classes", () => {
    render(<Alert type="error">Test Error!</Alert>);
    const errorElement = screen.getByText("Test Error!");
    expect(errorElement).toHaveClass("bg-error-red text-xs");
  });

  it("applies custom className when provided", () => {
    render(<Alert type="error">Test Error!</Alert>);
    const errorElement = screen.getByText("Test Error!");
    expect(errorElement).toHaveClass("bg-error-red text-xs");
  });
});
