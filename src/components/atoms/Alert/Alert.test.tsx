import { render, screen } from "@testing-library/react";
import Alert from ".";

describe("Alert", () => {
  it("renders with the provided message", () => {
    render(<Alert type="error">Test Error!</Alert>);
    expect(screen.getByText("Test Error!")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Alert type="error">
        <p>Test Error!</p>
      </Alert>
    );
    expect(screen.getByText("Test Error!")).toBeInTheDocument();
  });

  it("applies the correct default styling classes", () => {
    render(<Alert type="error">Test Error!</Alert>);
    const errorElement = screen.getByText("Test Error!");
    expect(errorElement).toHaveClass(
      "bg-error-red text-xs rounded-md px-5 py-3 text-black text-xs lowercase shadow-md"
    );
  });

  it("renders correctly when success type is provided", () => {
    render(<Alert type="success">Test Success!</Alert>);
    const successElement = screen.getByText("Test Success!");
    expect(successElement).toHaveClass("bg-success-green text-xs");
  });

  it("renders correctly when error type is provided", () => {
    render(<Alert type="error">Test Error!</Alert>);
    const errorElement = screen.getByText("Test Error!");
    expect(errorElement).toHaveClass("bg-error-red text-xs");
  });

  it("renders correctly when warning type is provided", () => {
    render(<Alert type="warning">Test Warning!</Alert>);
    const warningElement = screen.getByText("Test Warning!");
    expect(warningElement).toHaveClass("bg-warning-amber text-xs");
  });

  it("renders correctly when info type is provided", () => {
    render(<Alert type="info">Test Info!</Alert>);
    const infoElement = screen.getByText("Test Info!");
    expect(infoElement).toHaveClass("bg-info-blue text-xs");
  });
});
