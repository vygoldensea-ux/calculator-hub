export type BmiCalculatorInput =
  | {
      heightCm: number;
      mode: "metric";
      weightKg: number;
    }
  | {
      heightInches: number;
      mode: "imperial";
      weightPounds: number;
    };

export type BmiCategory =
  | "Normal weight"
  | "Obesity"
  | "Overweight"
  | "Underweight";

export type BmiCalculatorOutput = {
  bmi: number;
  category: BmiCategory;
};

export function getBmiCategory(value: number): BmiCategory {
  if (value < 18.5) {
    return "Underweight";
  }

  if (value < 25) {
    return "Normal weight";
  }

  if (value < 30) {
    return "Overweight";
  }

  return "Obesity";
}

export function calculateBmi(input: BmiCalculatorInput): BmiCalculatorOutput {
  const bmi =
    input.mode === "metric"
      ? input.weightKg / (input.heightCm / 100) ** 2
      : (703 * input.weightPounds) / input.heightInches ** 2;

  return {
    bmi,
    category: getBmiCategory(bmi),
  };
}
