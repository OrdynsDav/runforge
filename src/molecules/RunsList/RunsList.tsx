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
    <table className="runs-list">
      <caption className="runs-list__caption">Runs</caption>

      <colgroup>
        <col className="runs-list__col runs-list__col--name" />
        <col className="runs-list__col runs-list__col--repo" />
        <col className="runs-list__col runs-list__col--status" />
        <col className="runs-list__col runs-list__col--created" />
        <col className="runs-list__col runs-list__col--duration" />
      </colgroup>

      <thead className="runs-list__head">
        <tr>
          {COLUMNS.map((column) => (
            <th key={column} scope="col" className="runs-list__th">
              <Text as="span" variant="label">
                {column}
              </Text>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {runs.map((run) => (
          <RunCard
            key={run.id}
            run={run}
            isSelected={run.id === selectedRunId}
            onSelect={onSelectRun}
          />
        ))}
      </tbody>
    </table>
  );
}
