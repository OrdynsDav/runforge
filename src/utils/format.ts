const EMPTY_VALUE = '—'

export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return EMPTY_VALUE

  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDuration(seconds?: number): string {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return EMPTY_VALUE

  const total = Math.round(seconds)
  const minutes = Math.floor(total / 60)
  const rest = total % 60

  if (minutes === 0) return `${rest} с`
  return `${minutes} мин ${String(rest).padStart(2, '0')} с`
}