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
  queued: { label: "В очереди", icon: <CircleIcon /> },
  running: { label: "Выполняется", icon: <CircleLeftHalfBlackIcon /> },
  succeeded: { label: "Успешно", icon: <CheckIcon /> },
  failed: { label: "Ошибка", icon: <CloseIcon /> },
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
