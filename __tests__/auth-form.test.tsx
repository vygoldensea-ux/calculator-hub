/**
 * Test cases cho AuthForm component
 * Bugs cũ:
 * - Form submit bị block bởi agent-log fetch spam
 * - readOnly không được set đúng khi idle → không gõ email được
 * - Error từ Supabase không hiển thị
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock Supabase environment
vi.mock("@/lib/supabase/env", () => ({
  hasSupabaseEnv: true,
}));

// Mock Supabase client
const mockSignInWithOtp = vi.fn();
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithOtp: mockSignInWithOtp,
    },
  }),
}));

// Mock analytics
vi.mock("@/lib/analytics/ga", () => ({
  trackEvent: vi.fn(),
}));

import { AuthForm } from "@/components/auth/auth-form";

describe("AuthForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInWithOtp.mockResolvedValue({ error: null });
  });

  it("TC-007: Email input phải gõ được khi status=idle (bug: readOnly default)", async () => {
    const user = userEvent.setup();
    render(<AuthForm nextPath="/dashboard" />);

    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).not.toHaveAttribute("readonly");

    await user.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  it("TC-008: Nút Send magic link disabled khi email rỗng", () => {
    render(<AuthForm nextPath="/dashboard" />);
    const button = screen.getByRole("button", { name: /send magic link/i });
    expect(button).toBeDisabled();
  });

  it("TC-009: Nút Send magic link enabled sau khi nhập email hợp lệ", async () => {
    const user = userEvent.setup();
    render(<AuthForm nextPath="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.com");
    const button = screen.getByRole("button", { name: /send magic link/i });
    expect(button).not.toBeDisabled();
  });

  it("TC-010: Submit thành công hiển thị thông báo kiểm tra email", async () => {
    const user = userEvent.setup();
    render(<AuthForm nextPath="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /send magic link/i }));

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
    });
  });

  it("TC-011: Lỗi từ Supabase hiển thị cho user (không bị swallow)", async () => {
    mockSignInWithOtp.mockResolvedValue({
      error: { message: "Email rate limit exceeded" },
    });

    const user = userEvent.setup();
    render(<AuthForm nextPath="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /send magic link/i }));

    await waitFor(() => {
      expect(screen.getByText(/email rate limit exceeded/i)).toBeInTheDocument();
    });
  });

  it("TC-012: Input bị disabled (readOnly) khi đang gửi (status=sending)", async () => {
    // Make OTP call hang so we can check the intermediate state
    let resolve!: () => void;
    mockSignInWithOtp.mockReturnValue(
      new Promise((res) => {
        resolve = () => res({ error: null });
      }),
    );

    const user = userEvent.setup();
    render(<AuthForm nextPath="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /send magic link/i }));

    // During sending, input should be readonly
    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).toHaveAttribute("readonly");
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();

    resolve();
  });

  it("TC-013: Không có agent-log fetch spam khi submit (performance)", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    render(<AuthForm nextPath="/dashboard" />);

    await user.type(screen.getByPlaceholderText("you@example.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /send magic link/i }));

    await waitFor(() => screen.getByText(/check your email/i));

    // Only the Supabase auth call should happen - no agent-log calls
    const agentLogCalls = fetchSpy.mock.calls.filter(([url]) =>
      String(url).includes("agent-log") || String(url).includes("127.0.0.1:7288"),
    );
    expect(agentLogCalls).toHaveLength(0);
    fetchSpy.mockRestore();
  });
});
