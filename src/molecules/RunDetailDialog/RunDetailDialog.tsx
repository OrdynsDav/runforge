import { Fragment, useEffect, useRef } from "react";
import type { Run } from "../../types/run";
import { formatDate, formatDuration } from "../../utils/format";
import { Text } from "../../atoms/Text/Text";
import CloseIcon from "../../atoms/Icons/CloseIcon";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import LogViewer from "../LogViewer/LogViewer";
import "./RunDetailDialog.css";

type RunDetailDialogProps = {
  run: Run;
  isOpen: boolean;
  onRequestClose: () => void;
  onClosed: () => void;
};

export default function RunDetailDialog({
  run,
  isOpen,
  onRequestClose,
  onClosed,
}: RunDetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      return;
    }

    if (dialog.open) dialog.close();

    const animations = dialog.getAnimations();

    if (animations.length === 0) {
      onClosed();
      return;
    }

    let isCancelled = false;

    Promise.allSettled(animations.map((animation) => animation.finished)).then(
      () => {
        if (!isCancelled) onClosed();
      },
    );

    return () => {
      isCancelled = true;
    };
  }, [isOpen, onClosed]);

  const metaRows = [
    ["Repository", run.repository],
    ["Branch", run.branch],
    ["Created", formatDate(run.createdAt, true)],
    ["Duration", formatDuration(run.durationSeconds)],
  ];

  return (
    <dialog
      ref={dialogRef}
      className="run-detail-dialog"
      aria-labelledby="run-detail-title"
      onClose={onRequestClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onRequestClose();
      }}
    >
      <div className="run-detail-dialog__wrapper">
        <div className="run-detail-dialog__header">
          <Text variant="title" id="run-detail-title">
            {run.name}
          </Text>
          <button
            type="button"
            className="run-detail-dialog__close"
            aria-label="Закрыть детали"
            onClick={onRequestClose}
          >
            <CloseIcon width={24} height={24} />
          </button>
        </div>

        <StatusBadge status={run.status} />

        <dl className="run-detail-dialog__meta">
          {metaRows.map(([label, value]) => (
            <Fragment key={label}>
              <Text as="dt" variant="caption">
                {label}
              </Text>
              <Text as="dd" variant="body">
                {value}
              </Text>
            </Fragment>
          ))}
        </dl>

        <LogViewer logs={run.logs} />

        <div className="run-detail-dialog__result">
          <Text as="h3" variant="label">
            Result
          </Text>
          <Text
            as="p"
            variant="body"
            tone={run.result ? "default" : "muted"}
            className="run-detail-dialog__result-text"
          >
            {run.result ?? "Нет результатов"}
          </Text>
        </div>
      </div>
      <div className="run-detail-dialog__actions">
        <button
          className="run-detail-dialog__action"
          type="button"
          onClick={onRequestClose}
        >
          Закрыть
        </button>
      </div>
    </dialog>
  );
}
