import { render, screen } from "@testing-library/react";
import Container from ".";

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies the correct default styling classes", () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );

    const containerElement = screen.getByText("Test Content").parentElement;
    expect(containerElement).toHaveClass("text-sm leading-5 tracking-tight text-paragraph-text");
  });

  it("renders with the default level h1", () => {
    render(<Container title="Test Title">Test Content</Container>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders with the corect spacing (marginTop, marginBottom)", () => {
    render(
      <Container title="Test Title" spacing={{ marginTop: "2", marginBottom: "2" }}>
        Test Content
      </Container>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("mt-2 mb-2");
  });

  it("renders with the correct spacing (marginLeft, marginRight)", () => {
    render(
      <Container title="Test Title" spacing={{ marginLeft: "2", marginRight: "2" }}>
        Test Content
      </Container>
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("ml-2 mr-2");
  });

  it("renders with no title", () => {
    render(<Container>Test Content</Container>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
