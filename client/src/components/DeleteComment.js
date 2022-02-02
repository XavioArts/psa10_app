import { Button, IconButton, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { collectionModalStyle } from "./Styles";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const DeleteComment = (props) => {
  const { id, deleteCollectionComments } = props
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        style={{ margin: '10px' }}
      >
        <DeleteForeverIcon />
      </IconButton>
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
              style={{borderRadius: "40px"}}
            >
              Delete
            </Button>
            <Button
              className="spacing"
              variant="contained"
              onClick={handleClose}
              style={{borderRadius: "40px"}}
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