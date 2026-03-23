import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonStyleOptions = {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions;

export function buttonStyles({
  size = "md",
  variant = "primary",
}: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full font-medium leading-none whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out active:scale-[0.99] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/35",
    size === "sm" && "h-10 px-4 text-sm",
    size === "md" && "h-11 px-5 text-sm",
    variant === "primary" &&
      "bg-[var(--color-text)] !text-white visited:!text-white hover:bg-slate-800",
    variant === "secondary" &&
      "border border-[var(--color-border)] bg-white !text-[var(--color-text)] visited:!text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]",
    variant === "ghost" &&
      "bg-transparent text-[var(--color-text-soft)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
  );
}

export function Button({
  className,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ size, variant }), className)}
      type={type}
      {...props}
    />
  );
}
