import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Chip,
  IconButton,
} from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { fetchDepartments } from "../../api/services/departmentService";

const SideBarAssets = ({ activeTab, onTabChange }) => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await fetchDepartments({ page: 1, pageSize: 20 });
      setDepartments(res.items || []);
    };

    fetchDepartments();
  }, []);

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedDepartments = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(145deg, #ffffff 0%, #f4f7fb 100%)",
        height: "100%",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600} color="#0a1e3c">
          Divisions
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search divisions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />

        <List
          dense
          sx={{
            maxHeight: 320,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {paginatedDepartments.map((dept, index) => {
            const actualIndex = (page - 1) * pageSize + index;
            const isActive = activeTab === actualIndex;
            return (
              <ListItemButton
                key={dept.id}
                onClick={() => onTabChange(actualIndex)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  backgroundColor: isActive ? "rgba(15,100,102,0.1)" : "transparent",
                }}
              >
                <CorporateFareIcon
                  sx={{
                    mr: 1.25,
                    color: isActive ? "#0f6466" : "#90a4ae",
                  }}
                />
                <ListItemText
                  primary={dept.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: "#0a1e3c",
                  }}
                />
                {isActive && (
                  <Chip
                    label="Active"
                    size="small"
                    sx={{ backgroundColor: "#0f6466", color: "#fff" }}
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <IconButton
            size="small"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            Page {page} / {totalPages || 1}
          </Typography>
          <IconButton
            size="small"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SideBarAssets;
