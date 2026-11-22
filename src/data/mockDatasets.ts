import { MOCK_RUNS } from './mockRuns'
import type { MockDataset } from '../types/devSettings'
import type { Run, RunStatus } from '../types/run'

const STATUSES: RunStatus[] = ['queued', 'running', 'succeeded', 'failed']

function createManyRuns(count: number): Run[] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1
    const status = STATUSES[index % STATUSES.length]
    const isFinished = status === 'succeeded' || status === 'failed'

    return {
      id: `run-gen-${number}`,
      name: `Generated run #${number}`,
      repository: `service-${(index % 5) + 1}`,
      branch: `feat/task-${number}`,
      status,
      // каждый следующий запуск на 17 минут старше предыдущего
      createdAt: new Date(Date.UTC(2026, 10, 20, 9, 0) - index * 17 * 60_000).toISOString(),
      durationSeconds: isFinished ? 60 + index * 13 : undefined,
      logs: Array.from(
        { length: 3 + (index % 6) },
        (_, line) => `10:${String(line).padStart(2, '0')}:00 step ${line + 1} of run ${number}`,
      ),
      result: isFinished && index % 3 !== 0 ? `Run ${number} finished with status ${status}.` : undefined,
    }
  })
}

const LONG_TEXT_RUNS: Run[] = [
  {
    id: 'run-long-1',
    name: 'Refactor authentication middleware and migrate session storage to the new token service',
    repository: 'enterprise-platform-core-services',
    branch: 'feature/very-long-branch-name-for-testing-text-overflow-behaviour',
    status: 'running',
    createdAt: '2026-11-20T09:42:00Z',
    logs: [`ERROR ${'x'.repeat(120)}`, '09:43:00 retrying'],
  },
  {
    id: 'run-long-2',
    name: 'Supercalifragilisticexpialidocious_run_name_without_spaces_to_test_word_breaking',
    repository: 'media-service',
    branch: 'perf/images',
    status: 'failed',
    createdAt: '2026-11-19T17:20:00Z',
    durationSeconds: 3725,
    logs: ['17:20:03 cloning media-service'],
    result:
      'The run failed because the image pipeline exceeded the memory limit while resizing a batch of large source files. Increase the limit or reduce the batch size and run it again.',
  },
]

export function getMockRuns(dataset: MockDataset): Run[] {
  switch (dataset) {
    case 'empty':
      return []
    case 'many':
      return createManyRuns(30)
    case 'longText':
      return LONG_TEXT_RUNS
    default:
      return MOCK_RUNS
  }
}