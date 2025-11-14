import React from "react";
import { Grid, TextField, Button, MenuItem, Paper } from "@mui/material";
import CommonCard from "../Common/CommonCard";

const MpInfoForm = ({
  mpData,
  setMpData,
  originalMpData,
  editMode,
  metricTypes,
  onCancel,
  onSave,
  hasChanges,
}) => {
  if (!mpData) return null;

  const fields = ["name", "code", "description", "createdBy", "modifiedBy"];

  return (
    <CommonCard title="Maintenance Plan Info" color="#E3F2FD">
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={6} key={field}>
            <TextField
              label={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^\w/, (c) => c.toUpperCase())}
              value={mpData[field] || ""}
              onChange={(e) =>
                setMpData({ ...mpData, [field]: e.target.value })
              }
              fullWidth
              disabled={!editMode || field === "modifiedBy"}
            />
          </Grid>
        ))}

        <Grid item xs={6}>
          <TextField
            select
            label="Metric Type"
            value={mpData.metricType || ""}
            onChange={(e) =>
              setMpData({ ...mpData, metricType: e.target.value })
            }
            fullWidth
            disabled={!editMode}
          >
            {metricTypes.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Created Date"
            value={mpData.createdDate?.split("T")[0] || ""}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Updated Date"
            value={mpData.updatedDate?.split("T")[0] || ""}
            fullWidth
            disabled
          />
        </Grid>

        {editMode && (
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            gap={2}
            mt={1}
          >
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={onSave}
              disabled={!hasChanges}
            >
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </CommonCard>
  );
};

export default MpInfoForm;
