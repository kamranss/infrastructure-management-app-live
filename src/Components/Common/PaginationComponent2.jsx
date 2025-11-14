import {
  Box,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
} from "@mui/material";
// import React, { useState } from "react";
import {
  HiMiniChevronDoubleRight,
  HiMiniChevronDoubleLeft,
  HiMiniChevronLeft,
  // HiMiniChevronRight,
  // HiMiniChevronDown,
} from "react-icons/hi2";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
const PaginationComponent2 = ({
  size,
  setSize,
  page,
  setPage,
  count,
  recordSize,
}) => {
  const amountPages = Math.ceil(count / recordSize);
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      mt={3}
      p={2}
      width="100%"
      className="pagination"
    >
      <Select
        value={size || 10}
        onChange={(e) => setSize(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={() => <HiChevronDown className="select-icon" />}
        className="select-mui"
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
      </Select>
      <Pagination
        showFirstButton
        showLastButton
        page={page}
        count={amountPages}
        onChange={(event, newPage) => setPage(newPage)}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: HiMiniChevronLeft,
              next: HiChevronRight,
              first: HiMiniChevronDoubleLeft,
              last: HiMiniChevronDoubleRight,
            }}
            {...item}
          />
        )}
      />
    </Box>
  );
};
export default PaginationComponent2;
