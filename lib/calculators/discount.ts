export type DiscountCalculatorInput = {
  discountPercent: number;
  originalPrice: number;
};

export type DiscountCalculatorOutput = {
  amountSaved: number;
  finalPrice: number;
};

export function calculateDiscount(
  input: DiscountCalculatorInput,
): DiscountCalculatorOutput {
  const amountSaved = (input.discountPercent / 100) * input.originalPrice;

  return {
    amountSaved,
    finalPrice: input.originalPrice - amountSaved,
  };
}
