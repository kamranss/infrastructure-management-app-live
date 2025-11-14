import React, { useEffect, useState } from "react";
import axios from "axios";
import CommonTable from "../Common/CommonTable";
import CommonFilter from "../Common/CommonFilter";
import PaginationComponent2 from "../Common/PaginationComponent2";

const detectServiceColumns = (data = []) => {
  if (!data.length) return [];
  return Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
    flex: 1,
  }));
};

const generateServiceFilterConfig = (data = []) => {
  if (!data.length) return [];
  return Object.keys(data[0]).map((key) => ({
    name: key,
    label: key.replace(/([A-Z])/g, " $1"),
    type: "text",
  }));
};

const ServiceFilterAndTable = () => {
  const [columns, setColumns] = useState([]);
  const [filtersConfig, setFiltersConfig] = useState([]);
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const SERVICE_LIST_ENDPOINT = import.meta.env.VITE_API_SERVICE_LIST_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}${SERVICE_LIST_ENDPOINT}`,
          {
            params: {
              page,
              take: pageSize,
              ...filters,
            },
          }
        );

        const items = data.items || [];
        setRows(items);
        setTotalCount(data.totalCount || 0);

        if (!columns.length) {
          setColumns(detectServiceColumns(items));
        }

        if (!filtersConfig.length) {
          setFiltersConfig(generateServiceFilterConfig(items));
        }
      } catch (err) {
        console.error("Error fetching service data:", err);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    // Optionally reset page
    // setPage(1);
  };

  return (
    <>
      <CommonFilter
        filtersConfig={filtersConfig}
        filters={filters}
        onChange={handleFilterChange}
      />
      <CommonTable
        columns={columns}
        rows={rows}
        detailRouteBase="/maintenance/service"
      />
      <PaginationComponent2
        size={pageSize}
        setSize={setPageSize}
        page={page}
        setPage={setPage}
        count={totalCount}
        recordSize={pageSize}
      />
    </>
  );
};

export default ServiceFilterAndTable;
