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

export function isPersistedCalculationPayload(
  payload: unknown,
): payload is PersistedCalculationPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    typeof candidate.calculatorSlug === "string" &&
    typeof candidate.inputs === "object" &&
    candidate.inputs !== null &&
    typeof candidate.result === "object" &&
    candidate.result !== null
  );
}
