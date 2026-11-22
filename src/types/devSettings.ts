export const MOCK_DATASETS = ['default', 'empty', 'many', 'longText'] as const

export type MockDataset = (typeof MOCK_DATASETS)[number]

export type DevSettings = {
  dataset: MockDataset
  delayMs: number
  failRequests: boolean
}