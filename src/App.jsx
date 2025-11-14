import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OfflineLogin from "./pages/OfflineLogin";
import ChatPage from "./pages/ChatPage";
import ErrorBoundary from "./Components/ErrorBoundary";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import "font-awesome/css/font-awesome.min.css";
import AssetsPage from "./pages/AssetsPage";
import InventoryPage from "./pages/InventoryPage";
import AssetDetails from "./pages/AssetDetails";
import AssetCreate from "./pages/AssetCreate";
import MaintenanceOverview from "./pages/MaintenanceOverview";
import MpDetail from "./pages/MpDetail";
import AssetUtilization from "./pages/AssetUtilization";
import AppShell from "./Components/Layout/AppShell";

// const isAssetDetailsPage = location.pathname.startsWith("/assetdetails");
// const imageUrl = "/assets/images/assetmanagement.png";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f6466",
    },
    secondary: {
      main: "#3aafa9",
    },
    background: {
      default: "#f4f7fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#0a1e3c",
      secondary: "#5f6c7b",
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme} style={{ width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/offline" element={<OfflineLogin />} />
              <Route path="/register" element={<Register />} />

              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assetsPage" element={<AssetsPage />} />
                <Route path="/inventorypage" element={<InventoryPage />} />
                <Route path="/assetdetails/:id" element={<AssetDetails />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/assetcreate" element={<AssetCreate />} />
                <Route path="/maintenance-plan/:id" element={<MpDetail />} />
                <Route path="/usageHistory" element={<AssetUtilization />} />
                <Route path="/assetUtilization" element={<AssetUtilization />} />
                <Route
                  path="/maintenanceoverview"
                  element={<MaintenanceOverview />}
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        </div>
      </Box>
    </ThemeProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
