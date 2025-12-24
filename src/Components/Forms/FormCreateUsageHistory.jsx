import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import FormInputYear from "../FormFields/FormInputYear";
// import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

// import { FormControl, FormGroup, FormLabel, Button } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  // InputLabel,
  styled,
  // ThemeProvider,
  // makeStyles,
  createTheme,
  Autocomplete,
  debounce,
  Popper,
} from "@mui/material";
// import { styled } from "@mui/material/styles";

const FormCreateEquipment = () => {
  // const [enteredName, setEnteredName] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const [Equipments, setEquipments] = useState([]);
  const [selectedEquipments, setSelectedEquipments] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentsId] = useState(""); // State to hold selected model ID
  const [searchQueryforEquipments, setSearchQueryforEquipments] = useState("");

  const [OperationName, setOperationName] = useState([]);
  const [selectedOperationName, setSelectedOperationName] = useState(null);
  const [selectedOperationNameId, setSelectedOperationNameId] = useState(""); // State to hold selected model ID
  const [searchQueryforOperationName, setSearchQueryforOperationName] =
    useState("");

  const [OperatorName, setOperatorName] = useState([]);
  const [selectedOperatorName, setSelectedOperatorName] = useState(null);
  const [selectedOperatorNameId, setSelectedOperatorNameId] = useState(""); // State to hold selected model ID
  const [searchQueryforOperatorName, setSearchQueryforOperatorNamee] =
    useState("");

  const MySwal = withReactContent(Swal);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formDataa, setFormData] = useState({}); // State to hold form data
  const theme = createTheme();

  const CustomTextField = styled(TextField)({
    "& .MuiInputBase-input": {
      color: "black",
    },
  });

  const CustomOption = styled("li")({
    backgroundColor: "white",
    color: "black",
  });

  const fetchEquipemnts = async (name) => {
    try {
      const params = new URLSearchParams({
        name: name, // Use the search query as the 'name' parameter
      });

      const url = `${API_BASE}/api/Equipment/DropDown?${params}`;
      const response = await axios.get(url);
      console.log("API response:", response.data); // Log the API response

      if (response.data && Array.isArray(response.data)) {
        console.log("Fetched models:", response.data); // Log the fetched models
        setEquipments(response.data);
      } else {
        console.error(
          "API response does not contain an array of models:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchOperationNames = async (name) => {
    try {
      const params = new URLSearchParams({
        name: name, // Use the search query as the 'name' parameter
      });

      const url = `${API_BASE}/api/Constants/OperationType?${params}`;
      const response = await axios.get(url);
      console.log("API response:", response.data); // Log the API response

      if (response.data && Array.isArray(response.data)) {
        console.log("Fetched models:", response.data); // Log the fetched models
        setOperationName(response.data);
      } else {
        console.error(
          "API response does not contain an array of models:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchEquipmentsDebounced = debounce(fetchEquipemnts, 300);
  useEffect(() => {
    // Fetch models from the API when the component mounts or searchQuery changes
    fetchEquipemnts(searchQueryforEquipments);
  }, [searchQueryforEquipments]);

  const fetchOperationTypesDebounced = debounce(fetchOperationNames, 300);
  useEffect(() => {
    // Fetch models from the API when the component mounts or searchQuery changes
    fetchOperationNames(searchQueryforOperationName);
  }, [searchQueryforOperationName]);

  const submitForm = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      const formData = new FormData();

      if (selectedEquipments && selectedEquipments.id !== null) {
        formData.append("EquipmentId", selectedEquipments.id);
      } else {
        formData.append("EquipmentId", "");
      }

      formData.append("Remark", formDataa.Remark || null);
      formData.append("OperatorName", formDataa.OperatorName || null);
      formData.append(
        "OperationName",
        selectedOperationName ? selectedOperationName : null
      );
      formData.append("StartDate", formDataa.StartDate || "");

      await axios.post(
        `${API_BASE}/api/UsageHistory/StartUsageHistory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "UH created successfully.",
      }).then(() => {
        window.location.href = "/UsageHistory";
        setIsSubmitted(true);
      });

      setValidationErrors({});
    } catch (error) {
      if (error.response?.status === 400) {
        setValidationErrors(error.response?.data?.errors || {});
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleInputChange = (fieldName, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: [],
    }));
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  // const classNamees = useStyles();

  return (
    <>
      <form className="FormMain" onSubmit={submitForm}>
        <h2 className="heading">Create Usage History</h2>
        <div className="FormContainer">
          <div className="Form_box">
            {/* <h2>Identification</h2> */}
            <div>
              <FormGroup className="mb-3">
                <FormLabel>Operation Name</FormLabel>
                <Autocomplete
                  id="operationName-autocomplete"
                  options={OperationName}
                  // getOptionLabel={(operationName) => operationName}
                  value={selectedOperationName} // Bind selectedModelId to the Autocomplete value
                  onChange={(event, newValue) => {
                    setSelectedOperationName(newValue); // Update selectedModel when a model is selected
                  }}
                  onInputChange={(event, newInputValue) => {
                    setSearchQueryforOperationName(newInputValue); // Update searchQuery as input changes
                  }}
                  inputValue={searchQueryforOperationName}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search or Select Operation Names"
                      variant="outlined"
                    />
                  )}
                  renderOption={(props, option) => <li {...props}>{option}</li>}
                  PopperProps={{
                    placement: "bottom-start",
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ],
                  }}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Start Date</FormLabel>
                <TextField
                  type="date"
                  name="StartDate" // Make sure the name matches the backend field name
                  onChange={(e) =>
                    handleInputChange("StartDate", e.target.value)
                  }
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Equipments</FormLabel>
                <Autocomplete
                  id="equipment-autocomplete"
                  options={Equipments}
                  getOptionLabel={(equipment) => equipment.name}
                  value={selectedEquipments} // Bind selectedModelId to the Autocomplete value
                  onChange={(event, newValue) => {
                    setSelectedEquipments(newValue); // Update selectedModel when a model is selected
                  }}
                  onInputChange={(event, newInputValue) => {
                    setSearchQueryforEquipments(newInputValue); // Update searchQuery as input changes
                  }}
                  inputValue={searchQueryforEquipments}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search or Select Equipment"
                      variant="outlined"
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  PopperProps={{
                    placement: "bottom-start", // Adjust the placement as needed
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 8], // Adjust the offset to position the dropdown
                        },
                      },
                    ],
                  }}
                />
                {validationErrors.Manufactures &&
                validationErrors.Manufactures.length > 0 ? (
                  <span className="validation-error">
                    {validationErrors.Manufactures[0]}
                  </span>
                ) : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Operator Name</FormLabel>
                <TextField
                  type="text"
                  name="OperatorName"
                  onChange={(e) => handleInputChange("Remark", e.target.value)}
                  // InputProps={{
                  //   style: { height: "150px", width: "600px" }, // Adjust the height as needed
                  // }}
                />
                {/* {validationErrors.Remark &&
                validationErrors.Remark.length > 0 ? (
                  <span className="validation-error">
                    {validationErrors.Remark[0]}
                  </span>
                ) : null} */}
              </FormGroup>
              <div className="form_Remark">
                <FormGroup className="mb-3">
                  <FormLabel>Remark</FormLabel>
                  <TextField
                    type="text"
                    name="Remark"
                    onChange={(e) =>
                      handleInputChange("Remark", e.target.value)
                    }
                    InputProps={{
                      style: { height: "150px", width: "600px" }, // Adjust the height as needed
                    }}
                  />
                  {/* {validationErrors.Remark &&
                  validationErrors.Remark.length > 0 ? (
                    <span className="validation-error">
                      {validationErrors.Remark[0]}
                    </span>
                  ) : null} */}
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </>
  );
};

export default FormCreateEquipment;

