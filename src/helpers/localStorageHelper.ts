const LOCAL_STORAGE_APP_CONTEXT = "ffc_";

export interface SyncItem {
  key: string;
  defaultValue: any;
}

interface Context {
  propertiesToSyncWithLocalStorage: SyncItem[];
  [x: string]: any;
}

function get(key: string): string {
  return localStorage.getItem(LOCAL_STORAGE_APP_CONTEXT + key) || "";
}

function set(key: string, value: string): void {
  localStorage.setItem(LOCAL_STORAGE_APP_CONTEXT + key, value);
}

function clearAppData(): void {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) || "";
    if (key.startsWith(LOCAL_STORAGE_APP_CONTEXT)) {
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
  context.showSnackbar("Removed All App Data From Local Storage.");
}
