export interface SequenceStep {
  subject: string;
  body: string;
}

export interface SequencePayload {
  steps: SequenceStep[];
}

export interface Icon {
  width?: number;
  height?: number;
  fill?: string;
}

export interface StepData {
  subject: string;
}

export interface EmailFormValues {
  steps: StepData[];
}

export interface NameFormValues {
  sequenceName: string;
}
