import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { collectionModalStyle } from "./Styles";


const DeleteCollection = (props) => {
  const { deleteCollection } = props
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ margin: '10px', borderRadius: '40px' }}
      >
        Delete this Collection
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={collectionModalStyle}
        >
          <h2 style={{ textAlign: "center" }}>Are you sure you want to delete this?</h2>
          <div className="confirm-button">
            <Button
              className="spacing"
              onClick={deleteCollection}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <Button
              className="spacing"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default DeleteCollection;