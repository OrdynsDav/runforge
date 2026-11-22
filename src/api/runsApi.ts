import { getMockRuns } from '../data/mockDatasets'
import type { MockDataset } from '../types/devSettings'
import type { Run } from '../types/run'

type FetchRunsOptions = {
  dataset?: MockDataset
  delayMs?: number
  shouldFail?: boolean
}

/** Имитация запроса к backend: возвращает Promise с задержкой, чтобы было видно загрузку. */
export function fetchRuns({
  dataset = 'default',
  delayMs = 900,
  shouldFail = false,
}: FetchRunsOptions = {}): Promise<Run[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Runs service is unavailable (503). Please try again.'))
        return
      }
      // копия, чтобы компоненты не могли случайно мутировать исходные данные
      resolve(structuredClone(getMockRuns(dataset)))
    }, delayMs)
  })
}