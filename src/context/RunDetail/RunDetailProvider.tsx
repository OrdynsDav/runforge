import { useCallback, useMemo, useState, type ReactNode } from "react";
import { RunDetailContext } from "./RunDetailContext";

export function RunDetailProvider({ children }: { children: ReactNode }) {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  const selectRun = useCallback((runId: string) => setSelectedRunId(runId), []);
  const closeDetails = useCallback(() => setSelectedRunId(null), []);

  const value = useMemo(
    () => ({ selectedRunId, selectRun, closeDetails }),
    [selectedRunId, selectRun, closeDetails],
  );

  return (
    <RunDetailContext.Provider value={value}>
      {children}
    </RunDetailContext.Provider>
  );
}
