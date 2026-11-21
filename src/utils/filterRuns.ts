import type { Run, RunStatus } from '../types/run'

export type StatusFilter = RunStatus | 'all'

export type RunsFilters = {
  query: string
  status: StatusFilter
}

export function filterRuns(runs: Run[], { query, status }: RunsFilters): Run[] {
  const normalizedQuery = query.trim().toLowerCase()

  return runs.filter((run) => {
    const matchesStatus = status === 'all' || run.status === status
    const matchesQuery =
      !normalizedQuery ||
      run.name.toLowerCase().includes(normalizedQuery) ||
      run.repository.toLowerCase().includes(normalizedQuery)

    return matchesStatus && matchesQuery
  })
}

export function countByStatus(runs: Run[]): Record<StatusFilter, number> {
  const counts: Record<StatusFilter, number> = {
    all: runs.length,
    queued: 0,
    running: 0,
    succeeded: 0,
    failed: 0,
  }

  for (const run of runs) counts[run.status] += 1

  return counts
}