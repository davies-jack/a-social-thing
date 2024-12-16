import { render, screen } from "@testing-library/react";
import Pill from "./";

describe("Pill", () => {
  it("renders with the provided children", () => {
    render(<Pill>Test Children</Pill>);
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });

  it("renders with the correct default styling classes", () => {
    render(<Pill>Test Children</Pill>);
    const pillElement = screen.getByText("Test Children");
    expect(pillElement).toHaveClass("rounded-md bg-bg-card border-2 border-bg-primary");
  });

  it("renders with the correct custom styling classes", () => {
    render(<Pill className="custom-class">Test Children</Pill>);
    const pillElement = screen.getByText("Test Children");
    expect(pillElement).toHaveClass("custom-class");
  });
});
