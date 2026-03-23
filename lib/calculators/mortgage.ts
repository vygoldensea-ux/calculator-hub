import {
  calculateInstallmentLoan,
  type InstallmentCalculatorInput,
  type InstallmentCalculatorOutput,
} from "@/lib/calculators/installment";

export type MortgageCalculatorInput = InstallmentCalculatorInput;
export type MortgageCalculatorOutput = InstallmentCalculatorOutput;

export function calculateMortgage(
  input: MortgageCalculatorInput,
): MortgageCalculatorOutput {
  return calculateInstallmentLoan(input);
}
