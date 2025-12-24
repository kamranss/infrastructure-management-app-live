import { request, USE_MOCK, normalizePaged, normalizeObject, normalizeArray } from "../client";
import {
  getMaintenancePlansPaged,
  getMaintenancePlanDetail,
  getMaintenancePlanServices,
  getMaintenancePlanEquipments,
  getServiceStatuses,
} from "../../mock";

const MP_LIST_PATH =
  import.meta.env.VITE_API_MP_LIST_ENDPOINT || "/api/MaintenancePlan/List/Paginated";
const MP_ITEM_PATH = import.meta.env.VITE_API_MP_ITEM || "/api/MaintenancePlan";
const MP_SERVICES_PATH =
  import.meta.env.VITE_API_MP_SERVICES_BY_MP || "/api/MaintenancePlan/Services";
const MP_EQUIPMENTS_PATH =
  import.meta.env.VITE_API_MP_EQUIPMENTS_BY_MP || "/api/MaintenancePlan/Assets";
const MP_SERVICE_STATUS_PATH =
  import.meta.env.VITE_API_SERVICE_STATUSES || "/api/Service/ServiceStatus";

export const fetchMaintenancePlans = async ({ page = 1, pageSize = 10 } = {}) => {
  if (USE_MOCK) return normalizePaged(getMaintenancePlansPaged({ page, pageSize }));

  const res = await request(`${MP_LIST_PATH}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) return normalizePaged(getMaintenancePlansPaged({ page, pageSize }));
  return normalizePaged(res.data);
};

export const fetchMaintenancePlanDetail = async (id) => {
  if (USE_MOCK) return normalizeObject(getMaintenancePlanDetail(id));
  const res = await request(`${MP_ITEM_PATH}/${id}`);
  if (!res.ok) return normalizeObject(getMaintenancePlanDetail(id));
  return normalizeObject(res.data);
};

export const fetchMaintenancePlanServices = async ({ id, page = 1, pageSize = 5 }) => {
  if (USE_MOCK) return normalizePaged(getMaintenancePlanServices({ id, page, pageSize }));
  const res = await request(`${MP_SERVICES_PATH}/${id}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) return normalizePaged(getMaintenancePlanServices({ id, page, pageSize }));
  return normalizePaged(res.data);
};

export const fetchMaintenancePlanEquipments = async ({
  id,
  page = 1,
  pageSize = 5,
} = {}) => {
  if (USE_MOCK) return normalizePaged(getMaintenancePlanEquipments({ id, page, pageSize }));
  const res = await request(`${MP_EQUIPMENTS_PATH}/${id}?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) return normalizePaged(getMaintenancePlanEquipments({ id, page, pageSize }));
  return normalizePaged(res.data);
};

export const fetchServiceStatuses = async ({ mpId, equipmentId } = {}) => {
  if (USE_MOCK) return normalizeArray(getServiceStatuses({ mpId, equipmentId }));
  const res = await request(
    `${MP_SERVICE_STATUS_PATH}?mpId=${mpId}&equipmentId=${equipmentId}`
  );
  if (!res.ok) return normalizeArray(getServiceStatuses({ mpId, equipmentId }));
  return normalizeArray(res.data);
};
