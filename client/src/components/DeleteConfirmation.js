import { Alert, Button, Modal, Snackbar } from "@mui/material";
import React, { useState } from "react";

const DeleteConfirmation = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ margin: '10px' }}
      >
        Delete this Collection
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
      <h1>Are you sure you want to continue?</h1>
      <Button>Delete</Button>
      <Button>Cancel</Button>

      </Modal>
      <Snackbar>
        <Alert>

        </Alert>
      </Snackbar>
    </>
  )
}

export default DeleteConfirmation;