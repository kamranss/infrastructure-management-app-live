// MpTablesSection.jsx
import React from "react";
import { Grid, Typography } from "@mui/material";
import CommonTable from "../Common/CommonTable";

const MpTablesSection = ({
  serviceColumns,
  services,
  equipmentColumns,
  equipments,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Services in this MP
      </Typography>
      <CommonTable columns={serviceColumns} rows={services} />
    </Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h6" gutterBottom>
        Equipments using this MP
      </Typography>
      <CommonTable columns={equipmentColumns} rows={equipments} />
    </Grid>
  </Grid>
);

export default MpTablesSection;
