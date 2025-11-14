// MpActionsCard.jsx
import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

const MpActionsCard = ({ onDelete, onEdit, onAddServices }) => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6" mb={1}>
      Actions
    </Typography>
    <Box display="flex" flexWrap="wrap" gap={1}>
      <Button variant="contained" color="error" fullWidth onClick={onDelete}>
        Delete
      </Button>
      <Button variant="contained" color="primary" fullWidth onClick={onEdit}>
        Update
      </Button>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={onAddServices}
      >
        Add Services
      </Button>
    </Box>
  </Paper>
);

export default MpActionsCard;
