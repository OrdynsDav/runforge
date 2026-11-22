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
        <button type="button" className="run-card__button">
          <Text as="span" variant="bodyStrong">
            {run.name}
          </Text>
        </button>
      </td>

      <td className="run-card__repo">
        <Text variant="bodyStrong">
          {run.repository}
        </Text>
        <br />
        <Text as="span" variant="caption">
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
