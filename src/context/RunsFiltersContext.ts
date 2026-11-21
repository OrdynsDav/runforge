import { createContext } from 'react'
import type { RunsFilters, StatusFilter } from '../utils/filterRuns'

export type RunsFiltersContextValue = RunsFilters & {
  setQuery: (query: string) => void
  setStatus: (status: StatusFilter) => void
  resetFilters: () => void
  hasActiveFilters: boolean
}

export const RunsFiltersContext = createContext<RunsFiltersContextValue | null>(null)