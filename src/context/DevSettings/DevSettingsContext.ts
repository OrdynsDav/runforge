import { createContext } from "react";
import type { DevSettings } from "../../types/devSettings";

export const DEFAULT_DEV_SETTINGS: DevSettings = {
  dataset: "default",
  delayMs: 900,
  failRequests: false,
};

export type DevSettingsContextValue = {
  settings: DevSettings;
  /** Меняется при каждом нажатии «Reload data», хук useRuns реагирует на него */
  reloadToken: number;
  updateSettings: (patch: Partial<DevSettings>) => void;
  resetSettings: () => void;
  requestReload: () => void;
};

const noop = () => {};

export const DevSettingsContext = createContext<DevSettingsContextValue>({
  settings: DEFAULT_DEV_SETTINGS,
  reloadToken: 0,
  updateSettings: noop,
  resetSettings: noop,
  requestReload: noop,
});
