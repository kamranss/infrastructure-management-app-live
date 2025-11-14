import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

const AssetStatusActions = ({ status, onToggle }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6">Status</Typography>
    <Typography
      sx={{
        color: "white",
        backgroundColor: status === "ACTIVE" ? "green" : "gray",
        p: 1,
        borderRadius: 1,
      }}
    >
      {status}
    </Typography>
    <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
      <Button variant="contained" onClick={() => onToggle("status")}>
        Change Status
      </Button>
      <Button variant="outlined" onClick={() => onToggle("part")}>
        Add Part
      </Button>
      <Button variant="outlined" onClick={() => onToggle("mp")}>
        Add MP
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => onToggle("delete")}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => onToggle("mpSettings")}
      >
        Set Reset
      </Button>
    </Box>
  </Paper>
);

export default AssetStatusActions; // ✅ Fix
