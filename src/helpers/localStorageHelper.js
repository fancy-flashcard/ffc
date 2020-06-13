const LOCAL_STORAGE_APP_CONTEXT = "ffc_";

export default {
  get(key) {
    return localStorage.getItem(LOCAL_STORAGE_APP_CONTEXT + key);
  },

  set(key, value) {
    localStorage.setItem(LOCAL_STORAGE_APP_CONTEXT + key, value);
  },

  remove(key) {
    localStorage.removeItem(LOCAL_STORAGE_APP_CONTEXT + key);
  },

  clearAppData() {
    for (let i=0; i<localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(LOCAL_STORAGE_APP_CONTEXT)) {
        localStorage.removeItem(key);
      }
    }
  }
};
