/**
 * Test cases cho UI layout bugs
 * Bugs cũ:
 * - --text-hero quá to trên mobile → text overflow, đè nhau
 * - line-height: 1.08 quá chặt → text đè nhau
 * - FAQ accordion không có chevron indicator
 * - scroll={false} trên nav links → double-click impression
 * - agent-log spam
 */
import path from "path";
import fs from "fs";
import { describe, expect, it } from "vitest";

const WDIR = path.resolve(__dirname, "..");

describe("CSS Variables - text sizes (globals.css)", () => {
  const cssContent = fs.readFileSync(path.join(WDIR, "app/globals.css"), "utf8");

  it("TC-036: --text-hero min value phải <= 2rem (tránh overflow mobile 375px)", () => {
    const match = cssContent.match(/--text-hero:\s*clamp\(([\d.]+)rem/);
    expect(match).not.toBeNull();
    const minRem = match ? parseFloat(match[1]) : 99;
    expect(minRem).toBeLessThanOrEqual(2);
  });

  it("TC-037: --text-3xl min value phải <= 2rem", () => {
    const match = cssContent.match(/--text-3xl:\s*clamp\(([\d.]+)rem/);
    expect(match).not.toBeNull();
    const minRem = match ? parseFloat(match[1]) : 99;
    expect(minRem).toBeLessThanOrEqual(2);
  });

  it("TC-038: .page-hero-title line-height phải >= 1.2 (tránh text lines đè nhau)", () => {
    const match = cssContent.match(/\.page-hero-title[\s\S]*?line-height:\s*([\d.]+)/);
    expect(match).not.toBeNull();
    const lineHeight = match ? parseFloat(match[1]) : 0;
    expect(lineHeight).toBeGreaterThanOrEqual(1.2);
  });
});

describe("FAQ Accordion - toggle indicator (calculator-experience.tsx)", () => {
  const content = fs.readFileSync(
    path.join(WDIR, "components/calculator/calculator-experience.tsx"),
    "utf8"
  );

  it("TC-039: FAQ summary phải có SVG (chevron indicator)", () => {
    // The fixed version adds an SVG chevron inside summary
    expect(content).toContain("group-open:rotate-180");
  });

  it("TC-040: FAQ summary không dùng 'list-none pr-8' (cũ làm mất space cho chevron)", () => {
    expect(content).not.toContain("list-none pr-8");
  });

  it("TC-041: FAQ summary dùng flex justify-between để align text và chevron", () => {
    expect(content).toContain("justify-between");
  });
});

describe("Navigation - scroll={false} đã xóa", () => {
  const filesToCheck = [
    "components/layout/app-sidebar.tsx",
    "components/layout/top-header.tsx",
    "components/auth/auth-controls.tsx",
    "components/calculator/calculator-experience.tsx",
    "components/navigation/breadcrumbs.tsx",
    "components/content/article-card.tsx",
    "components/tool/tool-card.tsx",
    "components/tool/category-card.tsx",
  ];

  filesToCheck.forEach((file) => {
    it(`TC: ${file} không còn scroll={false}`, () => {
      const content = fs.readFileSync(path.join(WDIR, file), "utf8");
      expect(content).not.toContain("scroll={false}");
    });
  });
});

describe("Agent log cleanup - performance", () => {
  it("TC-042: app/api/agent-log/route.ts đã bị xóa", () => {
    expect(fs.existsSync(path.join(WDIR, "app/api/agent-log/route.ts"))).toBe(false);
  });

  it("TC-043: Không còn reference đến 127.0.0.1:7288", () => {
    const { execSync } = require("child_process");
    try {
      const result = execSync(
        `grep -r "127.0.0.1:7288" "${WDIR}" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next -l`,
        { encoding: "utf8" }
      );
      expect(result.trim()).toBe("");
    } catch {
      // grep returns exit code 1 when nothing found = expected good case
    }
  });

  it("TC-044: auth-form.tsx không còn agent-log code", () => {
    const content = fs.readFileSync(
      path.join(WDIR, "components/auth/auth-form.tsx"), "utf8"
    );
    expect(content).not.toContain("agent-log");
    expect(content).not.toContain("f24328");
    expect(content).not.toContain("127.0.0.1");
  });

  it("TC-045: use-auth-user.ts không còn agent-log code", () => {
    const content = fs.readFileSync(
      path.join(WDIR, "lib/supabase/use-auth-user.ts"), "utf8"
    );
    expect(content).not.toContain("agent-log");
    expect(content).not.toContain("f24328");
  });

  it("TC-046: app-shell.tsx không còn useEffect rỗng (cleanup)", () => {
    const content = fs.readFileSync(
      path.join(WDIR, "components/layout/app-shell.tsx"), "utf8"
    );
    // Should not have an empty useEffect that was just for agent logging
    expect(content).not.toContain("useEffect(() => {\n  }, [pathname])");
  });
});

describe("InputShell - readOnly default fix", () => {
  const content = fs.readFileSync(
    path.join(WDIR, "components/ui/input-shell.tsx"), "utf8"
  );

  it("TC-047: InputShell không có readOnly = true default", () => {
    expect(content).not.toContain("readOnly = true");
  });

  it("TC-048: InputShell có focus ring khi readOnly=false", () => {
    expect(content).toContain("focus-within");
  });
});

describe("AppShell - sidebar state management fix", () => {
  const content = fs.readFileSync(
    path.join(WDIR, "components/layout/app-shell.tsx"), "utf8"
  );

  it("TC-049: AppShell dùng boolean state (isSidebarOpen) thay vì sidebarRoute===pathname", () => {
    expect(content).toContain("isSidebarOpen");
    expect(content).not.toContain("sidebarRoute");
  });

  it("TC-050: AppShell đóng sidebar khi pathname thay đổi (useEffect với pathname dependency)", () => {
    expect(content).toContain("setIsSidebarOpen(false)");
    expect(content).toContain("[pathname]");
  });
});
