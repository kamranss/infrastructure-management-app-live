// MpSummaryCards.jsx
import React from "react";
import { Grid, Typography } from "@mui/material";
import CommonCard from "../Common/CommonCard";

const MpSummaryCards = ({ services, equipments, countReached }) => (
  <Grid container spacing={2} mb={2}>
    <Grid item xs={12} sm={4}>
      <CommonCard title="Services in MP" color="#F1F8E9">
        <Typography variant="h4">{services.length}</Typography>
      </CommonCard>
    </Grid>
    <Grid item xs={12} sm={4}>
      <CommonCard title="Used by Equipments" color="#FFF3E0">
        <Typography variant="h4">{equipments.length}</Typography>
      </CommonCard>
    </Grid>
    <Grid item xs={12} sm={4}>
      <CommonCard title="Active MP Time Count" color="#FFEBEE">
        <Typography variant="h4">{countReached}</Typography>
      </CommonCard>
    </Grid>
  </Grid>
);

export default MpSummaryCards;
