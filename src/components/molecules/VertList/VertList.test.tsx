import { render, screen } from "@testing-library/react";
import VertList from "./index";

describe("VertList", () => {
  it("renders list items correctly", () => {
    const items = [{ itemContent: "Item 1" }, { itemContent: "Item 2" }, { itemContent: "Item 3" }];

    render(<VertList items={items} />);

    items.forEach((item) => {
      expect(screen.getByText(item.itemContent)).toBeInTheDocument();
    });
  });

  it("renders single item correctly", () => {
    const items = [{ itemContent: "Single Item" }];
    render(<VertList items={items} />);
    expect(screen.getByText("Single Item")).toBeInTheDocument();
  });

  it("throws error when no items provided", () => {
    const items: { itemContent: React.ReactNode }[] = [];
    expect(() => render(<VertList items={items} />)).toThrow(
      "VertList must have at least one item"
    );
  });

  it("applies noCursor prop correctly", () => {
    const items = [{ itemContent: "No Cursor Item", noCursor: true }];
    render(<VertList items={items} />);
    const listItem = screen.getByText("No Cursor Item").closest("li");
    expect(listItem).toHaveClass("cursor-default");
  });

  it("applies first and last item styles correctly", () => {
    const items = [{ itemContent: "First" }, { itemContent: "Middle" }, { itemContent: "Last" }];
    render(<VertList items={items} />);

    const firstItem = screen.getByText("First").closest("li");
    const lastItem = screen.getByText("Last").closest("li");

    expect(firstItem).toHaveClass("rounded-t-lg");
    expect(lastItem).toHaveClass("rounded-b-lg");
    expect(lastItem).toHaveClass("border-b-0");
  });
});
