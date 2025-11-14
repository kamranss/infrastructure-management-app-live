// MpStatusCard.jsx
import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";

const MpStatusCard = ({ status, isActive, onSetStatus }) => {
  const mpStatusColor = isActive
    ? "green"
    : status === "INACTIVE"
    ? "gray"
    : "purple";

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography
        sx={{
          backgroundColor: mpStatusColor,
          color: "white",
          borderRadius: 1,
          p: 1,
          mt: 1,
          textAlign: "center",
        }}
      >
        {status || "-"} | {isActive ? "Active" : "Inactive"}
      </Typography>
      <Box mt={2} display="flex" gap={1} flexWrap="wrap">
        <Button
          variant="outlined"
          color="success"
          onClick={() => onSetStatus(true)}
        >
          Set Active
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => onSetStatus(false)}
        >
          Set Inactive
        </Button>
      </Box>
    </Paper>
  );
};

export default MpStatusCard;
