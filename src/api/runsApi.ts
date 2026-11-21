import { MOCK_RUNS } from "../data/mockRuns";
import type { Run } from "../types/run";

const MOCK_DELAY_MS = 900;

type FetchRunsOptions = {
  shouldFail?: boolean;
};

/** Имитация запроса к backend: возвращает Promise с задержкой, чтобы было видно загрузку. */
export function fetchRuns({
  shouldFail = false,
}: FetchRunsOptions = {}): Promise<Run[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(
          new Error("Runs service is unavailable (503). Please try again."),
        );
        return;
      }
      // копия, чтобы компоненты не могли случайно мутировать исходные данные
      resolve(structuredClone(MOCK_RUNS));
    }, MOCK_DELAY_MS);
  });
}

/** Ошибку можно посмотреть, открыв страницу с параметром ?mockError */
export function isMockErrorEnabled(): boolean {
  return new URLSearchParams(window.location.search).has("mockError");
}
