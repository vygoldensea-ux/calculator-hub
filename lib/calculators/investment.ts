export type InvestmentCalculatorInput = {
  annualReturnPercent: number;
  initialInvestment: number;
  monthlyContribution: number;
  years: number;
};

export type InvestmentCalculatorOutput = {
  futureValue: number;
  investmentGrowth: number;
  totalContributions: number;
};

export function calculateInvestmentGrowth(
  input: InvestmentCalculatorInput,
): InvestmentCalculatorOutput {
  const monthlyRate = input.annualReturnPercent / 100 / 12;
  const numberOfMonths = input.years * 12;
  const initialGrowth =
    input.initialInvestment * (1 + monthlyRate) ** numberOfMonths;
  const contributionGrowth =
    monthlyRate === 0
      ? input.monthlyContribution * numberOfMonths
      : input.monthlyContribution *
        (((1 + monthlyRate) ** numberOfMonths - 1) / monthlyRate);
  const futureValue = initialGrowth + contributionGrowth;
  const totalContributions =
    input.initialInvestment + input.monthlyContribution * numberOfMonths;

  return {
    futureValue,
    investmentGrowth: futureValue - totalContributions,
    totalContributions,
  };
}
