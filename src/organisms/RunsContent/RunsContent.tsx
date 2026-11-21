import { useFilteredRuns } from "../../hooks/useRunsFilters";
import SearchFilterToolbar from "../SearchFIlterToolbar/SearchFilterToolbar";
import RunsSection from "../RunsSection/RunsSection";
import { useRuns } from "../../hooks/useRuns";
import Container from "../../atoms/Container/Container";
import "./RunsContent.css";
import { useRunDetail } from "../../hooks/useRunDetail";
import RunDetailSidebar from "../RunDetailSidebar/RunDetailSidebar";

export function RunsContent() {
  const { runs, isLoading, error, reload } = useRuns();
  const { filteredRuns, counts } = useFilteredRuns(runs);
  const { selectedRunId, selectRun } = useRunDetail();

  return (
    <Container>
      <div className="runs-content">
        <SearchFilterToolbar counts={isLoading ? undefined : counts} />
        <RunsSection
          runs={filteredRuns}
          isLoading={isLoading}
          error={error}
          selectedRunId={selectedRunId}
          onSelectRun={selectRun}
          onRetry={reload}
        />
        <RunDetailSidebar runs={runs} />
      </div>
    </Container>
  );
}
