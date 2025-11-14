// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
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
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import clock from "/src/assets/icons/clock.png";
// import correct from "/src/assets/icons/correct.png";

// const TableAssetMp = ({ maintenancePlans = [], onServiceClick }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleCompleteMp = async (row) => {
//     const setting = row?.maintenanceSettingsList?.[0];
//     if (!setting?.id) {
//       return Swal.fire(
//         "Error",
//         "Maintenance setting data is missing.",
//         "error"
//       );
//     }

//     const requestData = {
//       MaintenancePlanId: null,
//       EquipmentId: null,
//       EquSettingid: setting.id,
//     };

//     const { value } = await Swal.fire({
//       title: "Complete Maintenance?",
//       text: "Are you sure you want to complete this MP?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, complete it!",
//     });

//     if (!value) return;

//     try {
//       await axios.post(
//         "https://localhost:7066/api/MaintenancePlan/CompletMp",
//         requestData,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );
//       Swal.fire("Done!", "Maintenance plan completed.", "success").then(() =>
//         window.location.reload()
//       );
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to complete the MP.", "error");
//     }
//   };

//   return (
//     <>
//       <style>
//         {`
//           .blink {
//             animation: blink 1.2s infinite;
//           }
//           @keyframes blink {
//             0% { opacity: 1; }
//             50% { opacity: 0.1; }
//             100% { opacity: 1; }
//           }
//         `}
//       </style>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead
//             sx={{
//               backgroundColor: "rgb(190, 213, 236)",
//             }}
//           >
//             <TableRow>
//               <TableCell>Status</TableCell>
//               <TableCell>ID</TableCell>
//               <TableCell>Code</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Sequence Value</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {maintenancePlans
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 const isCompleted =
//                   row?.maintenanceSettingsList?.[0]?.isMpCompleted;

//                 return (
//                   <TableRow key={row.id}>
//                     {/* <TableCell>
//                       {isCompleted === false || isCompleted === null ? (
//                         <AccessTimeIcon
//                           titleAccess="Not Completed"
//                           color="warning"
//                           className="blink"
//                         />
//                       ) : (
//                         <CheckCircleIcon
//                           titleAccess="Completed"
//                           color="success"
//                         />
//                       )}
//                     </TableCell> */}
//                     <TableCell>
//                       <img
//                         src={
//                           isCompleted === false || isCompleted === null
//                             ? clock
//                             : correct
//                         }
//                         alt={
//                           isCompleted === false || isCompleted === null
//                             ? "Not Completed"
//                             : "Completed"
//                         }
//                         title={
//                           isCompleted === false || isCompleted === null
//                             ? "Not Completed"
//                             : "Completed"
//                         }
//                         style={{
//                           width: "24px",
//                           height: "24px",
//                           animation:
//                             isCompleted === false || isCompleted === null
//                               ? "blinkRed 1s linear infinite"
//                               : "none",
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell>{row.id}</TableCell>
//                     <TableCell>{row.code}</TableCell>
//                     <TableCell>{row.name}</TableCell>
//                     <TableCell>{row.description}</TableCell>
//                     <TableCell>
//                       {row.maintenanceSettingsList?.[0]?.sequenceValue || "-"}
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         size="small"
//                         color="primary"
//                         onClick={() => onServiceClick?.(row)}
//                         sx={{ fontSize: "12px", px: 1.5, py: 0.5 }}
//                       >
//                         Service
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={maintenancePlans.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default TableAssetMp;

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import clock from "/src/assets/icons/clock.png";
import correct from "/src/assets/icons/correct.png";

const TableAssetMp = ({ maintenancePlans = [], onServiceClick }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCompleteMp = async (row) => {
    const setting = row?.maintenanceSettingsList?.[0];
    if (!setting?.id) {
      return Swal.fire(
        "Error",
        "Maintenance setting data is missing.",
        "error"
      );
    }

    const requestData = {
      MaintenancePlanId: null,
      EquipmentId: null,
      EquSettingid: setting.id,
    };

    const { value } = await Swal.fire({
      title: "Complete Maintenance?",
      text: "Are you sure you want to complete this MP?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, complete it!",
    });

    if (!value) return;

    try {
      await axios.post(
        "https://localhost:7066/api/MaintenancePlan/CompletMp",
        requestData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      Swal.fire("Done!", "Maintenance plan completed.", "success").then(() =>
        window.location.reload()
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to complete the MP.", "error");
    }
  };

  return (
    <>
      <style>
        {`
          .blink {
            animation: blink 1.2s infinite;
          }
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.1; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(190, 213, 236)" }}>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Sequence Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenancePlans
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isCompleted =
                  row?.maintenanceSettingsList?.[0]?.isMpCompleted;
                const isMpTime = row?.mpTime === true;

                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      <img
                        src={
                          isCompleted === false || isCompleted === null
                            ? clock
                            : correct
                        }
                        alt={
                          isCompleted === false || isCompleted === null
                            ? "Not Completed"
                            : "Completed"
                        }
                        title={
                          isCompleted === false || isCompleted === null
                            ? "Not Completed"
                            : "Completed"
                        }
                        style={{
                          width: "24px",
                          height: "24px",
                          animation:
                            isCompleted === false || isCompleted === null
                              ? "blinkRed 1s linear infinite"
                              : "none",
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {row.maintenanceSettingsList?.[0]?.sequenceValue || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => onServiceClick?.(row)}
                        disabled={isMpTime}
                        // disabled={row?.mpTime === true}
                        sx={{ fontSize: "12px", px: 1.5, py: 0.5 }}
                      >
                        Service
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={maintenancePlans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableAssetMp;
