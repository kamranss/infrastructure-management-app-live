import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_SERVICE_DROPDOWN = import.meta.env.VITE_API_SERVICE_DROPDOWN;
const API_MP_ASSIGN_SERVICES = import.meta.env.VITE_API_MP_ASSIGN_SERVICES;

const MpAddServiceModal = ({ isOpen, onClose, mpId, onServiceAddSuccess }) => {
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch services dynamically when typing
  useEffect(() => {
    if (!isOpen) return;

    const delay = setTimeout(() => {
      axios
        .get(`${API_BASE}${API_SERVICE_DROPDOWN}`, {
          params: searchTerm ? { name: searchTerm } : {},
        })
        .then((res) => setServiceOptions(res.data))
        .catch(() => setServiceOptions([]));
    }, 300); // debounce 300ms

    return () => clearTimeout(delay);
  }, [searchTerm, isOpen]);

  // Reset modal fields when open
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedService(null);
    }
  }, [isOpen]);

  const handleAssign = async () => {
    if (!selectedService?.id) {
      Swal.fire("Please select a service.", "", "warning");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${API_BASE}${API_MP_ASSIGN_SERVICES.replace(":id", mpId)}`,
        [selectedService.id]
      );

      Swal.fire("Success", "Service assigned to MP!", "success");
      onServiceAddSuccess?.(); // to refresh list
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to assign service.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Service to Maintenance Plan</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={serviceOptions}
          getOptionLabel={(option) => option.name || ""}
          noOptionsText="No services found" // ✅ Show when empty
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Service"
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          onChange={(_, newValue) => setSelectedService(newValue)}
          ListboxProps={{
            style: {
              maxHeight: 200,
              overflow: "auto",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MpAddServiceModal;
