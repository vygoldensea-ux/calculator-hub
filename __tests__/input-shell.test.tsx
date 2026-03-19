/**
 * Test cases cho InputShell component
 * Bug cũ: readOnly = true là default → mọi input đều không gõ được
 * Fix: đổi default thành undefined (không set readOnly nếu không truyền prop)
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { InputShell } from "@/components/ui/input-shell";

describe("InputShell", () => {
  it("TC-001: input không có readOnly prop phải gõ được", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputShell
        placeholder="Enter text"
        onChange={handleChange}
        value=""
      />,
    );

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).not.toHaveAttribute("readonly");

    await user.click(input);
    await user.keyboard("hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("TC-002: input với readOnly={false} phải gõ được", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputShell
        placeholder="editable"
        readOnly={false}
        onChange={handleChange}
        value=""
      />,
    );

    const input = screen.getByPlaceholderText("editable");
    expect(input).not.toHaveAttribute("readonly");
    await user.click(input);
    await user.keyboard("test");
    expect(handleChange).toHaveBeenCalled();
  });

  it("TC-003: input với readOnly={true} KHÔNG được gõ", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <InputShell
        placeholder="readonly"
        readOnly={true}
        onChange={handleChange}
        value="fixed value"
      />,
    );

    const input = screen.getByPlaceholderText("readonly");
    expect(input).toHaveAttribute("readonly");
    await user.click(input);
    await user.keyboard("should not type");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("TC-004: input với readOnly={true} khi status=sending (auth form) KHÔNG được gõ", () => {
    render(
      <InputShell
        placeholder="sending"
        readOnly={true}
        value="user@example.com"
      />,
    );
    const input = screen.getByPlaceholderText("sending");
    expect(input).toHaveAttribute("readonly");
  });

  it("TC-005: shell hiển thị focus ring khi readOnly=false", () => {
    const { container } = render(
      <InputShell placeholder="focused" readOnly={false} value="" />,
    );
    const label = container.querySelector("label");
    expect(label?.className).toContain("focus-within");
  });

  it("TC-006: shell KHÔNG hiển thị focus ring khi readOnly=true (disabled)", () => {
    const { container } = render(
      <InputShell placeholder="no-focus" readOnly={true} value="" />,
    );
    const label = container.querySelector("label");
    expect(label?.className).not.toContain("focus-within");
  });
});
