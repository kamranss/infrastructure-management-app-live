import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Chip,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <SpaceDashboardRoundedIcon />,
  },
  {
    label: "Assets",
    path: "/assetsPage",
    icon: <PrecisionManufacturingIcon />,
  },
  {
    label: "Usage History",
    path: "/usageHistory",
    icon: <EventAvailableRoundedIcon />,
  },
  {
    label: "Maintenance",
    path: "/maintenanceoverview",
    icon: <SettingsApplicationsRoundedIcon />,
  },
  {
    label: "Inventory",
    path: "/inventorypage",
    icon: <Inventory2RoundedIcon />,
  },
  { label: "Analytics", path: "/assetUtilization", icon: <QueryStatsRoundedIcon /> },
  { label: "Chat", path: "/chat", icon: <ChatBubbleOutlineRoundedIcon /> },
];

const brandGradient =
  "linear-gradient(135deg, rgba(15,100,102,1) 0%, rgba(14,48,61,1) 100%)";

const getStoredProfile = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem("offlineProfile");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const formatTitle = (pathname) => {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return "dashboard";
  return segments[segments.length - 1].replace(/-/g, " ");
};

const COLLAPSED_WIDTH = 80;
const EXPANDED_WIDTH = 260;

const AppShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const profile = React.useMemo(() => getStoredProfile(), []);
  const pageTitle = React.useMemo(() => formatTitle(location.pathname), [location.pathname]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMobileNavOpen(false);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
    navigate("/login");
  };

  const initials =
    profile?.name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "SM";

  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const effectiveCollapsed = isMobile ? false : collapsed;
  const navWidth = isMobile
    ? 0
    : effectiveCollapsed
    ? COLLAPSED_WIDTH
    : EXPANDED_WIDTH;

  const renderNavigation = (options = {}) => {
    const {
      collapsedState = effectiveCollapsed,
      showCollapseToggle = true,
      onCloseDrawer = () => {},
    } = options;

    return (
      <Box
        component="aside"
        sx={{
          width: collapsedState ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
          background: brandGradient,
          color: "#ecf4ff",
          display: "flex",
          flexDirection: "column",
          py: 4,
          px: collapsedState ? 1 : 3,
          height: "100%",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsedState ? "center" : "space-between",
            gap: 2,
          }}
        >
          {!collapsedState && (
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Smaint 360
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Intelligent maintenance cockpit
              </Typography>
            </Box>
          )}
          {showCollapseToggle ? (
            <IconButton
              size="small"
              onClick={toggleCollapsed}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {collapsedState ? <MenuRoundedIcon /> : <MenuOpenRoundedIcon />}
            </IconButton>
          ) : (
            <IconButton
              size="small"
              onClick={onCloseDrawer}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <MenuOpenRoundedIcon />
            </IconButton>
          )}
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {navItems.map((item) => {
            const active = location.pathname
              .toLowerCase()
              .startsWith(item.path.toLowerCase());
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: active ? "rgba(255,255,255,0.15)" : "transparent",
                    color: "#ecf4ff",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#ecf4ff", minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  {!collapsedState && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 500 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {!collapsedState && (
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 3,
              p: 2,
            }}
          >
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
              Upcoming maintenance
            </Typography>
            <Chip
              size="small"
              label="5 tasks due"
              sx={{ backgroundColor: "#fff", color: "#0f6466", fontWeight: 600 }}
            />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#f4f6fb",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          minHeight: "100vh",
          background: brandGradient,
          display: { xs: "none", md: "flex" },
          flex: { md: `0 0 ${navWidth}px` },
          width: { md: `${navWidth}px` },
          transition: "width 0.3s ease",
        }}
      >
        {renderNavigation()}
      </Box>

      <Drawer
        anchor="left"
        open={isMobile && mobileNavOpen}
        onClose={toggleMobileNav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: EXPANDED_WIDTH,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {renderNavigation({ collapsedState: false, showCollapseToggle: false, onCloseDrawer: toggleMobileNav })}
      </Drawer>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          component="header"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            height: 72,
            backgroundColor: "#fff",
            boxShadow: "0 2px 12px rgba(10,30,60,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton onClick={toggleMobileNav}>
                <MenuRoundedIcon />
              </IconButton>
            )}
            <Typography variant="subtitle1" sx={{ color: "#0a1e3c", fontWeight: 600, textTransform: "capitalize" }}>
              {pageTitle}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {!isMobile && (
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#0a1e3c" }}>
                  {profile?.name || "System Admin"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {profile?.username || "smaint@workspace"}
                </Typography>
              </Box>
            )}
            <Avatar sx={{ backgroundColor: "#0f6466" }}>{initials}</Avatar>
            {!isMobile && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutRoundedIcon />}
              >
                Logout
              </Button>
            )}
          </Box>
        </Box>

        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 4, lg: 5 },
            pb: { xs: 4, md: 6 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppShell;

