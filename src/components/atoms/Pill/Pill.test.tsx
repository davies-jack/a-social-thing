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
      "text-xs text-paragraph-text cursor-pointer bg-[#080808] border-2 border-bg-primary rounded-md px-3 py-1 transition-colors duration-75 hover:bg-bg-primary hover:border-2 hover:border-transparent hover:shadow-md hover:text-headline-text"
    );
  });

  it("renders with the correct custom styling classes", () => {
    render(<Pill className="custom-class">Test Children</Pill>);
    const pillElement = screen.getByText("Test Children");
    expect(pillElement).toHaveClass("custom-class");
  });
});
