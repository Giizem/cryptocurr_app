const BASE_URL = "https://api.coincap.io/v2";

export async function Get<T>(path: string) {
  const url = BASE_URL + path;
  let payload: T | null = null;
  try {
    const response = await fetch(url);
    if (response.ok) {
      payload = await response.json();
    }
  } catch {
    // TODO: handle error
  }

  return payload;
}
