import axios from "axios";
import { getStaticDataResponse } from "./staticDataService";

let initialized = false;

const buildStaticResponse = (config, data) => ({
  data,
  status: 200,
  statusText: "OK (static data)",
  headers: {
    "x-static-data": "true",
  },
  config,
});

const shouldForceFallback = (response) => {
  if (!response?.data) return true;
  const contentType = response.headers?.["content-type"]?.toLowerCase() || "";
  if (contentType.includes("text/html")) return true;
  if (typeof response.data === "string") {
    const trimmed = response.data.trim().toLowerCase();
    if (trimmed.startsWith("<!doctype") || trimmed.startsWith("<html")) {
      return true;
    }
  }
  return false;
};

const tryStaticFallback = (config) => {
  if (!config) return null;
  const fallback = getStaticDataResponse(config);
  return fallback !== null ? buildStaticResponse(config, fallback) : null;
};

export const setupAxiosFallback = () => {
  if (initialized) return;
  initialized = true;

  axios.interceptors.response.use(
    (response) => {
      if (shouldForceFallback(response)) {
        const fallback = tryStaticFallback(response.config);
        if (fallback) {
          return fallback;
        }
      }
      return response;
    },
    (error) => {
      const fallback = tryStaticFallback(error?.config);
      if (fallback) {
        return Promise.resolve(fallback);
      }
      return Promise.reject(error);
    }
  );
};

setupAxiosFallback();
