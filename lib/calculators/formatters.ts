import type { CalendarDate } from "@/types/calculator";

import { toUtcDate } from "@/lib/calculators/date-utils";

type FormatValueOptions = Intl.NumberFormatOptions & {
  locale?: string;
};

export function formatNumber(
  value: number,
  options: FormatValueOptions = {},
): string {
  const { locale = "en-US", ...intlOptions } = options;

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    ...intlOptions,
  }).format(value);
}

export function formatCurrency(
  value: number,
  options: FormatValueOptions = {},
): string {
  return formatNumber(value, {
    currency: "USD",
    style: "currency",
    ...options,
  });
}

export function formatSignedNumber(
  value: number,
  options: FormatValueOptions = {},
): string {
  return formatNumber(value, {
    signDisplay: "exceptZero",
    ...options,
  });
}

export function formatPercent(
  value: number,
  options: FormatValueOptions = {},
): string {
  return `${formatNumber(value, options)}%`;
}

export function formatSignedPercent(
  value: number,
  options: FormatValueOptions = {},
): string {
  return `${formatSignedNumber(value, options)}%`;
}

export function formatDate(
  value: CalendarDate,
  options: Intl.DateTimeFormatOptions = {},
): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
    ...options,
  }).format(toUtcDate(value));
}
