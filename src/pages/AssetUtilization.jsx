import React, { useEffect, useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import axios from "axios";
import CommonCard from "../Components/Common/CommonCard";
import CommonTable from "../Components/Common/CommonTable";
import CommonFilters from "../Components/Common/CommonFilter";
import PaginationComponent2 from "../Components/Common/PaginationComponent2";
import SideBarAssets from "../Components/SideBars/SideBarAssets";
import CreateUsageDrawer from "../Components/UsageHistoryComponents/CreateUsageDrawer";
import EndUsageDrawer from "../Components/UsageHistoryComponents/EndUsageDrawer";

const AssetUtilization = () => {
  const [filters, setFilters] = useState({
    operatorName: "",
    operationName: "",
    status: "",
    equipmentId: "",
    startDate: "null",
    endDate: "null",
  });
  const [tableData, setTableData] = useState({ items: [], totalCount: 0 });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({ total: 0, ongoing: 0, idle: 0 });
  const [sidebarDepartments, setSidebarDepartments] = useState([]);
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);
  const [openEndDrawer, setOpenEndDrawer] = useState(false);

  const fetchSidebarDepartments = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_DEPARTMENT_PATH
      }?page=1&pageSize=20`
    );
    setSidebarDepartments(res.data.items);
  };

  const fetchUsageHistory = async () => {
    const departmentId = sidebarDepartments[activeTab]?.id;
    if (!departmentId) return;

    const url = `${import.meta.env.VITE_API_BASE_URL}${
      import.meta.env.VITE_API_USAGE_BY_DEPARTMENT
    }?departmentId=${departmentId}&page=${page}&pageSize=${size}`;

    const res = await axios.get(url);
    const usageData = res.data?.data;

    if (!usageData || !Array.isArray(usageData.items)) {
      setTableData({ items: [], totalCount: 0 });
      return;
    }

    let rows = usageData.items;
    rows = rows.filter((row) => {
      const matchesOperator = (row.operatorName || "")
        .toLowerCase()
        .includes((filters.operatorName || "").toLowerCase());

      const matchesOperation = (row.operationName || "")
        .toLowerCase()
        .includes((filters.operationName || "").toLowerCase());

      const matchesStatus =
        !filters.status ||
        (row.status || "").toUpperCase() === filters.status.toUpperCase();

      return matchesOperator && matchesOperation && matchesStatus;
    });

    setTableData({
      items: rows,
      totalCount: usageData.totalCount || rows.length,
    });
  };

  const fetchStats = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${
        import.meta.env.VITE_API_EQUIPMENT_STATS
      }`
    );
    setStats(res.data);
  };

  useEffect(() => {
    fetchSidebarDepartments();
    fetchStats();
  }, []);

  useEffect(() => {
    if (sidebarDepartments.length > 0) fetchUsageHistory();
  }, [sidebarDepartments, activeTab, page, size, filters]);

  const filterConfig = [
    { name: "operatorName", label: "Operator", type: "text" },
    {
      name: "operationName",
      label: "Operation",
      type: "autocomplete",
      endpoint: "/api/Constants/OperationType",
    },
    {
      name: "equipmentId",
      label: "Equipment",
      type: "autocomplete",
      endpoint: "/api/Equipment/DropDown",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["ONGOING", "FINISHED", "CANCELED"],
    },
    {
      name: "startDate",
      label: " ", // to remove MUI label
      type: "date",
      slotProps: {
        textField: {
          placeholder: "Start Date",
          value: filters.startDate || "", // ensure no null
          onChange: (e) =>
            setFilters((prev) => ({ ...prev, startDate: e.target.value })),
        },
      },
    },
    {
      name: "endDate",
      label: " ",
      type: "date",
      slotProps: {
        textField: {
          placeholder: "End Date",
          value: filters.endDate || "",
          onChange: (e) =>
            setFilters((prev) => ({ ...prev, endDate: e.target.value })),
        },
      },
    },
  ];
  const columns = [
    { field: "equipmentName", headerName: "Equipment" },
    { field: "operatorName", headerName: "Operator" },
    { field: "operationName", headerName: "Operation" },
    { field: "startDate", headerName: "Start Date" },
    { field: "endDate", headerName: "End Date" },
    // { field: "totalTime", headerName: "Used (hrs)" },
    {
      field: "totalTime",
      headerName: "Used (hrs)",
      renderCell: ({ row }) => Number(row.totalTime).toFixed(1),
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row }) => {
        const statusColors = {
          ONGOING: "#ffcc80",
          FINISHED: "#a5d6a7",
          CANCELED: "#eeeeee",
        };
        return (
          <span
            style={{
              backgroundColor: statusColors[row.status] || "#e0e0e0",
              padding: "4px 8px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "0.85rem",
              display: "inline-block",
            }}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <Box className="department-main">
      <Box className="dep-mid">
        <SideBarAssets activeTab={activeTab} onTabChange={setActiveTab} />
        <Box className="page-content">
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => setOpenCreateDrawer(true)}
              >
                Create Usage
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => setOpenEndDrawer(true)}
              >
                End Usage
              </Button>

              <CommonFilters
                filters={filters}
                onChange={(name, value) =>
                  setFilters({ ...filters, [name]: value })
                }
                filtersConfig={filterConfig}
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={4}>
                  <CommonCard title="Ongoing Usage" color="#fff3e0">
                    {stats.ongoing}
                  </CommonCard>
                </Grid>
                <Grid item xs={4}>
                  <CommonCard title="Idle Equipment" color="#ede7f6">
                    {stats.idle}
                  </CommonCard>
                </Grid>
                <Grid item xs={4}>
                  <CommonCard title="Total Equipment" color="#e3f2fd">
                    {stats.total}
                  </CommonCard>
                </Grid>
              </Grid>

              {/* <CommonTable
                columns={columns}
                rows={tableData.items}
                onView={(row) => console.log("Clicked row:", row)}
              /> */}
              <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
                <CommonTable
                  columns={columns}
                  rows={tableData.items}
                  onView={(row) => console.log("Clicked row:", row)}
                />
              </Box>

              <PaginationComponent2
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                count={tableData.totalCount}
                recordSize={size}
              />
              <CreateUsageDrawer
                open={openCreateDrawer}
                onClose={() => setOpenCreateDrawer(false)}
                onSuccess={() => {
                  setOpenCreateDrawer(false);
                  fetchUsageHistory();
                  fetchStats();
                }}
              />
              <EndUsageDrawer
                open={openEndDrawer}
                onClose={() => setOpenEndDrawer(false)}
                onSuccess={() => {
                  setOpenEndDrawer(false);
                  fetchUsageHistory();
                  fetchStats();
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AssetUtilization;
