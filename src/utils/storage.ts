type StorageKey = "auth";
type StorageType = "local" | "session";

export default {
  get(key: StorageKey) {
    const localValue = localStorage.getItem(key);
    if (localValue) {
      return localValue;
    }
    const sessionValue = sessionStorage.getItem(key);
    return sessionValue;
  },

  set(key: StorageKey, value: string, type: StorageType = "local") {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);

    if (type === "local") {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  },

  remove(key: StorageKey) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  },
};
