import {
  calculateInstallmentLoan,
  type InstallmentCalculatorInput,
  type InstallmentCalculatorOutput,
} from "@/lib/calculators/installment";

export type LoanCalculatorInput = InstallmentCalculatorInput;
export type LoanCalculatorOutput = InstallmentCalculatorOutput;

export function calculateLoan(
  input: LoanCalculatorInput,
): LoanCalculatorOutput {
  return calculateInstallmentLoan(input);
}
