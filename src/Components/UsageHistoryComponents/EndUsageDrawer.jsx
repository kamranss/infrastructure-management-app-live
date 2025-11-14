import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import axios from "axios";

const EndUsageDrawer = ({ open, onClose, onSuccess }) => {
  const [usages, setUsages] = useState([]);
  const [formData, setFormData] = useState({
    usageHistoryId: "",
    endDate: new Date().toISOString(),
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const fetchOngoingUsages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_USAGE_ONGOING
        }`
      );
      const options = res.data.map((item) => ({
        label: `${item.equipmentName} - ${item.operatorName} (${item.operationName})`,
        value: item.id,
      }));
      setUsages(options);
    } catch (err) {
      console.error("Failed to fetch ongoing usages:", err);
    }
  };

  useEffect(() => {
    if (open) fetchOngoingUsages();
  }, [open]);

  const handleEndDateChange = (newValue) => {
    setFormData({ ...formData, endDate: newValue.toISOString() });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_USAGE_END
        }`,
        formData
      );
      setSnackbar({
        open: true,
        message: "Usage ended successfully.",
        severity: "success",
      });
      onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data || "End usage failed.";
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { width: 400, p: 3 } }}
      >
        <Typography variant="h6" gutterBottom>
          End Usage History
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={usages}
              getOptionLabel={(option) => option.label || ""}
              onChange={(_, newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  usageHistoryId: newValue?.value || "",
                }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Ongoing Usage" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                value={dayjs(formData.endDate)}
                onChange={handleEndDateChange}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!formData.usageHistoryId}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Drawer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EndUsageDrawer;
