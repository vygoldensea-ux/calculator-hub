import type { CalendarDate } from "@/types/calculator";

import { getCalendarDifference } from "@/lib/calculators/date-utils";

export type AgeCalculatorInput = {
  birthDate: CalendarDate;
  endDate: CalendarDate;
};

export type AgeCalculatorOutput = {
  days: number;
  months: number;
  totalDays: number;
  years: number;
};

export function calculateAge(input: AgeCalculatorInput): AgeCalculatorOutput {
  const difference = getCalendarDifference(input.birthDate, input.endDate);

  return {
    days: difference.days,
    months: difference.months,
    totalDays: difference.totalDays,
    years: difference.years,
  };
}
