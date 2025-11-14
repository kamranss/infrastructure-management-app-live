import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Pagination,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import axios from "axios";
import InventoryTable from "../Components/Tables/InventoryTable";
import PaginationComponent from "../Components/Common/PaginationComponent";

const staticLowStockParts = [
  { id: 1, code: "OFL", name: "Oil Filter", quantity: 2 },
  { id: 2, code: "AFL", name: "Air Filter", quantity: 1 },
  { id: 3, code: "ENO", name: "Engine Oil", quantity: 3 },
  { id: 4, code: "TRN", name: "Transmission Oil", quantity: 2 },
  { id: 5, code: "GRB", name: "Gear_Box Oil", quantity: 1 },
  { id: 6, code: "WHL", name: "Wheels", quantity: 2 },
  { id: 7, code: "ANF", name: "Antifreeze", quantity: 1 },
  { id: 8, code: "BRK", name: "Brake Pads", quantity: 3 },
  { id: 9, code: "BOL", name: "Bolts", quantity: 1 },
  { id: 10, code: "SCR", name: "Screws", quantity: 2 },
];

const ITEMS_PART_SIDEBAR_PER_PAGE = 5;

const InventoryPage = () => {
  const [sidebarPage, setSidebarPage] = useState(1);
  const [inventory, setInventory] = useState({ items: [], totalCount: 0 });
  const [tablePage, setTablePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    code: "",
    name: "",
    reachedLimit: false,
  });

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_ALL_PART_PAGE
        }`,
        {
          params: {
            page: tablePage,
            pageSize,
            code: filters.code,
            name: filters.name,
            reachedLimit: filters.reachedLimit,
          },
        }
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [tablePage, pageSize, filters]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setTablePage(1); // reset pagination
  };

  const paginatedSidebarParts = staticLowStockParts.slice(
    (sidebarPage - 1) * ITEMS_PART_SIDEBAR_PER_PAGE,
    sidebarPage * ITEMS_PART_SIDEBAR_PER_PAGE
  );

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              backgroundColor: "#e3f2fd", // Light blue
              p: 2,
              borderRadius: "12px",
              mb: 2,
              mt: "1.5rem",
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight="bold"
                  textAlign="left"
                >
                  5
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Reached Limit
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h4"
                  color="#d32f2f"
                  fontWeight="bold"
                  textAlign="right"
                >
                  2
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="right"
                >
                  Priority Parts
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Box
            sx={{
              backgroundColor: "rgba(114, 172, 231, 0.2)",
              borderRadius: "8px",
              p: 1,
              mt: "1.5rem",
              // height: "100%",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                mt: "0.4rem",
                mb: 2,
                p: 1.9,
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                borderRadius: "8px",
                fontWeight: "bold",
                color: "#1976d2",
                textAlign: "center",
              }}
            >
              Low Stock Parts Inventory
            </Typography>

            {paginatedSidebarParts.map((part) => (
              <Card
                key={part.id}
                sx={{ mb: 2, backgroundColor: "rgb(129, 182, 224)" }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight="bold">
                      {part.code} - {part.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={part.quantity}
                    sx={{
                      backgroundColor: "#d32f2f",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </CardContent>
              </Card>
            ))}

            <Pagination
              count={Math.ceil(
                staticLowStockParts.length / ITEMS_PART_SIDEBAR_PER_PAGE
              )}
              page={sidebarPage}
              onChange={(_, value) => setSidebarPage(value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Grid>

        {/* Table & Filters */}
        <Grid item xs={12} md={9}>
          <Box
            className="asset-page-filter"
            gap={2}
            flexWrap="wrap"
            mb={2}
            display="flex"
          >
            <TextField
              type="text"
              name="code"
              label="Filter by Code"
              value={filters.code}
              onChange={handleFilterChange}
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root fieldset": { border: "none" },
                borderRadius: "6px",
              }}
            />
            <TextField
              type="text"
              name="name"
              label="Filter by Name"
              value={filters.name}
              onChange={handleFilterChange}
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root fieldset": { border: "none" },
                borderRadius: "6px",
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="reachedLimit"
                  checked={filters.reachedLimit}
                  onChange={handleFilterChange}
                />
              }
              label="Reached Limit"
            />
            <Select
              size="small"
              value={pageSize}
              onChange={(e) => {
                setPageSize(e.target.value);
                setTablePage(1);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <InventoryTable rows={inventory.items} />
              <Box display="flex" justifyContent="center" mt={2}>
                {/* <Pagination
                  count={Math.ceil(inventory.totalCount / pageSize)}
                  page={tablePage}
                  onChange={(_, value) => setTablePage(value)}
                  color="primary"
                /> */}
                <PaginationComponent
                  page={tablePage}
                  setPage={setTablePage}
                  count={inventory.totalCount}
                  size={pageSize}
                  setSize={setPageSize}
                />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryPage;
