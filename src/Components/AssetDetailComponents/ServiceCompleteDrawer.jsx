// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Typography,
//   Drawer,
//   TextField,
//   MenuItem,
//   Button,
//   Divider,
//   Grid,
// } from "@mui/material";
// import axios from "axios";

// const ServiceCompleteDrawer = ({
//   open,
//   onClose,
//   equipment,
//   mp,
//   service,
//   parts,
//   onSuccess,
// }) => {
//   const [partId, setPartId] = useState("");
//   const [usedQuantity, setUsedQuantity] = useState("");

//   const handleSubmit = async () => {
//     if (!partId || !usedQuantity) return;

//     const dto = {
//       equipmentId: equipment.id,
//       serviceId: service.id,
//       mpId: mp.id,
//       partId: parseInt(partId),
//       usedQuantity: parseInt(usedQuantity),
//       completedBy: "Kamil",
//       completedDate: new Date().toISOString(),
//     };

//     console.log("🟢 DTO being sent:", dto);

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}${
//           import.meta.env.VITE_API_SERVICE_COMPLETE
//         }`,
//         dto
//       );

//       Swal.fire({
//         title: "Success!",
//         text: "Service marked as completed.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         window.location.reload();
//       });

//       onSuccess?.();
//       onClose();
//     } catch (error) {
//       console.error("❌ Full Axios error:", error);
//       const errorMsg =
//         error?.response?.data ||
//         "Failed to complete service. Please try again.";

//       Swal.fire({
//         title: "Success!",
//         text: "Service marked as completed.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         onSuccess?.(); // ✅ Triggers data refresh in MpServiceDrawer
//         onClose(); // ✅ Closes drawer
//       });
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           height: "30%",
//           width: "37%",
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//           borderBottomLeftRadius: 16,
//           borderBottomRightRadius: 16,
//           p: 3,
//           bgcolor: "#fefefe",
//         },
//       }}
//     >
//       <Typography variant="h6" mb={2}>
//         Complete Service
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <TextField
//             fullWidth
//             label="Equipment"
//             value={equipment.name}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <TextField
//             fullWidth
//             label="Maintenance Plan"
//             value={mp.name}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <TextField
//             fullWidth
//             label="Service"
//             value={service.name}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             select
//             fullWidth
//             label="Select Part"
//             value={partId}
//             onChange={(e) => setPartId(e.target.value)}
//           >
//             {parts.map((part) => (
//               <MenuItem key={part.id} value={part.id}>
//                 {part.name} (Qty: {part.quantity})
//               </MenuItem>
//             ))}
//           </TextField>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             type="number"
//             fullWidth
//             label="Used Quantity"
//             value={usedQuantity}
//             onChange={(e) => setUsedQuantity(e.target.value)}
//           />
//         </Grid>
//       </Grid>
//       <Divider sx={{ my: 2 }} />
//       <Box textAlign="right">
//         <Button variant="contained" onClick={handleSubmit}>
//           Complete Service
//         </Button>
//       </Box>
//     </Drawer>
//   );
// };

// export default ServiceCompleteDrawer;

import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Typography,
  Drawer,
  TextField,
  MenuItem,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import axios from "axios";

const ServiceCompleteDrawer = ({
  open,
  onClose,
  equipment,
  mp,
  service,
  parts,
  onSuccess,
}) => {
  const [partId, setPartId] = useState("");
  const [usedQuantity, setUsedQuantity] = useState("");

  // const handleSubmit = async () => {
  //   if (!partId || !usedQuantity) return;

  //   const dto = {
  //     equipmentId: equipment.id,
  //     serviceId: service.id,
  //     mpId: mp.id,
  //     partId: parseInt(partId),
  //     usedQuantity: parseInt(usedQuantity),
  //     completedBy: "Kamil",
  //     completedDate: new Date().toISOString(),
  //   };

  //   try {
  //     await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}${
  //         import.meta.env.VITE_API_SERVICE_COMPLETE
  //       }`,
  //       dto
  //     );

  //     Swal.fire({
  //       title: "Success!",
  //       text: "Service marked as completed.",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });

  //     onSuccess?.(); // ✅ Refresh service statuses
  //     onClose(); // ✅ Close the drawer
  //   } catch (error) {
  //     console.error("❌ Axios error:", error);
  //     const errorMsg = error?.response?.data || "Failed to complete service.";
  //     Swal.fire({
  //       title: "Error!",
  //       text: errorMsg,
  //       icon: "error",
  //       confirmButtonText: "Close",
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    if (!partId || !usedQuantity) return;

    const dto = {
      equipmentId: equipment.id,
      serviceId: service.id,
      mpId: mp.id,
      partId: parseInt(partId),
      usedQuantity: parseInt(usedQuantity),
      completedBy: "Kamil",
      completedDate: new Date().toISOString(),
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_API_SERVICE_COMPLETE
        }`,
        dto
      );

      // ✅ Show Swal FIRST, wait for user to click OK
      await Swal.fire({
        title: "Success!",
        text: "Service marked as completed.",
        icon: "success",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      // ✅ Then call parent refresh and close drawers
      onSuccess?.(); // refresh parent
      onClose(); // close this drawer
    } catch (error) {
      console.error("❌ Axios error:", error);

      Swal.fire({
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to complete service. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: "30%",
          width: "37%",
          borderRadius: 3,
          p: 3,
          bgcolor: "#fefefe",
        },
      }}
    >
      <Typography variant="h6" mb={2}>
        Complete Service
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Equipment"
            value={equipment.name}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Maintenance Plan"
            value={mp.name}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Service"
            value={service.name}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Select Part"
            value={partId}
            onChange={(e) => setPartId(e.target.value)}
          >
            {parts.map((part) => (
              <MenuItem key={part.id} value={part.id}>
                {part.name} (Qty: {part.quantity})
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            fullWidth
            label="Used Quantity"
            value={usedQuantity}
            onChange={(e) => setUsedQuantity(e.target.value)}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box textAlign="right">
        <Button variant="contained" onClick={handleSubmit}>
          Complete Service
        </Button>
      </Box>
    </Drawer>
  );
};

export default ServiceCompleteDrawer;
