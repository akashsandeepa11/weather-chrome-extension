import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  cities?: String[];
  options?: LocalStorageOptions;
}
export interface LocalStorageOptions {
  homeCity: String;
  tempScale: OpenWeatherTempScale;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: String[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => resolve());
  });
}

export function getStoredCities(): Promise<String[]> {
  const keys: LocalStorageKeys[] = ["cities"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const vals: LocalStorage = {
    options,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => resolve());
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];

  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options);
    });
  });
}
