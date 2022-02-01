import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { collectionModalStyle } from "../components/Styles";

const CollectionNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCollection = { name, description }
    let res = await axios.post(`/api/collections`, newCollection)
    navigate(`/profile/collections/${res.data.id}`)
    setOpen(false)
  }

  return (
    <>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={handleOpen}
      >
        Add a Collection
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={collectionModalStyle}
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              fullWidth
              required
              id="standard-required"
              label="Collection Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ maxLength: 40 }}
            />
            <br />
            <br />
            <TextField
              id="standard-multiline-static"
              label="Description"
              fullWidth
              multiline
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CollectionNew;