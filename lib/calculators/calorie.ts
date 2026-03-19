export type CalorieCalculatorInput = {
  activityMultiplier: number;
  age: number;
  heightCm: number;
  sex: "female" | "male";
  weightKg: number;
};

export type CalorieCalculatorOutput = {
  bmr: number;
  maintenanceCalories: number;
  mildBulkCalories: number;
  mildCutCalories: number;
};

export function calculateCalorieNeeds(
  input: CalorieCalculatorInput,
): CalorieCalculatorOutput {
  const bmr =
    10 * input.weightKg +
    6.25 * input.heightCm -
    5 * input.age +
    (input.sex === "male" ? 5 : -161);
  const maintenanceCalories = bmr * input.activityMultiplier;

  return {
    bmr,
    maintenanceCalories,
    mildBulkCalories: maintenanceCalories + 250,
    mildCutCalories: maintenanceCalories - 250,
  };
}
