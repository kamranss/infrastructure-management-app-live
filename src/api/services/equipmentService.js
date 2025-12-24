import { request, USE_MOCK, normalizePaged, normalizeObject } from "../client";
import {
  getEquipmentByDepartment,
  getEquipmentDetail,
  getEquipmentDropdown,
} from "../../mock";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const EQUIPMENT_PATH = import.meta.env.VITE_API_EQUIPMENT_PATH || "/api/Equipment";

const buildPath = (suffix = "") => `${EQUIPMENT_PATH}${suffix}`;

export const fetchEquipmentByDepartment = async ({
  departmentId,
  page = 1,
  pageSize = 10,
} = {}) => {
  if (USE_MOCK) return normalizePaged(getEquipmentByDepartment({ departmentId, page, pageSize }));

  const res = await request(
    `${buildPath("/FindEquipmentsByDepartmentId")}?id=${departmentId ?? ""}&page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    return normalizePaged(
      getEquipmentByDepartment({ departmentId, page, pageSize })
    );
  }

  const data = res.data || {};
  return normalizePaged({
    items: data.items || [],
    totalCount: data.totalCount,
    page: data.currentPage,
    pageSize: data.pageSize,
  });
};

export const fetchEquipmentDetail = async (id) => {
  if (USE_MOCK) return normalizeObject(getEquipmentDetail(id));
  const res = await request(`${buildPath()}?id=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) return normalizeObject(getEquipmentDetail(id));
  return normalizeObject(res.data);
};

export const fetchEquipmentDropdown = async ({ query = "" } = {}) => {
  if (USE_MOCK) return getEquipmentDropdown({ query });
  const res = await request(`${buildPath("/DropDown")}?name=${encodeURIComponent(query)}`);
  if (!res.ok) return getEquipmentDropdown({ query });
  const data = res.data;
  return Array.isArray(data) ? data : [];
};
