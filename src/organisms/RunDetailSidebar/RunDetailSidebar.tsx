import { useCallback, useState } from "react";
import type { Run } from "../../types/run";
import { useRunDetail, useSelectedRun } from "../../hooks/useRunDetail";
import RunDetailDialog from "../../molecules/RunDetailDialog/RunDetailDialog";

type RunDetailSidebarProps = {
  runs: Run[];
};

export default function RunDetailSidebar({ runs }: RunDetailSidebarProps) {
  const { closeDetails } = useRunDetail();
  const selectedRun = useSelectedRun(runs);

  const [displayedRun, setDisplayedRun] = useState<Run | null>(selectedRun);
  if (selectedRun && selectedRun !== displayedRun) setDisplayedRun(selectedRun);

  const handleClosed = useCallback(() => setDisplayedRun(null), []);

  if (!displayedRun) return null;

  return (
    <RunDetailDialog
      run={displayedRun}
      isOpen={selectedRun !== null}
      onRequestClose={closeDetails}
      onClosed={handleClosed}
    />
  );
}