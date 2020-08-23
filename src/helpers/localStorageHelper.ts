import { showSnackbar } from "./snackbarHelper";

const LOCAL_STORAGE_APP_CONTEXT = "ffc_";

export interface SyncItem {
  key: string;
  defaultValue: any;
}

interface Context {
  propertiesToSyncWithLocalStorage: SyncItem[];
  [x: string]: any;
}

export function get(key: string): string {
  return localStorage.getItem(LOCAL_STORAGE_APP_CONTEXT + key) || "";
}

export function set(key: string, value: string): void {
  localStorage.setItem(LOCAL_STORAGE_APP_CONTEXT + key, value);
}

export function remove(key: string): void {
  localStorage.removeItem(LOCAL_STORAGE_APP_CONTEXT + key);
}

function clearAppData(): void {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith(LOCAL_STORAGE_APP_CONTEXT)) {
      localStorage.removeItem(key);
    }
  }
}

export function readFromLocalStorage(context: Context) {
  context.propertiesToSyncWithLocalStorage.forEach((item) => {
    try {
      context[item.key] = JSON.parse(get(item.key));
      if (context[item.key] === null) {
        throw new Error("No item found.");
      }
    } catch (e) {
      context[item.key] = item.defaultValue;
    }
  });
}
export function saveToLocalStorage(context: Context, item: SyncItem) {
  set(item.key, JSON.stringify(context[item.key]));
}
export function clearLocalStorage(context: Context) {
  clearAppData();
  context.propertiesToSyncWithLocalStorage.forEach((item) => {
    context[item.key] = item.defaultValue;
  });
  showSnackbar(context, "Removed All App Data From Local Storage.");
}
