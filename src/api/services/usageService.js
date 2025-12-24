import { request, USE_MOCK, normalizePaged, normalizeArray } from "../client";
import { getUsageByDepartment } from "../../mock";

const USAGE_BY_DEPT_PATH =
  import.meta.env.VITE_API_USAGE_BY_DEPARTMENT || "/api/UsageHistory/ByDepartment";
const USAGE_ONGOING_PATH =
  import.meta.env.VITE_API_USAGE_ONGOING || "/api/UsageHistory/List/Ongoing";
const USAGE_EQUIPMENT_PATH =
  import.meta.env.VITE_API_USAGE_BY_EQUIPMENT || "/api/UsageHistory/equipment";

export const fetchUsageByDepartment = async ({
  departmentId,
  page = 1,
  pageSize = 10,
} = {}) => {
  if (USE_MOCK) return { data: normalizePaged(getUsageByDepartment({ departmentId, page, pageSize })) };

  const res = await request(
    `${USAGE_BY_DEPT_PATH}?departmentId=${departmentId}&page=${page}&pageSize=${pageSize}`
  );
  if (!res.ok) {
    return { data: normalizePaged(getUsageByDepartment({ departmentId, page, pageSize })) };
  }
  return { data: normalizePaged(res.data?.data || res.data) };
};

export const fetchUsageOngoing = async () => {
  if (USE_MOCK) return normalizeArray(getUsageByDepartment({}));
  const res = await request(USAGE_ONGOING_PATH);
  if (!res.ok) return normalizeArray(getUsageByDepartment({}));
  return normalizeArray(res.data);
};

export const fetchUsageByEquipment = async ({ equipmentId } = {}) => {
  if (USE_MOCK) return normalizeArray(getUsageByDepartment({}));
  const res = await request(`${USAGE_EQUIPMENT_PATH}/${equipmentId}`);
  if (!res.ok) return normalizeArray(getUsageByDepartment({}));
  return normalizeArray(res.data);
};
