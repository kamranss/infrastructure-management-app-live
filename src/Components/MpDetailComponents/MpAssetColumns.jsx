// import { IconButton, Tooltip } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { NavLink } from "react-router-dom";

// const MpAssetColumns = () => {
//   // 🛠 Updated status mapping for numeric values
//   const statusMapping = {
//     1: { label: "ACTIVE", color: "green" },
//     2: { label: "INACTIVE", color: "gray" },
//     3: { label: "REPAIR", color: "orange" },
//     4: { label: "IN_USE", color: "blue" },
//     5: { label: "CONCERVATED", color: "purple" },
//   };

//   return [
//     { field: "name", headerName: "Name" },
//     { field: "description", headerName: "Description" },
//     {
//       field: "status",
//       headerName: "Status",
//       renderCell: ({ row }) => {
//         const statusInfo = statusMapping[row.status];
//         if (!statusInfo) return "-";

//         return (
//           <span style={{ fontWeight: "bold", color: statusInfo.color }}>
//             {statusInfo.label}
//           </span>
//         );
//       },
//     },
//     {
//       field: "isActive",
//       headerName: "Is Active",
//       renderCell: ({ row }) => (
//         <span style={{ fontWeight: "bold" }}>
//           {row?.isActive ? "Yes" : "No"}
//         </span>
//       ),
//     },
//     {
//       field: "details",
//       headerName: "Details",
//       renderCell: ({ row }) => (
//         <Tooltip title="View Asset Details">
//           <IconButton
//             component={NavLink}
//             to={`/assetdetails/${row.id}`}
//             size="small"
//           >
//             <VisibilityIcon sx={{ color: "#1976d2" }} />
//           </IconButton>
//         </Tooltip>
//       ),
//     },
//   ];
// };

// export default MpAssetColumns;

import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { NavLink } from "react-router-dom";

const MpAssetColumns = () => {
  // 🛠 Updated status mapping for numeric values
  const statusMapping = {
    1: { label: "ACTIVE", color: "green" },
    2: { label: "INACTIVE", color: "gray" },
    3: { label: "REPAIR", color: "orange" },
    4: { label: "IN_USE", color: "blue" },
    5: { label: "CONCERVATED", color: "purple" },
  };

  return [
    { field: "name", headerName: "Name" },
    { field: "description", headerName: "Description" },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ row }) => {
        const statusInfo = statusMapping[row.status];
        if (!statusInfo) return "-";
        return (
          <span style={{ fontWeight: "bold", color: statusInfo.color }}>
            {statusInfo.label}
          </span>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Is Active",
      renderCell: ({ row }) => {
        const isYes = row?.isActive === true;
        return (
          <span
            style={{
              fontWeight: "bold",
              backgroundColor: isYes ? "#d4edda" : "transparent", // light green background
              color: isYes ? "#155724" : "#000", // dark green text if Yes
              padding: "4px 8px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            {isYes ? "Yes" : "No"}
          </span>
        );
      },
    },
    {
      field: "details",
      headerName: "Details",
      renderCell: ({ row }) => (
        <Tooltip title="View Asset Details">
          <IconButton
            component={NavLink}
            to={`/assetdetails/${row.id}`}
            size="small"
          >
            <VisibilityIcon sx={{ color: "#1976d2" }} />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
};

export default MpAssetColumns;
