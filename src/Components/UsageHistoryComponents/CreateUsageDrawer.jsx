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
import axios from "axios";
import dayjs from "dayjs";
import Autocomplete from "@mui/material/Autocomplete";

const CreateUsageDrawer = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    equipmentId: "",
    operationName: "",
    operatorName: "",
    startDate: new Date().toISOString(),
    remark: "",
  });

  const [equipments, setEquipments] = useState([]);
  const [operations, setOperations] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const fetchEquipments = async (name = "") => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_EQUIPMENT_DROPDOWN
        }?name=${name}`
      );
      const options = res.data.map((item) => ({
        label: `${item.name} (${item.type})`,
        value: item.id,
      }));
      setEquipments(options);
    } catch (err) {
      console.error("Failed to fetch equipments:", err);
    }
  };

  const fetchOperations = async (name = "") => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_OPERATION_TYPE
        }?name=${name}`
      );
      const options = res.data.map((item) => ({
        label: item.replaceAll("_", " "),
        value: item,
      }));
      setOperations(options);
    } catch (err) {
      console.error("Failed to fetch operations:", err);
    }
  };

  useEffect(() => {
    if (open) {
      fetchEquipments();
      fetchOperations();
    }
  }, [open]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, startDate: newValue.toISOString() });
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_USAGE_CREATE
        }`,
        payload
      );
      setSnackbar({
        open: true,
        message: "Usage created successfully",
        severity: "success",
      });
      onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data || "Creation failed";
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
          Create Usage History
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={equipments}
              getOptionLabel={(option) => option.label || ""}
              onInputChange={(_, value) => fetchEquipments(value)}
              onChange={(_, newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  equipmentId: newValue?.value || "",
                }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Equipment" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={operations}
              getOptionLabel={(option) => option.label || ""}
              onInputChange={(_, value) => fetchOperations(value)}
              onChange={(_, newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  operationName: newValue?.value || "",
                }))
              }
              renderInput={(params) => (
                <TextField {...params} label="Operation Type" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Operator Name"
              value={formData.operatorName}
              onChange={handleChange("operatorName")}
            />
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={dayjs(formData.startDate)}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remark"
              multiline
              rows={2}
              value={formData.remark}
              onChange={handleChange("remark")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
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

export default CreateUsageDrawer;
