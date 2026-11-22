import { getMockRuns } from '../data/mockDatasets'
import type { MockDataset } from '../types/devSettings'
import type { Run } from '../types/run'

type FetchRunsOptions = {
  dataset?: MockDataset
  delayMs?: number
  shouldFail?: boolean
}

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
      
      resolve(structuredClone(getMockRuns(dataset)))
    }, delayMs)
  })
}