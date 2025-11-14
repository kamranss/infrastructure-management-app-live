import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const MpDialogs = ({
  deleteDialogOpen,
  onCloseDelete,
  onConfirmDelete,
  statusDialog,
  onCloseStatus,
  onConfirmStatus,
}) => {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={onCloseDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Maintenance Plan?
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Confirmation Dialog */}
      <Dialog open={statusDialog.open} onClose={onCloseStatus}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          Are you sure you want to set this MP as{" "}
          <strong>{statusDialog.value ? "Active" : "Inactive"}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseStatus} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => onConfirmStatus(statusDialog.value)} // ✅ pass value
            color={statusDialog.value ? "success" : "warning"}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MpDialogs;
