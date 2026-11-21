import type { ReactNode } from "react";
import type { RunStatus } from "../../types/run";
import { clsx } from "../../utils/clsx";
import CircleLeftHalfBlackIcon from "../Icons/CircleLeftHalfBlackIcon";
import { Text } from "../Text/Text";
import "./StatusBadge.css";
import CheckIcon from "../Icons/CheckIcon";
import CircleIcon from "../Icons/CircleIcon";
import CloseIcon from "../Icons/CloseIcon";

const STATUS_META: Record<RunStatus, { label: string; icon: ReactNode }> = {
  queued: { label: "Queued", icon: <CircleIcon /> },
  running: { label: "Running", icon: <CircleLeftHalfBlackIcon /> },
  succeeded: { label: "Succeeded", icon: <CheckIcon /> },
  failed: { label: "Failed", icon: <CloseIcon /> },
};

export default function StatusBadge({ status }: { status: RunStatus }) {
  const { label, icon } = STATUS_META[status];

  return (
    <div className={clsx("status-badge", `status-badge--${status}`)}>
      <div className="status-badge__icon" aria-hidden="true">
        {icon}
      </div>
      <Text className="status-badge__text" variant="badge">
        {label}
      </Text>
    </div>
  );
}
