export type PercentageCalculatorMode =
  | "adjust-by-percent"
  | "percent-of"
  | "what-percent";

export type PercentageCalculatorInput =
  | {
      mode: "percent-of";
      percent: number;
      value: number;
    }
  | {
      mode: "what-percent";
      part: number;
      whole: number;
    }
  | {
      direction: "decrease" | "increase";
      mode: "adjust-by-percent";
      percent: number;
      value: number;
    };

export type PercentageCalculatorOutput =
  | {
      mode: "percent-of";
      percent: number;
      result: number;
      value: number;
    }
  | {
      mode: "what-percent";
      part: number;
      result: number;
      whole: number;
    }
  | {
      delta: number;
      direction: "decrease" | "increase";
      mode: "adjust-by-percent";
      percent: number;
      result: number;
      value: number;
    };

export function calculatePercentage(input: {
  mode: "percent-of";
  percent: number;
  value: number;
}): Extract<PercentageCalculatorOutput, { mode: "percent-of" }>;
export function calculatePercentage(input: {
  mode: "what-percent";
  part: number;
  whole: number;
}): Extract<PercentageCalculatorOutput, { mode: "what-percent" }>;
export function calculatePercentage(input: {
  direction: "decrease" | "increase";
  mode: "adjust-by-percent";
  percent: number;
  value: number;
}): Extract<PercentageCalculatorOutput, { mode: "adjust-by-percent" }>;
export function calculatePercentage(
  input: PercentageCalculatorInput,
): PercentageCalculatorOutput {
  if (input.mode === "percent-of") {
    return {
      mode: input.mode,
      percent: input.percent,
      result: (input.percent / 100) * input.value,
      value: input.value,
    };
  }

  if (input.mode === "what-percent") {
    return {
      mode: input.mode,
      part: input.part,
      result: (input.part / input.whole) * 100,
      whole: input.whole,
    };
  }

  const delta = (input.percent / 100) * input.value;
  const directionMultiplier = input.direction === "increase" ? 1 : -1;

  return {
    delta: directionMultiplier * delta,
    direction: input.direction,
    mode: input.mode,
    percent: input.percent,
    result: input.value + directionMultiplier * delta,
    value: input.value,
  };
}
