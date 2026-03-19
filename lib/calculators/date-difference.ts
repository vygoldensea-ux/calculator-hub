import type { CalendarDate } from "@/types/calculator";

import {
  getApproximateMonths,
  getCalendarDifference,
  getWeeksAndDays,
} from "@/lib/calculators/date-utils";

export type DateDifferenceCalculatorInput = {
  endDate: CalendarDate;
  startDate: CalendarDate;
};

export type DateDifferenceCalculatorOutput = {
  approximateMonths: number;
  calendarDays: number;
  calendarMonths: number;
  calendarYears: number;
  totalDays: number;
  weeks: number;
  weeksRemainderDays: number;
};

export function calculateDateDifference(
  input: DateDifferenceCalculatorInput,
): DateDifferenceCalculatorOutput {
  const difference = getCalendarDifference(input.startDate, input.endDate);
  const weeksAndDays = getWeeksAndDays(difference.totalDays);

  return {
    approximateMonths: getApproximateMonths(difference.totalDays),
    calendarDays: difference.days,
    calendarMonths: difference.months,
    calendarYears: difference.years,
    totalDays: difference.totalDays,
    weeks: weeksAndDays.weeks,
    weeksRemainderDays: weeksAndDays.days,
  };
}
