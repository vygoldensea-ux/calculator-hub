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
          "A 30-year-old woman who is 165 cm tall, weighs 60 kg, and is moderately active lands around 2,040 maintenance calories per day, with a mild cut target near 1,790 and a mild bulk target near 2,290.",
        title: "Maintenance calories for a common daily planning scenario",
        values:
          "Sex: female, Age: 30, Height: 165 cm, Weight: 60 kg, Activity: moderately active",
      },
      {
        result:
          "A 38-year-old man at 180 cm and 82 kg with light activity lands closer to 2,400 maintenance calories, which is useful when building a first meal plan or checking whether progress has stalled.",
        title: "A second scenario for comparison",
        values:
          "Sex: male, Age: 38, Height: 180 cm, Weight: 82 kg, Activity: lightly active",
      },
    ],
    faqs: [
      {
        answer:
          "This calculator estimates basal metabolic rate with the Mifflin-St Jeor equation, then applies your selected activity level to estimate maintenance calories. It is a strong starting point for everyday planning, even though it is not perfectly individualized.",
        question: "How does this calorie calculator estimate maintenance calories?",
      },
      {
        answer:
          "Choose the option that matches your average week, not your hardest workout day. If your routine changes a lot from week to week, pick the closest overall pattern and adjust from real progress after a couple of weeks.",
        question: "What activity level should I choose?",
      },
      {
        answer:
          "They are simple planning guides built around a small adjustment from maintenance. They can help you sense-check the next step, but they are not a substitute for clinical or coaching advice.",
        question: "Are the cut and bulk targets personalized recommendations?",
      },
    ],
    howToSteps: [
      "Choose the sex, age, height, weight, and activity level that best match your current situation.",
      "Use average weekly activity rather than your single hardest workout day so the maintenance estimate stays realistic.",
      "Read the maintenance calories first, then use the mild cut or bulk targets only as a starting range to test in real life.",
      "Review the result again after a few weeks of weight trend data instead of assuming one estimate is perfect forever.",
    ],
    explanation: [
      {
        body: "The calculator uses the Mifflin-St Jeor equation to estimate basal metabolic rate from sex, age, height, and weight. It then multiplies that baseline by an activity factor to estimate how many calories would roughly maintain your current weight.",
        title: "The formula behind the estimate",
      },
      {
        body: "The mild cut and bulk targets are intentionally small. They help turn maintenance into a practical next action without pretending that one calculator result can replace ongoing adjustment from body weight, training, and appetite signals.",
        title: "How to interpret the target ranges",
      },
    ],
    intro:
      "Use this calorie calculator to estimate daily maintenance calories with the Mifflin-St Jeor formula, then compare simple cut or bulk targets without opening a separate tool. It is useful for people who want a clear starting number before planning meals, adjusting body weight, or checking whether their current intake still matches their activity level. The result is meant to give you a practical baseline, not false precision. Once you have the estimate, you can use the built-in targets as a lightweight planning range and refine them from your real-world progress.",
    relatedArticleSlugs: [
      "how-activity-level-affects-calorie-needs",
      "calorie-deficit-explained",
      "understanding-bmi-and-healthy-ranges",
    ],
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
        result: "15% of 240 is 36, so a 15% allocation from a budget of 240 leaves 36 for that line item.",
        title: "Find a percentage of a number",
        values: "Percent: 15, Value: 240",
      },
      {
        result: "If 36 is part of 240, then 36 is 15% of 240. If 80 increases by 12%, the new value becomes 89.6.",
        title: "Switch between percentage questions without changing pages",
        values: "Part: 36, Whole: 240, or Base: 80 with a 12% increase",
      },
    ],
    faqs: [
      {
        answer:
          "Use X% of Y when you already know the percentage and the base value. Use X is what % of Y when you know the smaller number and the total. Use the adjustment mode when you want to apply an increase or decrease to a starting value.",
        question: "Which percentage mode should I use?",
      },
      {
        answer:
          "No. This page handles common percentage relationships, while percent change compares an old value and a new value. If your question is about how much something moved over time, use the percent change calculator instead.",
        question: "Is this the same as percent change?",
      },
      {
        answer:
          "The whole value is the denominator in the what percent formula. If it is 0, the ratio is undefined, so the calculator needs a non-zero whole to give a valid answer.",
        question: "Why can’t the whole value be 0?",
      },
    ],
    howToSteps: [
      "Pick the mode that matches your question: percent of a number, what percent one number is of another, or increase or decrease by a percent.",
      "Enter only the values used in that mode and leave the other fields alone.",
      "Read the primary result first, then use the summary text to confirm you asked the right percentage question.",
      "If your goal is to compare an old value with a new value, jump to the percent change calculator instead of forcing it into this tool.",
    ],
    explanation: [
      {
        body: "In percent-of mode, the calculator multiplies the percentage by the base value. In what-percent mode, it divides the part by the whole and converts that ratio into a percentage.",
        title: "Core percentage formulas",
      },
      {
        body: "The increase or decrease mode applies a percentage adjustment to a starting value, which makes it useful for budgeting, pricing, markup checks, and quick planning without switching between multiple tools.",
        title: "When the adjustment mode is most useful",
      },
    ],
    intro:
      "Use this percentage calculator when you need a quick answer to one of the most common math questions: what is X percent of Y, what percent one number is of another, or what happens when you increase or decrease a value by a percentage. It is useful for everyday pricing, budgeting, grades, and planning because it keeps the three most common percentage tasks on one page. The goal is not to overwhelm you with formulas. It is to help you choose the right percentage question, enter the right values, and trust the result.",
    relatedArticleSlugs: [
      "percent-of-a-number-explained",
      "percentage-vs-percent-change-explained",
      "discount-math-for-sales-and-markdowns",
    ],
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
        result: "From 1995-06-14 to today, the calculator shows a calendar-style age in full years, months, and days, plus total days lived for a more precise reference.",
        title: "Check age as of today",
        values: "Birth date: 1995-06-14, End date: today",
      },
      {
        result: "If someone born on 1995-06-14 needs age on 2028-01-01, the tool compares the two dates directly instead of estimating with rough averages.",
        title: "Check age on a custom date",
        values: "Birth date: 1995-06-14, End date: 2028-01-01",
      },
    ],
    faqs: [
      {
        answer:
          "The calculator compares the birth date with today or your chosen end date using calendar dates, then reports the result the way people normally state age: full years, remaining months, and remaining days.",
        question: "How does the age calculator work?",
      },
      {
        answer:
          "Yes. Switch to custom date mode if you need to know age on a future or past date for forms, planning, or eligibility checks.",
        question: "Can I calculate age on a different date instead of today?",
      },
      {
        answer:
          "No. This version uses dates only, not time of day. That keeps the result easier to understand and matches most everyday use cases for age checks.",
        question: "Does the time of day change the result?",
      },
    ],
    howToSteps: [
      "Enter the birth date first, then choose whether you want age today or age on a custom end date.",
      "If you need age on a deadline, future birthday, or form date, switch to custom mode and enter that exact comparison date.",
      "Read the years, months, and days first, then use the total days only when you need a more precise span.",
      "If your question is about the distance between any two dates rather than a birth date, use the date difference calculator instead.",
    ],
    explanation: [
      {
        body: "The calculator compares the birth date with the end date and borrows months and days the same way a calendar-based age check works. That is why the result feels natural to read instead of looking like a rough average.",
        title: "How age is calculated between dates",
      },
      {
        body: "The total days figure is helpful when you need a precise time span, while the years-months-days breakdown is more useful for forms, planning, and everyday conversation.",
        title: "Why the breakdown includes two views",
      },
    ],
    intro:
      "Use this age calculator to find exact age from a birth date to today or to any custom comparison date. It is useful for forms, planning milestones, checking eligibility dates, or answering everyday questions like how old someone will be on a future birthday. Instead of giving you only a raw day count, the result reads like a normal calendar age in years, months, and days, with total days included as an extra reference. That makes it easier to use whether you need a quick answer or a more precise span.",
    relatedArticleSlugs: [
      "exact-age-and-date-difference-planning",
      "age-in-years-months-and-days-explained",
    ],
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
        result: "A height of 170 cm and weight of 68 kg produces a BMI around 23.5, which falls in the normal range under standard BMI categories.",
        title: "Worked BMI example in metric units",
        values: "Mode: metric, Height: 170 cm, Weight: 68 kg",
      },
      {
        result: "A height of 68 inches and weight of 160 pounds produces a BMI around 24.3, which is also in the normal range using the imperial formula.",
        title: "Worked BMI example in imperial units",
        values: "Mode: imperial, Height: 68 in, Weight: 160 lb",
      },
    ],
    faqs: [
      {
        answer:
          "BMI compares weight with height to create a quick screening ratio. It is useful for broad context and trend checking, but it does not directly measure body fat, muscle mass, or health status on its own.",
        question: "What does BMI actually tell me?",
      },
      {
        answer:
          "Yes. You can switch between metric and imperial input without changing pages, so the calculator works whether you think in kilograms and centimeters or pounds and inches.",
        question: "Can I use metric and imperial units?",
      },
      {
        answer:
          "No. BMI categories are common screening ranges, not a diagnosis. They are helpful as a starting point, especially when you want to pair BMI with other information like calorie intake, waist measurements, or advice from a clinician.",
        question: "Should I treat the BMI category as medical advice?",
      },
    ],
    howToSteps: [
      "Choose metric or imperial mode first so the height and weight fields match the units you already know.",
      "Enter your current height and weight as accurately as you can, then review the BMI result and category together.",
      "Treat the category as a quick checkpoint, not a final judgment, especially if you have a muscular build or other reasons BMI may be less informative.",
      "Use the related calorie calculator if you want to turn the BMI context into a practical nutrition baseline.",
    ],
    explanation: [
      {
        body: "BMI is calculated as weight divided by height squared. In metric mode, that means kilograms divided by meters squared. In imperial mode, the calculator uses pounds and inches with the standard 703 conversion factor.",
        title: "BMI formula in plain language",
      },
      {
        body: "The BMI category labels help you read the number quickly, but the number is most useful as a screening tool and trend checkpoint. It works best when combined with other context instead of treated as a final health verdict.",
        title: "How to interpret the result",
      },
    ],
    intro:
      "Use this BMI calculator to check body mass index quickly in either metric or imperial units. It is useful when you want a fast screening number based on height and weight, whether you are tracking health goals, checking where you fall in standard BMI ranges, or pairing BMI with calorie planning. The calculator gives you both the BMI value and the category so the result is easy to read at a glance. It is designed to be quick and practical, while still making it clear that BMI is a starting point rather than a diagnosis.",
    relatedArticleSlugs: [
      "understanding-bmi-and-healthy-ranges",
      "bmi-vs-body-fat-explained",
      "how-activity-level-affects-calorie-needs",
    ],
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
          "A 300,000 mortgage at 6.5% over 30 years produces a monthly payment just under 1,900 before taxes, insurance, and other housing costs, while total interest over the full term is substantial enough to change how you compare offers.",
        title: "A common home-buying scenario",
        values: "Loan amount: 300000, Rate: 6.5%, Term: 30 years",
      },
      {
        result:
          "Shortening the term or lowering the rate usually raises or lowers the monthly payment right away, but the bigger story is often how much total interest changes over the life of the mortgage.",
        title: "Why total cost matters, not just the monthly payment",
        values: "Compare the same principal across different rates or loan terms",
      },
    ],
    faqs: [
      {
        answer:
          "This calculator focuses on principal, rate, and term. It does not include property tax, homeowner’s insurance, HOA fees, PMI, or other housing costs that may matter in a full monthly budget.",
        question: "What is not included in this mortgage calculator?",
      },
      {
        answer:
          "Yes. If the annual interest rate is 0, the calculator falls back to principal divided by the total number of monthly payments, which gives a simple no-interest payment estimate.",
        question: "Does the calculator handle a 0% interest rate?",
      },
      {
        answer:
          "The math is the same, but this page is framed for home loans and longer repayment horizons. The loan calculator uses more general borrowing language for personal, auto, or other installment loans.",
        question: "How is this different from the loan calculator?",
      },
    ],
    howToSteps: [
      "Enter the loan amount, annual interest rate, and mortgage term in years.",
      "Check the monthly payment first, then compare the total payment and total interest to understand the full borrowing cost.",
      "Use the result as a first-pass planning number before adding taxes, insurance, or other housing costs that are outside this tool.",
      "Test more than one rate or term if you are comparing offers, because small rate changes can create large total-interest differences over time.",
    ],
    explanation: [
      {
        body: "The calculator uses the standard amortizing loan formula. It converts the annual interest rate to a monthly rate, spreads the mortgage across the total number of monthly payments, and calculates the fixed monthly amount needed to repay the balance over the full term.",
        title: "How the monthly payment is calculated",
      },
      {
        body: "Monthly payment is only part of the picture. Total payment and total interest help you compare two mortgage options that may look similar month to month but carry very different long-term costs.",
        title: "Why the full cost breakdown matters",
      },
    ],
    intro:
      "Use this mortgage calculator to estimate monthly payment, total repayment, and total interest before you move into a full home-buying budget. It is built for the questions people ask first: how much the payment might be, how rate changes affect the number, and how much interest a longer mortgage can add over time. The page keeps the inputs simple on purpose so you can compare scenarios quickly, then decide whether a deeper breakdown is worth exploring. That makes it useful for first-time buyers, refinance comparisons, and early affordability planning.",
    relatedArticleSlugs: [
      "mortgage-vs-loan-payment-basics",
      "how-interest-rate-changes-monthly-payment",
      "compound-interest-basics-for-long-term-growth",
    ],
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
          "A 20,000 loan at 8% over 5 years creates a monthly payment a little above 400, which is the kind of check people often need before comparing lenders or deciding how much to borrow.",
        title: "A realistic fixed-rate loan example",
        values: "Loan amount: 20000, Rate: 8%, Term: 5 years",
      },
      {
        result:
          "Two loans can have similar monthly payments but very different total interest. That is why this calculator shows the lifetime borrowing cost alongside the monthly figure.",
        title: "Compare borrowing cost, not only payment size",
        values: "Review monthly payment, total payment, and total interest together",
      },
    ],
    faqs: [
      {
        answer:
          "It is built for fixed-rate installment loans such as personal loans, auto loans, and other borrowing with one steady monthly payment over a set term. It does not model fees, prepayment, or changing rates.",
        question: "What kind of loans does this calculator work for?",
      },
      {
        answer:
          "Monthly payment tells you the near-term budget impact, but total interest shows the real cost of borrowing. That is often the number that reveals whether a longer term is actually worth it.",
        question: "Why does total interest matter so much?",
      },
      {
        answer:
          "Yes. This version assumes fixed monthly payments over the full term. If a loan has variable rates or irregular payments, the actual schedule can differ from this estimate.",
        question: "Does this assume equal monthly payments?",
      },
    ],
    howToSteps: [
      "Enter the amount you plan to borrow, the annual interest rate, and the repayment term in years.",
      "Check the monthly payment for budget fit, then read the total payment and total interest before deciding whether the term still looks attractive.",
      "Compare more than one rate or term if you are shopping lenders, because a lower monthly number can hide a higher total borrowing cost.",
      "If you are evaluating a home loan specifically, use the mortgage calculator for labels and examples that better match that intent.",
    ],
    explanation: [
      {
        body: "The calculator uses the same amortization formula as the mortgage calculator. It converts the annual rate into a monthly rate and calculates the fixed payment required to repay the balance over the chosen term.",
        title: "The payment formula in simple terms",
      },
      {
        body: "A useful loan decision needs more than one number. Monthly payment shows cash-flow impact, while total payment and total interest show whether a lower payment comes at too high a long-term cost.",
        title: "How to compare loan offers more clearly",
      },
    ],
    intro:
      "Use this loan calculator to estimate monthly payment, total repayment, and total interest for a fixed-rate installment loan. It is designed for common borrowing scenarios like personal loans, auto loans, or other situations where you want a quick cost check before comparing offers. The result helps with two questions at once: whether the monthly payment fits your budget and whether the total interest makes the loan worth it. That combination makes the page more useful than a payment-only estimate when you are trying to borrow with a clear view of the full cost.",
    relatedArticleSlugs: [
      "mortgage-vs-loan-payment-basics",
      "how-interest-rate-changes-monthly-payment",
      "compound-interest-basics-for-long-term-growth",
    ],
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
