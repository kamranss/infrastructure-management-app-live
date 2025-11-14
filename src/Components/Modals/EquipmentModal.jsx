import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles"; // Import styled from @mui/material

const AccordionSection = ({ data, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  if (!data) {
    // If data is not available, return null or loading indicator
    return null;
  }
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // const accordionItems = data.map((item, index) => (
  //   <div key={index}>
  //     {/* Render individual item content here */}
  //     <p>{item.name}</p>
  //   </div>
  // ));

  const accordionItems = data.slice(startIndex, endIndex).map((item, index) => (
    <div key={index} className="accordion-item">
      <p>Operation Name: {item.operationName}</p>
      <p>Start Value: {item.startUsageHourValue}</p>
      <p>End Value: {item.endUsageHourValue}</p>
      <p>Total: {item.totalUsageValue}</p>
    </div>
  ));

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {accordionItems.length > 0 ? (
          <div>
            {accordionItems}
            {/* Pagination controls */}
            {/* ... Pagination buttons */}
          </div>
        ) : (
          <p>No items to display.</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

const EquipmentModal = ({ isOpen, handleClose, modalData }) => {
  if (!modalData) {
    // If modalData is not available, return null or loading indicator
    return null;
  }
  const usageHistorySection = modalData.usageHistoryList ? (
    <AccordionSection data={modalData.usageHistoryList} title="Usage History" />
  ) : null;

  const maintenancePlansSection = modalData.maintenancePlans ? (
    <AccordionSection
      data={modalData.maintenancePlans}
      title="Maintenance Plans"
    />
  ) : null;

  const partsSection = modalData.parts ? (
    <AccordionSection data={modalData.parts} title="Parts" />
  ) : null;
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal-container">
        {" "}
        <div className="modal_Header">
          <div className="first_part">
            <div className="first_part_header_box1">
              <p>Name: {modalData.name}</p>
              <p>Description: {modalData.description}</p>
              <p>MpTime: {modalData.mpTime}</p>
            </div>
            <div className="first_part_header_box2">
              <p>Status: {modalData.status}</p>
            </div>
          </div>
          <div className="second_part">
            <div className="second_part_header_box1">
              <p>Department: {modalData.department}</p>
              <p>Manufacture: {modalData.manufacture}</p>
              <p>OperationSite: {modalData.operationSite}</p>
            </div>
          </div>
        </div>
        {modalData && (
          <div>
            {/* <p>ID: {modalData.id}</p>
            <p>Name: {modalData.name}</p> */}
          </div>
        )}
        <div className="accordion">
          <AccordionSection
            data={modalData.usageHistoryList || []}
            title="Usage History"
          />
          <AccordionSection
            data={modalData.maintenancePlans || []}
            title="Maintenance Plans"
          />
          <AccordionSection data={modalData.parts || []} title="Parts" />
        </div>
        <button className="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default EquipmentModal;
