import { createContext, useContext, useState, type ReactNode } from "react";
import type { SequencePayload } from "../features/types";

interface SequenceContextType {
  sequence: SequencePayload;
  sequenceName: string;
  setSequenceName: (name: string) => void;
  setSteps: (steps: SequencePayload["steps"]) => void;
  reset: () => void;
}

const defaultSequence: SequencePayload = {
  steps: [],
};

const SequenceContext = createContext<SequenceContextType | undefined>(
  undefined
);

export const SequenceProvider = ({ children }: { children: ReactNode }) => {
  const [sequence, setSequence] = useState<SequencePayload>(defaultSequence);
  const [sequenceName, setSequenceNameState] = useState<string>("");

  const setSteps = (steps: SequencePayload["steps"]) => {
    setSequence((prev) => ({ ...prev, steps }));
  };

  const setSequenceName = (name: string) => {
    setSequenceNameState(name);
  };

  const reset = () => {
    setSequence(defaultSequence);
    setSequenceNameState("");
  };

  return (
    <SequenceContext.Provider
      value={{
        sequence,
        sequenceName,
        setSequenceName,
        setSteps,
        reset,
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSequenceStore = (): SequenceContextType => {
  const context = useContext(SequenceContext);
  if (!context) throw new Error("SequenceContext is not available");
  return context;
};

export { SequenceContext };