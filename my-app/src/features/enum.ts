export const StepPath = {
  ProductName: "/",
  SequenceSteps: "/sequenceSteps",
  Summary: "/summary",
} as const;

export type StepPath = (typeof StepPath)[keyof typeof StepPath];
