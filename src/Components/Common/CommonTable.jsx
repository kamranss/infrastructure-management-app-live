// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const CommonTable = ({ columns = [], rows = [], onView }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//             {onView && (
//               <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                 Details
//               </TableCell>
//             )}
//             {columns.map((col) => (
//               <TableCell
//                 key={col.field}
//                 sx={{
//                   fontWeight: "bold",
//                   backgroundColor: "#e3f2fd",
//                   color: "#333",
//                   borderBottom: "2px solid #ccc",
//                 }}
//               >
//                 {col.headerName}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {rows.map((row, idx) => (
//             <TableRow key={idx}>
//               {onView && (
//                 <TableCell>
//                   <Tooltip title="View Details">
//                     <IconButton onClick={() => onView(row)} size="small">
//                       <VisibilityIcon color="primary" />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               )}
//               {columns.map((col) => (
//                 <TableCell key={col.field}>{row[col.field]}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default CommonTable;

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const CommonTable = ({ columns = [], rows = [], onView }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//             {onView && (
//               <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
//                 Details
//               </TableCell>
//             )}
//             {columns.map((col) => (
//               <TableCell
//                 key={col.field}
//                 sx={{
//                   fontWeight: "bold",
//                   backgroundColor: "#e3f2fd",
//                   color: "#333",
//                   borderBottom: "2px solid #ccc",
//                 }}
//               >
//                 {col.headerName}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {rows.map((row, idx) => (
//             <TableRow key={idx}>
//               {onView && (
//                 <TableCell>
//                   <Tooltip title="View Details">
//                     <IconButton onClick={() => onView(row)} size="small">
//                       <VisibilityIcon color="primary" />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               )}
//               {columns.map((col) => (
//                 <TableCell key={col.field}>
//                   {col.renderCell ? col.renderCell({ row }) : row[col.field]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default CommonTable;

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

const CommonTable = ({ columns = [], rows = [], onView }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
            {onView && (
              <TableCell sx={{ fontWeight: "bold", color: "#333" }}>
                Details
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#e3f2fd",
                  color: "#333",
                  borderBottom: "2px solid #ccc",
                }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {onView && (
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton onClick={() => onView(row)} size="small">
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.field}>
                  {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
