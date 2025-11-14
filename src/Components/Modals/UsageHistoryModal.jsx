import React from "react";
import Modal from "@mui/material/Modal";
import UsageHistoryEndForm from "../Forms/UsageHistoryEndForm";

const UsageHistoryModal = ({ isOpen, handleClose, modalData, rowId }) => {

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal-container">
        {/* Display data from modalData */}
        <div className="modal_Header">{/* ... */}</div>
        <UsageHistoryEndForm
          onSubmit={handleClose}
          rowId={rowId}
          handleClose={handleClose}
        />
        <button className="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default UsageHistoryModal;
