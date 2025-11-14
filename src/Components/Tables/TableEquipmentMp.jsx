// MaintenancePlanTable.js
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const TableEquipmentMp = ({ maintenancePlans }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleButtonClick = async (row) => {
    console.log("Button clicked for row:", row);

    if (
      row.maintenanceSettingsList &&
      row.maintenanceSettingsList[0] &&
      row.maintenanceSettingsList[0].id
    ) {
      const maintenanceSettingId = row.maintenanceSettingsList[0].id;

      const requestData = {
        MaintenancePlanId: null, // Set to null
        EquipmentId: null, // Set to null
        EquSettingid: maintenanceSettingId, // Set EquSettingid to maintenanceSettingsList[0].id
      };

      try {
        // Use SweetAlert2 to confirm the action
        const { value } = await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to complete this maintenance plan?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, complete it!",
          cancelButtonText: "No, cancel!",
        });

        if (value) {
          // User confirmed, make the API request
          const response = await axios.post(
            "https://localhost:7066/api/MaintenancePlan/CompletMp",
            requestData,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          // Handle the response data as needed
          console.log("API response:", response.data);

          // You can perform additional actions based on the API response here

          // Refresh the page
          window.location.reload();
        } else {
          // User canceled, show an error message
          Swal.fire("Cancelled", "The operation was cancelled.", "error");
        }
      } catch (error) {
        console.error("Error making API request:", error);
        // Handle errors as needed
        // Show an error message
        Swal.fire(
          "Error",
          "An error occurred while completing the maintenance plan.",
          "error"
        );
      }
    } else {
      // Handle the case where maintenanceSettingsList[0] or id is missing
      console.error("Maintenance setting data is missing");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mp Time</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>sequenceValue</TableCell>
              <TableCell>Finish Mp</TableCell>
              {/* Add other table headers */}
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenancePlans
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">
                    {row.maintenanceSettingsList &&
                    row.maintenanceSettingsList[0] ? (
                      row.maintenanceSettingsList[0].isMpCompleted !== true &&
                      row.maintenanceSettingsList[0].isMpCompleted !== null ? (
                        <i className="far fa-clock"></i> // Clock icon for incomplete
                      ) : (
                        <i className="fa-solid fa-check"></i>
                      )
                    ) : (
                      // Handle the case where maintenanceSettingsList is null
                      <i className="fa-solid fa-check"></i>
                    )}
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.maintenanceSettingsList &&
                    row.maintenanceSettingsList.length > 0
                      ? row.maintenanceSettingsList[0]?.sequenceValue ?? ""
                      : ""}
                  </TableCell>
                  <TableCell>
                    {/* Add a button that calls handleButtonClick with the current row */}
                    <Button
                      variant="contained"
                      style={{ fontSize: "12px", padding: "2px 5px" }}
                      color="primary"
                      onClick={() => handleButtonClick(row)}
                    >
                      Complete Mp
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={maintenancePlans.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableEquipmentMp;
