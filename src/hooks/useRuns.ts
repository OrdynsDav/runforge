import { useCallback, useEffect, useState } from "react";
import { fetchRuns, isMockErrorEnabled } from "../api/runsApi";
import type { Run } from "../types/run";

type RunsState = {
  runs: Run[];
  isLoading: boolean;
  error: string | null;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export function useRuns() {
  const [state, setState] = useState<RunsState>({
    runs: [],
    isLoading: true,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    // с ?mockError первая попытка падает, повтор («Try again») проходит
    const shouldFail = isMockErrorEnabled() && attempt === 0;

    fetchRuns({ shouldFail })
      .then((runs) => {
        if (!isCancelled) setState({ runs, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!isCancelled)
          setState({
            runs: [],
            isLoading: false,
            error: getErrorMessage(error),
          });
      });

    return () => {
      isCancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    setAttempt((value) => value + 1);
  }, []);

  return { ...state, reload };
}
