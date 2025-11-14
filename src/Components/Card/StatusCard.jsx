// src/Components/Cards/StatusCard.jsx

import React from "react";
import { Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

const StatusCard = ({ title, value, color, surface }) => {
  const accent = color || "#0f6466";
  const surfaceColor = surface || "#e2f2ef";
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        textAlign: "center",
        borderRadius: 3,
        backgroundColor: surfaceColor,
        border: `1px solid ${alpha(accent, 0.2)}`,
        boxShadow: "var(--smaint-shadow)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500, color: "#5f6c7b" }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: accent }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default StatusCard;
