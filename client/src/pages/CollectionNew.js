import { Autocomplete, Button, Container, FormControl, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const categories = [
  { name: 'Pokemon', value: "Pokemon", subCategory: "Trading Card Games" },
  { name: 'Yu-Gi-Oh!', value: "Yu-Gi-Oh!", subCategory: "Trading Card Games" },
  { name: 'Magic the Gathering', value: "Magic the Gathering", subCategory: "Trading Card Games" },
  { name: 'Dragon Ball Super', value: "Dragon Ball Super", subCategory: "Trading Card Games" },
  { name: 'Digimon', value: "Digimon", subCategory: "Trading Card Games" },
  { name: 'Star Trek', value: "Star Trek", subCategory: "Pop Culture" },
  { name: 'Star Wars', value: "Star Wars", subCategory: "Pop Culture" },
  { name: 'Marvel', value: "Marvel", subCategory: "Pop Culture" },
  { name: 'Garbage Pail Kids', value: "Garbage Pail Kids", subCategory: "Pop Culture" },
  { name: 'Baseball', value: "Baseball", subCategory: "Sports" },
  { name: 'Basketball', value: "Basketball", subCategory: "Sports" },
  { name: 'Boxing', value: "Boxing", subCategory: "Sports" },
  { name: 'Football', value: "Football", subCategory: "Sports" },
  { name: 'Golf', value: "Golf", subCategory: "Sports" },
  { name: 'Hockey', value: "Hockey", subCategory: "Sports" },
  { name: 'MMA', value: "MMA", subCategory: "Sports" },
  { name: 'Tennis', value: "Tennis", subCategory: "Sports" },
  { name: 'Soccer', value: "Soccer", subCategory: "Sports" },
  { name: 'Wrestling', value: "Wrestling", subCategory: "Sports" },
];

const CollectionNew = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCollection = { category, name, description }
    let res = await axios.post(`/api/collections`, newCollection)
    navigate('/profile/collections')
  }

  return (
    <>
      <button className="link-button"><Link className = "link" to={`/profile/collections/`}>Back to Collections</Link></button>
      <Container maxWidth="sm">
        <FormControl>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" }
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
              <Autocomplete
                options={categories}
                groupBy={(cat) => cat.subCategory}
                getOptionLabel={(cat) => cat.name}
                renderInput={(params) => <TextField {...params} label="Select category" />}
                value={category}
                onChange={(e, newValue) => setCategory(newValue)}
                inputValue={chosenCategory}
                onInputChange={(e, newValue) => setChosenCategory(newValue)}

              />
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
            <br />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </Container>
    </>
  );
}

export default CollectionNew;