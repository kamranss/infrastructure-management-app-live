// import * as React from "react";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import UsageHistoryModal from "../Modals/UsageHistoryModal";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { NavLink } from "react-router-dom";
// import EquipmentModal from "../Modals/EquipmentModal";

export default function TableUsageHistory({ thead = [], rows = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openModal = (rowId) => {
    setSelectedRowId(rowId);
    // Fetch data for the modal here using rowId and set it in modalData state
    const rowData = rows.find((row) => row.id === rowId);
    setModalData(rowData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRowId(null);
    setModalData(null);
    setModalOpen(false);
  };

  const ongoingRows = rows.filter((row) => row.status === "ONGOING");
  const otherRows = rows.filter((row) => row.status !== "ONGOING");

  return (
    <div>
      {modalData && (
        <UsageHistoryModal
          isOpen={openModal}
          handleClose={closeModal}
          modalData={modalData}
          rowId={selectedRowId}
        />
      )}
      <TableContainer
        component={Paper}
        // sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {thead?.map((th, key) => (
                <TableCell key={key}>{th}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, key) => {
              const statusclassName =
                row.status === "ONGOING"
                  ? "row-start"
                  : row.status === "Finished"
                  ? "row-end"
                  : row.status === "CANCELED"
                  ? "row-CNL"
                  : "";
              const isClickable = row.status === "ONGOING";
              return (
                <TableRow
                  onClick={isClickable ? () => openModal(row.id) : null}
                  className={`row ${statusclassName} ${
                    isClickable ? "clickable" : ""
                  }`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row?.id}</TableCell>
                  <TableCell align="left">{row?.equipmentName}</TableCell>
                  <TableCell align="left">{row?.operationName}</TableCell>
                  <TableCell align="left">
                    {row?.startUsageHourValue || "-"}
                  </TableCell>
                  <TableCell align="left">
                    {row?.endUsageHourValue || "-"}
                  </TableCell>

                  {/* <TableCell align="left">{row?.operatorName || "-"}</TableCell> */}
                  <TableCell align="left">{row?.operatorName || "-"}</TableCell>
                  <TableCell align="left">
                    {row?.totalUsageValue || "-"}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row?.startDate).format("DD-MM-YYYY") || "-"}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row?.endDate).format("DD-MM-YYYY") || "-"}
                  </TableCell>

                  <TableCell
                    className={`${
                      row.status === "ONGOING"
                        ? "row-start"
                        : row.status === "FINISHED"
                        ? "row-end"
                        : row.status === "CANCELED"
                        ? "row-cnl"
                        : ""
                    }`}
                    align="left"
                  >
                    {row?.status || "-"}
                  </TableCell>
                  <TableCell align="left">
                    <TableCell align="left">{row?.totalTime || "-"}</TableCell>
                  </TableCell>
                  <TableCell align="left">
                    <button onClick={() => openModal(row.id)}>Open</button>
                  </TableCell>
                  <TableCell align="left">
                    <NavLink
                      to={{
                        pathname: "/usageHistoryDetail",
                        search: `?id=${row.id}`,
                      }}
                    >
                      <button>
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                    </NavLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
