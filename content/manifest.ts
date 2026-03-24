import { BLOG_ARTICLES } from "@/content/articles";
import { calculatorPageContent } from "@/content/calculator-pages";
import type { ImplementedCalculatorSlug } from "@/types/calculator";
import type { CategoryManifestItem, ToolManifestItem } from "@/types/site";

function getToolSeoFields(slug: ImplementedCalculatorSlug) {
  const pageContent = calculatorPageContent[slug];

  return {
    faqItems: pageContent.faqs,
    intro: pageContent.intro,
    relatedCalculatorSlugs: pageContent.relatedSlugs,
    relatedArticleSlugs:
      pageContent.relatedArticleSlugs ??
      BLOG_ARTICLES.filter((article) => article.relatedCalculators.includes(slug)).map(
        (article) => article.slug,
      ),
  };
}

export const CATEGORY_MANIFEST: CategoryManifestItem[] = [
  {
    featuredToolSlugs: ["bmi-calculator", "calorie-calculator"],
    intro:
      "Use the health calculator category to estimate body mass index, daily calorie needs, and other practical planning numbers you might want before making nutrition or wellness decisions.",
    slug: "health",
    title: "Health",
    shortDescription:
      "Body metrics, nutrition planning, and everyday wellness estimates.",
    seoTitle: "Health Calculators for BMI, Calories, and Everyday Wellness",
    seoDescription:
      "Explore health calculators for BMI, calorie planning, and everyday wellness estimates with clear explanations and supporting guides.",
  },
  {
    featuredToolSlugs: [
      "mortgage-calculator",
      "loan-calculator",
      "investment-calculator",
    ],
    intro:
      "Use the finance calculator category to compare monthly payments, project long-term growth, and get clearer first-pass answers around loans, mortgages, and investing.",
    slug: "finance",
    title: "Finance",
    shortDescription:
      "Debt, mortgage, investing, and long-term money planning calculators.",
    seoTitle: "Finance Calculators for Mortgages, Loans, and Investing",
    seoDescription:
      "Browse finance calculators for mortgage payments, loans, compound growth, and investment planning with practical supporting content.",
  },
  {
    featuredToolSlugs: [
      "percentage-calculator",
      "date-difference-calculator",
      "discount-calculator",
    ],
    intro:
      "Use the everyday calculator category for percentage math, grades, dates, discounts, and other quick planning tasks that come up in day-to-day work and life.",
    slug: "everyday",
    title: "Everyday",
    shortDescription:
      "Quick everyday helpers for percentages, grades, dates, age, and discounts.",
    seoTitle: "Everyday Calculators for Percentages, Dates, Grades, and Discounts",
    seoDescription:
      "Find everyday calculators for percentages, age, grades, dates, and discounts, plus guides that explain the math in plain language.",
  },
];

export const TOOL_MANIFEST: ToolManifestItem[] = [
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    category: "health",
    shortDescription: "Estimate body mass index from height and weight inputs.",
    ...getToolSeoFields("bmi-calculator"),
    seoTitle: "BMI Calculator: Check Body Mass Index Quickly",
    seoDescription:
      "Check body mass index with metric or imperial inputs, review BMI categories, and understand what the result can and cannot tell you.",
  },
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    category: "health",
    shortDescription:
      "Plan a baseline calorie target for maintenance, loss, or gain scenarios.",
    ...getToolSeoFields("calorie-calculator"),
    seoTitle: "Calorie Calculator: Estimate Maintenance, Cut, and Bulk Targets",
    seoDescription:
      "Estimate maintenance calories with the Mifflin-St Jeor formula and compare simple cut or bulk targets for everyday planning.",
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    category: "finance",
    shortDescription:
      "Preview monthly mortgage costs, repayment structure, and planning context.",
    ...getToolSeoFields("mortgage-calculator"),
    seoTitle: "Mortgage Calculator: Monthly Payment, Total Interest, and Cost",
    seoDescription:
      "Calculate mortgage payment, total repayment, and total interest so you can compare home loan scenarios with clearer cost context.",
  },
  {
    slug: "loan-calculator",
    title: "Loan Calculator",
    category: "finance",
    shortDescription:
      "Model installment loans with rate, term, and payment details.",
    ...getToolSeoFields("loan-calculator"),
    seoTitle: "Loan Calculator: Monthly Payment and Total Borrowing Cost",
    seoDescription:
      "Estimate loan payment, total repayment, and total interest to compare personal or installment borrowing scenarios more clearly.",
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    category: "finance",
    shortDescription:
      "Project balance growth with contributions, compounding, and time horizon inputs.",
    ...getToolSeoFields("compound-interest-calculator"),
    seoTitle: "Compound Interest Calculator for Long-Term Growth Projections",
    seoDescription:
      "Project compound growth from principal, rate, time, and compounding frequency with a calculator built for practical future-value planning.",
  },
  {
    slug: "investment-calculator",
    title: "Investment Calculator",
    category: "finance",
    shortDescription:
      "Estimate future portfolio value using deposits, growth rate, and time horizon inputs.",
    ...getToolSeoFields("investment-calculator"),
    seoTitle: "Investment Calculator for Future Value and Monthly Contributions",
    seoDescription:
      "Estimate future investment value from an initial deposit, monthly contributions, expected return, and timeline.",
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    category: "everyday",
    shortDescription:
      "Quickly solve common percentage relationships and part-to-whole questions.",
    ...getToolSeoFields("percentage-calculator"),
    seoTitle: "Percentage Calculator: Percent Of, What Percent, and Adjustments",
    seoDescription:
      "Solve common percentage questions, including percent of a number, what percent one value is of another, and simple percentage increases or decreases.",
  },
  {
    slug: "percent-change-calculator",
    title: "Percent Change Calculator",
    category: "everyday",
    shortDescription:
      "Measure increase or decrease between two values with change-focused phrasing.",
    ...getToolSeoFields("percent-change-calculator"),
    seoTitle: "Percent Change Calculator for Increase and Decrease",
    seoDescription:
      "Calculate percent increase or percent decrease between an old value and a new value with a clear percent change formula.",
  },
  {
    slug: "grade-calculator",
    title: "Grade Calculator",
    category: "everyday",
    shortDescription:
      "Estimate course outcomes from weighted assignments and score scenarios.",
    ...getToolSeoFields("grade-calculator"),
    seoTitle: "Grade Calculator for Weighted Average Scores",
    seoDescription:
      "Calculate weighted grades from assignment scores and weights to estimate course performance with less guesswork.",
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    category: "everyday",
    shortDescription:
      "Find exact age from a birth date using a clean, planner-style interface.",
    ...getToolSeoFields("age-calculator"),
    seoTitle: "Age Calculator: Exact Years, Months, and Days",
    seoDescription:
      "Calculate exact age from a birth date to today or a custom end date, with years, months, days, and total-day context.",
  },
  {
    slug: "date-difference-calculator",
    title: "Date Difference Calculator",
    category: "everyday",
    shortDescription:
      "Measure time between two dates for schedules, planning, and deadline tracking.",
    ...getToolSeoFields("date-difference-calculator"),
    seoTitle: "Date Difference Calculator for Days, Weeks, and Months",
    seoDescription:
      "Find the difference between two dates in days, with simple week and month context for planning and scheduling.",
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    category: "everyday",
    shortDescription:
      "Break down sale price, savings, and markdown math for everyday purchases.",
    ...getToolSeoFields("discount-calculator"),
    seoTitle: "Discount Calculator for Sale Price and Amount Saved",
    seoDescription:
      "Calculate sale price, amount saved, and discount percentage with a simple discount calculator for everyday shopping math.",
  },
];
