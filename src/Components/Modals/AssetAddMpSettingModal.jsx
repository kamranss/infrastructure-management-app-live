import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  Button,
  TextField,
  styled,
  Autocomplete,
  debounce,
  Modal,
} from "@mui/material";

const AssettAddMpSettingModal = ({
  isOpen,
  onClose,
  equipmentId,
  onMpaddSuccess,
}) => {
  const MySwal = withReactContent(Swal);

  const [validationErrors, setValidationErrors] = useState({});

  const [mpOption, setMpOptions] = useState([]);
  const [selectedMpId, setSelecMpId] = useState("");
  const [selectedMp, setSelectedMp] = useState(null);
  const [resetValue, setresetValue] = useState("");
  const [searchQueryforStatus, setSearchQueryforStatus] = useState("");
  const [formDataa, setFormData] = useState({});

  const fetchStatusOptions = async () => {
    try {
      const params = new URLSearchParams({
        id: equipmentId, // Use the search query as the 'name' parameter
      });

      const url = `https://localhost:7066/api/MaintenancePlan/dropdown?${params}`;
      const response = await axios.get(url);
      console.log("API response:", response.data);

      if (Array.isArray(response.data)) {
        const options = response.data.map((option) => ({
          id: option.id,
          name: option.name,
        }));
        setMpOptions(options);
      } else {
        console.error(
          "API response does not contain an array of mp options:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStatuses = debounce(fetchStatusOptions, 300);

  useEffect(() => {
    fetchStatusOptions(searchQueryforStatus);
  }, [searchQueryforStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = new FormData();
    // Include the selected status in the FormData

    console.log("Selected Status:", selectedMpId);
    console.log("Selected Status:", selectedMp);
    console.log("Selected Status:", mpOption);
    console.log("Selected status name:", selectedMp.name);
    console.log("Selected status id:", selectedMp.id);
    console.log("Equipment ID:", equipmentId);
    console.log("resetValue:", resetValue);
    formData.append("EquipmentId", equipmentId || null);
    formData.append("MaintenancePlanId", selectedMp ? selectedMpId : "");
    formData.append("sequenceValue", resetValue);

    console.log(formData);

    try {
      const response = await axios.post(
        `https://localhost:7066/api/MaintenancePlan/SetMpSetting`,

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);

      for (const entry of formData.entries()) {
        console.log(entry);
      }

      // Handle the response, e.g., show a success message
      if (response.status === 200) {
        console.log(formData);
        onClose();
        onMpaddSuccess();
        setSelectedMp("");
        setSearchQueryforStatus("");
        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "Status changed successfully.",
          customclassName: {
            popup: "my-swal-modal",
          },
        }).then(() => {
          // Handle success action, e.g., refresh the page
        });

        // Clear the selected status
        setSelectedMp("");
      } else if (response.status === 400) {
        console.log(formData);
        // Bad request with validation errors
        const errorData = await response.json();
        console.log("Validation errors:", errorData);

        // Update the state with the validation errors
        setValidationErrors(errorData.errors);
      } else {
        const errorMessage = await response.text();
        console.error("Error:", errorMessage);
        console.log(formData);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting data:", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit data. Please try again later.",
      });
    }
  };

  const handleInputChange = (fieldName, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: [],
    }));

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <Modal open={isOpen}>
      <div className="modal-container-statusChange">
        <div className="modal_Header "></div>
        <form className="uh_Form_Container" onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Mp</FormLabel>
            <Autocomplete
              id="status-options"
              options={mpOption}
              getOptionLabel={(option) => option.name} // Use the name property as the display value
              // getOptionSelected={(option, value) => option.id === value.id} // Compare based on the id property
              value={selectedMp}
              onChange={(event, newValue) => {
                setSelectedMp(newValue);
                if (newValue) {
                  setSelecMpId(newValue.id); // Set the selected MP's ID
                } else {
                  setSelecMpId(""); // Clear the ID when nothing is selected
                }
              }}
              onInputChange={(event, newInputValue) => {
                setSearchQueryforStatus(newInputValue);
              }}
              inputValue={searchQueryforStatus}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search or Select Status"
                  variant="outlined"
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>{option.name}</li>
              )}
            />
          </FormGroup>
          <FormGroup className="mt">
            <TextField
              label="Reset Value"
              type="number"
              value={resetValue}
              onChange={(e) => setresetValue(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                classNamees: {
                  root: "inputRoot",
                  focused: "inputFocused",
                },
              }}
            />
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={onClose}
          >
            Submit
          </Button>
        </form>
        <button className="status-change-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AssettAddMpSettingModal;
