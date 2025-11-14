import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import axios from "axios";
// import EquipmentStatusChangeModal from "../Forms/EquipmentStatusChangeModal";

const EquipmentStatusChangeForm = ({
  isOpen,
  handleClose,
  modalData,
  rowId,
}) => {
  const [endDate, setEndDate] = useState(""); // State to store EndDate
  const [endUsageHourValue, setEndUsageHourValue] = useState(""); // State to store endUsageHourValue

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("EndDate", endDate);
    formData.append("endUsageHourValue", endUsageHourValue);

    try {
      // Send a POST request to your API with formData
      await axios.post("your-api-url", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      console.log("Data sent successfully");
      handleClose();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal-container">
        {/* Display data from modalData */}
        <div className="modal_Header">{/* ... */}</div>

        <button className="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default EquipmentStatusChangeForm;
