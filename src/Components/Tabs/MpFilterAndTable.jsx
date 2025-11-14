// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CommonTable from "../Common/CommonTable";
// import CommonFilter from "../Common/CommonFilter";
// import PaginationComponent2 from "../Common/PaginationComponent2";

// const detectColumns = (data = []) => {
//   if (!data.length) return [];
//   return Object.keys(data[0]).map((key) => ({
//     field: key,
//     headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
//     flex: 1,
//   }));
// };

// const generateFilterConfig = (data = []) => {
//   if (!data.length) return [];
//   return Object.keys(data[0]).map((key) => ({
//     name: key,
//     label: key.replace(/([A-Z])/g, " $1"),
//     type: "text",
//   }));
// };

// const MpFilterAndTable = ({ activeTab }) => {
//   const [columns, setColumns] = useState([]);
//   const [filtersConfig, setFiltersConfig] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [rows, setRows] = useState([]);

//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const MP_LIST_ENDPOINT = import.meta.env.VITE_API_MP_LIST_ENDPOINT;

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}${MP_LIST_ENDPOINT}?page=${page}&pageSize=${pageSize}`
//       );
//       const data = response.data;
//       const items = data.items || [];

//       setRows(items);
//       setTotalCount(data.totalCount || items.length);
//       setColumns(detectColumns(items));
//       setFiltersConfig(generateFilterConfig(items));
//     } catch (err) {
//       console.error("Error fetching MP data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [activeTab, page, pageSize]);

//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const filteredRows = rows.filter((row) =>
//     Object.entries(filters).every(([key, val]) =>
//       val
//         ? String(row[key] || "")
//             .toLowerCase()
//             .includes(val.toLowerCase())
//         : true
//     )
//   );

//   return (
//     <>
//       <CommonFilter
//         filtersConfig={filtersConfig}
//         filters={filters}
//         onChange={handleFilterChange}
//       />
//       <CommonTable columns={columns} rows={filteredRows} />
//       <PaginationComponent2
//         size={pageSize}
//         setSize={setPageSize}
//         page={page}
//         setPage={setPage}
//         count={totalCount}
//         recordSize={pageSize}
//       />
//     </>
//   );
// };

// export default MpFilterAndTable;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommonTable from "../Common/CommonTable";
import CommonFilter from "../Common/CommonFilter";
import PaginationComponent2 from "../Common/PaginationComponent2";

// ✅ Updated to inject STATUS column
const detectColumns = (data = []) => {
  if (!data.length) return [];

  const baseCols = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.replace(/([A-Z])/g, " $1").toUpperCase(),
    flex: 1,
  }));

  return [
    ...baseCols,
    {
      field: "statusDisplay",
      headerName: "STATUS",
      flex: 1,
      renderCell: (params) => {
        const isActive = params.row.isActive;
        return (
          <div
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: isActive ? "#c8e6c9" : "#ffcdd2",
              color: isActive ? "#256029" : "#b71c1c",
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        );
      },
    },
  ];
};

const generateFilterConfig = (data = []) => {
  if (!data.length) return [];
  return Object.keys(data[0]).map((key) => ({
    name: key,
    label: key.replace(/([A-Z])/g, " $1"),
    type: "text",
  }));
};

const MpFilterAndTable = ({ activeTab }) => {
  const [columns, setColumns] = useState([]);
  const [filtersConfig, setFiltersConfig] = useState([]);
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const MP_LIST_ENDPOINT = import.meta.env.VITE_API_MP_LIST_ENDPOINT;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${MP_LIST_ENDPOINT}?page=${page}&pageSize=${pageSize}`
      );
      const data = response.data;
      const items = data.items || [];

      setRows(items);
      setTotalCount(data.totalCount || items.length);
      setColumns(detectColumns(items));
      setFiltersConfig(generateFilterConfig(items));
    } catch (err) {
      console.error("Error fetching MP data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, page, pageSize]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredRows = rows.filter((row) =>
    Object.entries(filters).every(([key, val]) =>
      val
        ? String(row[key] || "")
            .toLowerCase()
            .includes(val.toLowerCase())
        : true
    )
  );

  return (
    <>
      <CommonFilter
        filtersConfig={filtersConfig}
        filters={filters}
        onChange={handleFilterChange}
      />
      {/* <CommonTable columns={columns} rows={filteredRows} /> */}

      <CommonTable
        columns={columns}
        rows={filteredRows}
        onView={(row) => navigate(`/maintenance-plan/${row.id}`)}
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

export default MpFilterAndTable;
