import { useCallback, useEffect, useState } from 'react'
import { fetchRuns } from '../api/runsApi'
import { useDevSettings } from './useDevSettings'
import type { Run } from '../types/run'

type RunsResult = {
  key: string
  runs: Run[]
  error: string | null
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Something went wrong.'
}

export function useRuns() {
  const { settings, reloadToken } = useDevSettings()
  const { dataset, delayMs, failRequests } = settings

  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<RunsResult | null>(null)

  // любое изменение настроек или повтор даёт новый ключ и новый запрос
  const requestKey = `${dataset}|${delayMs}|${failRequests}|${reloadToken}|${attempt}`

  useEffect(() => {
    let isCancelled = false

    fetchRuns({ dataset, delayMs, shouldFail: failRequests })
      .then((runs) => {
        if (!isCancelled) setResult({ key: requestKey, runs, error: null })
      })
      .catch((error: unknown) => {
        if (!isCancelled) setResult({ key: requestKey, runs: [], error: getErrorMessage(error) })
      })

    return () => {
      isCancelled = true
    }
  }, [requestKey, dataset, delayMs, failRequests])

  const reload = useCallback(() => setAttempt((value) => value + 1), [])

  const isLoading = result?.key !== requestKey

  return {
    runs: result?.runs ?? [],
    isLoading,
    error: isLoading ? null : (result?.error ?? null),
    reload,
  }
}