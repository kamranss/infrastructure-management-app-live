import equipmentData from "../staticData/equipment.json";
import departmentData from "../staticData/departments.json";
import maintenancePlanData from "../staticData/maintenancePlans.json";
import partsData from "../staticData/parts.json";
import usageHistoryData from "../staticData/usageHistory.json";
import maintenanceSettingsData from "../staticData/maintenanceSettings.json";
import dropdowns from "../staticData/dropdowns.json";

const chatSampleReplies = [
  "Here’s a quick summary pulled from the offline mock data.",
  "I’m responding from the static dataset while the API is unavailable.",
  "Offline mode is active, so this is a placeholder answer.",
];

const equipmentById = new Map(equipmentData.items.map((item) => [item.id, item]));
const maintenancePlanById = new Map(
  maintenancePlanData.plans.map((plan) => [plan.id, plan])
);
const serviceLibrary = maintenancePlanData.serviceLibrary || [];

const operationTypes = [
  "CHASSIS_FORMING",
  "LINE_FEEDING",
  "WELD_REPAIR",
  "PAINT_TOUCHUP",
  "QUALITY_VERIFY",
  "LOAD_TEST",
  "CLEANING_CYCLE",
];

const buildUrl = (config) => {
  try {
    const base =
      config?.baseURL ||
      (typeof window !== "undefined" ? window.location.origin : "http://localhost");
    return new URL(config.url, base);
  } catch {
    return null;
  }
};

const buildContext = (config) => {
  const url = buildUrl(config);
  const searchParams = url?.searchParams || new URLSearchParams();
  return {
    config,
    url,
    path: url?.pathname?.toLowerCase() || (config?.url || "").toLowerCase(),
    rawPath: url?.pathname || config?.url || "",
    searchParams,
    params: config?.params || {},
    method: (config?.method || "get").toLowerCase(),
  };
};

const toNumber = (value, fallback) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const getParam = (ctx, key, fallback = "") =>
  ctx.params?.[key] ?? ctx.searchParams.get(key) ?? fallback;

const paginate = (items, page = 1, pageSize = 10) => {
  const safePage = page < 1 ? 1 : page;
  const safeSize = pageSize < 1 ? 10 : pageSize;
  const start = (safePage - 1) * safeSize;
  const sliced = items.slice(start, start + safeSize);
  const totalCount = items.length;
  return {
    items: sliced,
    totalCount,
    pageCount: Math.ceil(totalCount / safeSize) || 1,
    currentPage: safePage,
    pageSize: safeSize,
  };
};

const getDepartments = (ctx) => {
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", 10), 10);
  return paginate(departmentData.items, page, size);
};

const getEquipmentByDepartment = (ctx) => {
  const deptId = toNumber(getParam(ctx, "id", getParam(ctx, "departmentId", "")), null);
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", 10), 10);
  const filtered = deptId
    ? equipmentData.items.filter((item) => item.departmentId === deptId)
    : equipmentData.items;
  return paginate(filtered, page, size);
};

const getEquipmentDropdown = (ctx) => {
  const query = getParam(ctx, "name", "").toLowerCase();
  return equipmentData.items
    .filter((eq) => !query || eq.name.toLowerCase().includes(query))
    .slice(0, 20)
    .map((eq) => ({
      id: eq.id,
      name: eq.name,
      type: eq.type,
    }));
};

const getEquipmentDetail = (ctx) => {
  const id = toNumber(getParam(ctx, "id", ""), null);
  if (!id) return null;
  return equipmentById.get(id) || null;
};

const getUsageHistory = (ctx) => {
  const equipmentId = toNumber(
    ctx.rawPath?.split("/").filter(Boolean).slice(-1)[0],
    getParam(ctx, "equipmentId", null)
  );
  const filtered = usageHistoryData.filter(
    (row) => !equipmentId || row.equipmentId === equipmentId
  );
  return filtered;
};

const getUsageByDepartment = (ctx) => {
  const deptId = toNumber(getParam(ctx, "departmentId", ""), null);
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", 10), 10);
  const eqIds = equipmentData.items
    .filter((eq) => !deptId || eq.departmentId === deptId)
    .map((eq) => eq.id);
  const rows = usageHistoryData.filter((row) => eqIds.includes(row.equipmentId));
  return { data: paginate(rows, page, size) };
};

const getUsageStats = () => {
  const total = usageHistoryData.length;
  const ongoing = usageHistoryData.filter((row) => row.status === "ONGOING").length;
  return { total, ongoing, idle: Math.max(total - ongoing, 0) };
};

const getOngoingUsages = () =>
  usageHistoryData
    .filter((row) => row.status === "ONGOING")
    .map((row) => ({
      id: row.id,
      equipmentName: row.equipmentName,
      operatorName: row.operatorName,
      operationName: row.operationName,
    }));

const getMaintenancePlanList = (ctx) => {
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", 10), 10);
  const rows = maintenancePlanData.plans.map((plan) => ({
    id: plan.id,
    code: plan.code,
    name: plan.name,
    description: plan.description,
    metricType: plan.metricType,
    targetValue: plan.targetValue,
    isActive: plan.isActive,
    status: plan.status,
    createdDate: plan.createdDate,
    updatedDate: plan.updatedDate,
  }));
  return paginate(rows, page, size);
};

const getMaintenancePlanDetail = (ctx) => {
  const idMatch = ctx.rawPath?.match(/(\\d+)/g);
  const id = toNumber(idMatch?.slice(-1)[0], null);
  if (!id) return null;
  return maintenancePlanById.get(id) || null;
};

const getMaintenancePlanServices = (ctx) => {
  const id = toNumber(ctx.rawPath?.match(/(\\d+)/g)?.slice(-1)[0], null);
  const plan = id ? maintenancePlanById.get(id) : null;
  if (!plan) return { items: [], totalCount: 0 };
  const page = toNumber(getParam(ctx, "page", getParam(ctx, "pageNumber", 1)), 1);
  const size = toNumber(getParam(ctx, "pageSize", getParam(ctx, "take", 5)), 5);
  return paginate(plan.services || [], page, size);
};

const getMaintenancePlanEquipments = (ctx) => {
  const id = toNumber(ctx.rawPath?.match(/(\\d+)/g)?.slice(-1)[0], null);
  const plan = id ? maintenancePlanById.get(id) : null;
  if (!plan) return { items: [], totalCount: 0 };
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", 5), 5);
  return paginate(plan.equipments || [], page, size);
};

const getServiceStatuses = (ctx) => {
  const mpId = toNumber(getParam(ctx, "mpId", ""), null);
  const equipmentId = toNumber(getParam(ctx, "equipmentId", ""), null);
  if (!mpId) return [];
  const plan = maintenancePlanById.get(mpId);
  if (!plan) return [];
  const entry = (plan.serviceStatuses || []).find(
    (row) => row.equipmentId === equipmentId
  );
  return entry?.statuses || [];
};

const getMaintenancePlanDropdown = (ctx) => {
  const query = getParam(ctx, "name", "").toLowerCase();
  return maintenancePlanData.plans
    .filter((plan) => !query || plan.name.toLowerCase().includes(query))
    .slice(0, 20)
    .map((plan) => ({
      id: plan.id,
      name: plan.name,
      code: plan.code,
    }));
};

const getParts = (ctx) => {
  const code = getParam(ctx, "code", "").toLowerCase();
  const name = getParam(ctx, "name", "").toLowerCase();
  const reachedLimit =
    getParam(ctx, "reachedLimit", ctx.params?.reachedLimit)?.toString() === "true";
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", getParam(ctx, "take", 10)), 10);

  let rows = partsData.items;
  if (code) rows = rows.filter((item) => item.code.toLowerCase().includes(code));
  if (name) rows = rows.filter((item) => item.name.toLowerCase().includes(name));
  if (reachedLimit)
    rows = rows.filter(
      (item) => typeof item.reorderLimit === "number" && item.quantity <= item.reorderLimit
    );

  return paginate(rows, page, size);
};

const getPartDropdown = (ctx) => {
  const query = getParam(ctx, "name", "").toLowerCase();
  return partsData.items
    .filter((item) => !query || item.name.toLowerCase().includes(query))
    .slice(0, 25)
    .map((item) => ({ id: item.id, name: item.name }));
};

const getServiceList = (ctx) => {
  const page = toNumber(getParam(ctx, "page", 1), 1);
  const size = toNumber(getParam(ctx, "pageSize", getParam(ctx, "take", 10)), 10);
  const query = getParam(ctx, "name", "").toLowerCase();
  const filtered = serviceLibrary.filter(
    (row) =>
      !query ||
      row.name.toLowerCase().includes(query) ||
      row.planName.toLowerCase().includes(query)
  );
  return paginate(filtered, page, size);
};

const getServiceDropdown = (ctx) => {
  const query = getParam(ctx, "name", "").toLowerCase();
  return serviceLibrary
    .filter((row) => !query || row.name.toLowerCase().includes(query))
    .slice(0, 25);
};

const getDropdownData = (key) => dropdowns[key] || [];

const getOperationTypeDropdown = (ctx) => {
  const query = getParam(ctx, "name", "").toLowerCase();
  return operationTypes
    .filter((item) => !query || item.toLowerCase().includes(query))
    .map((item) => item);
};

const parseBody = (config) => {
  if (!config || config.data == null) return {};
  const { data } = config;
  if (
    typeof FormData !== "undefined" &&
    data instanceof FormData &&
    typeof data.entries === "function"
  ) {
    const obj = {};
    for (const [key, value] of data.entries()) {
      obj[key] = value;
    }
    return obj;
  }
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  if (typeof data === "object") {
    return data;
  }
  return {};
};

export const buildLoginResponse = (ctx) => {
  const body = parseBody(ctx.config);
  const userName = body.UserNameOrEmail || body.Email || "offline.user";
  return {
    token: "static-demo-token",
    user: {
      id: 999,
      userName,
      email: userName.includes("@") ? userName : `${userName}@offline.local`,
      displayName: "Offline Maintainer",
      roles: ["Admin"],
    },
    issuedAt: new Date().toISOString(),
  };
};

export const buildRegisterResponse = (ctx) => {
  const body = parseBody(ctx.config);
  return {
    success: true,
    userId: body?.Email || `offline-${Date.now()}`,
    message: "Static registration completed.",
  };
};

const buildChatMockResponse = (ctx) => {
  const body = parseBody(ctx.config);
  const userMessage =
    body?.messages?.find?.((msg) => msg?.role === "user")?.content ||
    "Hello from offline mode";
  const reply =
    chatSampleReplies[Math.floor(Math.random() * chatSampleReplies.length)] ||
    chatSampleReplies[0];
  return {
    id: `static-chat-${Date.now()}`,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: `${reply}\n\n(You asked: "${userMessage}")`,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: userMessage.length,
      completion_tokens: reply.length,
      total_tokens: userMessage.length + reply.length,
    },
  };
};

const emptySuccess = () => ({ success: true, source: "static" });

export const getStaticDataResponse = (config) => {
  if (!config?.url) return null;
  const ctx = buildContext(config);
  const path = ctx.path;

  if (ctx.method === "get") {
    if (path.includes("/api/department/all")) {
      return getDepartments(ctx);
    }
    if (path.includes("/api/department/drop")) {
      return getDropdownData("Department");
    }
    if (path.includes("/api/equipment/find")) {
      return getEquipmentByDepartment(ctx);
    }
    if (path.includes("/api/equipment/drop")) {
      return getEquipmentDropdown(ctx);
    }
    if (path.endsWith("/api/equipment")) {
      const detail = getEquipmentDetail(ctx);
      if (detail) return detail;
    }
    if (path.includes("/api/usagehistory/equipment")) {
      return getUsageHistory(ctx);
    }
    if (path.includes("usage") && path.includes("department")) {
      return getUsageByDepartment(ctx);
    }
    if (path.includes("equipment") && path.includes("stats")) {
      return getUsageStats();
    }
    if (path.includes("/api/usagehistory/ongoing")) {
      return getOngoingUsages();
    }
    if (path.includes("maintenanceplan/dropdown")) {
      return getMaintenancePlanDropdown(ctx);
    }
    if (path.includes("maintenanceplan") && path.includes("services")) {
      return getMaintenancePlanServices(ctx);
    }
    if (path.includes("maintenanceplan") && path.includes("equip")) {
      return getMaintenancePlanEquipments(ctx);
    }
    if (path.includes("maintenanceplan") && /\\d+/.test(ctx.rawPath)) {
      const detail = getMaintenancePlanDetail(ctx);
      if (detail) return detail;
    }
    if (path.includes("maintenanceplan") && path.includes("metric")) {
      return maintenancePlanData.metricTypes || ["HOURS", "DAYS"];
    }
    if (
      path.includes("maintenanceplan") &&
      (ctx.searchParams.has("page") || ctx.params?.page)
    ) {
      return getMaintenancePlanList(ctx);
    }
    if (path.includes("service") && path.includes("status")) {
      return getServiceStatuses(ctx);
    }
    if (path.includes("/api/part/drop")) {
      return getPartDropdown(ctx);
    }
    if (path.includes("/api/part")) {
      return getParts(ctx);
    }
    if (path.includes("/api/service") && path.includes("dropdown")) {
      return getServiceDropdown(ctx);
    }
    if (path.includes("/api/service")) {
      return getServiceList(ctx);
    }
    if (path.includes("model/drop")) {
      return getDropdownData("Model");
    }
    if (path.includes("equipmenttype/drop")) {
      return getDropdownData("EquipmentType");
    }
    if (path.includes("manufacture/drop")) {
      return getDropdownData("Manufacture");
    }
    if (path.includes("operationsite/drop")) {
      return getDropdownData("OperationSite");
    }
    if (path.includes("/api/constants/location")) {
      return getDropdownData("UsageLocation");
    }
    if (path.includes("operationtype")) {
      return getOperationTypeDropdown(ctx);
    }
    if (path.includes("equipmentstatus")) {
      return ["ACTIVE", "INACTIVE", "IN_USE", "REPAIR", "CONCERVATED"];
    }
  }

  if (["post", "put", "patch", "delete"].includes(ctx.method)) {
    if (ctx.method === "post" && path.includes("/api/account/login")) {
      return buildLoginResponse(ctx);
    }
    if (ctx.method === "post" && path.includes("/api/account/register")) {
      return buildRegisterResponse(ctx);
    }
    if (ctx.method === "post" && path.includes("/chat/completions")) {
      return buildChatMockResponse(ctx);
    }
    if (path.includes("usage_create") || path.includes("usagehistory")) {
      return emptySuccess();
    }
    if (path.includes("usage_end")) {
      return emptySuccess();
    }
    if (path.includes("assign-mp") || path.includes("addparttoasset")) {
      return emptySuccess();
    }
    if (
      path.includes("setmpsetting") ||
      path.includes("maintenance_setting") ||
      path.includes("statuschange") ||
      path.includes("/api/maintenancesetting/assign")
    ) {
      return emptySuccess();
    }
    if (
      (path.includes("asset") && path.includes("update")) ||
      (path.includes("equipment") && path.includes("status")) ||
      (path.includes("equipment") && path.includes("update"))
    ) {
      return emptySuccess();
    }
    if (
      path.includes("maintenanceplan") &&
      (path.includes("delete") ||
        path.includes("assign") ||
        path.includes("removeservice") ||
        path.includes("isactive") ||
        ctx.method === "delete" ||
        ctx.method === "put" ||
        ctx.method === "patch")
    ) {
      return emptySuccess();
    }
    if (path.includes("completmp") || (path.includes("service") && path.includes("complete"))) {
      return emptySuccess();
    }
    if (path.includes("/api/equipment/newequipment")) {
      return emptySuccess();
    }
  }

  return null;
};
