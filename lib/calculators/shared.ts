import type {
  CalendarDate,
  CalculatorFormValues,
  CalculatorResultView,
  CalculatorRunState,
} from "@/types/calculator";

import { parseCalendarDate } from "@/lib/calculators/date-utils";

type ValidationResult<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      message: string;
      ok: false;
    };

type NumberValidationOptions = {
  allowZero?: boolean;
  max?: number;
  min?: number;
};

export function parseRequiredNumber(
  rawValue: string,
  label: string,
  options: NumberValidationOptions = {},
): ValidationResult<number> {
  const value = rawValue.trim();

  if (!value) {
    return {
      message: `Enter ${label.toLowerCase()} to continue.`,
      ok: false,
    };
  }

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return {
      message: `${label} needs to be a valid number.`,
      ok: false,
    };
  }

  if (options.allowZero === false && numericValue === 0) {
    return {
      message: `${label} cannot be 0 for this calculation.`,
      ok: false,
    };
  }

  if (options.min !== undefined && numericValue < options.min) {
    return {
      message: `${label} must be at least ${options.min}.`,
      ok: false,
    };
  }

  if (options.max !== undefined && numericValue > options.max) {
    return {
      message: `${label} must be ${options.max} or less.`,
      ok: false,
    };
  }

  return {
    ok: true,
    value: numericValue,
  };
}

export function parseRequiredDate(
  rawValue: string,
  label: string,
): ValidationResult<CalendarDate> {
  if (!rawValue.trim()) {
    return {
      message: `Choose ${label.toLowerCase()} to continue.`,
      ok: false,
    };
  }

  const parsedDate = parseCalendarDate(rawValue);

  if (!parsedDate) {
    return {
      message: `${label} needs to be a real calendar date.`,
      ok: false,
    };
  }

  return {
    ok: true,
    value: parsedDate,
  };
}

export function hasAnyValue(
  values: CalculatorFormValues,
  fieldNames: string[],
): boolean {
  return fieldNames.some((fieldName) => values[fieldName]?.trim());
}

export function hasAllValues(
  values: CalculatorFormValues,
  fieldNames: string[],
): boolean {
  return fieldNames.every((fieldName) => values[fieldName]?.trim());
}

export function emptyState(
  title: string,
  message: string,
): CalculatorRunState {
  return {
    message,
    status: "empty",
    title,
  };
}

export function errorState(
  title: string,
  message: string,
): CalculatorRunState {
  return {
    message,
    status: "error",
    title,
  };
}

export function successState(
  title: string,
  message: string,
  result: CalculatorResultView,
): CalculatorRunState {
  return {
    message,
    result,
    status: "success",
    title,
  };
}
