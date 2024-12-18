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
    expect(pillElement).toHaveClass(
      "bg-bg-card cursor-pointer rounded-sm transition-colors duration-75 hover:text-headline-text hover:shadow-lg tracking-normal leading-tight text-xs text-paragraph-text px-3 py-1 hover:bg-[#080808]"
    );
  });

  it("renders with the correct custom styling classes", () => {
    render(<Pill className="custom-class">Test Children</Pill>);
    const pillElement = screen.getByText("Test Children");
    expect(pillElement).toHaveClass("custom-class");
  });
});
