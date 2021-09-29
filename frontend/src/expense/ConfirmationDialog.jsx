import React from "react";
import { Dialog, Button } from "@material-ui/core";

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = "Confirm",
  onYesClick
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div style={{ padding: '24px 20px 8px'}}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <p>{text}</p>
        <div className="flex flex-space-between pt-8">
          <Button className="btnAddExpense" onClick={onYesClick}>
            Yes
          </Button>
          <Button
            className="btnEditExpense"
            onClick={onConfirmDialogClose}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
