import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { TextField, Button, Modal } from "@mui/material";
import { Box } from "@mui/system";


const EditCollection = (props) => {
  const { name, description, setEditedCollection } = props
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
          sx={style}
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
