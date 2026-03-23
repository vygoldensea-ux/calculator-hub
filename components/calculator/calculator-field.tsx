"use client";

import { InputShell, inputShellFrameStyles } from "@/components/ui/input-shell";
import type { CalculatorField as CalculatorFieldDefinition } from "@/types/calculator";
import { cn } from "@/lib/utils";

type CalculatorFieldProps = {
  field: CalculatorFieldDefinition;
  onChange: (name: string, value: string) => void;
  value: string;
};

export function CalculatorField({
  field,
  onChange,
  value,
}: CalculatorFieldProps) {
  const fieldId = `calculator-field-${field.name}`;

  return (
    <div className={cn(field.width === "full" && "md:col-span-2")}>
      <label
        className="mb-2 block text-sm font-semibold text-[var(--color-text)]"
        htmlFor={fieldId}
      >
        {field.label}
      </label>

      {field.type === "select" ? (
        <div
          className={cn(
            inputShellFrameStyles,
            "pr-3 text-[var(--color-text)] focus-within:border-[var(--color-brand)]/40",
          )}
        >
          <select
            className="w-full min-w-0 appearance-none bg-transparent text-[var(--color-text)] outline-none"
            id={fieldId}
            onChange={(event) => onChange(field.name, event.target.value)}
            value={value}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
        </div>
      ) : (
        <InputShell
          autoComplete={field.autoComplete}
          id={fieldId}
          max={field.max}
          min={field.min}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          readOnly={false}
          step={field.step}
          trailing={field.suffix}
          type={field.type}
          value={value}
        />
      )}

      {field.helper ? (
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
          {field.helper}
        </p>
      ) : null}
    </div>
  );
}
