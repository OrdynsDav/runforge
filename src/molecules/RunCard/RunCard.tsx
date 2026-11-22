import { Text } from "../../atoms/Text/Text";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import "./RunCard.css";
import type { Run } from "../../types/run";
import { clsx } from "../../utils/clsx";
import { formatDate, formatDuration } from "../../utils/format";

type RunCardProps = {
  run: Run;
  isSelected: boolean;
  onSelect: (runId: string) => void;
};

export default function RunCard({ run, isSelected, onSelect }: RunCardProps) {
  return (
    <tr
      className={clsx("run-card", isSelected && "run-card--selected")}
      aria-current={isSelected ? "true" : undefined}
      onClick={() => onSelect(run.id)}
    >
      <td className="run-card__name">
        {/* Настоящая кнопка: фокус и Enter/Space работают с клавиатуры, клик всплывает до <tr> */}
        <button type="button" className="run-card__button" title={run.name}>
          <Text as="span" variant="bodyStrong" className="run-card__truncate">
            {run.name}
          </Text>
        </button>
      </td>

      <td className="run-card__repo">
        <Text
          as="span"
          variant="bodyStrong"
          className="run-card__truncate"
          title={run.repository}
        >
          {run.repository}
        </Text>
        <Text
          as="span"
          variant="caption"
          className="run-card__truncate"
          title={run.branch}
        >
          {run.branch}
        </Text>
      </td>

      <td className="run-card__status">
        <StatusBadge status={run.status} />
      </td>

      <td className="run-card__created">
        <Text as="time" variant="caption" dateTime={run.createdAt}>
          {formatDate(run.createdAt)}
        </Text>
      </td>

      <td className="run-card__duration">
        <Text as="span" variant="caption">
          {formatDuration(run.durationSeconds)}
        </Text>
      </td>
    </tr>
  );
}