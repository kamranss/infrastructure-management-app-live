import * as React from "react";
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
  Chip,
} from "@mui/material";
import moment from "moment";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import clock from "/src/assets/icons/clock.png";
import correct from "/src/assets/icons/correct.png";

const defaultColumns = [
  { field: "id", label: "Asset ID", width: 80 },
  { field: "name", label: "Asset Name", minWidth: 180 },
  { field: "operationSite", label: "Site", minWidth: 140 },
  { field: "type", label: "Type", minWidth: 120 },
  { field: "productionYear", label: "Year", width: 90 },
  { field: "status", label: "Status", width: 120 },
  { field: "lastMaintenace", label: "Last Maintenance", minWidth: 150 },
  { field: "currentValue", label: "Current Value", minWidth: 140 },
];

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "-";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const formatDate = (value) => {
  if (!value) return "Not available";
  return moment(value).isValid() ? moment(value).format("DD MMM YYYY") : "Not available";
};

const statusColorMap = {
  ACTIVE: "#2e7d32",
  INACTIVE: "#757575",
  REPAIR: "#ef6c00",
  IN_USE: "#0288d1",
  CONCERVATED: "#5e35b1",
};

const TableAsset = ({ columns = defaultColumns, rows = [], onRowClick }) => {
  const orderedRows = React.useMemo(() => {
    const clone = [...rows];
    clone.sort((a, b) => {
      const aMp = a.mpTime === false ? 1 : 0;
      const bMp = b.mpTime === false ? 1 : 0;
      return bMp - aMp;
    });
    return clone;
  }, [rows]);

  const renderCell = (column, row) => {
    const value = row[column.field];
    switch (column.field) {
      case "status":
        return (
          <Chip
            label={value || "Unknown"}
            size="small"
            sx={{
              backgroundColor: statusColorMap[value] || "#90a4ae",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        );
      case "lastMaintenace":
        return formatDate(value);
      case "currentValue":
        return formatCurrency(value);
      default:
        return value ?? "-";
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "var(--smaint-shadow)",
        border: "1px solid var(--smaint-border)",
      }}
    >
      <Table sx={{ minWidth: 1100 }} aria-label="asset table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: "var(--smaint-surface-alt)",
                fontWeight: 600,
                color: "var(--smaint-navy)",
              }}
            >
              Details
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: "var(--smaint-surface-alt)",
                fontWeight: 600,
                color: "var(--smaint-navy)",
              }}
            >
              MP Status
            </TableCell>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                sx={{
                  backgroundColor: "var(--smaint-surface-alt)",
                  fontWeight: 600,
                  color: "var(--smaint-navy)",
                  textTransform: "capitalize",
                  minWidth: column.minWidth,
                  width: column.width,
                }}
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell
              sx={{
                backgroundColor: "#eef3ff",
                fontWeight: 600,
                color: "#0a1e3c",
              }}
            >
              More
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedRows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: row.mpTime === false ? "#f5fbff" : "#fff",
                cursor: "pointer",
              }}
              onClick={() => onRowClick?.(row.id)}
            >
              <TableCell>
                <Tooltip title="View Asset Details">
                  <IconButton
                    component={NavLink}
                    to={`/assetdetails/${row.id}`}
                    size="small"
                  >
                    <VisibilityIcon sx={{ color: "#1976d2" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <img
                  src={row.mpTime === false ? clock : correct}
                  alt={row.mpTime === false ? "MP due" : "MP OK"}
                  style={{
                    width: 26,
                    height: 26,
                    animation:
                      row.mpTime === false ? "blinkRed 1.2s linear infinite" : "none",
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.field}`} align="left">
                  {renderCell(column, row)}
                </TableCell>
              ))}
              <TableCell>
                <Tooltip title="Open equipment record">
                  <IconButton
                    component={NavLink}
                    to={{
                      pathname: "/equipmentDetail",
                      search: `?id=${row.id}`,
                    }}
                    size="small"
                  >
                    <InfoOutlinedIcon fontSize="small" sx={{ color: "#0f6466" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableAsset;
