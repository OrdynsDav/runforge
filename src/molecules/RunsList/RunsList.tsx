import { Text } from "../../atoms/Text/Text";
import type { Run } from "../../types/run";
import RunCard from "../RunCard/RunCard";
import "./RunsList.css";

const COLUMNS = ["Run", "Repository / branch", "Status", "Created", "Duration"];

type RunsListProps = {
  runs: Run[];
  selectedRunId: string | null;
  onSelectRun: (runId: string) => void;
};

export default function RunsList({
  runs,
  selectedRunId,
  onSelectRun,
}: RunsListProps) {
  return (
    <div className="runs-list">
      <div className="runs-list__head" aria-hidden="true">
        {COLUMNS.map((column) => (
          <Text key={column} variant="label">
            {column}
          </Text>
        ))}
      </div>

      <ul className="runs-list__items">
        {runs.map((run) => (
          <li key={run.id}>
            <RunCard
              run={run}
              isSelected={run.id === selectedRunId}
              onSelect={onSelectRun}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
