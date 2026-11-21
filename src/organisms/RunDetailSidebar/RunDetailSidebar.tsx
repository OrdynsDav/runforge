import { Fragment, useEffect, useRef, useState } from "react";
import StatusBadge from "../../atoms/StatusBadge/StatusBadge";
import LogViewer from "../../molecules/LogViewer/LogViewer";
import "./RunDetailSidebar.css";
import { useRunDetail, useSelectedRun } from "../../hooks/useRunDetail";
import type { Run } from "../../types/run";
import { formatDate, formatDuration } from "../../utils/format";
import { Text } from "../../atoms/Text/Text";
import CloseIcon from "../../atoms/Icons/CloseIcon";

type RunDetailSidebarProps = {
  /** Полный список запусков (не отфильтрованный), чтобы детали не закрывались при поиске */
  runs: Run[];
};

export default function RunDetailSidebar({ runs }: RunDetailSidebarProps) {
  const { closeDetails } = useRunDetail();
  const selectedRun = useSelectedRun(runs);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = selectedRun !== null;

  // Держим последний запуск, чтобы содержимое не исчезало во время анимации закрытия
  const [displayedRun, setDisplayedRun] = useState<Run | null>(selectedRun);
  if (selectedRun && selectedRun !== displayedRun) setDisplayedRun(selectedRun);
  const run = selectedRun ?? displayedRun;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const metaRows = run
    ? [
        ["Repository", run.repository],
        ["Branch", run.branch],
        ["Created", formatDate(run.createdAt, true)],
        ["Duration", formatDuration(run.durationSeconds)],
      ]
    : [];

  return (
    <dialog
      ref={dialogRef}
      className="run-detail-sidebar"
      aria-labelledby="run-detail-title"
      onClose={closeDetails}
      onClick={(event) => {
        // клик по затемнению (сам dialog, а не его содержимое)
        if (event.target === event.currentTarget) closeDetails();
      }}
    >
      {run && (
        <div className="run-detail-sidebar__wrapper">
          <button
            type="button"
            className="run-detail-sidebar__close"
            aria-label="Закрыть детали"
            onClick={closeDetails}
          >
            <CloseIcon width={24} height={24} />
          </button>
          <div className="run-detail-sidebar__header">
            <Text as="h2" variant="title" id="run-detail-title">
              {run.name}
            </Text>
          </div>

          <StatusBadge status={run.status} />

          <dl className="run-detail-sidebar__meta">
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

          <div className="run-detail-sidebar__result">
            <Text as="h3" variant="label">
              Result
            </Text>
            <Text
              as="p"
              variant="body"
              tone={run.result ? "default" : "muted"}
              className="run-detail-sidebar__result-text"
            >
              {run.result ?? "No result yet."}
            </Text>
          </div>
        </div>
      )}
      <div className="run-detail-sidebar__actions">
        <button
          className="run-detail-sidebar__action"
          type="button"
          aria-label="Закрыть детали"
          onClick={closeDetails}
        >
          <Text variant="button">Закрыть</Text>
        </button>
      </div>
    </dialog>
  );
}
