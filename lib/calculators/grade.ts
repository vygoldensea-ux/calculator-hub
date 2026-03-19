export type GradeAssignmentInput = {
  scorePercent: number;
  weightPercent: number;
};

export type GradeCalculatorInput = {
  assignments: GradeAssignmentInput[];
};

export type GradeCalculatorOutput = {
  assignmentCount: number;
  totalWeight: number;
  weightedAverage: number;
};

export function calculateGrade(
  input: GradeCalculatorInput,
): GradeCalculatorOutput {
  const totalWeight = input.assignments.reduce(
    (sum, assignment) => sum + assignment.weightPercent,
    0,
  );
  const weightedPoints = input.assignments.reduce(
    (sum, assignment) =>
      sum + assignment.scorePercent * assignment.weightPercent,
    0,
  );

  return {
    assignmentCount: input.assignments.length,
    totalWeight,
    weightedAverage: weightedPoints / totalWeight,
  };
}
