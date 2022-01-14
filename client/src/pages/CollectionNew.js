import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CollectionNew = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  
  return (
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
          variant="standard"
        />
      </div>
      <div>
        <TextField
          required
          id="standard-select-category"
          select
          label="Select"
          value={category}
          onChange={handleChange}
          helperText="Please select your category"
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
      />
    </Box>
  );
}

export default CollectionNew;