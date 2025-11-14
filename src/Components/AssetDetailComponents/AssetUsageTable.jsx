import React from "react";
import { Box, Typography } from "@mui/material";
import CommonTable from "../Common/CommonTable";
import dayjs from "dayjs";

const AssetUsageTable = ({ rows = [] }) => {
  const statusColors = {
    ONGOING: "#ffcc80",
    FINISHED: "#a5d6a7",
    CANCELED: "#ef9a9a",
  };

  const columns = [
    { field: "equipmentName", headerName: "Equipment" },
    { field: "operatorName", headerName: "Operator" },
    { field: "operationName", headerName: "Operation" },
    {
      field: "startDate",
      headerName: "Start Date",
      renderCell: ({ row }) => dayjs(row.startDate).format("YYYY-MM-DD HH:mm"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      renderCell: ({ row }) => dayjs(row.endDate).format("YYYY-MM-DD HH:mm"),
    },
    {
      field: "totalTime",
      headerName: "Used (hrs)",
      renderCell: ({ row }) => Number(row.totalTime / 60).toFixed(1), // Assuming minutes
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row }) => (
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
      ),
    },
  ];

  return (
    <Box sx={{}}>
      <Typography variant="h6" gutterBottom>
        Usage History
      </Typography>
      <Box sx={{ minWidth: "100%", overflowX: "auto" }}>
        <CommonTable columns={columns} rows={rows} />
      </Box>
    </Box>
  );
};

export default AssetUsageTable;
