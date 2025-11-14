import React from "react";
import { Grid, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../Common/CommonTable";
import MpAssetColumns from "./MpAssetColumns";
import PaginationComponent2 from "../Common/PaginationComponent2"; // ✅ Import your custom pagination

const MpTables = ({
  services,
  equipments,
  servicePage,
  serviceTotal,
  equipmentPage,
  equipmentTotal,
  servicePageSize,
  equipmentPageSize,
  onServicePageChange,
  onEquipmentPageChange,
  onServicePageSizeChange,
  onEquipmentPageSizeChange,
  onRemoveService,
}) => {
  const serviceColumns = [
    { field: "name", headerName: "Name" },
    { field: "serviceDescription", headerName: "Description" },
    { field: "serviceType", headerName: "Type" },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <Tooltip title="Remove Service">
          <IconButton color="error" onClick={() => onRemoveService(row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const equipmentColumns = MpAssetColumns();

  return (
    <Grid container spacing={2}>
      {/* SERVICES TABLE */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Services in this MP
        </Typography>
        <CommonTable columns={serviceColumns} rows={services} />
        <PaginationComponent2
          size={servicePageSize}
          setSize={onServicePageSizeChange}
          page={servicePage}
          setPage={onServicePageChange}
          count={serviceTotal}
          recordSize={servicePageSize}
        />
      </Grid>

      {/* EQUIPMENTS TABLE */}
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Equipments using this MP
        </Typography>
        <CommonTable
          columns={equipmentColumns}
          rows={equipments}
          page={equipmentPage}
          pageSize={5}
          rowCount={equipmentTotal}
          onPageChange={onEquipmentPageChange}
        />
        <PaginationComponent2
          size={equipmentPageSize}
          setSize={onEquipmentPageSizeChange}
          page={equipmentPage}
          setPage={onEquipmentPageChange}
          count={equipmentTotal}
          recordSize={equipmentPageSize}
        />
      </Grid>
    </Grid>
  );
};

export default MpTables;
