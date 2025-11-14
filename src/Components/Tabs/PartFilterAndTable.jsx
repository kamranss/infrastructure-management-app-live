// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CommonTable from "../Common/CommonTable";
// import CommonFilter from "../Common/CommonFilter";
// import PaginationComponent2 from "../Common/PaginationComponent2";

// const detectPartColumns = (data = []) => {
//   if (!data.length) return [];
//   return Object.keys(data[0]).map((key) => ({
//     field: key,
//     headerName: key.charAt(0).toUpperCase() + key.slice(1),
//     flex: 1,
//   }));
// };

// const generatePartFilterConfig = (data = []) => {
//   if (!data.length) return [];
//   return Object.keys(data[0]).map((key) => ({
//     name: key,
//     label: key,
//     type: "text",
//   }));
// };

// const PartFilterAndTable = () => {
//   const [columns, setColumns] = useState([]);
//   const [filtersConfig, setFiltersConfig] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [rows, setRows] = useState([]);
//   const [pageSize, setPageSize] = useState(10);
//   const [page, setPage] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const PART_LIST_ENDPOINT = import.meta.env.VITE_API_ALL_PART_LIST_PAGE;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get(
//           `${API_BASE_URL}${PART_LIST_ENDPOINT}`,
//           {
//             params: {
//               page,
//               pageSize,
//               ...filters,
//             },
//           }
//         );

//         const items = data.items || [];
//         setRows(items);
//         setTotalCount(data.totalCount || 0);

//         if (!columns.length) {
//           setColumns(detectPartColumns(items));
//         }

//         if (!filtersConfig.length) {
//           setFiltersConfig(generatePartFilterConfig(items));
//         }
//       } catch (err) {
//         console.error("Error fetching part data:", err);
//       }
//     };

//     fetchData();
//   }, [page, pageSize]);

//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <>
//       <CommonFilter
//         filtersConfig={filtersConfig}
//         filters={filters}
//         onChange={handleFilterChange}
//       />
//       <CommonTable
//         columns={columns}
//         rows={rows}
//         detailRouteBase="/maintenance/part"
//       />
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

// export default PartFilterAndTable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CommonTable from "../Common/CommonTable";
import CommonFilter from "../Common/CommonFilter";
import PaginationComponent2 from "../Common/PaginationComponent2";

// ✅ Enhanced column detector with custom STATUS renderer
const detectPartColumns = (data = []) => {
  if (!data.length) return [];

  const baseCols = Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1),
    flex: 1,
  }));

  return [
    ...baseCols,
    {
      field: "statusDisplay",
      headerName: "Status",
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

const generatePartFilterConfig = (data = []) => {
  if (!data.length) return [];
  return Object.keys(data[0]).map((key) => ({
    name: key,
    label: key,
    type: "text",
  }));
};

const PartFilterAndTable = () => {
  const [columns, setColumns] = useState([]);
  const [filtersConfig, setFiltersConfig] = useState([]);
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const PART_LIST_ENDPOINT = import.meta.env.VITE_API_ALL_PART_LIST_PAGE;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}${PART_LIST_ENDPOINT}`,
          {
            params: {
              page,
              pageSize,
              ...filters,
            },
          }
        );

        const items = data.items || [];
        setRows(items);
        setTotalCount(data.totalCount || 0);

        if (!columns.length) {
          setColumns(detectPartColumns(items));
        }

        if (!filtersConfig.length) {
          setFiltersConfig(generatePartFilterConfig(items));
        }
      } catch (err) {
        console.error("Error fetching part data:", err);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
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
        detailRouteBase="/maintenance/part"
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

export default PartFilterAndTable;
