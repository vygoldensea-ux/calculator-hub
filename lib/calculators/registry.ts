import { calculatorPageContent } from "@/content/calculator-pages";
import { calculateAge } from "@/lib/calculators/age";
import { calculateBmi } from "@/lib/calculators/bmi";
import { calculateCalorieNeeds } from "@/lib/calculators/calorie";
import { calculateCompoundInterest } from "@/lib/calculators/compound-interest";
import {
  compareCalendarDates,
  getTodayCalendarDate,
} from "@/lib/calculators/date-utils";
import { calculateDateDifference } from "@/lib/calculators/date-difference";
import { calculateDiscount } from "@/lib/calculators/discount";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  formatSignedNumber,
  formatSignedPercent,
} from "@/lib/calculators/formatters";
import { calculateGrade } from "@/lib/calculators/grade";
import { calculateInvestmentGrowth } from "@/lib/calculators/investment";
import { calculateLoan } from "@/lib/calculators/loan";
import { calculateMortgage } from "@/lib/calculators/mortgage";
import { calculatePercentChange } from "@/lib/calculators/percent-change";
import {
  emptyState,
  errorState,
  hasAllValues,
  hasAnyValue,
  parseRequiredDate,
  parseRequiredNumber,
  successState,
} from "@/lib/calculators/shared";
import { calculatePercentage } from "@/lib/calculators/percentage";
import type {
  CalculatorDefinition,
  CalculatorFormValues,
  CalculatorResultView,
  ImplementedCalculatorSlug,
} from "@/types/calculator";

function pluralize(value: number, singular: string) {
  return `${formatNumber(value, { maximumFractionDigits: 0 })} ${singular}${value === 1 ? "" : "s"}`;
}

function formatCalendarSpan(years: number, months: number, days: number) {
  const parts = [
    years ? pluralize(years, "year") : "",
    months ? pluralize(months, "month") : "",
    days ? pluralize(days, "day") : "",
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "0 days";
}

function getAgeHeadline(years: number, months: number, days: number) {
  if (years > 0) {
    return pluralize(years, "year");
  }

  if (months > 0) {
    return pluralize(months, "month");
  }

  return pluralize(days, "day");
}

function runPercentageCalculator(values: CalculatorFormValues) {
  const mode = values.mode || "percent-of";

  if (mode === "percent-of") {
    const fields = ["percent", "value"];

    if (!hasAnyValue(values, fields)) {
      return emptyState(
        "Ready for a quick percentage",
        "Enter a percent and a value to see the result instantly.",
      );
    }

    if (!hasAllValues(values, fields)) {
      return emptyState(
        "Almost there",
        "Add both the percent and the value to finish the calculation.",
      );
    }

    const percent = parseRequiredNumber(values.percent, "Percent");

    if (!percent.ok) {
      return errorState("Check the percent input", percent.message);
    }

    const value = parseRequiredNumber(values.value, "Value");

    if (!value.ok) {
      return errorState("Check the value input", value.message);
    }

    const output = calculatePercentage({
      mode: "percent-of",
      percent: percent.value,
      value: value.value,
    });

    return successState(
      "Result updated",
      "This answer updates as soon as your inputs make sense.",
      {
        metrics: [
          {
            label: "Percent",
            value: formatPercent(output.percent),
          },
          {
            label: "Base value",
            value: formatNumber(output.value),
          },
          {
            label: "Decimal form",
            value: formatNumber(output.percent / 100, {
              maximumFractionDigits: 4,
            }),
          },
        ],
        primaryLabel: `${formatPercent(output.percent)} of ${formatNumber(output.value)}`,
        primaryValue: formatNumber(output.result),
        summary: `${formatPercent(output.percent)} of ${formatNumber(output.value)} equals ${formatNumber(output.result)}.`,
      },
    );
  }

  if (mode === "what-percent") {
    const fields = ["part", "whole"];

    if (!hasAnyValue(values, fields)) {
      return emptyState(
        "Ready for a quick percentage",
        "Enter the part and the whole to see what percentage they produce.",
      );
    }

    if (!hasAllValues(values, fields)) {
      return emptyState(
        "Almost there",
        "Add both the part and the whole to finish the calculation.",
      );
    }

    const part = parseRequiredNumber(values.part, "Part");

    if (!part.ok) {
      return errorState("Check the part input", part.message);
    }

    const whole = parseRequiredNumber(values.whole, "Whole", {
      allowZero: false,
    });

    if (!whole.ok) {
      return errorState("Check the whole input", whole.message);
    }

    const output = calculatePercentage({
      mode: "what-percent",
      part: part.value,
      whole: whole.value,
    });

    return successState(
      "Result updated",
      "This answer updates as soon as your inputs make sense.",
      {
        metrics: [
          {
            label: "Part",
            value: formatNumber(output.part),
          },
          {
            label: "Whole",
            value: formatNumber(output.whole),
          },
          {
            label: "Ratio",
            value: formatNumber(output.part / output.whole, {
              maximumFractionDigits: 4,
            }),
          },
        ],
        primaryLabel: `${formatNumber(output.part)} is what percent of ${formatNumber(output.whole)}?`,
        primaryValue: formatPercent(output.result),
        summary: `${formatNumber(output.part)} is ${formatPercent(output.result)} of ${formatNumber(output.whole)}.`,
      },
    );
  }

  const fields = ["base", "percent", "direction"];

  if (!hasAnyValue(values, ["base", "percent"])) {
    return emptyState(
      "Ready for a quick percentage",
      "Enter a starting value and an adjustment percent to see the new total.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add the starting value, percent, and direction to finish the calculation.",
    );
  }

  const base = parseRequiredNumber(values.base, "Starting value");

  if (!base.ok) {
    return errorState("Check the starting value", base.message);
  }

  const percent = parseRequiredNumber(values.percent, "Adjustment percent", {
    min: 0,
  });

  if (!percent.ok) {
    return errorState("Check the percent input", percent.message);
  }

  const output = calculatePercentage({
    direction: values.direction === "decrease" ? "decrease" : "increase",
    mode: "adjust-by-percent",
    percent: percent.value,
    value: base.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Starting value",
          value: formatNumber(output.value),
        },
        {
          label: "Adjustment",
          value: formatPercent(output.percent),
        },
        {
          label: "Change amount",
          tone: output.direction === "increase" ? "positive" : "warning",
          value: formatSignedNumber(output.delta),
        },
      ],
      primaryLabel: `${output.direction === "increase" ? "After increasing" : "After decreasing"} ${formatNumber(output.value)} by ${formatPercent(output.percent)}`,
      primaryTone: output.direction === "increase" ? "positive" : "warning",
      primaryValue: formatNumber(output.result),
      summary: `${formatNumber(output.value)} ${output.direction === "increase" ? "increased" : "decreased"} by ${formatPercent(output.percent)} becomes ${formatNumber(output.result)}.`,
    },
  );
}

function runPercentChangeCalculator(values: CalculatorFormValues) {
  const fields = ["oldValue", "newValue"];

  if (!hasAnyValue(values, fields)) {
    return emptyState(
      "Compare two values",
      "Enter an old value and a new value to measure the percent change.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add both values to calculate the percent change.",
    );
  }

  const oldValue = parseRequiredNumber(values.oldValue, "Old value", {
    allowZero: false,
  });

  if (!oldValue.ok) {
    return errorState("Check the old value", oldValue.message);
  }

  const newValue = parseRequiredNumber(values.newValue, "New value");

  if (!newValue.ok) {
    return errorState("Check the new value", newValue.message);
  }

  const output = calculatePercentChange({
    newValue: newValue.value,
    oldValue: oldValue.value,
  });

  const primaryTone =
    output.direction === "increase"
      ? "positive"
      : output.direction === "decrease"
        ? "warning"
        : "default";

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Old value",
          value: formatNumber(oldValue.value),
        },
        {
          label: "New value",
          value: formatNumber(newValue.value),
        },
        {
          label: "Absolute change",
          tone: primaryTone,
          value: formatSignedNumber(output.absoluteChange),
        },
      ],
      primaryLabel: "Percent change",
      primaryTone,
      primaryValue: formatSignedPercent(output.percentChange),
      summary:
        output.direction === "no-change"
          ? "The old value and new value are the same, so the percent change is 0%."
          : `Moving from ${formatNumber(oldValue.value)} to ${formatNumber(newValue.value)} is a ${formatPercent(Math.abs(output.percentChange))} ${output.direction}.`,
    },
  );
}

function runDiscountCalculator(values: CalculatorFormValues) {
  const fields = ["originalPrice", "discountPercent"];

  if (!hasAnyValue(values, fields)) {
    return emptyState(
      "Check the sale price",
      "Enter an original price and discount percent to see the final price.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add both the original price and discount percent to finish the calculation.",
    );
  }

  const originalPrice = parseRequiredNumber(values.originalPrice, "Original price", {
    min: 0,
  });

  if (!originalPrice.ok) {
    return errorState("Check the original price", originalPrice.message);
  }

  const discountPercent = parseRequiredNumber(
    values.discountPercent,
    "Discount percent",
    {
      max: 100,
      min: 0,
    },
  );

  if (!discountPercent.ok) {
    return errorState("Check the discount percent", discountPercent.message);
  }

  const output = calculateDiscount({
    discountPercent: discountPercent.value,
    originalPrice: originalPrice.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Original price",
          value: formatNumber(originalPrice.value),
        },
        {
          label: "Discount",
          value: formatPercent(discountPercent.value),
        },
        {
          label: "Amount saved",
          tone: "positive",
          value: formatNumber(output.amountSaved),
        },
      ],
      primaryLabel: "Final price",
      primaryValue: formatNumber(output.finalPrice),
      summary: `A ${formatPercent(discountPercent.value)} discount on ${formatNumber(originalPrice.value)} saves ${formatNumber(output.amountSaved)} and leaves ${formatNumber(output.finalPrice)}.`,
    },
  );
}

function runAgeCalculator(values: CalculatorFormValues) {
  const mode = values.ageMode || "today";
  const requiredFields = mode === "custom" ? ["birthDate", "endDate"] : ["birthDate"];

  if (!hasAnyValue(values, requiredFields)) {
    return emptyState(
      "Calculate an age",
      "Choose a birth date to see the age, then switch to a custom end date if you need one.",
    );
  }

  if (!hasAllValues(values, requiredFields)) {
    return emptyState(
      "Almost there",
      mode === "custom"
        ? "Add both the birth date and end date to finish the age calculation."
        : "Add a birth date to finish the age calculation.",
    );
  }

  const birthDate = parseRequiredDate(values.birthDate, "Birth date");

  if (!birthDate.ok) {
    return errorState("Check the birth date", birthDate.message);
  }

  const endDate =
    mode === "custom"
      ? parseRequiredDate(values.endDate, "End date")
      : {
          ok: true as const,
          value: getTodayCalendarDate(),
        };

  if (!endDate.ok) {
    return errorState("Check the end date", endDate.message);
  }

  if (compareCalendarDates(birthDate.value, endDate.value) > 0) {
    return errorState(
      "Dates need another look",
      "The end date needs to be the same as or later than the birth date.",
    );
  }

  const output = calculateAge({
    birthDate: birthDate.value,
    endDate: endDate.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Birth date",
          value: formatDate(birthDate.value),
        },
        {
          label: "End date",
          value: formatDate(endDate.value),
        },
        {
          label: "Total days",
          value: formatNumber(output.totalDays, {
            maximumFractionDigits: 0,
          }),
        },
      ],
      primaryLabel: `Age on ${formatDate(endDate.value)}`,
      primaryValue: getAgeHeadline(output.years, output.months, output.days),
      summary: `From ${formatDate(birthDate.value)} to ${formatDate(endDate.value)} is ${formatCalendarSpan(output.years, output.months, output.days)}.`,
    },
  );
}

function runDateDifferenceCalculator(values: CalculatorFormValues) {
  const fields = ["startDate", "endDate"];

  if (!hasAnyValue(values, fields)) {
    return emptyState(
      "Measure the span between dates",
      "Choose a start date and end date to see the total number of days between them.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add both the start date and end date to finish the calculation.",
    );
  }

  const startDate = parseRequiredDate(values.startDate, "Start date");

  if (!startDate.ok) {
    return errorState("Check the start date", startDate.message);
  }

  const endDate = parseRequiredDate(values.endDate, "End date");

  if (!endDate.ok) {
    return errorState("Check the end date", endDate.message);
  }

  if (compareCalendarDates(startDate.value, endDate.value) > 0) {
    return errorState(
      "Dates need another look",
      "The end date needs to be the same as or later than the start date.",
    );
  }

  const output = calculateDateDifference({
    endDate: endDate.value,
    startDate: startDate.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Full weeks",
          value:
            output.weeksRemainderDays > 0
              ? `${pluralize(output.weeks, "week")} + ${pluralize(output.weeksRemainderDays, "day")}`
              : pluralize(output.weeks, "week"),
        },
        {
          label: "Calendar span",
          value: formatCalendarSpan(
            output.calendarYears,
            output.calendarMonths,
            output.calendarDays,
          ),
        },
        {
          label: "Approx. months",
          value: formatNumber(output.approximateMonths, {
            maximumFractionDigits: 1,
          }),
        },
      ],
      primaryLabel: `Difference between ${formatDate(startDate.value)} and ${formatDate(endDate.value)}`,
      primaryValue: pluralize(output.totalDays, "day"),
      summary: `${pluralize(output.totalDays, "day")} is about ${formatNumber(output.approximateMonths, {
        maximumFractionDigits: 1,
      })} months, or ${pluralize(output.weeks, "week")}${output.weeksRemainderDays ? ` and ${pluralize(output.weeksRemainderDays, "day")}` : ""}.`,
    },
  );
}

function runBmiCalculator(values: CalculatorFormValues) {
  const mode = values.unitSystem || "metric";
  const requiredFields =
    mode === "metric"
      ? ["heightCm", "weightKg"]
      : ["heightInches", "weightPounds"];

  if (!hasAnyValue(values, requiredFields)) {
    return emptyState(
      "Calculate BMI",
      "Enter height and weight to see the BMI value and category.",
    );
  }

  if (!hasAllValues(values, requiredFields)) {
    return emptyState(
      "Almost there",
      "Add both height and weight to finish the BMI calculation.",
    );
  }

  if (mode === "metric") {
    const heightCm = parseRequiredNumber(values.heightCm, "Height", {
      min: 0.1,
    });

    if (!heightCm.ok) {
      return errorState("Check the height input", heightCm.message);
    }

    const weightKg = parseRequiredNumber(values.weightKg, "Weight", {
      min: 0.1,
    });

    if (!weightKg.ok) {
      return errorState("Check the weight input", weightKg.message);
    }

    const output = calculateBmi({
      heightCm: heightCm.value,
      mode: "metric",
      weightKg: weightKg.value,
    });

    return successState(
      "Result updated",
      "This answer updates as soon as your inputs make sense.",
      {
        metrics: [
          {
            label: "Category",
            tone: output.category === "Normal weight" ? "positive" : "default",
            value: output.category,
          },
          {
            label: "Height",
            value: `${formatNumber(heightCm.value)} cm`,
          },
          {
            label: "Weight",
            value: `${formatNumber(weightKg.value)} kg`,
          },
        ],
        primaryLabel: "Body mass index",
        primaryTone:
          output.category === "Normal weight"
            ? "positive"
            : output.category === "Overweight" || output.category === "Obesity"
              ? "warning"
              : "default",
        primaryValue: formatNumber(output.bmi, {
          maximumFractionDigits: 1,
        }),
        summary: `At ${formatNumber(heightCm.value)} cm and ${formatNumber(weightKg.value)} kg, the BMI is ${formatNumber(output.bmi, {
          maximumFractionDigits: 1,
        })}, which falls in the ${output.category.toLowerCase()} category.`,
      },
    );
  }

  const heightInches = parseRequiredNumber(values.heightInches, "Height", {
    min: 0.1,
  });

  if (!heightInches.ok) {
    return errorState("Check the height input", heightInches.message);
  }

  const weightPounds = parseRequiredNumber(values.weightPounds, "Weight", {
    min: 0.1,
  });

  if (!weightPounds.ok) {
    return errorState("Check the weight input", weightPounds.message);
  }

  const output = calculateBmi({
    heightInches: heightInches.value,
    mode: "imperial",
    weightPounds: weightPounds.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Category",
          tone: output.category === "Normal weight" ? "positive" : "default",
          value: output.category,
        },
        {
          label: "Height",
          value: `${formatNumber(heightInches.value)} in`,
        },
        {
          label: "Weight",
          value: `${formatNumber(weightPounds.value)} lb`,
        },
      ],
      primaryLabel: "Body mass index",
      primaryTone:
        output.category === "Normal weight"
          ? "positive"
          : output.category === "Overweight" || output.category === "Obesity"
            ? "warning"
            : "default",
      primaryValue: formatNumber(output.bmi, {
        maximumFractionDigits: 1,
      }),
      summary: `At ${formatNumber(heightInches.value)} in and ${formatNumber(weightPounds.value)} lb, the BMI is ${formatNumber(output.bmi, {
        maximumFractionDigits: 1,
      })}, which falls in the ${output.category.toLowerCase()} category.`,
    },
  );
}

function runCalorieCalculator(values: CalculatorFormValues) {
  const fields = ["sex", "age", "heightCm", "weightKg", "activityLevel"];

  if (!hasAnyValue(values, ["age", "heightCm", "weightKg"])) {
    return emptyState(
      "Estimate calorie needs",
      "Enter age, height, weight, sex, and activity level to estimate maintenance calories.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add all required inputs to estimate maintenance calories.",
    );
  }

  const age = parseRequiredNumber(values.age, "Age", {
    min: 1,
  });

  if (!age.ok) {
    return errorState("Check the age input", age.message);
  }

  const heightCm = parseRequiredNumber(values.heightCm, "Height", {
    min: 0.1,
  });

  if (!heightCm.ok) {
    return errorState("Check the height input", heightCm.message);
  }

  const weightKg = parseRequiredNumber(values.weightKg, "Weight", {
    min: 0.1,
  });

  if (!weightKg.ok) {
    return errorState("Check the weight input", weightKg.message);
  }

  const activityMultiplier = parseRequiredNumber(
    values.activityLevel,
    "Activity level",
    {
      min: 1,
    },
  );

  if (!activityMultiplier.ok) {
    return errorState("Check the activity level", activityMultiplier.message);
  }

  const output = calculateCalorieNeeds({
    activityMultiplier: activityMultiplier.value,
    age: age.value,
    heightCm: heightCm.value,
    sex: values.sex === "male" ? "male" : "female",
    weightKg: weightKg.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "BMR",
          value: `${formatNumber(output.bmr, {
            maximumFractionDigits: 0,
          })} cal/day`,
        },
        {
          label: "Mild cut",
          tone: "warning",
          value: `${formatNumber(output.mildCutCalories, {
            maximumFractionDigits: 0,
          })} cal/day`,
        },
        {
          label: "Mild bulk",
          tone: "positive",
          value: `${formatNumber(output.mildBulkCalories, {
            maximumFractionDigits: 0,
          })} cal/day`,
        },
      ],
      primaryLabel: "Maintenance calories",
      primaryValue: `${formatNumber(output.maintenanceCalories, {
        maximumFractionDigits: 0,
      })} cal/day`,
      summary: `Estimated maintenance calories are about ${formatNumber(output.maintenanceCalories, {
        maximumFractionDigits: 0,
      })} per day, with a mild cut near ${formatNumber(output.mildCutCalories, {
        maximumFractionDigits: 0,
      })} and a mild bulk near ${formatNumber(output.mildBulkCalories, {
        maximumFractionDigits: 0,
      })}.`,
    },
  );
}

function runMortgageCalculator(values: CalculatorFormValues) {
  const fields = ["loanAmount", "rate", "years"];

  if (!hasAnyValue(values, fields)) {
    return emptyState(
      "Estimate a mortgage payment",
      "Enter the loan amount, interest rate, and term to see the monthly payment.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add all required mortgage inputs to finish the estimate.",
    );
  }

  const principal = parseRequiredNumber(values.loanAmount, "Loan amount", {
    min: 0.01,
  });

  if (!principal.ok) {
    return errorState("Check the loan amount", principal.message);
  }

  const annualRatePercent = parseRequiredNumber(values.rate, "Interest rate", {
    min: 0,
  });

  if (!annualRatePercent.ok) {
    return errorState("Check the interest rate", annualRatePercent.message);
  }

  const years = parseRequiredNumber(values.years, "Loan term", {
    min: 0.1,
  });

  if (!years.ok) {
    return errorState("Check the loan term", years.message);
  }

  const output = calculateMortgage({
    annualRatePercent: annualRatePercent.value,
    principal: principal.value,
    years: years.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Total payment",
          value: formatCurrency(output.totalPayment),
        },
        {
          label: "Total interest",
          value: formatCurrency(output.totalInterest),
        },
        {
          label: "Loan term",
          value: pluralize(years.value, "year"),
        },
      ],
      primaryLabel: "Estimated monthly payment",
      primaryValue: formatCurrency(output.monthlyPayment),
      summary: `${formatCurrency(principal.value)} over ${pluralize(years.value, "year")} at ${formatPercent(annualRatePercent.value)} comes to about ${formatCurrency(output.monthlyPayment)} per month, with ${formatCurrency(output.totalInterest)} in total interest.`,
    },
  );
}

function runLoanCalculator(values: CalculatorFormValues) {
  const fields = ["loanAmount", "rate", "years"];

  if (!hasAnyValue(values, fields)) {
    return emptyState(
      "Estimate a loan payment",
      "Enter the loan amount, interest rate, and term to see the monthly payment.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add all required loan inputs to finish the estimate.",
    );
  }

  const principal = parseRequiredNumber(values.loanAmount, "Loan amount", {
    min: 0.01,
  });

  if (!principal.ok) {
    return errorState("Check the loan amount", principal.message);
  }

  const annualRatePercent = parseRequiredNumber(values.rate, "Interest rate", {
    min: 0,
  });

  if (!annualRatePercent.ok) {
    return errorState("Check the interest rate", annualRatePercent.message);
  }

  const years = parseRequiredNumber(values.years, "Loan term", {
    min: 0.1,
  });

  if (!years.ok) {
    return errorState("Check the loan term", years.message);
  }

  const output = calculateLoan({
    annualRatePercent: annualRatePercent.value,
    principal: principal.value,
    years: years.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Total payment",
          value: formatCurrency(output.totalPayment),
        },
        {
          label: "Total interest",
          value: formatCurrency(output.totalInterest),
        },
        {
          label: "Loan term",
          value: pluralize(years.value, "year"),
        },
      ],
      primaryLabel: "Estimated monthly payment",
      primaryValue: formatCurrency(output.monthlyPayment),
      summary: `${formatCurrency(principal.value)} over ${pluralize(years.value, "year")} at ${formatPercent(annualRatePercent.value)} comes to about ${formatCurrency(output.monthlyPayment)} per month, with ${formatCurrency(output.totalInterest)} in total interest.`,
    },
  );
}

function runCompoundInterestCalculator(values: CalculatorFormValues) {
  const fields = ["principal", "rate", "years", "compoundingPerYear"];

  if (!hasAnyValue(values, ["principal", "rate", "years"])) {
    return emptyState(
      "Project compound growth",
      "Enter a principal, rate, timeline, and compounding frequency to estimate the final amount.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add all required inputs to finish the compound interest estimate.",
    );
  }

  const principal = parseRequiredNumber(values.principal, "Principal", {
    min: 0,
  });

  if (!principal.ok) {
    return errorState("Check the principal input", principal.message);
  }

  const annualRatePercent = parseRequiredNumber(values.rate, "Annual rate", {
    min: 0,
  });

  if (!annualRatePercent.ok) {
    return errorState("Check the rate input", annualRatePercent.message);
  }

  const years = parseRequiredNumber(values.years, "Years", {
    min: 0,
  });

  if (!years.ok) {
    return errorState("Check the years input", years.message);
  }

  const compoundingPerYear = parseRequiredNumber(
    values.compoundingPerYear,
    "Compounding frequency",
    {
      allowZero: false,
      min: 1,
    },
  );

  if (!compoundingPerYear.ok) {
    return errorState(
      "Check the compounding frequency",
      compoundingPerYear.message,
    );
  }

  const output = calculateCompoundInterest({
    annualRatePercent: annualRatePercent.value,
    compoundingPerYear: compoundingPerYear.value,
    principal: principal.value,
    years: years.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Principal",
          value: formatCurrency(principal.value),
        },
        {
          label: "Interest earned",
          value: formatCurrency(output.interestEarned),
        },
        {
          label: "Annual rate",
          value: formatPercent(annualRatePercent.value),
        },
      ],
      primaryLabel: "Final amount",
      primaryValue: formatCurrency(output.finalAmount),
      summary: `${formatCurrency(principal.value)} at ${formatPercent(annualRatePercent.value)} for ${pluralize(years.value, "year")} grows to about ${formatCurrency(output.finalAmount)}.`,
    },
  );
}

function runInvestmentCalculator(values: CalculatorFormValues) {
  const fields = ["initialInvestment", "monthlyContribution", "rate", "years"];

  if (!hasAnyValue(values, ["initialInvestment", "monthlyContribution", "rate", "years"])) {
    return emptyState(
      "Project future value",
      "Enter a starting amount, monthly contribution, return rate, and time horizon to estimate growth.",
    );
  }

  if (!hasAllValues(values, fields)) {
    return emptyState(
      "Almost there",
      "Add all required inputs to finish the investment estimate.",
    );
  }

  const initialInvestment = parseRequiredNumber(
    values.initialInvestment,
    "Initial investment",
    {
      min: 0,
    },
  );

  if (!initialInvestment.ok) {
    return errorState(
      "Check the initial investment",
      initialInvestment.message,
    );
  }

  const monthlyContribution = parseRequiredNumber(
    values.monthlyContribution,
    "Monthly contribution",
    {
      min: 0,
    },
  );

  if (!monthlyContribution.ok) {
    return errorState(
      "Check the monthly contribution",
      monthlyContribution.message,
    );
  }

  const annualReturnPercent = parseRequiredNumber(values.rate, "Annual return", {
    min: 0,
  });

  if (!annualReturnPercent.ok) {
    return errorState("Check the return rate", annualReturnPercent.message);
  }

  const years = parseRequiredNumber(values.years, "Years", {
    min: 0,
  });

  if (!years.ok) {
    return errorState("Check the years input", years.message);
  }

  const output = calculateInvestmentGrowth({
    annualReturnPercent: annualReturnPercent.value,
    initialInvestment: initialInvestment.value,
    monthlyContribution: monthlyContribution.value,
    years: years.value,
  });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Total contributions",
          value: formatCurrency(output.totalContributions),
        },
        {
          label: "Investment growth",
          tone: "positive",
          value: formatCurrency(output.investmentGrowth),
        },
        {
          label: "Years",
          value: pluralize(years.value, "year"),
        },
      ],
      primaryLabel: "Future value",
      primaryValue: formatCurrency(output.futureValue),
      summary: `${formatCurrency(initialInvestment.value)} up front plus ${formatCurrency(monthlyContribution.value)} per month for ${pluralize(years.value, "year")} at ${formatPercent(annualReturnPercent.value)} grows to about ${formatCurrency(output.futureValue)}.`,
    },
  );
}

function runGradeCalculator(values: CalculatorFormValues) {
  const assignments = [];

  for (const row of [1, 2, 3, 4]) {
    const scoreKey = `score${row}`;
    const weightKey = `weight${row}`;
    const scoreValue = values[scoreKey]?.trim() ?? "";
    const weightValue = values[weightKey]?.trim() ?? "";

    if (!scoreValue && !weightValue) {
      continue;
    }

    if (!scoreValue || !weightValue) {
      return errorState(
        "One assignment row is incomplete",
        `Fill in both the score and the weight for assignment ${row}, or leave the row blank.`,
      );
    }

    const score = parseRequiredNumber(scoreValue, `Assignment ${row} score`, {
      max: 100,
      min: 0,
    });

    if (!score.ok) {
      return errorState("Check the grade inputs", score.message);
    }

    const weight = parseRequiredNumber(weightValue, `Assignment ${row} weight`, {
      max: 100,
      min: 0.01,
    });

    if (!weight.ok) {
      return errorState("Check the grade inputs", weight.message);
    }

    assignments.push({
      scorePercent: score.value,
      weightPercent: weight.value,
    });
  }

  if (assignments.length === 0) {
    return emptyState(
      "Estimate a weighted grade",
      "Fill in at least one score-and-weight pair to calculate the average.",
    );
  }

  const output = calculateGrade({ assignments });

  return successState(
    "Result updated",
    "This answer updates as soon as your inputs make sense.",
    {
      metrics: [
        {
          label: "Assignments used",
          value: formatNumber(output.assignmentCount, {
            maximumFractionDigits: 0,
          }),
        },
        {
          label: "Total weight entered",
          value: formatPercent(output.totalWeight),
        },
        {
          label: "Weighted average",
          tone: output.weightedAverage >= 90 ? "positive" : "default",
          value: formatPercent(output.weightedAverage, {
            maximumFractionDigits: 1,
          }),
        },
      ],
      primaryLabel: "Estimated course grade",
      primaryTone: output.weightedAverage >= 90 ? "positive" : "default",
      primaryValue: formatPercent(output.weightedAverage, {
        maximumFractionDigits: 1,
      }),
      summary: `Across ${formatNumber(output.assignmentCount, {
        maximumFractionDigits: 0,
      })} weighted assignment${output.assignmentCount === 1 ? "" : "s"}, the current average is ${formatPercent(output.weightedAverage, {
        maximumFractionDigits: 1,
      })}.`,
    },
  );
}

const calculatorRegistry = {
  "calorie-calculator": {
    ...calculatorPageContent["calorie-calculator"],
    run: runCalorieCalculator,
  },
  "age-calculator": {
    ...calculatorPageContent["age-calculator"],
    run: runAgeCalculator,
  },
  "bmi-calculator": {
    ...calculatorPageContent["bmi-calculator"],
    run: runBmiCalculator,
  },
  "compound-interest-calculator": {
    ...calculatorPageContent["compound-interest-calculator"],
    run: runCompoundInterestCalculator,
  },
  "date-difference-calculator": {
    ...calculatorPageContent["date-difference-calculator"],
    run: runDateDifferenceCalculator,
  },
  "discount-calculator": {
    ...calculatorPageContent["discount-calculator"],
    run: runDiscountCalculator,
  },
  "grade-calculator": {
    ...calculatorPageContent["grade-calculator"],
    run: runGradeCalculator,
  },
  "investment-calculator": {
    ...calculatorPageContent["investment-calculator"],
    run: runInvestmentCalculator,
  },
  "loan-calculator": {
    ...calculatorPageContent["loan-calculator"],
    run: runLoanCalculator,
  },
  "mortgage-calculator": {
    ...calculatorPageContent["mortgage-calculator"],
    run: runMortgageCalculator,
  },
  "percent-change-calculator": {
    ...calculatorPageContent["percent-change-calculator"],
    run: runPercentChangeCalculator,
  },
  "percentage-calculator": {
    ...calculatorPageContent["percentage-calculator"],
    run: runPercentageCalculator,
  },
} satisfies Record<ImplementedCalculatorSlug, CalculatorDefinition>;

export const implementedCalculatorSlugs = Object.keys(
  calculatorRegistry,
) as ImplementedCalculatorSlug[];

export function getCalculatorDefinition(slug: ImplementedCalculatorSlug) {
  return calculatorRegistry[slug];
}

export function getResultToneClasses(
  tone: CalculatorResultView["primaryTone"] = "default",
) {
  if (tone === "positive") {
    return "text-emerald-700";
  }

  if (tone === "warning") {
    return "text-amber-700";
  }

  return "text-[var(--color-text)]";
}
