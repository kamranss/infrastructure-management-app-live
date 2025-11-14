import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const AssetSummaryCards = ({ detail }) => (
  <Grid container spacing={2} mb={2}>
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ backgroundColor: "#E3F2FD" }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Open Maintenance Plans
          </Typography>
          <Typography variant="h4">
            {
              (detail?.mpList || []).filter((mp) => mp.status !== "COMPLETED")
                .length
            }
          </Typography>
          {(detail?.mpList || [])
            .filter((mp) => mp.status !== "COMPLETED")
            .slice(0, 5)
            .map((mp, idx) => (
              <Typography variant="body2" key={idx}>
                • {mp.name} — {new Date(mp.dueDate).toLocaleDateString()}
              </Typography>
            ))}
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ backgroundColor: "#F1F8E9" }}>
        <CardContent>
          <Typography variant="h6" color="success.main">
            Equipment Condition
          </Typography>
          <Typography>
            <strong>Condition:</strong> {detail.condition || "Not specified"}
          </Typography>
          <Typography>
            <strong>Cycle:</strong> {detail.cycle || "Unknown"}
          </Typography>
          <Typography>
            <strong>Runtime:</strong>{" "}
            {detail.runtimeHours ? `${detail.runtimeHours} hours` : "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ backgroundColor: "#FFF3E0" }}>
        <CardContent>
          <Typography variant="h6" color="warning.main">
            Current Values
          </Typography>
          {["currentValue", "squenceValue", "resetValue"].map((key) => (
            <Typography key={key}>
              <strong>{key}:</strong> {detail[key] || "-"}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default AssetSummaryCards;
