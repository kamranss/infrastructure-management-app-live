import React from "react";
import { Box, Pagination, Select, MenuItem } from "@mui/material";

const PaginationComponent = ({ page, setPage, count, size, setSize }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
      flexWrap="wrap"
      gap={2}
    >
      <Pagination
        count={Math.ceil(count / size)}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />

      <Select
        size="small"
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
          setPage(1); // reset to first page when page size changes
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </Box>
  );
};

export default PaginationComponent;
