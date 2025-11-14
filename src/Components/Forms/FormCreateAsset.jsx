import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormLabel,
  Button,
  Autocomplete,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import debounce from "lodash.debounce";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FormCreateAsset = () => {
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [dropdowns, setDropdowns] = useState({
    models: [],
    types: [],
    departments: [],
    usageLocations: [],
    manufactures: [],
    operationSites: [],
  });
  const [selections, setSelections] = useState({});
  const [searchQueries, setSearchQueries] = useState({});

  const numericFields = ["ProductionYear", "CurrentValue"];

  const endpoints = {
    models: "Model",
    types: "EquipmentType",
    departments: "Department",
    manufactures: "Manufacture",
    operationSites: "OperationSite",
    usageLocations: "Constants/Location",
  };

  const fetchDropdownData = async (key, query) => {
    try {
      const params = new URLSearchParams({ name: query || "" });
      const base = `https://localhost:7066/api/${endpoints[key]}`;
      const isDropDown = key !== "usageLocations";
      const url = isDropDown ? `${base}/DropDown?${params}` : base;
      const { data } = await axios.get(url);
      if (Array.isArray(data)) {
        setDropdowns((prev) => ({ ...prev, [key]: data }));
      }
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  const debouncedFetch = Object.keys(endpoints).reduce((acc, key) => {
    acc[key] = debounce((query) => fetchDropdownData(key, query), 300);
    return acc;
  }, {});

  useEffect(() => {
    Object.keys(endpoints).forEach((key) => fetchDropdownData(key, ""));
  }, []);

  useEffect(() => {
    Object.entries(searchQueries).forEach(([key, query]) => {
      if (debouncedFetch[key]) debouncedFetch[key](query);
    });
  }, [searchQueries]);

  const handleInputChange = (field, value) => {
    setValidationErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });

    const finalValue = numericFields.includes(field) ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [field]: finalValue }));
  };

  const handleDropdownChange = (key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      const formPayload = new FormData();

      formPayload.append("Name", formData.Name || "");
      formPayload.append("UnitNumber", String(formData.UnitNumber || ""));
      formPayload.append("Description", formData.Description || "");
      formPayload.append("Identification", formData.Identification || "");
      formPayload.append("ProductionYear", formData.ProductionYear ?? "");
      formPayload.append("SeriaNumber", formData.seriaNumber || "");
      formPayload.append("Capacity", formData.Capacity || "");
      formPayload.append(
        "LastMaintenaceDate",
        formData.LastMaintenaceDate
          ? new Date(formData.LastMaintenaceDate).toISOString()
          : ""
      );
      formPayload.append("CurrentValue", formData.CurrentValue ?? "");

      formPayload.append("Image", formData.Image || "");
      formPayload.append("UsageLocation", selections.usageLocations || "");
      formPayload.append(
        "OperationSiteid",
        selections.operationSites?.id ?? ""
      );
      formPayload.append("ManufactureId", selections.manufactures?.id ?? "");
      formPayload.append("DepartmentId", selections.departments?.id ?? "");
      formPayload.append("ModelId", selections.models?.id ?? "");
      formPayload.append("EquipmentTypeId", selections.types?.id ?? "");

      await axios.post(
        "https://localhost:7066/api/Equipment/NewEquipment",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await MySwal.fire({ icon: "success", title: "Created" });
      window.location.href = "/assetsPage";
    } catch (err) {
      if (err.response?.status === 400) {
        setValidationErrors(err.response?.data?.errors || {});
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  const renderAutocomplete = (key, label) => (
    <Grid item xs={12} sm={6} md={3}>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        options={dropdowns[key]}
        value={selections[key] || null}
        getOptionLabel={(option) => option?.name || option}
        inputValue={searchQueries[key] || ""}
        onChange={(e, newVal) => handleDropdownChange(key, newVal)}
        onInputChange={(e, val) =>
          setSearchQueries((prev) => ({ ...prev, [key]: val }))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={`Select ${label}`}
            fullWidth
          />
        )}
      />
    </Grid>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit} style={{ padding: "16px" }}>
        <h2 style={{ marginBottom: 16 }}>Create Asset</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Asset Name</FormLabel>
            <TextField
              fullWidth
              onChange={(e) => handleInputChange("Name", e.target.value)}
              error={Boolean(validationErrors?.Name?.length)}
              helperText={validationErrors?.Name?.[0] || ""}
            />
          </Grid>

          {renderAutocomplete("operationSites", "Operation Site")}
          {renderAutocomplete("manufactures", "Manufacture")}
          {renderAutocomplete("types", "Type")}
          {renderAutocomplete("models", "Model")}
          {renderAutocomplete("departments", "Department")}
          {renderAutocomplete("usageLocations", "Usage Location")}

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Unit Number</FormLabel>
            <TextField
              fullWidth
              type="text"
              onChange={(e) => handleInputChange("UnitNumber", e.target.value)}
              error={Boolean(validationErrors?.UnitNumber?.length)}
              helperText={validationErrors?.UnitNumber?.[0] || ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Description</FormLabel>
            <TextField
              fullWidth
              onChange={(e) => handleInputChange("Description", e.target.value)}
              error={Boolean(validationErrors?.Description?.length)}
              helperText={validationErrors?.Description?.[0] || ""}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Production Year</FormLabel>
            <TextField
              fullWidth
              type="number"
              onChange={(e) =>
                handleInputChange("ProductionYear", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Serial Number</FormLabel>
            <TextField
              fullWidth
              onChange={(e) => handleInputChange("seriaNumber", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Capacity</FormLabel>
            <TextField
              fullWidth
              onChange={(e) => handleInputChange("Capacity", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Last Maintenance Date</FormLabel>
            <DatePicker
              label="Select Date"
              value={formData.LastMaintenaceDate || null}
              onChange={(newValue) =>
                handleInputChange("LastMaintenaceDate", newValue)
              }
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Current Value</FormLabel>
            <TextField
              fullWidth
              type="number"
              onChange={(e) =>
                handleInputChange("CurrentValue", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormLabel>Image</FormLabel>
            <TextField
              fullWidth
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => handleInputChange("Image", e.target.files[0])}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Create
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default FormCreateAsset;
