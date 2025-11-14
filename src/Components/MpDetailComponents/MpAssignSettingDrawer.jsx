// import React, { useState } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Checkbox,
//   TextField,
//   Button,
//   Grid,
//   Divider,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const MpAssignSettingDrawer = ({
//   open,
//   onClose,
//   equipments,
//   mpId,
//   onSuccess,
// }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     startValue: "",
//     sequenceValue: "",
//     sequenceDateValue: "",
//     resetDate: "",
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const handleSelect = (equipment) => {
//     const isSelected = selectedId === equipment.id;
//     if (isSelected) {
//       setSelectedId(null);
//       setFormData({
//         startValue: "",
//         sequenceValue: "",
//         sequenceDateValue: "",
//         resetDate: "",
//       });
//     } else {
//       setSelectedId(equipment.id);
//       setFormData((prev) => ({
//         ...prev,
//         startValue: equipment.currentValue ?? 0,
//       }));
//     }
//   };

//   const handleChange = (field) => (event) => {
//     setFormData((prev) => ({ ...prev, [field]: event.target.value }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedId) return;

//     const payload = {
//       equipmentId: selectedId,
//       maintenancePlanId: Number(mpId),
//       startValue: Number(formData.startValue),
//       sequenceValue: Number(formData.sequenceValue),
//       sequenceDateValue: Number(formData.sequenceDateValue),
//       resetDate: formData.resetDate,
//     };

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_API_MAINTENANCE_SETTING_ASSIGN
//         }`,
//         payload
//       );
//       setSnackbar({
//         open: true,
//         message: "Setting assigned successfully",
//         severity: "success",
//       });
//       onSuccess();
//       onClose();
//     } catch (error) {
//       const msg = error.response?.data?.error || "Failed to assign setting";
//       setSnackbar({ open: true, message: msg, severity: "error" });
//     }
//   };

//   return (
//     <>
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={onClose}
//         PaperProps={{
//           sx: {
//             width: "35%",
//             height: "65%",
//             marginTop: "17%",
//             borderTopLeftRadius: 16,
//             borderBottomLeftRadius: 16,
//             overflow: "hidden",
//             p: 2,
//             bgcolor: "#f9f9f9",
//           },
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Setup Maintenance Setting
//         </Typography>

//         <Grid container spacing={2} mb={2}>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               label="Start Value"
//               value={formData.startValue}
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               label="Sequence Value"
//               value={formData.sequenceValue}
//               onChange={handleChange("sequenceValue")}
//               disabled={!selectedId}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <TextField
//               fullWidth
//               label="Sequence Date Value"
//               value={formData.sequenceDateValue}
//               onChange={handleChange("sequenceDateValue")}
//               disabled={!selectedId}
//             />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DateTimePicker
//                 label="Reset Date"
//                 value={formData.resetDate ? dayjs(formData.resetDate) : null}
//                 onChange={(newValue) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     resetDate: newValue ? newValue.toISOString() : "",
//                   }))
//                 }
//                 disabled={!selectedId}
//                 slotProps={{ textField: { fullWidth: true } }}
//               />
//             </LocalizationProvider>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 2 }} />

//         <Box flexGrow={1} overflow="auto">
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Select</TableCell>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Current Value</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {equipments?.items?.map((eq) => {
//                 const isSelected = selectedId === eq.id;
//                 return (
//                   <TableRow key={eq.id}>
//                     <TableCell>
//                       <Checkbox
//                         checked={isSelected}
//                         onChange={() => handleSelect(eq)}
//                         disabled={selectedId !== null && !isSelected}
//                       />
//                     </TableCell>
//                     <TableCell>{eq.id}</TableCell>
//                     <TableCell>{eq.name}</TableCell>
//                     <TableCell>{eq.description}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           backgroundColor:
//                             eq.status?.toUpperCase() === "ACTIVE"
//                               ? "green"
//                               : "brown",
//                           color: "#fff",
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: 1,
//                           fontSize: "0.75rem",
//                           textTransform: "capitalize",
//                           display: "inline-block",
//                         }}
//                       >
//                         {eq.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{eq.currentValue ?? 0}</TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </Box>

//         <Box mt={2} display="flex" justifyContent="flex-end">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={!selectedId}
//           >
//             Assign Setting
//           </Button>
//         </Box>
//       </Drawer>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default MpAssignSettingDrawer;

// import React, { useState } from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Checkbox,
//   TextField,
//   Button,
//   Grid,
//   Divider,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import PaginationComponent2 from "../Common/PaginationComponent2";
// import axios from "axios";

// const MpAssignSettingDrawer = ({
//   open,
//   onClose,
//   equipments,
//   mpId,
//   onSuccess,
// }) => {
//   const [selectedId, setSelectedId] = useState(null);
//   const [formData, setFormData] = useState({
//     startValue: "",
//     sequenceValue: "",
//     sequenceDateValue: "",
//     resetDate: "",
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   const handleSelect = (equipment) => {
//     const isSelected = selectedId === equipment.id;
//     if (isSelected) {
//       setSelectedId(null);
//       setFormData({
//         startValue: "",
//         sequenceValue: "",
//         sequenceDateValue: "",
//         resetDate: "",
//       });
//     } else {
//       setSelectedId(equipment.id);
//       setFormData((prev) => ({
//         ...prev,
//         startValue: equipment.currentValue ?? 0,
//       }));
//     }
//   };

//   const handleChange = (field) => (event) => {
//     setFormData((prev) => ({ ...prev, [field]: event.target.value }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedId) return;

//     const payload = {
//       equipmentId: selectedId,
//       maintenancePlanId: Number(mpId),
//       startValue: Number(formData.startValue),
//       sequenceValue: Number(formData.sequenceValue),
//       sequenceDateValue: Number(formData.sequenceDateValue),
//       resetDate: formData.resetDate,
//     };

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_API_MAINTENANCE_SETTING_ASSIGN
//         }`,
//         payload
//       );
//       setSnackbar({
//         open: true,
//         message: "Setting assigned successfully",
//         severity: "success",
//       });
//       onSuccess();
//       onClose();
//     } catch (error) {
//       const msg = error.response?.data?.error || "Failed to assign setting";
//       setSnackbar({ open: true, message: msg, severity: "error" });
//     }
//   };

//   const paginatedItems = equipments?.items?.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   return (
//     <>
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={onClose}
//         PaperProps={{
//           sx: {
//             width: "35%",
//             height: "64%",
//             marginTop: "17%",
//             borderTopLeftRadius: 16,
//             borderBottomLeftRadius: 16,
//             overflow: "hidden",
//             p: 2,
//             bgcolor: "#f9f9f9",
//           },
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Setup Maintenance Setting
//         </Typography>

//         <Box p={2} mb={3} borderRadius={2} bgcolor="#f0f4f8">
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 label="Start Value"
//                 value={formData.startValue}
//                 disabled
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 label="Sequence Value"
//                 value={formData.sequenceValue}
//                 onChange={handleChange("sequenceValue")}
//                 disabled={!selectedId}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 fullWidth
//                 label="Sequence Date Value"
//                 value={formData.sequenceDateValue}
//                 onChange={handleChange("sequenceDateValue")}
//                 disabled={!selectedId}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateTimePicker
//                   label="Reset Date"
//                   value={formData.resetDate ? dayjs(formData.resetDate) : null}
//                   onChange={(newValue) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       resetDate: newValue ? newValue.toISOString() : "",
//                     }))
//                   }
//                   disabled={!selectedId}
//                   slotProps={{ textField: { fullWidth: true } }}
//                 />
//               </LocalizationProvider>
//             </Grid>
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box flexGrow={1} overflow="auto">
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Select</TableCell>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Current Value</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedItems?.map((eq) => {
//                 const isSelected = selectedId === eq.id;
//                 return (
//                   <TableRow key={eq.id}>
//                     <TableCell>
//                       <Checkbox
//                         checked={isSelected}
//                         onChange={() => handleSelect(eq)}
//                         disabled={selectedId !== null && !isSelected}
//                       />
//                     </TableCell>
//                     <TableCell>{eq.id}</TableCell>
//                     <TableCell>{eq.name}</TableCell>
//                     <TableCell>{eq.description}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           backgroundColor:
//                             eq.status?.toUpperCase() === "ACTIVE"
//                               ? "green"
//                               : "brown",
//                           color: "#fff",
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: 1,
//                           fontSize: "0.75rem",
//                           textTransform: "capitalize",
//                           display: "inline-block",
//                         }}
//                       >
//                         {eq.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{eq.currentValue ?? 0}</TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </Box>

//         <PaginationComponent2
//           size={pageSize}
//           setSize={setPageSize}
//           page={page}
//           setPage={setPage}
//           count={equipments?.totalCount || 0}
//           recordSize={pageSize}
//         />

//         <Box mt={2} display="flex" justifyContent="flex-end">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={!selectedId}
//           >
//             Assign Setting
//           </Button>
//         </Box>
//       </Drawer>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default MpAssignSettingDrawer;

import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Typography,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Button,
  Grid,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import PaginationComponent2 from "../Common/PaginationComponent2";
import axios from "axios";

const MpAssignSettingDrawer = ({
  open,
  onClose,
  equipments,
  mpId,
  onSuccess,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    startValue: "",
    sequenceValue: "",
    sequenceDateValue: "",
    resetDate: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSelect = (equipment) => {
    const isSelected = selectedId === equipment.id;
    if (isSelected) {
      setSelectedId(null);
      setFormData({
        startValue: "",
        sequenceValue: "",
        sequenceDateValue: "",
        resetDate: "",
      });
    } else {
      setSelectedId(equipment.id);
      setFormData((prev) => ({
        ...prev,
        startValue: equipment.currentValue ?? 0,
      }));
    }
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    if (!selectedId) return;

    const payload = {
      equipmentId: selectedId,
      maintenancePlanId: Number(mpId),
      startValue: isNaN(Number(formData.startValue))
        ? 0
        : Number(formData.startValue),
      sequenceValue: isNaN(Number(formData.sequenceValue))
        ? null
        : Number(formData.sequenceValue),
      sequenceDateValue: isNaN(Number(formData.sequenceDateValue))
        ? null
        : Number(formData.sequenceDateValue),
      resetDate: formData.resetDate || null,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_MAINTENANCE_SETTING_ASSIGN
        }`,
        payload
      );
      setSnackbar({
        open: true,
        message: "Setting assigned successfully",
        severity: "success",
      });
      onSuccess();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to assign setting";
      setSnackbar({ open: true, message: msg, severity: "error" });
    }
  };

  const paginatedItems = equipments?.items?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: "35%",
            height: "64%",
            marginTop: "17%",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            overflow: "hidden",
            p: 2,
            bgcolor: "#f9f9f9",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Setup Maintenance Setting
        </Typography>

        <Box p={2} mb={3} borderRadius={2} bgcolor="#f0f4f8">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Start Value"
                value={formData.startValue}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Sequence Value"
                value={formData.sequenceValue}
                onChange={handleChange("sequenceValue")}
                disabled={!selectedId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Sequence Date Value"
                value={formData.sequenceDateValue}
                onChange={handleChange("sequenceDateValue")}
                disabled={!selectedId}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Reset Date"
                  value={formData.resetDate ? dayjs(formData.resetDate) : null}
                  onChange={(newValue) =>
                    setFormData((prev) => ({
                      ...prev,
                      resetDate: newValue ? newValue.toISOString() : "",
                    }))
                  }
                  disabled={!selectedId}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box flexGrow={1} overflow="auto">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Current Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedItems?.map((eq) => {
                const isSelected = selectedId === eq.id;
                return (
                  <TableRow key={eq.id}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelect(eq)}
                        disabled={selectedId !== null && !isSelected}
                      />
                    </TableCell>
                    <TableCell>{eq.id}</TableCell>
                    <TableCell>{eq.name}</TableCell>
                    <TableCell>{eq.description}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            eq.status?.toUpperCase() === "ACTIVE"
                              ? "green"
                              : "brown",
                          color: "#fff",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.75rem",
                          textTransform: "capitalize",
                          display: "inline-block",
                        }}
                      >
                        {eq.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {console.log("EQ currentValue", eq.id, eq.currentValue)}
                      {eq.currentValue ?? "null"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        <PaginationComponent2
          size={pageSize}
          setSize={setPageSize}
          page={page}
          setPage={setPage}
          count={equipments?.totalCount || 0}
          recordSize={pageSize}
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedId}
          >
            Assign Setting
          </Button>
        </Box>
      </Drawer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MpAssignSettingDrawer;
