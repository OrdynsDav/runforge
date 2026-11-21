import { useContext, useMemo } from 'react'
import { RunsFiltersContext } from '../context/RunsFiltersContext'
import { countByStatus, filterRuns } from '../utils/filterRuns'
import type { Run } from '../types/run'

export function useRunsFilters() {
  const context = useContext(RunsFiltersContext)
  if (!context) {
    throw new Error('useRunsFilters must be used within RunsFiltersProvider')
  }
  return context
}

export function useFilteredRuns(runs: Run[]) {
  const { query, status } = useRunsFilters()

  return useMemo(() => {
    const filteredRuns = filterRuns(runs, { query, status })
    // счётчики на чипах учитывают поиск, но не выбранный статус
    const counts = countByStatus(filterRuns(runs, { query, status: 'all' }))
    return { filteredRuns, counts }
  }, [runs, query, status])
}