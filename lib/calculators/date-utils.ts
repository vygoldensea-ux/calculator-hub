import type { CalendarDate } from "@/types/calculator";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function parseCalendarDate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!year || month < 1 || month > 12) {
    return null;
  }

  if (day < 1 || day > daysInMonth(year, month)) {
    return null;
  }

  return { day, month, year };
}

export function toUtcDate(value: CalendarDate): Date {
  return new Date(Date.UTC(value.year, value.month - 1, value.day));
}

export function compareCalendarDates(a: CalendarDate, b: CalendarDate): number {
  return toUtcDate(a).getTime() - toUtcDate(b).getTime();
}

export function getTodayCalendarDate(): CalendarDate {
  const today = new Date();

  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };
}

export function getTotalDaysBetween(start: CalendarDate, end: CalendarDate) {
  return Math.round(
    (toUtcDate(end).getTime() - toUtcDate(start).getTime()) / DAY_IN_MS,
  );
}

export function getCalendarDifference(start: CalendarDate, end: CalendarDate) {
  const totalDays = getTotalDaysBetween(start, end);
  let years = end.year - start.year;
  let months = end.month - start.month;
  let days = end.day - start.day;

  if (days < 0) {
    months -= 1;

    const previousMonth = end.month === 1 ? 12 : end.month - 1;
    const previousMonthYear = end.month === 1 ? end.year - 1 : end.year;

    days += daysInMonth(previousMonthYear, previousMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    days,
    months,
    totalDays,
    years,
  };
}

export function getWeeksAndDays(totalDays: number) {
  return {
    days: totalDays % 7,
    weeks: Math.floor(totalDays / 7),
  };
}

export function getApproximateMonths(totalDays: number) {
  return totalDays / 30.4375;
}
