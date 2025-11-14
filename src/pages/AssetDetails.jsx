import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { CircularProgress, Grid, Typography, Box } from "@mui/material";

import AssetStatusChangeModal from "../Components/AssetDetailComponents/AssetStatusChangeModal";
import AssetAddMpModal from "../Components/AssetDetailComponents/AssetAddMpModal";
import AssetAddPartModal from "../Components/AssetDetailComponents/AssetAddPartModal";
import AssetAddMpSettingModal from "../Components/Modals/AssetAddMpSettingModal";
import TableAssetPart from "../Components/AssetDetailComponents/TableAssetPart";
import TableAssetMp from "../Components/AssetDetailComponents/TableAssetMp";
import AssetImageCard from "../Components/AssetDetailComponents/AssetImageCard";
import AssetStatusActions from "../Components/AssetDetailComponents/AssetStatusActions";
import AssetInfoCard from "../Components/AssetDetailComponents/AssetInfoCard";
import AssetSummaryCards from "../Components/AssetDetailComponents/AssetSummaryCards";
import MpServiceDrawer from "../Components/AssetDetailComponents/MpServiceDrawer";
import AssetUsageTable from "../Components/AssetDetailComponents/AssetUsageTable"; // adjust the path
import {
  CircularProgress,
  Grid,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const AssetDetails = () => {
  const { id: rowId } = useParams();
  const [equipmentDetail, setEquipmentDetail] = useState(null);
  const [dropdowns, setDropdowns] = useState(null);
  const [serviceStatuses, setServiceStatuses] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [modals, setModals] = useState({
    status: false,
    part: false,
    mp: false,
    delete: false,
    mpSettings: false,
  });

  const [selectedMp, setSelectedMp] = useState(null);
  const [isMpServiceDrawerOpen, setIsMpServiceDrawerOpen] = useState(false);
  const [usageHistory, setUsageHistory] = useState([]);

  const imageUrl = "/assets/images/assetmanagement2.png";
  const endpoints = {
    model: "Model",
    type: "EquipmentType",
    department: "Department",
    manufacture: "Manufacture",
    operationSite: "OperationSite",
  };

  const fetchUsageHistory = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/UsageHistory/equipment/${rowId}`
      );
      setUsageHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch usage history:", error);
    }
  };
  const fetchDropdowns = async () => {
    const entries = await Promise.all(
      Object.entries(endpoints).map(async ([key, endpoint]) => {
        const res = await axios.get(
          `https://localhost:7066/api/${endpoint}/DropDown`
        );
        return [key, Array.isArray(res.data) ? res.data : []];
      })
    );
    return Object.fromEntries(entries);
  };

  const fetchData = async () => {
    try {
      const [equipmentRes, dropdownData] = await Promise.all([
        axios.get(`https://localhost:7066/api/Equipment`, {
          params: { id: rowId },
        }),
        fetchDropdowns(),
      ]);

      const equipment = equipmentRes.data;

      const enriched = {
        ...equipment,
        model:
          dropdownData.model.find((m) => m.id === equipment.modelId) || null,
        type:
          dropdownData.type.find((t) => t.id === equipment.equipmentTypeId) ||
          null,
        department:
          dropdownData.department.find(
            (d) => d.id === equipment.departmentId
          ) || null,
        manufacture:
          dropdownData.manufacture.find(
            (m) => m.id === equipment.manufactureId
          ) || null,
        operationSite:
          dropdownData.operationSite.find(
            (s) => s.id === equipment.operationSiteId
          ) || null,
      };

      const statusResults = await Promise.all(
        (equipment.mpList || []).map((mp) =>
          axios
            .get(
              `${import.meta.env.VITE_API_BASE_URL}${
                import.meta.env.VITE_API_SERVICE_STATUSES
              }`,
              { params: { equipmentId: equipment.id, mpId: mp.id } }
            )
            .then((res) => ({ mpId: mp.id, statuses: res.data }))
            .catch(() => ({ mpId: mp.id, statuses: [] }))
        )
      );
      console.log(
        "💡 equipmentDetail going into AssetInfoCard:",
        equipmentDetail
      );
      setServiceStatuses(statusResults); // mpId + status array per MP
      setEquipmentDetail(enriched);
      setDropdowns(dropdownData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading equipment or dropdowns:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (rowId) fetchData();
    fetchData();
    fetchUsageHistory();
  }, [rowId]);

  const toggleModal = (name, value = true) => {
    setModals((prev) => ({ ...prev, [name]: value }));
  };

  const refreshEquipmentDetails = async () => fetchData();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!equipmentDetail) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography variant="h6" color="error">
          No equipment detail found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <AssetImageCard imageUrl={imageUrl} />
          <AssetStatusActions
            status={equipmentDetail.status}
            onToggle={toggleModal}
          />
          <AssetInfoCard
            // detail={equipmentDetail}
            // dropdowns={dropdowns}
            // onSave={refreshEquipmentDetails}

            detail={equipmentDetail}
            dropdowns={dropdowns}
            onSave={refreshEquipmentDetails}
            showSnackbar={setSnackbar}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <AssetSummaryCards detail={equipmentDetail} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Maintenance Plans</Typography>
              {/* <TableAssetMp maintenancePlans={equipmentDetail.mpList} /> */}
              <TableAssetMp
                serviceStatuses={serviceStatuses}
                maintenancePlans={equipmentDetail.mpList}
                onServiceClick={(mp) => {
                  setSelectedMp(mp);
                  setIsMpServiceDrawerOpen(true);
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Parts</Typography>
              <TableAssetPart parts={equipmentDetail.partList} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <AssetUsageTable rows={usageHistory} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AssetStatusChangeModal
        isOpen={modals.status}
        onClose={() => toggleModal("status", false)}
        equipmentId={equipmentDetail.id}
        onStatusChangeSuccess={refreshEquipmentDetails}
      />
      <AssetAddPartModal
        isOpen={modals.part}
        onClose={() => toggleModal("part", false)}
        equipmentId={equipmentDetail.id}
        onMpaddSuccess={refreshEquipmentDetails}
      />
      <AssetAddMpModal
        isOpen={modals.mp}
        onClose={() => toggleModal("mp", false)}
        equipmentId={equipmentDetail.id}
        onMpaddSuccess={refreshEquipmentDetails}
      />
      <AssetAddMpSettingModal
        isOpen={modals.mpSettings}
        onClose={() => toggleModal("mpSettings", false)}
        equipmentId={equipmentDetail.id}
        onMpaddSuccess={refreshEquipmentDetails}
      />
      <MpServiceDrawer
        open={isMpServiceDrawerOpen}
        onClose={() => setIsMpServiceDrawerOpen(false)}
        maintenancePlan={selectedMp}
        equipmentId={equipmentDetail.id}
        equipmentDetail={equipmentDetail}
        serviceStatuses={serviceStatuses}
        onRefresh={refreshEquipmentDetails}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssetDetails;
