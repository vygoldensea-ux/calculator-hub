/**
 * Test cases cho AppShell sidebar
 */
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

let currentPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => currentPathname,
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

vi.mock("@/components/layout/app-sidebar", () => ({
  AppSidebar: ({
    onClose,
    onNavigate,
  }: {
    onClose: () => void;
    onNavigate: () => void;
  }) => (
    <nav data-testid="sidebar">
      <button onClick={onClose} data-testid="close-btn">Close sidebar</button>
      <button onClick={onNavigate} data-testid="navigate-btn">Navigate</button>
    </nav>
  ),
}));

vi.mock("@/components/layout/top-header", () => ({
  TopHeader: ({ onOpenSidebar }: { onOpenSidebar: () => void }) => (
    <button onClick={onOpenSidebar} data-testid="hamburger-btn" aria-label="Open navigation">
      Menu
    </button>
  ),
}));

vi.mock("@/components/layout/right-rail", () => ({
  RightRail: () => <aside data-testid="right-rail" />,
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

import { AppShell } from "@/components/layout/app-shell";

// Helper: find overlay by label (may be aria-hidden)
const getOverlay = () =>
  screen.getByLabelText("Close navigation", { selector: "button" });

describe("AppShell sidebar open/close", () => {
  beforeEach(() => {
    currentPathname = "/";
  });

  it("TC-014: Sidebar đóng theo mặc định (pointer-events-none, opacity-0)", () => {
    render(<AppShell><div>content</div></AppShell>);
    const overlay = getOverlay();
    expect(overlay.className).toContain("pointer-events-none");
    expect(overlay.className).toContain("opacity-0");
  });

  it("TC-015: Click hamburger → sidebar mở (pointer-events-auto, opacity-100)", async () => {
    const user = userEvent.setup();
    render(<AppShell><div>content</div></AppShell>);

    await user.click(screen.getByTestId("hamburger-btn"));

    const overlay = getOverlay();
    expect(overlay.className).toContain("pointer-events-auto");
    expect(overlay.className).toContain("opacity-100");
  });

  it("TC-016: Click overlay → sidebar đóng", async () => {
    const user = userEvent.setup();
    render(<AppShell><div>content</div></AppShell>);

    await user.click(screen.getByTestId("hamburger-btn")); // open
    await user.click(getOverlay()); // close via overlay

    expect(getOverlay().className).toContain("pointer-events-none");
  });

  it("TC-017: Close button trong sidebar → sidebar đóng", async () => {
    const user = userEvent.setup();
    render(<AppShell><div>content</div></AppShell>);

    await user.click(screen.getByTestId("hamburger-btn"));
    await user.click(screen.getByTestId("close-btn"));

    expect(getOverlay().className).toContain("pointer-events-none");
  });

  it("TC-018: Navigate link trong sidebar → sidebar đóng", async () => {
    const user = userEvent.setup();
    render(<AppShell><div>content</div></AppShell>);

    await user.click(screen.getByTestId("hamburger-btn"));
    await user.click(screen.getByTestId("navigate-btn"));

    expect(getOverlay().className).toContain("pointer-events-none");
  });

  it("TC-019: Sidebar luôn đóng sau khi mount (pathname mới = fresh state)", () => {
    currentPathname = "/calculator/bmi-calculator";
    render(<AppShell><div>new page</div></AppShell>);

    // On initial render at any route, sidebar should be closed
    expect(getOverlay().className).toContain("pointer-events-none");
  });

  it("TC-020: Overlay tabIndex=-1 khi đóng (keyboard trap prevention)", () => {
    render(<AppShell><div>content</div></AppShell>);
    expect(getOverlay()).toHaveAttribute("tabindex", "-1");
  });

  it("TC-021: Sau khi mở sidebar, tabIndex overlay là 0 (focusable)", async () => {
    const user = userEvent.setup();
    render(<AppShell><div>content</div></AppShell>);

    await user.click(screen.getByTestId("hamburger-btn"));
    expect(getOverlay()).not.toHaveAttribute("tabindex", "-1");
  });
});
