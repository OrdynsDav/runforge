import type { RunStatus } from "../../types/run";
import { clsx } from "../../utils/clsx";
import { Text } from "../Text/Text";
import "./StatusBadge.css";

const STATUS_META: Record<RunStatus, { label: string; icon: string }> = {
  queued: { label: "Queued", icon: "○" },
  running: { label: "Running", icon: "◐" },
  succeeded: { label: "Succeeded", icon: "✓" },
  failed: { label: "Failed", icon: "✕" },
};

export default function StatusBadge({ status }: { status: RunStatus }) {
  const { label, icon } = STATUS_META[status];

  return (
    <Text
      as="span"
      variant="badge"
      className={clsx("status-badge", `status-badge--${status}`)}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </Text>
  );
}
