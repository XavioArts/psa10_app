import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Textrea, TextField } from "@mui/material";
import { Link } from "react-router-dom";


const EditCollection = () => {
  const params = useParams()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    setName(res.data.name)
    setCategory(res.data.category)
    setDescription(res.data.description)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedCollection = {name, category, description}
    let res = await axios.put(`/api/collections/${params.id}`, updatedCollection);
    navigate(`/profile/collections/${params.id}`)
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
  )
}

export default EditCollection;
