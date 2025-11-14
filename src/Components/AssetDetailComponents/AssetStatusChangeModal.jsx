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

const AssetStatusChangeModal = ({
  isOpen,
  onClose,
  equipmentId,
  onStatusChangeSuccess,
}) => {
  const MySwal = withReactContent(Swal);

  const [validationErrors, setValidationErrors] = useState({});

  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState(""); // State to hold selected model ID
  const [searchQueryforStatus, setSearchQueryforStatus] = useState("");
  const [formDataa, setFormData] = useState({});

  const useStyles = styled((theme) => ({
    select: {
      width: "100%", // Adjust the width as needed
      "& .MuiSelect-select.MuiSelect-select": {
        paddingBottom: theme.spacing(1), // Adds spacing below the dropdown icon
      },
    },
  }));

  const fetchStatusOptions = async (name) => {
    try {
      const params = new URLSearchParams({
        name: name, // Use the search query as the 'name' parameter
      });

      const url = `https://localhost:7066/api/Constants/EquipmentStatus?${params}`;
      const response = await axios.get(url);
      console.log("API response:", response.data); // Log the API response

      if (response.data && Array.isArray(response.data)) {
        console.log("Fetched status options:", response.data);
        setStatusOptions(response.data);
      } else {
        console.error(
          "API response does not contain an array of status options:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStatuses = debounce(fetchStatusOptions, 300);

  // useEffect(() => {
  //   if (isOpen) {
  //     // Fetch status options when the modal opens
  //     fetchStatusOptions(searchQueryforStatus);
  //   }
  // }, [searchQueryforStatus]);

  useEffect(() => {
    fetchStatusOptions(searchQueryforStatus);
  }, [searchQueryforStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = new FormData();
    // Include the selected status in the FormData

    console.log("Selected Status:", selectedStatus);
    console.log("Equipment ID:", equipmentId);
    formData.append("id", equipmentId || null);
    formData.append("newStatus", selectedStatus ? selectedStatus : "");

    try {
      const response = await axios.patch(
        `https://localhost:7066/api/Equipment/StatusChange`,

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
        onStatusChangeSuccess();
        setSelectedStatus("");
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
        setSelectedStatus("");
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
            <FormLabel>Status</FormLabel>
            <Autocomplete
              id="status-options"
              options={statusOptions}
              value={selectedStatus}
              onChange={(event, newValue) => {
                setSelectedStatus(newValue);
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
              renderOption={(props, option) => <li {...props}>{option}</li>}
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

export default AssetStatusChangeModal;
