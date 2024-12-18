import { render, screen } from "@testing-library/react";
import Container from ".";

describe("Container", () => {
  it("renders children correctly", () => {
    render(
      <Container title="Test Title" titleLevel="h1">
        <div>Test Content</div>
      </Container>
    );
    const containerTitleElement = screen.getByRole("heading", { level: 1 });
    const outerContainerElement = containerTitleElement.parentElement;

    expect(outerContainerElement).toBeInTheDocument();
    expect(containerTitleElement).toBeInTheDocument();

    expect(containerTitleElement).toHaveTextContent("Test Title");
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders correctly without title / titleLevel", () => {
    render(<Container>Test Content</Container>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies the correct default styling classes", () => {
    render(
      <Container title="Test Title" titleLevel="h1">
        <div>Test Content</div>
      </Container>
    );

    const containerTitleElement = screen.getByRole("heading", { level: 1 });
    const outerContainerElement = containerTitleElement.parentElement;

    expect(outerContainerElement).toHaveClass("bg-bg-card rounded-md p-4 shadow-md w-full");
  });

  it("renders with the default level h1", () => {
    render(
      <Container title="Test Title" titleLevel="h1">
        Test Content
      </Container>
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders with the corect spacing (marginTop, marginBottom)", () => {
    render(
      <Container title="Test Title" spacing={{ marginTop: "2", marginBottom: "2" }}>
        Test Content
      </Container>
    );

    const containerTitleElement = screen.getByRole("heading", { level: 1 });
    const outerContainerElement = containerTitleElement.parentElement;

    expect(outerContainerElement).toBeInTheDocument();
    expect(containerTitleElement).toBeInTheDocument();

    expect(outerContainerElement).toHaveClass("mt-2 mb-2");
  });

  it("renders with the correct spacing (marginLeft, marginRight)", () => {
    render(
      <Container title="Test Title" spacing={{ marginLeft: "2", marginRight: "2" }}>
        Test Content
      </Container>
    );

    const containerTitleElement = screen.getByRole("heading", { level: 1 });
    const outerContainerElement = containerTitleElement.parentElement;

    expect(outerContainerElement).toBeInTheDocument();
    expect(containerTitleElement).toBeInTheDocument();

    expect(outerContainerElement).toHaveClass("ml-2 mr-2");
  });

  it("renders with no title", () => {
    render(<Container>Test Content</Container>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
