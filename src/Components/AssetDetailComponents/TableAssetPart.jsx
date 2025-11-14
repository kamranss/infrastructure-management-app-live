// // MaintenancePlanTable.js

// import React, { useState } from "react";
// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
// } from "@mui/material";

// const TableAssetPart = ({ parts }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleButtonClick = (row) => {
//     // Implement your logic to send a request to another table
//     console.log("Button clicked for row:", row);
//     // You can send a request or perform any action here
//   };

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead
//             sx={{
//               backgroundColor: "rgb(190, 213, 236)",
//             }}
//           >
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Code</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>remove</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {parts
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.id}</TableCell>
//                   <TableCell>{row.code}</TableCell>
//                   <TableCell>{row.name}</TableCell>
//                   {/* <TableCell>{row.isActive}</TableCell> */}
//                   <Button
//                     variant="contained"
//                     style={{
//                       fontSize: "12px",
//                       padding: "4px 5px",
//                       marginTop: "10px",
//                     }}
//                     color="primary"
//                     onClick={() => handleButtonClick(row)}
//                   >
//                     Remove Part
//                   </Button>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={parts.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default TableAssetPart;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Tooltip,
} from "@mui/material";

const TableAssetPart = ({ parts = [] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRemove = (part) => {
    // Implement your logic to remove part from asset
    console.log("Removing part:", part);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(190, 213, 236)" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Reorder Limit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.reorderLimit ?? "-"}</TableCell>
                  <TableCell>
                    <Tooltip title="Remove this part">
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => handleRemove(row)}
                      >
                        Remove
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={parts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableAssetPart;
