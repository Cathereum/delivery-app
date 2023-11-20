export function getDataFromStorage<T>(key: string): T | undefined {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export function saveDataToStorage<T>(key: string, state: T) {
  localStorage.setItem(key, JSON.stringify(state));
}
