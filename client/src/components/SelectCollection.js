import { Alert, Autocomplete, Button, FormControl, Paper, TextField, Container, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import AddCard from "./AddCard";
import CardImageUpload from "./CardImageUpload";
import CollectionNew from "../pages/CollectionNew";
import { Link } from "react-router-dom";
import { categories } from "./FormChoices";

const SelectCollection = (props) => {
  const [collections, setCollections] = useState([])
  const [collection, setCollection] = useState("")
  const [chosenCollection, setChosenCollection] = useState("");
  const [collectionsObj, setCollectionsObj] = useState([]);
  const [collectionNew, setCollectionNew] = useState(false)
  const [collectionId, setCollectionId] = useState("")
  const [category, setCategory] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collectionCards, setCollectionCards] = useState(null)
  const [toggleCollectionList, setToggleCollectionList] = useState(true)
  const auth = useContext(AuthContext);
  

  useEffect(() => {
    getCollections();
  }, [])


  const getCollections = async () => {
    let collectionsList =[]
      try {
    let res = await axios.get(`/api/users/${auth.id}/collections`);
    console.log(res.data);
    setCollectionsObj(res.data);
    let collectionsList = res.data.map((c)=>c.name)
    console.log(collectionsList)
    setCollections(collectionsList)
      } catch (err) {
          console.log(err)
      }
  }

  const handleCollectionCreate = () => {
    setCollectionNew(true)
  }


const handleCollection = (e, newValue) => {
  setChosenCollection(newValue)
  setCollection(newValue)
  if(toggleCollectionList === true && collection){
  let collection_id = collectionsObj.filter(c=> {if (c.name===newValue) { return c.id }})
  setCollectionId(collection_id[0].id)
  console.log("collection_id", collection_id[0].id)
  setToggleCollectionList(false)
  return collection_id }
}



  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    const newCollection = { category, name, description }
    console.log(newCollection)
    try {
    let res = await axios.post(`/api/collections`, newCollection)
    setCollection(res.data.name)
    console.log(res.data.name)
    console.log(res.data.id)
    setCollectionId(res.data.id)
    setCollectionNew(false)
    setToggleCollectionList(false)
    } catch (err) {
      console.log(err)
    }
    // the collection data doesn't seem to exist soon enough to show the page??
  }


  const addCard = (card) => {
    setCollectionCards([...collectionCards, card]);
  }

  const createCollectionToggle = () => {
    setCollectionNew(true)
    setToggleCollectionList(false)
  }

  const chooseAnotherCollectionToggle = () => {
    setCollection(null)
    setToggleCollectionList(true)
  }

  return(
    <div >
        {/* {success && <Alert severity="success" >Successfuly uploaded collectible!</Alert>}
        {failed && <Alert severity="error" >Failed to upload collectible!</Alert>} */}
            <div className="messagePageContainer">
                {/* <Paper sx={{width: "85vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px"}} > */}
                    <>
                    {toggleCollectionList &&  <FormControl sx={{ m:1, minWidth: 250}} >
                                <Autocomplete 
                                    options={collections}
                                    getOptionLabel={(c)=>c}
                                    renderInput={(params) => <TextField {...params} label="Choose a collection" />}
                                    value={collection}
                                    onChange={(e, newValue) => handleCollection(e, newValue)}
                                    inputValue={chosenCollection}
                                    onInputChange={(e, newValue) => handleCollection(e, newValue)}
                                />
                            </FormControl>}
                            <Button onClick={()=>chooseAnotherCollectionToggle()}>Choose Another Collection</Button>
                           {!collection && <div><Button onClick={()=>createCollectionToggle()}>Create New Collection</Button></div>}
                            </>
                            {collectionNew === true &&   
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
                        {/* </form> */}
                    {/* </Paper> */}
                </div>
        </div>
    )
};

export default SelectCollection;