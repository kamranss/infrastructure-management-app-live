import { request, USE_MOCK, normalizePaged } from "../client";
import { getPartsPaged, getPartDropdown } from "../../mock";

const PART_LIST_PATH =
  import.meta.env.VITE_API_ALL_PART_LIST_PAGE ||
  import.meta.env.VITE_API_ALL_PART_PAGE ||
  "/api/Part/Paged";
const PART_DROPDOWN_PATH =
  import.meta.env.VITE_API_PART_DROP_DOWN_URL || "/api/Part/DropDown";

export const fetchPartsPaged = async ({ page = 1, pageSize = 10 } = {}) => {
  if (USE_MOCK) return normalizePaged(getPartsPaged({ page, pageSize }));

  const res = await request(`${PART_LIST_PATH}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) return normalizePaged(getPartsPaged({ page, pageSize }));

  return normalizePaged(res.data);
};

export const fetchPartDropdown = async ({ query = "" } = {}) => {
  if (USE_MOCK) return getPartDropdown({ query });
  const res = await request(
    `${PART_DROPDOWN_PATH}?name=${encodeURIComponent(query)}`
  );
  if (!res.ok) return getPartDropdown({ query });
  const data = res.data;
  return Array.isArray(data) ? data : [];
};
