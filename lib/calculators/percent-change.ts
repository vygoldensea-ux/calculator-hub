export type PercentChangeCalculatorInput = {
  newValue: number;
  oldValue: number;
};

export type PercentChangeCalculatorOutput = {
  absoluteChange: number;
  direction: "decrease" | "increase" | "no-change";
  percentChange: number;
};

export function calculatePercentChange(
  input: PercentChangeCalculatorInput,
): PercentChangeCalculatorOutput {
  const absoluteChange = input.newValue - input.oldValue;

  return {
    absoluteChange,
    direction:
      absoluteChange === 0
        ? "no-change"
        : absoluteChange > 0
          ? "increase"
          : "decrease",
    percentChange: (absoluteChange / input.oldValue) * 100,
  };
}
