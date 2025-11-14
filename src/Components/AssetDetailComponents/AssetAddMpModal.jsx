// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import {
//   Autocomplete,
//   TextField,
//   Button,
//   FormGroup,
//   FormLabel,
//   Box,
//   Modal,
//   Paper,
//   Typography,
// } from "@mui/material";

// const AssetAddMpModal = ({ isOpen, onClose, equipmentId, onMpaddSuccess }) => {
//   const MySwal = withReactContent(Swal);

//   const [mpOptions, setMpOptions] = useState([]);
//   const [selectedMp, setSelectedMp] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // 🔍 Fetch MP options
//   const fetchMpOptions = async (name = "") => {
//     try {
//       const response = await axios.get(
//         `https://localhost:7066/api/MaintenancePlan/DropDown`,
//         {
//           params: { name },
//         }
//       );

//       if (Array.isArray(response.data)) {
//         const mapped = response.data.map((item) => ({
//           id: item.id,
//           label: item.name, // Used by Autocomplete
//         }));
//         setMpOptions(mapped);
//       }
//     } catch (err) {
//       console.error("Error fetching MP options:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMpOptions(searchQuery);
//   }, [searchQuery]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedMp || !equipmentId) {
//       MySwal.fire(
//         "Missing Info",
//         "Please select a Maintenance Plan.",
//         "warning"
//       );
//       return;
//     }

//     try {
//       const payload = {
//         equipmentId: equipmentId,
//         mpid: selectedMp.id,
//       };

//       console.log("Submitting payload:", payload);

//       const response = await axios.post(
//         "https://localhost:7066/api/Equipment/AddMpToEquipment",
//         payload
//       );

//       if (response.status === 200) {
//         MySwal.fire(
//           "Success",
//           "Maintenance plan added successfully!",
//           "success"
//         );
//         onClose();
//         setSelectedMp(null);
//         setSearchQuery("");
//         onMpaddSuccess();
//       }
//     } catch (error) {
//       console.error("Submit error:", error);
//       MySwal.fire("Error", "Failed to add maintenance plan.", "error");
//     }
//   };

//   return (
//     <Modal open={isOpen} onClose={onClose}>
//       <Box
//         sx={{
//           width: 400,
//           maxWidth: "90%",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           borderRadius: 2,
//           p: 4,
//           mx: "auto",
//           mt: "10%",
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Add Maintenance Plan
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <FormGroup sx={{ mb: 2 }}>
//             <FormLabel>Select Maintenance Plan</FormLabel>
//             <Autocomplete
//               options={mpOptions}
//               value={selectedMp}
//               onChange={(e, newValue) => setSelectedMp(newValue)}
//               inputValue={searchQuery}
//               onInputChange={(e, newInputValue) =>
//                 setSearchQuery(newInputValue)
//               }
//               getOptionLabel={(option) => option.label || ""}
//               isOptionEqualToValue={(option, value) => option.id === value.id}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Search MP"
//                   variant="outlined"
//                   fullWidth
//                 />
//               )}
//               renderOption={(props, option) => (
//                 <li {...props} key={option.id}>
//                   {option.label}
//                 </li>
//               )}
//             />
//           </FormGroup>

//           <Box display="flex" justifyContent="space-between" mt={3}>
//             <Button variant="contained" color="primary" type="submit">
//               Submit
//             </Button>
//             <Button variant="outlined" onClick={onClose}>
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default AssetAddMpModal;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AssetAddMpModal = ({ isOpen, onClose, equipmentId, onMpaddSuccess }) => {
  const [mpOptions, setMpOptions] = useState([]);
  const [selectedMp, setSelectedMp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch MPs on open or when typing
  useEffect(() => {
    if (!isOpen) return;

    const delay = setTimeout(() => {
      axios
        .get(`${API_BASE}/api/MaintenancePlan/dropdown`, {
          params: searchTerm ? { name: searchTerm } : {},
        })
        .then((res) => setMpOptions(res.data))
        .catch(() => setMpOptions([]));
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, isOpen]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedMp(null);
    }
  }, [isOpen]);

  const handleAssign = async () => {
    if (!selectedMp?.id) {
      Swal.fire("Please select a maintenance plan.", "", "warning");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/Equipment/assign-mp`, {
        equipmentId,
        mpId: selectedMp.id,
      });

      Swal.fire("Success", "Maintenance Plan assigned!", "success");
      onMpaddSuccess?.();
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to assign Maintenance Plan.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Maintenance Plan</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={mpOptions}
          getOptionLabel={(option) => option.name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Maintenance Plan"
              variant="outlined"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          onChange={(_, newValue) => setSelectedMp(newValue)}
          ListboxProps={{
            style: {
              maxHeight: 200,
              overflow: "auto",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetAddMpModal;
