import { useRunsFilters } from "../../hooks/useRunsFilters";
import RunsList from "../../molecules/RunsList/RunsList";
import StateMessage from "../../molecules/StateMessage/StateMessage";
import type { Run } from "../../types/run";
import "./RunsSection.css";

type RunsSectionProps = {
  /** Уже отфильтрованный список */
  runs: Run[];
  isLoading: boolean;
  error: string | null;
  selectedRunId: string | null;
  onSelectRun: (runId: string) => void;
  onRetry: () => void;
};

export default function RunsSection({
  runs,
  isLoading,
  error,
  selectedRunId,
  onSelectRun,
  onRetry,
}: RunsSectionProps) {
  const { hasActiveFilters, resetFilters } = useRunsFilters();

  return (
    <section className="runs-section" aria-label="Runs" aria-busy={isLoading}>
      {isLoading ? (
        <div
          className="runs-section__skeleton"
          role="status"
          aria-label="Loading runs"
        >
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="runs-section__skeleton-row" />
          ))}
        </div>
      ) : error ? (
        <StateMessage
          title="Couldn’t load runs"
          description={error}
          actionLabel="Try again"
          onAction={onRetry}
        />
      ) : runs.length === 0 ? (
        hasActiveFilters ? (
          <StateMessage
            title="No runs found"
            description="Nothing matches the current search and filter."
            actionLabel="Reset search and filters"
            onAction={resetFilters}
          />
        ) : (
          <StateMessage
            title="No runs yet"
            description="New runs will appear here."
          />
        )
      ) : (
        <RunsList
          runs={runs}
          selectedRunId={selectedRunId}
          onSelectRun={onSelectRun}
        />
      )}
    </section>
  );
}
