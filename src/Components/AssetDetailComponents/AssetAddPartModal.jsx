import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Autocomplete,
  TextField,
  Button,
  FormGroup,
  FormLabel,
  Box,
  Modal,
  Typography,
} from "@mui/material";

const AssetAddPartModal = ({
  isOpen,
  onClose,
  equipmentId,
  onMpaddSuccess,
}) => {
  const MySwal = withReactContent(Swal);

  const [partOptions, setPartOptions] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://localhost:7066";
  const PART_DROP_DOWN_URL =
    import.meta.env.VITE_API_PART_DROP_DOWN_URL || "/api/Part/DropDwon";

  const fetchParts = async (query = "") => {
    try {
      const response = await axios.get(`${API_BASE}${PART_DROP_DOWN_URL}`, {
        params: { name: query },
      });

      if (Array.isArray(response.data)) {
        const mapped = response.data.map((item) => ({
          id: item.id,
          label: item.name,
        }));
        setPartOptions(mapped);
      }
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  useEffect(() => {
    fetchParts(searchQuery);
  }, [searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPart || !equipmentId) {
      MySwal.fire("Missing Info", "Please select a part.", "warning");
      return;
    }

    const payload = {
      equipmentId,
      partId: selectedPart.id,
    };

    try {
      const response = await axios.post(
        `${API_BASE}/api/Equipment/AddPartToAsset`,
        payload
      );

      if (response.status === 200) {
        MySwal.fire("Success", "Part assigned successfully!", "success");
        onClose();
        setSelectedPart(null);
        setSearchQuery("");
        onMpaddSuccess();
      }
    } catch (error) {
      console.error("Error assigning part:", error);
      MySwal.fire("Error", "Failed to assign part.", "error");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          mx: "auto",
          mt: "10%",
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Part to Equipment
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup sx={{ mb: 2 }}>
            <FormLabel>Select Part</FormLabel>
            <Autocomplete
              options={partOptions}
              value={selectedPart}
              onChange={(e, newValue) => setSelectedPart(newValue)}
              inputValue={searchQuery}
              onInputChange={(e, val) => setSearchQuery(val)}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Search Part" fullWidth />
              )}
            />
          </FormGroup>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AssetAddPartModal;
