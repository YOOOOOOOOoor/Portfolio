import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TechnologyStack } from "@/components/TechnologyStack";

const groups = [
  { name: "React", technologies: [{ name: "React 19" }] },
  { name: "Node.js", technologies: [{ name: "Express" }] },
  { name: "Development", technologies: [{ name: "Vite" }] },
];

describe("TechnologyStack", () => {
  it("starts collapsed and hover opens only the current desktop group", () => {
    render(<TechnologyStack groups={groups} />);
    const react = screen.getByRole("button", { name: "React" });
    const node = screen.getByRole("button", { name: "Node.js" });

    expect(react).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("React 19")).not.toBeInTheDocument();

    fireEvent.pointerEnter(react, { pointerType: "mouse" });
    expect(react).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("React 19")).toBeInTheDocument();

    fireEvent.pointerEnter(node, { pointerType: "mouse" });
    expect(react).toHaveAttribute("aria-expanded", "false");
    expect(node).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Express")).toBeInTheDocument();
  });

  it("supports tap toggling and keyboard focus navigation", () => {
    render(<TechnologyStack groups={groups} />);
    const react = screen.getByRole("button", { name: "React" });
    const node = screen.getByRole("button", { name: "Node.js" });
    const development = screen.getByRole("button", { name: "Development" });

    fireEvent.click(react);
    expect(react).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(react);
    expect(react).toHaveAttribute("aria-expanded", "false");

    fireEvent.blur(react);
    fireEvent.focus(react);
    expect(react).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(react, { key: "ArrowDown" });
    expect(node).toHaveFocus();
    expect(node).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(node, { key: "End" });
    expect(development).toHaveFocus();
    fireEvent.keyDown(development, { key: "Home" });
    expect(react).toHaveFocus();
  });
});
