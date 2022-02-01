import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { collectionModalStyle } from "./Styles";


const DeleteComment = (props) => {
  const { id, deleteCollectionComments } = props
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        variant="contained"
        style={{ margin: '10px' }}
      >
        Delete this Comment
      </button>
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
              onClick={()=>deleteCollectionComments(id)}
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

export default DeleteComment;