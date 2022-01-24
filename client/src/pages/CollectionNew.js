import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const categories = [
  {
    value: "baseball",
    label: "Baseball"
  },
  {
    value: "basketball",
    label: "Basketball"
  },
  {
    value: "pokemon",
    label: "Pokemon"
  },
];

const CollectionNew = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCollection = { category, name, description }
    let res = await axios.post(`/api/collections`, newCollection)
    console.log(res)
    navigate('/profile/collections')
    // props.addColelction(res.data)
  }

  return (
    <>
      <button><Link to={`/profile/collections/`}>Back</Link></button>
      <FormControl>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="standard-required"
              label="Collection Name"
              value={name}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="standard-select-category"
              select
              label="Please select your category"
              value={category}
              onChange={handleChange}
              variant="standard"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={5}
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </>
  );
}

export default CollectionNew;