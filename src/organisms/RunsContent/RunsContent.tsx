import { useState } from "react";
import { useFilteredRuns } from "../../hooks/useRunsFilters";
import SearchFilterToolbar from "../SearchFIlterToolbar/SearchFilterToolbar";
import RunsSection from "../RunsSection/RunsSection";
import { useRuns } from "../../hooks/useRuns";
import Container from "../../atoms/Container/Container";
import "./RunsContent.css"

export function RunsContent() {
  const { runs, isLoading, error, reload } = useRuns();
  const { filteredRuns, counts } = useFilteredRuns(runs);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  return (
    <Container>
      <div className="runs-content">
        <SearchFilterToolbar counts={isLoading ? undefined : counts} />
        <RunsSection
          runs={filteredRuns}
          isLoading={isLoading}
          error={error}
          selectedRunId={selectedRunId}
          onSelectRun={setSelectedRunId}
          onRetry={reload}
        />
      </div>
    </Container>
  );
}
