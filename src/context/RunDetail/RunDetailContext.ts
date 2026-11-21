import { createContext } from "react";

export type RunDetailContextValue = {
  selectedRunId: string | null;
  selectRun: (runId: string) => void;
  closeDetails: () => void;
};

export const RunDetailContext = createContext<RunDetailContextValue | null>(
  null,
);
