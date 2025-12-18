import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import SideBarAssets from "../Components/SideBars/SideBarAssets";
import PaginationComponent2 from "../Components/Common/PaginationComponent2";
import TableAsset from "../Components/Tables/TableAsset";
import { useNavigate } from "react-router-dom";
import EquipmentModal from "../Components/Modals/EquipmentModal";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { statCardPalette } from "../constants/uiPalette";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const EQUIPMENT_ENDPOINT =
  API_BASE_URL + import.meta.env.VITE_API_EQUIPMENT_PATH;

const apiEndpoints = [
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
  "https://localhost:7066/api/Equipment/FindEquipmentsByDepartmentId",
];

const columns = [
  { field: "id", label: "Asset ID" },
  { field: "name", label: "Asset Name" },
  { field: "operationSite", label: "Site" },
  { field: "type", label: "Type" },
  { field: "productionYear", label: "Year" },
  { field: "status", label: "Status" },
  { field: "lastMaintenace", label: "Last Maintenance" },
  { field: "currentValue", label: "Current Value" },
];

const statCards = [
  { label: "Total Assets", value: "154" },
  { label: "Maintenance Due", value: "18" },
  { label: "In Production", value: "47" },
  { label: "Utilization", value: "82%" },
].map((card, index) => ({
  ...card,
  ...statCardPalette[index % statCardPalette.length],
}));

const AssetsPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    name: "",
    operationSite: "",
    type: "",
    mpTimeOnly: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, page, size]);

  const fetchData = (index) => {
    const endpoint = apiEndpoints[index];
    setIsLoading(true);
    axios
      .get(endpoint, {
        params: { page, pageSize: size, id: index + 1 },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const filteredRows = useMemo(() => {
    const rows = data?.items || [];
    return rows
      .filter((row) => {
        const matchesName = row.name
          ?.toLowerCase()
          .includes(filter.name.toLowerCase());
        const matchesSite = row.operationSite
          ?.toLowerCase()
          .includes(filter.operationSite.toLowerCase());
        const matchesType = row.type
          ?.toLowerCase()
          .includes(filter.type.toLowerCase());
        const matchesMpTime = !filter.mpTimeOnly || row.mpTime === false;
        return matchesName && matchesSite && matchesType && matchesMpTime;
      })
      .sort((a, b) => {
        const aMp = a.mpTime === false ? 1 : 0;
        const bMp = b.mpTime === false ? 1 : 0;
        return bMp - aMp;
      });
  }, [data, filter]);

  const handleModalClose = () => setIsModalOpen(false);

  const handleTableRowClick = async (rowId) => {
    try {
      const response = await axios.get(`https://localhost:7066/api/Equipment`, {
        params: { id: rowId },
      });
      setModalData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box
      sx={{
        py: 2,
        px: { xs: 1, md: 1.5 },
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3} sx={{ position: "relative" }}>
          <Box
            sx={{
              position: { xs: "static", lg: "sticky" },
              top: { lg: 110 },
            }}
          >
            <SideBarAssets activeTab={activeTab} onTabChange={setActiveTab} />
          </Box>
        </Grid>

        <Grid item xs={12} lg={9}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              {statCards.map((card) => (
                <Grid item xs={12} sm={6} md={3} key={card.label}>
                  <Card
                    sx={{
                      backgroundColor: card.surface,
                      borderRadius: 3,
                      boxShadow: "var(--smaint-shadow)",
                      border: "1px solid var(--smaint-border)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle2" color={card.accent}>
                        {card.label}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: card.accent }}
                      >
                        {card.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
                mb={2}
                sx={{ flexWrap: "wrap", gap: 2 }}
              >
                <Typography variant="h6" color="#0a1e3c" fontWeight={600}>
                  Asset overview
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    flexWrap: "wrap",
                    width: { xs: "100%", sm: "auto" },
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadRoundedIcon />}
                    color="inherit"
                    sx={{ flex: { xs: 1, sm: "unset" } }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    sx={{
                      backgroundColor: "#0f6466",
                      flex: { xs: 1, sm: "unset" },
                    }}
                    onClick={() => navigate("/assetcreate")}
                  >
                    New Asset
                  </Button>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                mb={2}
                alignItems="center"
                sx={{
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <TextField
                  label="Asset Name"
                  value={filter.name}
                  onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 200 },
                    flex: { xs: "1 1 100%", md: "0 0 220px" },
                  }}
                />
                <TextField
                  label="Operation Site"
                  value={filter.operationSite}
                  onChange={(e) =>
                    setFilter({ ...filter, operationSite: e.target.value })
                  }
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 200 },
                    flex: { xs: "1 1 100%", md: "0 0 220px" },
                  }}
                />
                <TextField
                  label="Asset Type"
                  value={filter.type}
                  onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 200 },
                    flex: { xs: "1 1 100%", md: "0 0 220px" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={filter.mpTimeOnly}
                      onChange={(e) =>
                        setFilter({ ...filter, mpTimeOnly: e.target.checked })
                      }
                    />
                  }
                  label="MP Time Reached"
                  sx={{
                    ml: { xs: 0, md: 1 },
                    flex: { xs: "1 1 auto", md: "0 0 auto" },
                    alignSelf: "center",
                  }}
                />
              </Stack>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ position: "relative", minHeight: 300 }}>
                {isLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                      backgroundColor: "rgba(255,255,255,0.7)",
                      borderRadius: 2,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                <Box sx={{ overflowX: "auto" }}>
                  {data ? (
                    <TableAsset
                      columns={columns}
                      rows={filteredRows}
                      onRowClick={(rowId) => handleTableRowClick(rowId)}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No data available.
                    </Typography>
                  )}
                </Box>
              </Box>

              <PaginationComponent2
                page={page}
                setPage={setPage}
                recordSize={size}
                count={data?.totalCount}
                size={size}
                setSize={setSize}
              />
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <Dialog open={isModalOpen} onClose={handleModalClose} fullWidth maxWidth="md">
        <DialogContent>
          <EquipmentModal handleClose={handleModalClose} data={modalData} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AssetsPage;
