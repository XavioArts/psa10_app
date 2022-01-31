import { Alert, Autocomplete, Button, FormControl, Paper, TextField, Container, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import AddCard from "./AddCard";
import CardImageUpload from "./CardImageUpload";
import { useNavigate } from "react-router-dom";
import CollectionNew from "../pages/CollectionNew";
import { Link } from "react-router-dom";

const SelectCollection = (props) => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [collections, setCollections] = useState([])
  const [collection, setCollection] = useState("")
  const [chosenCollection, setChosenCollection] = useState("");
  const [collectionsObj, setCollectionsObj] = useState([]);
  const navigate = useNavigate();
  const [collectionNew, setCollectionNew] = useState(false)
  const [collectionId, setCollectionId] = useState("")
  const [category, setCategory] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionCards, setCollectionCards] = useState(null)

  

  useEffect(() => {
    getCollections();
  }, [])

  useEffect(() => {
    getCards();
  }, [collection])

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

  const getCollections = async () => {
    let collectionsList =[]
      try {
    let res = await axios.get("/api/collections");
    console.log(res.data);
    setCollectionsObj(res.data);
    let collectionsList = res.data.map((c)=>c.name)
    console.log(collectionsList)
    setCollections(collectionsList)
      } catch (err) {
          console.log(err)
      }
  }

  const getCards = async () => {
    try {
    let res = await axios.get(`/api/collections/${collectionId}`)
    setCollectionCards(res.data.cards)}
    catch (err) {
      console.log(err)
    }
  }

  const handleCollectionCreate = () => {
    setCollectionNew(true)
  }




const handleCollection = (e, newValue) => {
  setChosenCollection(newValue)
  setCollection(newValue)
  let collection_id = collectionsObj.filter(c=> {if (c.name===newValue) { return c.id }})
  setCollectionId(collection_id[0].id)
  console.log("collection_id", collection_id[0].id)
  return collection_id 
}



  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    const newCollection = { category, name, description }
    try {
    let res = await axios.post(`/api/collections`, newCollection)
    setCollection(res.data)
    console.log(res.data)
    navigate(`/profile/collections/${res.data.id}`)}
    catch (err) {
      console.log(err)
    }
    // the collection data doesn't seem to exist soon enough to show the page??
  }


  const addCard = (card) => {
    setCollectionCards([...collectionCards, card]);
  }

  return(
    <div className="messagePageContainer">
        {/* {success && <Alert severity="success" >Successfuly uploaded collectible!</Alert>}
        {failed && <Alert severity="error" >Failed to upload collectible!</Alert>} */}
            <div>
                {/* <Paper sx={{width: "85vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px"}} > */}
                {/* <CardImageUpload id={card.id} /> */}
                    <form > 

                    <>
                    <FormControl sx={{ m:1, minWidth: 250}} >
                                <Autocomplete 
                                    options={collections}
                                    getOptionLabel={(c)=>c}
                                    renderInput={(params) => <TextField {...params} label="Choose a collection" />}
                                    value={collection}
                                    onChange={(e, newValue) => handleCollection(e, newValue)}
                                    inputValue={chosenCollection}
                                    onInputChange={(e, newValue) => handleCollection(e, newValue)}
                                />
                            </FormControl>
                           {!collection && <div><Button onClick={()=>setCollectionNew(true)}>Create New Collection</Button></div>}
                            </>
                            {collectionNew == true &&   
                              <>
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
                                        onClick={handleCollectionSubmit}
                                        variant="contained"
                                        color="success"
                                      >
                                        Submit
                                      </Button>
                                    </Box>
                                  </FormControl>
                                </Container>
                              </>
                          }
                            {collection && <>
                            <p>You selected collection {collection}</p>
                            <AddCard collectionId= {collectionId} addCard={addCard}/></>}
                            {/* {success && <Alert severity="success" >Successfuly uploaded collectible!</Alert>}
                            {failed && <Alert severity="error" >Failed to upload collectible!</Alert>} */}
                            {/* <Button variant="contained" type="submit" >Submit</Button> */}
                        </form>
                    {/* </Paper> */}
                </div>
        </div>
    )
};

export default SelectCollection;