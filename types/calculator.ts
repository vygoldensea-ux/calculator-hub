export type ImplementedCalculatorSlug =
  | "calorie-calculator"
  | "percentage-calculator"
  | "percent-change-calculator"
  | "discount-calculator"
  | "age-calculator"
  | "date-difference-calculator"
  | "bmi-calculator"
  | "mortgage-calculator"
  | "loan-calculator"
  | "compound-interest-calculator"
  | "investment-calculator"
  | "grade-calculator";

export type CalculatorFormValues = Record<string, string>;

export type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

export type CalculatorFieldOption = {
  label: string;
  value: string;
};

export type CalculatorField = {
  autoComplete?: string;
  helper?: string;
  label: string;
  max?: number;
  min?: number;
  name: string;
  options?: CalculatorFieldOption[];
  placeholder?: string;
  step?: string;
  suffix?: string;
  type: "date" | "number" | "select";
  width?: "full" | "half";
};

export type CalculatorVariant = {
  description: string;
  fields: CalculatorField[];
  label: string;
  value: string;
};

export type CalculatorExplanationSection = {
  body: string;
  title: string;
};

export type CalculatorExample = {
  result: string;
  title: string;
  values: string;
};

export type CalculatorFaq = {
  answer: string;
  question: string;
};

export type CalculatorMetric = {
  label: string;
  tone?: "default" | "positive" | "warning";
  value: string;
};

export type CalculatorResultView = {
  metrics: CalculatorMetric[];
  primaryLabel: string;
  primaryTone?: "default" | "positive" | "warning";
  primaryValue: string;
  summary: string;
};

export type CalculatorRunState =
  | {
      message: string;
      status: "empty";
      title: string;
    }
  | {
      message: string;
      status: "error";
      title: string;
    }
  | {
      message: string;
      result: CalculatorResultView;
      status: "success";
      title: string;
    };

export type CalculatorContent = {
  defaultValues: CalculatorFormValues;
  examples: CalculatorExample[];
  faqs: CalculatorFaq[];
  explanation: CalculatorExplanationSection[];
  intro: string;
  relatedSlugs: ImplementedCalculatorSlug[];
  slug: ImplementedCalculatorSlug;
  variantField?: string;
  variants: CalculatorVariant[];
};

export type CalculatorDefinition = CalculatorContent & {
  run: (values: CalculatorFormValues) => CalculatorRunState;
};
