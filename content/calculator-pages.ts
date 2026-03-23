import type { CalculatorContent, ImplementedCalculatorSlug } from "@/types/calculator";

export const calculatorPageContent: Record<
  ImplementedCalculatorSlug,
  CalculatorContent
> = {
  "calorie-calculator": {
    defaultValues: {
      activityLevel: "1.375",
      age: "",
      heightCm: "",
      sex: "female",
      weightKg: "",
    },
    examples: [
      {
        result:
          "A moderately active 30-year-old woman at 165 cm and 60 kg lands near 2,000 maintenance calories per day.",
        title: "Typical maintenance estimate",
        values:
          "Sex: female, Age: 30, Height: 165 cm, Weight: 60 kg, Activity: moderate",
      },
      {
        result:
          "The calculator also shows a small cut and small bulk target for straightforward planning.",
        title: "Simple target adjustment",
        values:
          "Maintenance calories plus or minus a small 250 calorie adjustment.",
      },
    ],
    faqs: [
      {
        answer:
          "This calculator uses the Mifflin-St Jeor BMR formula, then multiplies that baseline by your selected activity level to estimate maintenance calories.",
        question: "How are maintenance calories estimated?",
      },
      {
        answer:
          "No. The cut and bulk targets are simple planning guides. They are intentionally small and not a replacement for medical or coaching advice.",
        question: "Are the cut and bulk targets personalized?",
      },
      {
        answer:
          "Use the activity option that best matches your average weekly routine. It does not need to be perfect for the calculator to be useful.",
        question: "How should I choose activity level?",
      },
    ],
    explanation: [
      {
        body: "The Mifflin-St Jeor equation estimates basal metabolic rate from sex, age, height, and weight. That baseline is then multiplied by an activity factor to estimate maintenance calories.",
        title: "Formula used",
      },
      {
        body: "The result includes a mild cut and bulk target so people can quickly turn maintenance into a simple next step without loading extra complexity into the calculator.",
        title: "What the targets mean",
      },
    ],
    intro:
      "Estimate daily maintenance calories with the Mifflin-St Jeor formula and get simple cut or bulk targets for lightweight planning.",
    relatedSlugs: [
      "bmi-calculator",
      "age-calculator",
      "investment-calculator",
    ],
    slug: "calorie-calculator",
    variants: [
      {
        description: "Use sex, age, height, weight, and activity level to estimate maintenance calories.",
        fields: [
          {
            label: "Sex",
            name: "sex",
            options: [
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
            ],
            type: "select",
            width: "half",
          },
          {
            label: "Age",
            name: "age",
            placeholder: "30",
            step: "1",
            type: "number",
            width: "half",
          },
          {
            label: "Height",
            name: "heightCm",
            placeholder: "165",
            suffix: "cm",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Weight",
            name: "weightKg",
            placeholder: "60",
            suffix: "kg",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Activity level",
            name: "activityLevel",
            options: [
              { label: "Sedentary", value: "1.2" },
              { label: "Lightly active", value: "1.375" },
              { label: "Moderately active", value: "1.55" },
              { label: "Very active", value: "1.725" },
              { label: "Extra active", value: "1.9" },
            ],
            type: "select",
            width: "full",
          },
        ],
        label: "Maintenance calories",
        value: "default",
      },
    ],
  },
  "percentage-calculator": {
    defaultValues: {
      base: "",
      direction: "increase",
      mode: "percent-of",
      part: "",
      percent: "",
      value: "",
      whole: "",
    },
    examples: [
      {
        result: "15% of 240 is 36.",
        title: "Find a percentage of a value",
        values: "Percent: 15, Value: 240",
      },
      {
        result: "80 increased by 12% becomes 89.6.",
        title: "Apply an increase",
        values: "Starting value: 80, Adjustment: 12%, Direction: increase",
      },
    ],
    faqs: [
      {
        answer:
          "Use the X% of Y mode when you already know the percentage and the base value. Use the what percent mode when you know the part and the whole.",
        question: "Which percentage mode should I use?",
      },
      {
        answer:
          "No. Percentage change compares an old value and a new value. The percentage calculator is for part-to-whole questions and applying a percent to a base value.",
        question: "Is this the same as percent change?",
      },
      {
        answer:
          "If the whole value is 0, the what percent calculation is undefined, so the calculator will ask you for a non-zero whole.",
        question: "Why can’t the whole be 0?",
      },
    ],
    explanation: [
      {
        body: "Percent-of mode multiplies the percent by the base value. What-percent mode divides the part by the whole and converts that ratio into a percentage.",
        title: "How the math works",
      },
      {
        body: "The increase or decrease mode applies a percentage adjustment to the starting value, which makes it useful for quick pricing, budgeting, or target-setting scenarios.",
        title: "When to use the adjustment mode",
      },
    ],
    intro:
      "Solve the most common percentage questions in one place: percent of a value, what percent one number is of another, and a simple percentage increase or decrease.",
    relatedSlugs: [
      "percent-change-calculator",
      "discount-calculator",
      "grade-calculator",
    ],
    slug: "percentage-calculator",
    variantField: "mode",
    variants: [
      {
        description: "Find X percent of a given value.",
        fields: [
          {
            label: "Percent",
            name: "percent",
            placeholder: "15",
            step: "any",
            suffix: "%",
            type: "number",
            width: "half",
          },
          {
            label: "Value",
            name: "value",
            placeholder: "240",
            step: "any",
            type: "number",
            width: "half",
          },
        ],
        label: "X% of Y",
        value: "percent-of",
      },
      {
        description: "Find what percent one number is of another.",
        fields: [
          {
            label: "Part",
            name: "part",
            placeholder: "36",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Whole",
            name: "whole",
            placeholder: "240",
            step: "any",
            type: "number",
            width: "half",
          },
        ],
        label: "X is what % of Y",
        value: "what-percent",
      },
      {
        description: "Apply a simple percentage increase or decrease.",
        fields: [
          {
            label: "Starting value",
            name: "base",
            placeholder: "80",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Adjustment percent",
            name: "percent",
            placeholder: "12",
            step: "any",
            suffix: "%",
            type: "number",
            width: "half",
          },
          {
            label: "Direction",
            name: "direction",
            options: [
              { label: "Increase", value: "increase" },
              { label: "Decrease", value: "decrease" },
            ],
            type: "select",
            width: "full",
          },
        ],
        label: "Increase or decrease",
        value: "adjust-by-percent",
      },
    ],
  },
  "percent-change-calculator": {
    defaultValues: {
      newValue: "",
      oldValue: "",
    },
    examples: [
      {
        result: "Going from 50 to 65 is a 30% increase.",
        title: "Positive change",
        values: "Old value: 50, New value: 65",
      },
      {
        result: "Going from 120 to 96 is a 20% decrease.",
        title: "Negative change",
        values: "Old value: 120, New value: 96",
      },
    ],
    faqs: [
      {
        answer:
          "Percent change compares a new value against the old value. It tells you how large the shift is relative to where you started.",
        question: "What does percent change mean?",
      },
      {
        answer:
          "The old value is the denominator in the formula, so it cannot be 0. If your baseline is 0, the percentage change is undefined.",
        question: "Why can’t the old value be 0?",
      },
      {
        answer:
          "A positive result means the value increased. A negative result means the value decreased.",
        question: "How do I read a negative result?",
      },
    ],
    explanation: [
      {
        body: "The standard formula is ((new - old) / old) * 100. That keeps the old value as the baseline for the comparison.",
        title: "Formula",
      },
      {
        body: "This calculator also shows the absolute change, which is helpful when you need both the raw difference and the relative percentage.",
        title: "What the result includes",
      },
    ],
    intro:
      "Measure how much something increased or decreased from an old value to a new one using the standard percent change formula.",
    relatedSlugs: [
      "percentage-calculator",
      "discount-calculator",
      "investment-calculator",
    ],
    slug: "percent-change-calculator",
    variants: [
      {
        description: "Compare the new value against the old value.",
        fields: [
          {
            label: "Old value",
            name: "oldValue",
            placeholder: "50",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "New value",
            name: "newValue",
            placeholder: "65",
            step: "any",
            type: "number",
            width: "half",
          },
        ],
        label: "Percent change",
        value: "default",
      },
    ],
  },
  "discount-calculator": {
    defaultValues: {
      discountPercent: "",
      originalPrice: "",
    },
    examples: [
      {
        result: "A 25% discount on 80 leaves a final price of 60 and saves 20.",
        title: "Simple sale price",
        values: "Original price: 80, Discount: 25%",
      },
      {
        result: "A 12.5% discount on 240 leaves 210 and saves 30.",
        title: "Decimal discount",
        values: "Original price: 240, Discount: 12.5%",
      },
    ],
    faqs: [
      {
        answer:
          "The calculator subtracts the discount amount from the original price. The amount saved is original price multiplied by the discount percentage.",
        question: "How is the final price calculated?",
      },
      {
        answer:
          "This version keeps things simple and uses a single discount percentage. Stacked discounts can be added later if needed.",
        question: "Does this handle multiple discounts?",
      },
      {
        answer:
          "Use 0 to 100 for the discount rate. A value above 100 would imply a price below zero, so the form blocks it.",
        question: "Why is the discount limited to 100%?",
      },
    ],
    explanation: [
      {
        body: "The amount saved is original price multiplied by the discount rate. The final price is the original price minus that savings amount.",
        title: "Core formula",
      },
      {
        body: "This is useful for shopping comparisons, promo planning, and quickly checking whether a sale meaningfully changes the final price.",
        title: "Good everyday use cases",
      },
    ],
    intro:
      "Break down a simple markdown into final price and amount saved with a fast, clean discount calculator.",
    relatedSlugs: [
      "percentage-calculator",
      "percent-change-calculator",
      "loan-calculator",
    ],
    slug: "discount-calculator",
    variants: [
      {
        description: "Turn an original price and discount rate into a sale price.",
        fields: [
          {
            label: "Original price",
            name: "originalPrice",
            placeholder: "80",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Discount percent",
            name: "discountPercent",
            placeholder: "25",
            step: "any",
            suffix: "%",
            type: "number",
            width: "half",
          },
        ],
        label: "Discount result",
        value: "default",
      },
    ],
  },
  "age-calculator": {
    defaultValues: {
      ageMode: "today",
      birthDate: "",
      endDate: "",
    },
    examples: [
      {
        result: "The calculator shows full years, months, days, and total days lived as of the selected comparison date.",
        title: "Calculate age today",
        values: "Birth date: 1995-06-14, End date: today",
      },
      {
        result: "You can compare a birth date to any custom date to answer forms, deadlines, or age-on-date questions.",
        title: "Calculate age on a specific date",
        values: "Birth date: 1995-06-14, End date: 2028-01-01",
      },
    ],
    faqs: [
      {
        answer:
          "This calculator uses calendar dates rather than rough averages, so the years, months, and days reflect how people typically describe age.",
        question: "How does the calculator define age?",
      },
      {
        answer:
          "Yes. Switch to the custom date mode if you need age on a future or past date instead of today.",
        question: "Can I calculate age on a different date?",
      },
      {
        answer:
          "No. This tool works only with dates, not times of day, which keeps the results easy to understand and maintain.",
        question: "Does time of day matter here?",
      },
    ],
    explanation: [
      {
        body: "Age is calculated by comparing the birth date to today or to a selected end date, then borrowing months and days the same way a calendar-based age check does.",
        title: "Calendar-based result",
      },
      {
        body: "The result includes total days alongside years, months, and days, which is helpful when you need both a human-friendly age and a precise span.",
        title: "Why the breakdown is useful",
      },
    ],
    intro:
      "Find age from a birth date to today or to any selected comparison date with a result that reads like a normal calendar age.",
    relatedSlugs: [
      "date-difference-calculator",
      "bmi-calculator",
      "grade-calculator",
    ],
    slug: "age-calculator",
    variantField: "ageMode",
    variants: [
      {
        description: "Compare the birth date to today.",
        fields: [
          {
            label: "Birth date",
            name: "birthDate",
            type: "date",
            width: "full",
          },
        ],
        label: "To today",
        value: "today",
      },
      {
        description: "Compare the birth date to a chosen end date.",
        fields: [
          {
            label: "Birth date",
            name: "birthDate",
            type: "date",
            width: "half",
          },
          {
            label: "End date",
            name: "endDate",
            type: "date",
            width: "half",
          },
        ],
        label: "Custom end date",
        value: "custom",
      },
    ],
  },
  "date-difference-calculator": {
    defaultValues: {
      endDate: "",
      startDate: "",
    },
    examples: [
      {
        result: "The result shows total days, full weeks, remaining days, and a simple month approximation.",
        title: "Project planning",
        values: "Start date: 2026-01-01, End date: 2026-03-15",
      },
      {
        result: "You also get a calendar-style span in years, months, and days.",
        title: "Longer range",
        values: "Start date: 2024-05-10, End date: 2026-03-19",
      },
    ],
    faqs: [
      {
        answer:
          "This version reports the plain difference between the two dates and does not add an extra day for inclusive counting.",
        question: "Is the day count inclusive?",
      },
      {
        answer:
          "The month figure is a simple approximation based on average month length. The calendar span gives you the exact year-month-day breakdown.",
        question: "Why is the month count approximate?",
      },
      {
        answer:
          "Use the age calculator when one date is a birth date. Use this calculator when you simply want the distance between any two dates.",
        question: "How is this different from the age calculator?",
      },
    ],
    explanation: [
      {
        body: "The calculator measures the total number of days between the start date and end date, then translates that span into full weeks and a calendar-style year-month-day difference.",
        title: "What gets calculated",
      },
      {
        body: "It’s useful for schedules, subscription timing, delivery windows, and deadline planning where you need a quick sense of the time span in more than one format.",
        title: "Why multiple views matter",
      },
    ],
    intro:
      "Measure the time between any two dates with total days up front and a compact calendar-style breakdown underneath.",
    relatedSlugs: [
      "age-calculator",
      "percentage-calculator",
      "discount-calculator",
    ],
    slug: "date-difference-calculator",
    variants: [
      {
        description: "Measure the span between two calendar dates.",
        fields: [
          {
            label: "Start date",
            name: "startDate",
            type: "date",
            width: "half",
          },
          {
            label: "End date",
            name: "endDate",
            type: "date",
            width: "half",
          },
        ],
        label: "Date difference",
        value: "default",
      },
    ],
  },
  "bmi-calculator": {
    defaultValues: {
      heightCm: "",
      heightInches: "",
      unitSystem: "metric",
      weightKg: "",
      weightPounds: "",
    },
    examples: [
      {
        result: "170 cm and 68 kg gives a BMI around 23.5, which falls in the normal range.",
        title: "Metric example",
        values: "Mode: metric, Height: 170 cm, Weight: 68 kg",
      },
      {
        result: "68 inches and 160 lb gives a BMI around 24.3, also in the normal range.",
        title: "Imperial example",
        values: "Mode: imperial, Height: 68 in, Weight: 160 lb",
      },
    ],
    faqs: [
      {
        answer:
          "BMI is a quick height-to-weight screening ratio. It is useful for broad context but it is not a diagnosis.",
        question: "What does BMI tell me?",
      },
      {
        answer:
          "The calculator supports metric and imperial input so you can work in the units that feel most natural.",
        question: "Can I switch unit systems?",
      },
      {
        answer:
          "BMI categories are common screening ranges. For medical advice or edge cases, a clinician is the right source.",
        question: "Should I treat the category as medical advice?",
      },
    ],
    explanation: [
      {
        body: "BMI is calculated from weight divided by height squared. Metric mode uses kilograms and centimeters, while imperial mode uses pounds and inches with the standard 703 conversion factor.",
        title: "Formula",
      },
      {
        body: "The category labels make the result easier to scan, but they are best used as a quick reference rather than a final health judgment.",
        title: "How to interpret the result",
      },
    ],
    intro:
      "Estimate body mass index in either metric or imperial units and get the standard BMI category instantly.",
    relatedSlugs: [
      "age-calculator",
      "calorie-calculator",
      "percentage-calculator",
    ],
    slug: "bmi-calculator",
    variantField: "unitSystem",
    variants: [
      {
        description: "Use centimeters and kilograms.",
        fields: [
          {
            label: "Height",
            name: "heightCm",
            placeholder: "170",
            step: "any",
            suffix: "cm",
            type: "number",
            width: "half",
          },
          {
            label: "Weight",
            name: "weightKg",
            placeholder: "68",
            step: "any",
            suffix: "kg",
            type: "number",
            width: "half",
          },
        ],
        label: "Metric",
        value: "metric",
      },
      {
        description: "Use inches and pounds.",
        fields: [
          {
            label: "Height",
            name: "heightInches",
            placeholder: "68",
            step: "any",
            suffix: "in",
            type: "number",
            width: "half",
          },
          {
            label: "Weight",
            name: "weightPounds",
            placeholder: "160",
            step: "any",
            suffix: "lb",
            type: "number",
            width: "half",
          },
        ],
        label: "Imperial",
        value: "imperial",
      },
    ],
  },
  "mortgage-calculator": {
    defaultValues: {
      loanAmount: "",
      rate: "",
      years: "",
    },
    examples: [
      {
        result:
          "A 300,000 mortgage at 6.5% over 30 years produces a monthly payment just under 1,900 before taxes and insurance.",
        title: "Long-term home loan",
        values: "Loan amount: 300000, Rate: 6.5%, Term: 30 years",
      },
      {
        result:
          "The result also breaks out total payment and total interest over the full term.",
        title: "Full borrowing cost",
        values: "Monthly payment plus total paid over the life of the loan",
      },
    ],
    faqs: [
      {
        answer:
          "This version keeps the mortgage focused on principal, rate, and term. Taxes, insurance, HOA fees, and PMI are not included.",
        question: "What is not included here?",
      },
      {
        answer:
          "Yes. If the annual rate is 0, the calculator falls back to a simple principal divided by the number of monthly payments.",
        question: "Does it handle a 0% rate?",
      },
      {
        answer:
          "Mortgage and loan calculators use the same math here, but the labels stay different so the page matches the user’s intent.",
        question: "How is this different from the loan calculator?",
      },
    ],
    explanation: [
      {
        body: "Monthly payment is calculated with the standard amortizing loan formula using the loan amount, monthly rate, and total number of monthly payments.",
        title: "Formula",
      },
      {
        body: "Because the calculator also shows total payment and total interest, it works well for comparing rates or terms without adding a full amortization schedule yet.",
        title: "Why the breakdown matters",
      },
    ],
    intro:
      "Estimate mortgage monthly payment, total paid, and total interest with a clean, no-frills loan summary.",
    relatedSlugs: [
      "loan-calculator",
      "compound-interest-calculator",
      "investment-calculator",
    ],
    slug: "mortgage-calculator",
    variants: [
      {
        description: "Estimate a basic monthly mortgage payment from loan amount, rate, and term.",
        fields: [
          {
            label: "Loan amount",
            name: "loanAmount",
            placeholder: "300000",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Interest rate",
            name: "rate",
            placeholder: "6.5",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Loan term",
            name: "years",
            placeholder: "30",
            suffix: "years",
            step: "any",
            type: "number",
            width: "full",
          },
        ],
        label: "Mortgage payment",
        value: "default",
      },
    ],
  },
  "loan-calculator": {
    defaultValues: {
      loanAmount: "",
      rate: "",
      years: "",
    },
    examples: [
      {
        result:
          "A 20,000 loan at 8% over 5 years gives a monthly payment a little above 400.",
        title: "Personal loan example",
        values: "Loan amount: 20000, Rate: 8%, Term: 5 years",
      },
      {
        result:
          "The calculator keeps the wording generic so it works for auto, personal, or other installment loans.",
        title: "Generic installment borrowing",
        values: "Principal, rate, and term only",
      },
    ],
    faqs: [
      {
        answer:
          "This tool is for generic installment loans. It does not include fees, prepayment, or irregular payment schedules.",
        question: "What kind of loans does this work for?",
      },
      {
        answer:
          "The total interest figure helps you compare terms that may have similar monthly payments but very different lifetime costs.",
        question: "Why does total interest matter?",
      },
      {
        answer:
          "Yes. The calculator assumes one fixed monthly payment over the full term.",
        question: "Does this assume monthly payments?",
      },
    ],
    explanation: [
      {
        body: "The loan calculator uses the same amortization formula as the mortgage calculator, but with neutral language that works for everyday borrowing scenarios.",
        title: "Same math, simpler wording",
      },
      {
        body: "A quick monthly payment estimate is useful, but total payment and total interest make it easier to judge the real cost of borrowing.",
        title: "How to compare offers",
      },
    ],
    intro:
      "Estimate monthly payment, total payment, and total interest for a generic fixed-rate loan.",
    relatedSlugs: [
      "mortgage-calculator",
      "discount-calculator",
      "compound-interest-calculator",
    ],
    slug: "loan-calculator",
    variants: [
      {
        description: "Estimate a fixed monthly payment from loan amount, rate, and term.",
        fields: [
          {
            label: "Loan amount",
            name: "loanAmount",
            placeholder: "20000",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Interest rate",
            name: "rate",
            placeholder: "8",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Loan term",
            name: "years",
            placeholder: "5",
            suffix: "years",
            step: "any",
            type: "number",
            width: "full",
          },
        ],
        label: "Loan payment",
        value: "default",
      },
    ],
  },
  "compound-interest-calculator": {
    defaultValues: {
      compoundingPerYear: "12",
      principal: "",
      rate: "",
      years: "",
    },
    examples: [
      {
        result:
          "10,000 at 6% for 10 years with monthly compounding grows to a little above 18,000.",
        title: "Monthly compounding",
        values: "Principal: 10000, Rate: 6%, Years: 10, Frequency: monthly",
      },
      {
        result:
          "A lower compounding frequency still grows the balance, but slightly less than monthly or daily compounding.",
        title: "Compare frequencies",
        values: "Same principal, rate, and years with different compounding periods",
      },
    ],
    faqs: [
      {
        answer:
          "Compounding frequency controls how often interest is added back into the balance. More frequent compounding can produce slightly higher growth.",
        question: "What does compounding frequency change?",
      },
      {
        answer:
          "No. This calculator keeps things focused on a one-time principal amount. Monthly contributions belong in the investment calculator.",
        question: "Does this include recurring contributions?",
      },
      {
        answer:
          "Interest earned is just the final amount minus the original principal.",
        question: "How is interest earned shown?",
      },
    ],
    explanation: [
      {
        body: "The formula is principal multiplied by (1 + rate / frequency) raised to the number of total compounding periods.",
        title: "Formula",
      },
      {
        body: "This calculator is useful when you want a clean view of pure compounding without the extra moving parts of monthly deposits.",
        title: "Best use case",
      },
    ],
    intro:
      "Project how a single lump-sum balance grows over time with a selectable compounding frequency.",
    relatedSlugs: [
      "investment-calculator",
      "mortgage-calculator",
      "loan-calculator",
    ],
    slug: "compound-interest-calculator",
    variants: [
      {
        description: "Project a single principal amount with compound growth over time.",
        fields: [
          {
            label: "Principal",
            name: "principal",
            placeholder: "10000",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Annual rate",
            name: "rate",
            placeholder: "6",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Years",
            name: "years",
            placeholder: "10",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Compounding frequency",
            name: "compoundingPerYear",
            options: [
              { label: "Annually", value: "1" },
              { label: "Quarterly", value: "4" },
              { label: "Monthly", value: "12" },
              { label: "Daily", value: "365" },
            ],
            type: "select",
            width: "half",
          },
        ],
        label: "Compound growth",
        value: "default",
      },
    ],
  },
  "investment-calculator": {
    defaultValues: {
      initialInvestment: "",
      monthlyContribution: "",
      rate: "",
      years: "",
    },
    examples: [
      {
        result:
          "5,000 up front plus 300 per month at 7% for 20 years produces a future value well beyond total contributions alone.",
        title: "Long-term investing",
        values:
          "Initial investment: 5000, Monthly contribution: 300, Return: 7%, Years: 20",
      },
      {
        result:
          "The result separates total contributions from investment growth so you can see how much the return is doing over time.",
        title: "Contribution vs growth",
        values: "Future value shown with a simple breakdown",
      },
    ],
    faqs: [
      {
        answer:
          "This version assumes monthly contributions and monthly compounding from the annual return rate. That keeps the projection simple and easy to compare.",
        question: "How are contributions modeled?",
      },
      {
        answer:
          "No. It uses a constant return rate for the whole period, so it’s best seen as a planning estimate rather than a market forecast.",
        question: "Does this reflect market volatility?",
      },
      {
        answer:
          "Investment growth is future value minus the total amount you put in through the initial investment and monthly contributions.",
        question: "What counts as growth?",
      },
    ],
    explanation: [
      {
        body: "The calculator compounds the starting balance monthly and adds the future value of recurring monthly contributions over the selected timeline.",
        title: "Formula approach",
      },
      {
        body: "It works well for retirement or general savings planning where you want a quick future-value estimate without a full charting interface.",
        title: "Good planning use case",
      },
    ],
    intro:
      "Project future value from an initial investment, a monthly contribution, an annual return assumption, and a time horizon.",
    relatedSlugs: [
      "compound-interest-calculator",
      "percent-change-calculator",
      "mortgage-calculator",
    ],
    slug: "investment-calculator",
    variants: [
      {
        description: "Combine a starting amount with recurring monthly contributions.",
        fields: [
          {
            label: "Initial investment",
            name: "initialInvestment",
            placeholder: "5000",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Monthly contribution",
            name: "monthlyContribution",
            placeholder: "300",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Annual return",
            name: "rate",
            placeholder: "7",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Years",
            name: "years",
            placeholder: "20",
            step: "any",
            type: "number",
            width: "half",
          },
        ],
        label: "Future value",
        value: "default",
      },
    ],
  },
  "grade-calculator": {
    defaultValues: {
      score1: "",
      score2: "",
      score3: "",
      score4: "",
      weight1: "",
      weight2: "",
      weight3: "",
      weight4: "",
    },
    examples: [
      {
        result:
          "If quizzes are 20%, 20%, 20%, and the final project is 40%, the calculator blends them into one weighted average.",
        title: "Weighted course grade",
        values:
          "Example weights: 20, 20, 20, 40 with scores entered as percentages",
      },
      {
        result:
          "Blank rows are ignored, so you can use only the assignments you need instead of filling all four.",
        title: "Partial set of assignments",
        values: "Fill only the rows that matter for the current class",
      },
    ],
    faqs: [
      {
        answer:
          "Enter each score as a percentage and each weight as the share of the final grade. The calculator combines only the rows you fill in.",
        question: "How should I enter scores and weights?",
      },
      {
        answer:
          "No. The calculator divides by the total weight you actually entered, so the filled rows do not need to add up to exactly 100 for the math to work.",
        question: "Do weights have to total 100?",
      },
      {
        answer:
          "No. This version stays minimal with four rows. It covers many common cases without adding a more complex builder yet.",
        question: "Can I add unlimited assignments?",
      },
    ],
    explanation: [
      {
        body: "Each score is multiplied by its weight. The total weighted points are then divided by the total weight entered across the filled rows.",
        title: "Weighted average logic",
      },
      {
        body: "Blank rows are ignored so the calculator can handle a small number of assignments without requiring every row to be filled in.",
        title: "Why the form stays simple",
      },
    ],
    intro:
      "Estimate a simple weighted course grade with multiple assignment rows and a clean final average.",
    relatedSlugs: [
      "percentage-calculator",
      "percent-change-calculator",
      "age-calculator",
    ],
    slug: "grade-calculator",
    variants: [
      {
        description: "Enter score percentages and their weights for up to four assignments.",
        fields: [
          {
            label: "Assignment 1 score",
            name: "score1",
            placeholder: "92",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 1 weight",
            name: "weight1",
            placeholder: "20",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 2 score",
            name: "score2",
            placeholder: "88",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 2 weight",
            name: "weight2",
            placeholder: "20",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 3 score",
            name: "score3",
            placeholder: "95",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 3 weight",
            name: "weight3",
            placeholder: "20",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 4 score",
            name: "score4",
            placeholder: "90",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
          {
            label: "Assignment 4 weight",
            name: "weight4",
            placeholder: "40",
            suffix: "%",
            step: "any",
            type: "number",
            width: "half",
          },
        ],
        label: "Weighted grade",
        value: "default",
      },
    ],
  },
};
