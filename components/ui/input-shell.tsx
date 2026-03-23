import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export const inputShellFrameStyles =
  "flex h-12 items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm text-[var(--color-text-soft)] shadow-[var(--shadow-soft)] transition-[border-color,box-shadow,background-color] duration-150 ease-out motion-reduce:transition-none";

type InputShellProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  leading?: ReactNode;
  shellClassName?: string;
  trailing?: ReactNode;
};

export function InputShell({
  className,
  leading,
  readOnly = true,
  shellClassName,
  trailing,
  ...props
}: InputShellProps) {
  return (
    <label
      className={cn(
        inputShellFrameStyles,
        shellClassName,
      )}
    >
      {leading ? <span className="text-[var(--color-text-muted)]">{leading}</span> : null}
      <input
        className={cn(
          "w-full min-w-0 bg-transparent text-[var(--color-text)] outline-none [color-scheme:light]",
          className,
        )}
        readOnly={readOnly}
        {...props}
      />
      {trailing ? (
        <span className="text-[var(--color-text-muted)]">{trailing}</span>
      ) : null}
    </label>
  );
}
