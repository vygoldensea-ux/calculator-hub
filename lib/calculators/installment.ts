export type InstallmentCalculatorInput = {
  annualRatePercent: number;
  principal: number;
  years: number;
};

export type InstallmentCalculatorOutput = {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
};

export function calculateInstallmentLoan(
  input: InstallmentCalculatorInput,
): InstallmentCalculatorOutput {
  const monthlyRate = input.annualRatePercent / 100 / 12;
  const numberOfPayments = input.years * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? input.principal / numberOfPayments
      : (input.principal *
          monthlyRate *
          (1 + monthlyRate) ** numberOfPayments) /
        ((1 + monthlyRate) ** numberOfPayments - 1);
  const totalPayment = monthlyPayment * numberOfPayments;

  return {
    monthlyPayment,
    totalInterest: totalPayment - input.principal,
    totalPayment,
  };
}
