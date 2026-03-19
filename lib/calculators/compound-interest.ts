export type CompoundInterestCalculatorInput = {
  annualRatePercent: number;
  compoundingPerYear: number;
  principal: number;
  years: number;
};

export type CompoundInterestCalculatorOutput = {
  finalAmount: number;
  interestEarned: number;
};

export function calculateCompoundInterest(
  input: CompoundInterestCalculatorInput,
): CompoundInterestCalculatorOutput {
  const periodicRate = input.annualRatePercent / 100 / input.compoundingPerYear;
  const totalPeriods = input.compoundingPerYear * input.years;
  const finalAmount =
    input.principal * (1 + periodicRate) ** totalPeriods;

  return {
    finalAmount,
    interestEarned: finalAmount - input.principal,
  };
}
