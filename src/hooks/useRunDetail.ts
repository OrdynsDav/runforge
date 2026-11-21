import { useContext, useMemo } from 'react'
import type { Run } from '../types/run'
import { RunDetailContext } from '../context/RunDetail/RunDetailContext'

export function useRunDetail() {
  const context = useContext(RunDetailContext)
  if (!context) {
    throw new Error('useRunDetail must be used within RunDetailProvider')
  }
  return context
}

export function useSelectedRun(runs: Run[]): Run | null {
  const { selectedRunId } = useRunDetail()

  return useMemo(
    () => runs.find((run) => run.id === selectedRunId) ?? null,
    [runs, selectedRunId],
  )
}