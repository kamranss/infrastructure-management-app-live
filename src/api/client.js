const isProd = import.meta.env.MODE === "production";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const envMock = import.meta.env.VITE_USE_MOCK;
export const USE_MOCK =
  envMock != null ? envMock === "true" : (isProd && !API_BASE);

const DEFAULT_TIMEOUT = 12000;

export const buildApiUrl = (path) => {
  if (!path) return API_BASE;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
};

const withTimeout = (promise, timeout) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const request = async (path, options = {}) => {
  const url = buildApiUrl(path);
  const timeout = options.timeout || DEFAULT_TIMEOUT;
  try {
    const res = await withTimeout(
      fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: options.body,
      }),
      timeout
    );

    const data = await parseJsonSafe(res);
    if (!res.ok) {
      return { ok: false, data, error: res.statusText || "Request failed" };
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, data: null, error: error?.message || "Network error" };
  }
};

export const normalizePaged = (data) => ({
  items: data?.items && Array.isArray(data.items) ? data.items : [],
  totalCount: Number.isFinite(data?.totalCount) ? data.totalCount : 0,
  page: Number.isFinite(data?.currentPage) ? data.currentPage : 1,
  pageSize: Number.isFinite(data?.pageSize) ? data.pageSize : 10,
});

export const normalizeArray = (value) =>
  Array.isArray(value) ? value : value?.items && Array.isArray(value.items)
    ? value.items
    : [];

export const normalizeObject = (value) =>
  value && typeof value === "object" ? value : {};
