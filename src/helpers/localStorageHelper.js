const LOCAL_STORAGE_APP_CONTEXT = "ffc_";

export default {
  get(key) {
    return localStorage.getItem(LOCAL_STORAGE_APP_CONTEXT + key);
  },

  set(key, value) {
    localStorage.setItem(LOCAL_STORAGE_APP_CONTEXT + key, value);
  },
};
