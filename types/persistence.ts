import type {
  CalculatorFormValues,
  CalculatorResultView,
  ImplementedCalculatorSlug,
} from "@/types/calculator";

export type PersistedCalculationPayload = {
  calculatorSlug: ImplementedCalculatorSlug;
  inputs: CalculatorFormValues;
  result: CalculatorResultView;
};
