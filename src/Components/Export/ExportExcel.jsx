import React from "react";
import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";

const ExportExcel = () => {
  const handleExport = () => {
    console.log("Exporting to Excel...");
    // Add XLSX logic here later
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<Download />}
      onClick={handleExport}
      sx={{
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#388e3c", // darker green on hover
        },
      }}
    >
      Export to Excel
    </Button>
  );
};

export default ExportExcel;
