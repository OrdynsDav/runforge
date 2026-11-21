import { useRunsFilters } from "../../hooks/useRunsFilters";
import { clsx } from "../../utils/clsx";
import type { StatusFilter } from "../../utils/filterRuns";
import "./SearchFilterToolbar.css";

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "queued", label: "Queued" },
  { value: "running", label: "Running" },
  { value: "succeeded", label: "Succeeded" },
  { value: "failed", label: "Failed" },
];

type SearchFilterToolbarProps = {
  /** Счётчики на чипах. Пока данные грузятся, можно не передавать. */
  counts?: Record<StatusFilter, number>;
  className?: string;
};

export default function SearchFilterToolbar({
  counts,
  className,
}: SearchFilterToolbarProps) {
  const { query, status, setQuery, setStatus } = useRunsFilters();

  return (
    <div className={clsx("search-filter-toolbar", className)}>
      <input
        className="search-filter-toolbar__search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by run or repository"
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
