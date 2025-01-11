type Key = "unlockedCharacters" | "targetSpeed" | "topScore";

export const getSavedState = <T>(key: Key, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const saveState = <T>(key: Key, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
