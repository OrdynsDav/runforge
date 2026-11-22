import { useEffect, useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useRunsFilters } from "../../hooks/useRunsFilters";
import { clsx } from "../../utils/clsx";
import type { StatusFilter } from "../../utils/filterRuns";
import "./SearchFilterToolbar.css";

const SEARCH_DEBOUNCE_MS = 300;

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "queued", label: "В очереди" },
  { value: "running", label: "Выполняется" },
  { value: "succeeded", label: "Успешно" },
  { value: "failed", label: "Ошибка" },
];

type SearchFilterToolbarProps = {
  counts?: Record<StatusFilter, number>;
  className?: string;
};

export default function SearchFilterToolbar({
  counts,
  className,
}: SearchFilterToolbarProps) {
  const { query, status, setQuery, setStatus } = useRunsFilters();

  // То, что сейчас в поле. В общий фильтр уходит только устоявшееся значение.
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebouncedValue(inputValue, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  // Внешний сброс 
  const [previousQuery, setPreviousQuery] = useState(query);

  if (query !== previousQuery) {
    setPreviousQuery(query);

    if (query !== debouncedValue) setInputValue(query);
  }

  return (
    <div className={clsx("search-filter-toolbar", className)}>
      <input
        className="search-filter-toolbar__search"
        type="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Поиск по названию или репозиторию"
        aria-label="Поиск по названию или репозиторию"
      />

      <div
        className="search-filter-toolbar__filters"
        role="group"
        aria-label="Фильтр по статусу"
      >
        {FILTER_OPTIONS.map(({ value, label }) => {
          const isActive = status === value;

          return (
            <button
              key={value}
              type="button"
              className={clsx(
                "search-filter-toolbar__chip",
                isActive && "search-filter-toolbar__chip--active",
              )}
              aria-pressed={isActive}
              onClick={() => setStatus(value)}
            >
              {label}
              {counts && ` ${counts[value]}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}