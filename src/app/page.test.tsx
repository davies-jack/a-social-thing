import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders main heading", () => {
    render(<Home />);
    expect(screen.getByText("a-social")).toBeInTheDocument();
  });

  it("renders subheading text", () => {
    render(<Home />);
    expect(screen.getByText("a social media platform. speak less, say more.")).toBeInTheDocument();
  });

  it("renders register button", () => {
    render(<Home />);
    expect(screen.getByText("register now!")).toBeInTheDocument();
  });

  it("renders login link", () => {
    render(<Home />);
    expect(screen.getByText("already have an account? login here.")).toBeInTheDocument();
  });
});
