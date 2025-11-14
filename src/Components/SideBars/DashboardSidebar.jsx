import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, BarChart, Group, AdminPanelSettings } from "@mui/icons-material";

const DashboardSidebar = ({ open }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <List sx={{ mt: 10 }}>
        <ListItem
          button
          sx={{ "&:hover": { backgroundColor: "#ddd", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          sx={{ "&:hover": { backgroundColor: "#ddd", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <BarChart />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem
          button
          sx={{ "&:hover": { backgroundColor: "#ddd", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem
          button
          sx={{ "&:hover": { backgroundColor: "#ddd", cursor: "pointer" } }}
        >
          <ListItemIcon>
            <AdminPanelSettings />
          </ListItemIcon>
          <ListItemText primary="Admin Panel" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DashboardSidebar;
