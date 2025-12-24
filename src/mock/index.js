import equipmentData from "../staticData/equipment.json";
import departmentData from "../staticData/departments.json";
import maintenancePlanData from "../staticData/maintenancePlans.json";
import usageHistoryData from "../staticData/usageHistory.json";
import partsData from "../staticData/parts.json";

export const mockPaged = (items, page = 1, pageSize = 10) => {
  const safePage = page < 1 ? 1 : page;
  const safeSize = pageSize < 1 ? 10 : pageSize;
  const start = (safePage - 1) * safeSize;
  const sliced = items.slice(start, start + safeSize);
  const totalCount = items.length;
  return {
    items: sliced,
    totalCount,
    page: safePage,
    pageSize: safeSize,
  };
};

export const getDepartmentsPaged = ({ page = 1, pageSize = 10 } = {}) =>
  mockPaged(departmentData.items || [], page, pageSize);

export const getEquipmentByDepartment = ({
  departmentId,
  page = 1,
  pageSize = 10,
} = {}) => {
  const filtered = (equipmentData.items || []).filter(
    (item) => !departmentId || item.departmentId === Number(departmentId)
  );
  return mockPaged(filtered, page, pageSize);
};

export const getEquipmentDetail = (id) =>
  (equipmentData.items || []).find((item) => item.id === Number(id)) || null;

export const getEquipmentDropdown = ({ query = "" } = {}) => {
  const q = query.toLowerCase();
  return (equipmentData.items || [])
    .filter((eq) => !q || eq.name.toLowerCase().includes(q))
    .slice(0, 30)
    .map((eq) => ({ id: eq.id, name: eq.name, type: eq.type }));
};

export const getUsageByDepartment = ({
  departmentId,
  page = 1,
  pageSize = 10,
} = {}) => {
  const eqIds = (equipmentData.items || [])
    .filter((eq) => !departmentId || eq.departmentId === Number(departmentId))
    .map((eq) => eq.id);
  const rows = (usageHistoryData || []).filter((row) =>
    eqIds.includes(row.equipmentId)
  );
  return mockPaged(rows, page, pageSize);
};

export const getPartsPaged = ({ page = 1, pageSize = 10 } = {}) =>
  mockPaged(partsData.items || [], page, pageSize);

export const getPartDropdown = ({ query = "" } = {}) => {
  const q = query.toLowerCase();
  return (partsData.items || [])
    .filter((item) => !q || item.name.toLowerCase().includes(q))
    .slice(0, 30)
    .map((item) => ({ id: item.id, name: item.name }));
};

export const getMaintenancePlansPaged = ({
  page = 1,
  pageSize = 10,
} = {}) => mockPaged(maintenancePlanData.plans || [], page, pageSize);

export const getMaintenancePlanDetail = (id) =>
  (maintenancePlanData.plans || []).find(
    (plan) => plan.id === Number(id)
  ) || null;

export const getMaintenancePlanServices = ({
  id,
  page = 1,
  pageSize = 5,
} = {}) => {
  const plan = getMaintenancePlanDetail(id);
  return mockPaged(plan?.services || [], page, pageSize);
};

export const getMaintenancePlanEquipments = ({
  id,
  page = 1,
  pageSize = 5,
} = {}) => {
  const plan = getMaintenancePlanDetail(id);
  return mockPaged(plan?.equipments || [], page, pageSize);
};

export const getServiceStatuses = ({ mpId, equipmentId } = {}) => {
  const plan = getMaintenancePlanDetail(mpId);
  const entry = (plan?.serviceStatuses || []).find(
    (row) => row.equipmentId === Number(equipmentId)
  );
  return entry?.statuses || [];
};
