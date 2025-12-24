import { request, USE_MOCK, normalizePaged } from "../client";
import { getDepartmentsPaged } from "../../mock";

const DEPARTMENT_PATH = import.meta.env.VITE_DEPARTMENT_PATH || "/api/Department/All";

export const fetchDepartments = async ({ page = 1, pageSize = 10 } = {}) => {
  if (USE_MOCK) return normalizePaged(getDepartmentsPaged({ page, pageSize }));

  const res = await request(`${DEPARTMENT_PATH}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) return normalizePaged(getDepartmentsPaged({ page, pageSize }));

  const data = res.data || {};
  return normalizePaged({
    items: data.items || [],
    totalCount: data.totalCount,
    page: data.currentPage,
    pageSize: data.pageSize,
  });
};
