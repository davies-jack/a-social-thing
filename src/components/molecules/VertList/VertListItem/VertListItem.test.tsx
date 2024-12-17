import { render, screen } from "@testing-library/react";
import VertListItem from "./index";

describe("VertListItem", () => {
  it("renders children correctly", () => {
    render(<VertListItem>Test Content</VertListItem>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies first item styles correctly", () => {
    render(<VertListItem isFirst>First Item</VertListItem>);
    const listItem = screen.getByText("First Item").closest("li");
    expect(listItem).toHaveClass("rounded-t-lg");
  });

  it("applies last item styles correctly", () => {
    render(<VertListItem isLast>Last Item</VertListItem>);
    const listItem = screen.getByText("Last Item").closest("li");
    expect(listItem).toHaveClass("rounded-b-lg");
    expect(listItem).toHaveClass("border-b-0");
  });

  it("applies both first and last item styles when both props are true", () => {
    render(
      <VertListItem isFirst isLast>
        Single Item
      </VertListItem>
    );
    const listItem = screen.getByText("Single Item").closest("li");
    expect(listItem).toHaveClass("rounded-t-lg");
    expect(listItem).toHaveClass("rounded-b-lg");
    expect(listItem).toHaveClass("border-b-0");
  });

  it("applies noCursor style when noCursor prop is true", () => {
    render(<VertListItem noCursor>No Cursor Item</VertListItem>);
    const listItem = screen.getByText("No Cursor Item").closest("li");
    expect(listItem).toHaveClass("cursor-default");
  });

  it("applies pointer cursor by default", () => {
    render(<VertListItem>Default Item</VertListItem>);
    const listItem = screen.getByText("Default Item").closest("li");
    expect(listItem).toHaveClass("cursor-pointer");
  });
});
