import { request, USE_MOCK, normalizeObject } from "../client";
import { buildLoginResponse, buildRegisterResponse } from "../../services/staticDataService";

const LOGIN_PATH = "/api/Account/Login";
const REGISTER_PATH = "/api/Account/Register";

export const login = async (payload) => {
  if (USE_MOCK)
    return normalizeObject(buildLoginResponse({ config: { data: payload } }));
  const res = await request(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    return normalizeObject(buildLoginResponse({ config: { data: payload } }));
  return normalizeObject(res.data);
};

export const register = async (payload) => {
  if (USE_MOCK)
    return normalizeObject(buildRegisterResponse({ config: { data: payload } }));
  const res = await request(REGISTER_PATH, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    return normalizeObject(buildRegisterResponse({ config: { data: payload } }));
  return normalizeObject(res.data);
};
