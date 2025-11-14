import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Box, CircularProgress, Snackbar, Alert, Grid } from "@mui/material";
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";

import MpStatusCard from "../Components/MpDetailComponents/MpStatusCard";
// import MpActionsCard from "../Components/MpDetailComponents/MpActionsCard";
import MpInfoForm from "../Components/MpDetailComponents/MpInfoForm";
import MpSummaryCards from "../Components/MpDetailComponents/MpSummaryCards";
import MpTables from "../Components/MpDetailComponents/MpTables";
import MpDialogs from "../Components/MpDetailComponents/MpDialogs";
import MpAddServiceModal from "../Components/MpDetailComponents/MpAddServiceModal";
import MpAssignSettingDrawer from "../Components/MpDetailComponents/MpAssignSettingDrawer";

const MpDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mpData, setMpData] = useState(null);
  const [originalMpData, setOriginalMpData] = useState(null);

  const [services, setServices] = useState({ items: [], totalCount: 0 });
  const [equipments, setEquipments] = useState({ items: [], totalCount: 0 });

  const [metricTypes, setMetricTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialog, setStatusDialog] = useState({
    open: false,
    value: null,
  });
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isSettingDrawerOpen, setIsSettingDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [servicePage, setServicePage] = useState(1);
  const [equipmentPage, setEquipmentPage] = useState(1);
  const pageSize = 5;

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_MP_ITEM = import.meta.env.VITE_API_MP_ITEM;
  const API_MP_METRIC_TYPES = import.meta.env.VITE_API_MP_METRIC_TYPES;
  const API_MP_SERVICES_BY_MP = import.meta.env.VITE_API_MP_SERVICES_BY_MP;
  const API_MP_EQUIPMENTS_BY_MP = import.meta.env.VITE_API_MP_EQUIPMENTS_BY_MP;
  const API_MP_DELETE = import.meta.env.VITE_API_MP_DELETE;
  const API_MP_TOGGLE_ACTIVE = import.meta.env.VITE_API_MP_TOGGLE_ACTIVE;
  const API_MP_UPDATE = import.meta.env.VITE_API_MP_UPDATE;
  const API_MP_REMOVE_SERVICE = import.meta.env.VITE_API_MP_REMOVE_SERVICE;

  const fetchMpAndMetrics = async () => {
    try {
      const [mpRes, metricsRes] = await Promise.all([
        axios.get(`${API_BASE}${API_MP_ITEM}/${id}`),
        axios.get(`${API_BASE}${API_MP_METRIC_TYPES}`),
      ]);
      setMpData(mpRes.data);
      setOriginalMpData(mpRes.data);
      setMetricTypes(metricsRes.data);
    } catch (error) {
      console.error("Failed to fetch MP or metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async (pageNumber = 1) => {
    try {
      const res = await axios.get(`${API_BASE}${API_MP_SERVICES_BY_MP}/${id}`, {
        params: { pageNumber, pageSize },
      });
      setServices(res.data || { items: [], totalCount: 0 });
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices({ items: [], totalCount: 0 });
    }
  };

  const fetchEquipments = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `${API_BASE}${API_MP_EQUIPMENTS_BY_MP}/${id}`,
        {
          params: { page: pageNumber, pageSize },
        }
      );
      setEquipments(res.data || { items: [], totalCount: 0 });
    } catch (error) {
      console.warn("Failed to fetch equipments:", error);
      setEquipments({ items: [], totalCount: 0 });
    }
  };

  const fetchAllData = async () => {
    await Promise.all([
      fetchServices(servicePage),
      fetchEquipments(equipmentPage),
    ]);
  };

  useEffect(() => {
    if (id) {
      fetchMpAndMetrics();
      fetchAllData();
    }
  }, [id]);

  useEffect(() => {
    fetchServices(servicePage);
  }, [servicePage]);

  useEffect(() => {
    fetchEquipments(equipmentPage);
  }, [equipmentPage]);

  // const handleDeleteConfirm = async () => {
  //   try {
  //     await axios.delete(`${API_BASE}${API_MP_DELETE}/${id}`);
  //     navigate("/maintenanceoverview");
  //   } catch (error) {
  //     console.error("Failed to delete MP:", error);
  //   } finally {
  //     setDeleteDialogOpen(false);
  //   }
  // };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_BASE}${API_MP_DELETE}/${id}`);
      setSnackbar({
        open: true,
        message: "Maintenance Plan deleted successfully",
        severity: "success",
      });

      // Wait a bit before navigating
      setTimeout(() => {
        navigate("/maintenanceoverview");
      }, 1500); // 1.5 seconds gives time to show the snackbar
    } catch (error) {
      console.error("Failed to delete MP:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete Maintenance Plan",
        severity: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(
        `${API_BASE}${API_MP_TOGGLE_ACTIVE}/${id}/IsActive`,
        null,
        {
          params: { isActive: newStatus },
        }
      );
      const updated = await axios.get(`${API_BASE}${API_MP_ITEM}/${id}`);
      setMpData(updated.data);
      setStatusDialog({ open: false, value: null });
      setSnackbar({
        open: true,
        message: "Status updated",
        severity: "success",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      setSnackbar({
        open: true,
        message: "Failed to update status",
        severity: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE}${API_MP_UPDATE}/${id}`, {
        id: Number(id),
        code: mpData.code,
        name: mpData.name,
        description: mpData.description,
        metricType: mpData.metricType,
      });
      setEditMode(false);
      setOriginalMpData(mpData);
      setSnackbar({ open: true, message: "MP updated", severity: "success" });
    } catch (error) {
      console.error("Failed to update MP:", error);
      setSnackbar({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleRemoveService = async (serviceId) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    try {
      await axios.delete(
        `${API_BASE}${API_MP_REMOVE_SERVICE}/${id}/RemoveService`,
        {
          params: { serviceId },
        }
      );
      setSnackbar({
        open: true,
        message: "Service removed",
        severity: "success",
      });
      fetchServices(servicePage);
    } catch (error) {
      console.error("Failed to remove service:", error);
      setSnackbar({
        open: true,
        message: "Failed to remove service",
        severity: "error",
      });
    }
  };

  const hasChanges = JSON.stringify(mpData) !== JSON.stringify(originalMpData);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <MpStatusCard
            status={mpData?.status}
            isActive={mpData?.isActive}
            onSetStatus={(newStatus) =>
              setStatusDialog({ open: true, value: newStatus })
            }
          />
          {/* <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            <MpActionsCard
              onDelete={() => setDeleteDialogOpen(true)}
              onEdit={() => setEditMode(true)}
              onAddServices={() => setIsServiceModalOpen(true)}
            />
            <Box>
              <button
                className="btn btn-primary"
                onClick={() => setIsSettingDrawerOpen(true)}
              >
                Set MP Settings
              </button>
            </Box>
          </Box> */}
          <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              sx={{ height: "40px" }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setEditMode(true)}
              sx={{ height: "40px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => setIsServiceModalOpen(true)}
              sx={{ height: "40px" }}
            >
              Add Service
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsSettingDrawerOpen(true)}
              sx={{ height: "40px" }}
            >
              Set MP Settings
            </Button>
          </Box>

          <MpInfoForm
            mpData={mpData}
            setMpData={setMpData}
            originalMpData={originalMpData}
            editMode={editMode}
            metricTypes={metricTypes}
            onCancel={() => {
              setEditMode(false);
              setMpData(originalMpData);
            }}
            onSave={handleSave}
            hasChanges={hasChanges}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <MpSummaryCards
            services={services.items}
            equipments={equipments.items}
            mpData={mpData}
          />
          <MpTables
            services={services.items}
            equipments={equipments.items}
            servicePage={servicePage}
            serviceTotal={services.totalCount}
            equipmentPage={equipmentPage}
            equipmentTotal={equipments.totalCount}
            onServicePageChange={(newPage) => setServicePage(newPage)}
            onEquipmentPageChange={(newPage) => setEquipmentPage(newPage)}
            onRemoveService={handleRemoveService}
          />
        </Grid>
      </Grid>

      <MpDialogs
        deleteDialogOpen={deleteDialogOpen}
        onCloseDelete={() => setDeleteDialogOpen(false)}
        onConfirmDelete={handleDeleteConfirm}
        statusDialog={statusDialog}
        onCloseStatus={() => setStatusDialog({ open: false, value: null })}
        onConfirmStatus={(value) => handleStatusChange(value)}
      />

      <MpAddServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        mpId={id}
        onServiceAddSuccess={() => fetchServices(servicePage)}
      />

      <MpAssignSettingDrawer
        open={isSettingDrawerOpen}
        onClose={() => setIsSettingDrawerOpen(false)}
        equipments={equipments}
        mpId={id}
        onSuccess={() => fetchEquipments(equipmentPage)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MpDetail;
