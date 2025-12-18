import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { brandPalette } from "../../constants/uiPalette";

const getStatusColor = (status = "") => {
  if (status.toUpperCase() === "ACTIVE") return "success";
  if (status.toUpperCase() === "INACTIVE") return "default";
  if (status.toUpperCase() === "REPAIR") return "warning";
  return "info";
};

const StatusLayout = ({ status, onToggle }) => (
  <>
    <Typography
      variant="subtitle2"
      sx={{ color: brandPalette.primaryDark, mb: 1 }}
    >
      Lifecycle Status
    </Typography>
    <Chip
      label={status || "UNKNOWN"}
      color={getStatusColor(status)}
      variant="filled"
      sx={{ fontWeight: 600, mb: 2 }}
    />
    <Typography variant="body2" color="text.secondary" mb={2}>
      Keep the asset current by updating plan details, attaching new parts, or
      adjusting lifecycle settings.
    </Typography>
    <Stack spacing={1} direction="column">
      <Button variant="contained" onClick={() => onToggle("status")}>
        Change Status
      </Button>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onToggle("part")}
        >
          Add Part
        </Button>
        <Button variant="outlined" onClick={() => onToggle("mp")}>
          Add MP
        </Button>
      </Stack>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Button
          variant="contained"
          color="error"
          onClick={() => onToggle("delete")}
        >
          Delete Asset
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => onToggle("mpSettings")}
        >
          Reset Sequence
        </Button>
      </Stack>
    </Stack>
  </>
);

const AssetStatusActions = ({ status, onToggle, embedded = false }) => {
  if (embedded) {
    return (
      <Box>
        <StatusLayout status={status} onToggle={onToggle} />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${brandPalette.border}`,
        backgroundColor: brandPalette.surfaceAlt,
        boxShadow: "var(--smaint-shadow, 0px 12px 24px rgba(15,100,102,0.08))",
      }}
    >
      <CardContent>
        <StatusLayout status={status} onToggle={onToggle} />
      </CardContent>
    </Card>
  );
};

export default AssetStatusActions;
