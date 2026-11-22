import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  MOCK_DATASETS,
  type DevSettings,
  type MockDataset,
} from "../../types/devSettings";
import { DEFAULT_DEV_SETTINGS, DevSettingsContext } from "./DevSettingsContext";

const STORAGE_KEY = "runforge:dev-settings";

function loadSettings(): DevSettings {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DEV_SETTINGS;

    const parsed = JSON.parse(raw) as Partial<DevSettings>;

    return {
      dataset: MOCK_DATASETS.includes(parsed.dataset as MockDataset)
        ? (parsed.dataset as MockDataset)
        : DEFAULT_DEV_SETTINGS.dataset,
      delayMs:
        typeof parsed.delayMs === "number" && parsed.delayMs >= 0
          ? parsed.delayMs
          : DEFAULT_DEV_SETTINGS.delayMs,
      failRequests: parsed.failRequests === true,
    };
  } catch {
    return DEFAULT_DEV_SETTINGS;
  }
}

export function DevSettingsProvider({ children }: { children: ReactNode }) {
  // В продакшне настройки всегда по умолчанию: изменить их там нечем
  const [settings, setSettings] = useState<DevSettings>(() =>
    import.meta.env.DEV ? loadSettings() : DEFAULT_DEV_SETTINGS,
  );
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback(
    (patch: Partial<DevSettings>) =>
      setSettings((prev) => ({ ...prev, ...patch })),
    [],
  );
  const resetSettings = useCallback(
    () => setSettings(DEFAULT_DEV_SETTINGS),
    [],
  );
  const requestReload = useCallback(
    () => setReloadToken((value) => value + 1),
    [],
  );

  const value = useMemo(
    () => ({
      settings,
      reloadToken,
      updateSettings,
      resetSettings,
      requestReload,
    }),
    [settings, reloadToken, updateSettings, resetSettings, requestReload],
  );

  return (
    <DevSettingsContext.Provider value={value}>
      {children}
    </DevSettingsContext.Provider>
  );
}
