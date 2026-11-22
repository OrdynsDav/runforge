import { useId, useState } from 'react'
import { Text } from '../../atoms/Text/Text'
import { useDevSettings } from '../../hooks/useDevSettings'
import { useRunDetail } from '../../hooks/useRunDetail'
import { useRunsFilters } from '../../hooks/useRunsFilters'
import { MOCK_DATASETS, type MockDataset } from '../../types/devSettings'
import './DevPanel.css'
import { clsx } from '../../utils/clsx'
import SettingsIcon from '../../atoms/Icons/SettingsIcon'

const DATASET_LABELS: Record<MockDataset, string> = {
  default: 'Default (6 runs)',
  empty: 'Empty (0 runs)',
  many: 'Many (30 runs)',
  longText: 'Long text / edge cases',
}

const DELAY_OPTIONS = [0, 900, 3000]

export default function DevPanel() {
  const panelId = useId()
  const [isExpanded, setIsExpanded] = useState(false)

  const { settings, updateSettings, resetSettings, requestReload } = useDevSettings()
  const { query, status, hasActiveFilters, resetFilters } = useRunsFilters()
  const { selectedRunId } = useRunDetail()

  const stateRows = [
    ['Search', query.trim() === '' ? '—' : `“${query}”`],
    ['Status', status],
    ['Selected run', selectedRunId ?? '—'],
  ]

  return (
    <div className="dev-panel">
      <button
        type="button"
        className="dev-panel__toggle"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setIsExpanded((value) => !value)}
      >
        <SettingsIcon />
      </button>

      {isExpanded && (
        <div id={panelId} className="dev-panel__body" role="region" aria-label="Developer settings">
          <section className="dev-panel__section">
            <Text variant="title">
              Data
            </Text>
            <label className="dev-panel__field">
              <Text variant="caption">
                Dataset
              </Text>
              <select
                className="dev-panel__select"
                value={settings.dataset}
                onChange={(event) => updateSettings({ dataset: event.target.value as MockDataset })}
              >
                {MOCK_DATASETS.map((dataset) => (
                  <option key={dataset} value={dataset}>
                    {DATASET_LABELS[dataset]}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="dev-panel__section">
            <Text variant="title">
              Network
            </Text>
            <div className="dev-panel__field">
              <Text variant="caption">
                Delay
              </Text>
              <div className="dev-panel__chips" role="group" aria-label="Request delay">
                {DELAY_OPTIONS.map((delay) => {
                  const isActive = settings.delayMs === delay
                  return (
                    <button
                      key={delay}
                      type="button"
                      className={clsx('dev-panel__chip', isActive && 'dev-panel__chip--active')}
                      aria-pressed={isActive}
                      onClick={() => updateSettings({ delayMs: delay })}
                    >
                      {delay} ms
                    </button>
                  )
                })}
              </div>
            </div>
            <label className="dev-panel__checkbox">
              <input
                type="checkbox"
                checked={settings.failRequests}
                onChange={(event) => updateSettings({ failRequests: event.target.checked })}
              />
              <Text as="span" variant="body">
                Fail requests
              </Text>
            </label>
          </section>

          <section className="dev-panel__section">
            <Text variant="title">
              State
            </Text>
            <dl className="dev-panel__state">
              {stateRows.map(([label, value]) => (
                <div key={label} className="dev-panel__state-row">
                  <Text as="dt" variant="caption">
                    {label}
                  </Text>
                  <Text as="dd" variant="caption" tone="default">
                    {value}
                  </Text>
                </div>
              ))}
            </dl>
            <button
              type="button"
              className="dev-panel__button"
              disabled={!hasActiveFilters}
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </section>

          <section className="dev-panel__section dev-panel__actions">
            <button type="button" className="dev-panel__button" onClick={requestReload}>
              Reload data
            </button>
            <button type="button" className="dev-panel__button" onClick={resetSettings}>
              Reset settings
            </button>
          </section>
        </div>
      )}
    </div>
  )
}