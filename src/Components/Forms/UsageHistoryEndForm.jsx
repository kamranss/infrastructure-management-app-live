import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const UsageHistoryEndForm = ({ rowId, handleClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [endDate, setEndDate] = useState("");
  const [endUsageHourValue, setEndUsageHourValue] = useState("");

  const MySwal = withReactContent(Swal);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    const formData = new FormData();
    const formattedEndDate = formatDate(endDate);
    formData.append("EndDate", formattedEndDate || null);
    formData.append("EndUsageHourValue", endUsageHourValue || null);
    formData.append("UsageHistoryId", rowId || null);

    try {
      await axios.patch(
        `${API_BASE}/api/UsageHistory/EndUsageHistory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleClose();
      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "UH ended successfully.",
        customclassName: {
          popup: "my-swal-modal",
        },
      }).then(() => {
        window.location.href = "/UsageHistory";
      });

      setEndDate("");
      setEndUsageHourValue("");
    } catch (error) {
      if (error.response?.status === 400) {
        setValidationErrors(error.response?.data?.errors || {});
      } else {
        console.error("Error submitting data:", error);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit data. Please try again later.",
        });
      }
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  return (
    <form className="uh_Form_Container" onSubmit={handleSubmit}>
      <FormGroup className="formGroup">
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
      <FormGroup className="formGroup">
        <TextField
          label="End Usage Hour Value"
          type="text"
          value={endUsageHourValue}
          onChange={(e) => setEndUsageHourValue(e.target.value)}
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
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UsageHistoryEndForm;


