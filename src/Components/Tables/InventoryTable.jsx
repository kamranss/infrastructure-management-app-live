// src/Components/Tables/InventoryTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InventoryTable = ({ rows = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgb(190, 213, 236)" }}>
            <TableCell>Details</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Reorder Limit</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small">
                    <VisibilityIcon sx={{ color: "#1976d2" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.reorderLimit ?? "-"}</TableCell>
              <TableCell>{item.createdBy}</TableCell>
              <TableCell>
                {item.createdDate
                  ? new Date(item.createdDate).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell
                sx={{
                  color: item.isActive ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {item.isActive ? "Active" : "Inactive"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
