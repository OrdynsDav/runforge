import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { RunsFiltersContext } from './RunsFiltersContext'
import type { RunsFilters, StatusFilter } from '../../utils/filterRuns'

const INITIAL_FILTERS: RunsFilters = { query: '', status: 'all' }

export function RunsFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<RunsFilters>(INITIAL_FILTERS)

  const setQuery = useCallback(
    (query: string) => setFilters((prev) => ({ ...prev, query })),
    [],
  )
  const setStatus = useCallback(
    (status: StatusFilter) => setFilters((prev) => ({ ...prev, status })),
    [],
  )
  const resetFilters = useCallback(() => setFilters(INITIAL_FILTERS), [])

  const value = useMemo(
    () => ({
      ...filters,
      setQuery,
      setStatus,
      resetFilters,
      hasActiveFilters: filters.query.trim() !== '' || filters.status !== 'all',
    }),
    [filters, setQuery, setStatus, resetFilters],
  )

  return <RunsFiltersContext.Provider value={value}>{children}</RunsFiltersContext.Provider>
}