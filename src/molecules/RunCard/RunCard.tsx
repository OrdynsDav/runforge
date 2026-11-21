import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import { Text } from "../../atoms/Text/Text";
import type { Run } from "../../types/run";
import { clsx } from "../../utils/clsx";
import { formatDate, formatDuration } from "../../utils/format";
import "./RunCard.css";

type RunCardProps = {
  run: Run;
  isSelected: boolean;
  onSelect: (runId: string) => void;
};

export default function RunCard({ run, isSelected, onSelect }: RunCardProps) {
  return (
    <button
      type="button"
      className={clsx("run-card", isSelected && "run-card--selected")}
      aria-current={isSelected ? "true" : undefined}
      onClick={() => onSelect(run.id)}
    >
      <Text variant="bodyStrong" className="run-card__name">
        {run.name}
      </Text>
      <Text variant="caption" className="run-card__repo">
        {run.repository}
        <br />
        {run.branch}
      </Text>
      <StatusBadge status={run.status} />
      <Text variant="caption" className="run-card__created">
        {formatDate(run.createdAt)}
      </Text>
      <Text variant="caption" className="run-card__duration">
        {formatDuration(run.durationSeconds)}
      </Text>
    </button>
  );
}
