import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { TextField, Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { collectionModalStyle } from "./Styles";


const EditCollection = (props) => {
  const { setEditedCollection } = props
  const [collectionName, setCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  const params = useParams()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    setCollectionName(res.data.name)
    setCollectionDescription(res.data.description)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedCollection = { name: collectionName, description: collectionDescription }
    let res = await axios.put(`/api/collections/${params.id}`, updatedCollection);
    setCollectionName(res.data.name)
    setCollectionDescription(res.data.description)
    setOpen(false)
    setEditedCollection(true)
  };

  return (
    <>
      <Button
        style={{ margin: '10px' }}
        variant="contained"
        onClick={handleOpen}
      >
        Edit this Collection
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
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
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
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
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
  )
}

export default EditCollection;
