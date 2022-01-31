import { Alert, Autocomplete, Button, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from "@mui/material";
import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardImageUpload from "../components/CardImageUpload";
import { categories, conditions } from "../components/FormChoices";

const UploadCollectible = () => {
    const navigate = useNavigate();
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [chosenCategory, setChosenCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [chosenCondition, setChosenCondition] = useState("");
    const [set, setSet] = useState("");
    const [year, setYear] = useState(2022);
    const [card_number, setCardNumber] = useState("");
    const [available, setAvailable] = useState(false);
    const [graded, setGraded] = useState(false);
    const [grade, setGrade] = useState("");
    const [collections, setCollections] = useState([])
    const [collection, setCollection] = useState("")
    const [chosenCollection, setChosenCollection] = useState("");
    const [collectionsObj, setCollectionsObj] = useState([]);



    useEffect(() => {
        getCollections();
      }, [])

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
    // Will need to get collections to select a collection to add the card to


    const handleSubmit = async (e) => {
        e.preventDefault();
        let collection_id = collectionsObj.filter(c=> {if (c.name===chosenCollection) { return c.id }})
        console.log("collection_id", collection_id[0].id)
        let newCard = {name, category: chosenCategory, condition: chosenCondition, set, year, card_number, available, grade, graded };
        console.log(newCard)
        try {
            let res = await axios.post('/api/cards', newCard)
            setFailed(false);
            setSuccess(true);
            setTimeout(()=>navigate("/profile"), 1500);
        } catch (err) {
            console.log(err.response);
            setFailed(true);
        }
    }

    const handleAvailable = (e) => {
        setAvailable(e.target.value);
    };
    const handleGraded = (e) => {
        setGraded(e.target.value);
    };
    const handleDisabled = () => {
        if (graded === false) {
            return true;
        } else {
            return false;
        }
    };

    return(
        <div>
            {success && <Alert severity="success" >Successfuly uploaded collectible!</Alert>}
            {failed && <Alert severity="error" >Failed to upload collectible!</Alert>}
                <div>
                    <Paper sx={{width: "85vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px"}} >
                    <h4>Please upload images and then fill out card info</h4>
                    {/* <CardImageUpload id={card.id} /> */}
                        <form onSubmit={handleSubmit} > 
                            <label>Name: </label>
                            <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                            <FormControl sx={{ m:1, minWidth: 250}} >
                                <Autocomplete 
                                    options={categories}
                                    groupBy={(cat)=>cat.subCategory}
                                    getOptionLabel={(cat)=>cat.name}
                                    renderInput={(params) => <TextField {...params} label="Select category" />}
                                    value={category}
                                    onChange={(e, newValue) => setCategory(newValue)}
                                    inputValue={chosenCategory}
                                    onInputChange={(e, newValue) => setChosenCategory(newValue)}
                                        
                                />
                            </FormControl>
                            <FormControl sx={{ m:1, minWidth: 250}} >
                                <Autocomplete 
                                    options={conditions}
                                    getOptionLabel={(c)=>c.name}
                                    renderInput={(params) => <TextField {...params} label="Select condition" />}
                                    value={condition}
                                    onChange={(e, newValue) => setCondition(newValue)}
                                    inputValue={chosenCondition}
                                    onInputChange={(e, newValue) => setChosenCondition(newValue)}
                                        
                                />
                            </FormControl>
                            <FormControl sx={{ m:1, minWidth: 250}} >
                                <Autocomplete 
                                    options={collections}
                                    getOptionLabel={(c)=>c}
                                    renderInput={(params) => <TextField {...params} label="Choose a collection" />}
                                    value={collection}
                                    onChange={(e, newValue) => setCollection(newValue)}
                                    inputValue={chosenCollection}
                                    onInputChange={(e, newValue) => setChosenCollection(newValue)}
                                        
                                />
                            </FormControl>
                            <br/>
                            <label>Set: </label>
                            <Input type="text" value={set} onChange={(e)=>setSet(e.target.value)} />
                            <label>Year: </label>
                            <Input type="number" value={year} onChange={(e)=>setYear(e.target.value)} />
                            <label>Card No.: </label>
                            <Input type="text" value={card_number} onChange={(e)=>setCardNumber(e.target.value)} />
                            <br/>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}} >
                                <div>
                                    <label>Available</label>
                                    <RadioGroup value={available} onChange={handleAvailable} >
                                        <FormControlLabel value={true} control={<Radio/>} label="Yes" />
                                        <FormControlLabel value={false} control={<Radio/>} label="No" />
                                    </RadioGroup>
                                </div>
                                <div>
                                    <label>Graded</label>
                                    <RadioGroup value={graded} onChange={handleGraded} >
                                        <FormControlLabel value={true} control={<Radio/>} label="Yes" />
                                        <FormControlLabel value={false} control={<Radio/>} label="No" />
                                    </RadioGroup>
                                </div>
                                <FormControl sx={{ m:1, minWidth: 150}} >
                                    <InputLabel id="grade-select-label" >Grade</InputLabel>
                                    <Select 
                                        value={grade}
                                        label="Grade"
                                        labelId="grade-select-label"
                                        onChange={(e)=>setGrade(e.target.value)}
                                        disabled={handleDisabled()}
                                    >
                                        <MenuItem value="" >
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10.0} >10.0</MenuItem>
                                        <MenuItem value={9.9} >9.9</MenuItem>
                                        <MenuItem value={9.8} >9.8</MenuItem>
                                        <MenuItem value={9.7} >9.7</MenuItem>
                                        <MenuItem value={9.6} >9.6</MenuItem>
                                        <MenuItem value={9.5} >9.5</MenuItem>
                                        <MenuItem value={9.4} >9.4</MenuItem>
                                        <MenuItem value={9.3} >9.3</MenuItem>
                                        <MenuItem value={9.2} >9.2</MenuItem>
                                        <MenuItem value={9.1} >9.1</MenuItem>
                                        <MenuItem value={9.0} >9.0</MenuItem>
                                        <MenuItem value={8.9} >8.9</MenuItem>
                                        <MenuItem value={8.8} >8.8</MenuItem>
                                        <MenuItem value={8.7} >8.7</MenuItem>
                                        <MenuItem value={8.6} >8.6</MenuItem>
                                        <MenuItem value={8.5} >8.5</MenuItem>
                                        <MenuItem value={8.4} >8.4</MenuItem>
                                        <MenuItem value={8.3} >8.3</MenuItem>
                                        <MenuItem value={8.2} >8.2</MenuItem>
                                        <MenuItem value={8.1} >8.1</MenuItem>
                                        <MenuItem value={8.0} >8.0</MenuItem>
                                        <MenuItem value={7.9} >7.9</MenuItem>
                                        <MenuItem value={7.8} >7.8</MenuItem>
                                        <MenuItem value={7.7} >7.7</MenuItem>
                                        <MenuItem value={7.6} >7.6</MenuItem>
                                        <MenuItem value={7.5} >7.5</MenuItem>
                                        <MenuItem value={7.4} >7.4</MenuItem>
                                        <MenuItem value={7.3} >7.3</MenuItem>
                                        <MenuItem value={7.2} >7.2</MenuItem>
                                        <MenuItem value={7.1} >7.1</MenuItem>
                                        <MenuItem value={7.0} >7.0</MenuItem>
                                        <MenuItem value={6.9} >6.9</MenuItem>
                                        <MenuItem value={6.8} >6.8</MenuItem>
                                        <MenuItem value={6.7} >6.7</MenuItem>
                                        <MenuItem value={6.6} >6.6</MenuItem>
                                        <MenuItem value={6.5} >6.5</MenuItem>
                                        <MenuItem value={6.4} >6.4</MenuItem>
                                        <MenuItem value={6.3} >6.3</MenuItem>
                                        <MenuItem value={6.2} >6.2</MenuItem>
                                        <MenuItem value={6.1} >6.1</MenuItem>
                                        <MenuItem value={6.0} >6.0</MenuItem>
                                        <MenuItem value={5.9} >5.9</MenuItem>
                                        <MenuItem value={5.8} >5.8</MenuItem>
                                        <MenuItem value={5.7} >5.7</MenuItem>
                                        <MenuItem value={5.6} >5.6</MenuItem>
                                        <MenuItem value={5.5} >5.5</MenuItem>
                                        <MenuItem value={5.4} >5.4</MenuItem>
                                        <MenuItem value={5.3} >5.3</MenuItem>
                                        <MenuItem value={5.2} >5.2</MenuItem>
                                        <MenuItem value={5.1} >5.1</MenuItem>
                                        <MenuItem value={5.0} >5.0</MenuItem>
                                        <MenuItem value={4.9} >4.9</MenuItem>
                                        <MenuItem value={4.8} >4.8</MenuItem>
                                        <MenuItem value={4.7} >4.7</MenuItem>
                                        <MenuItem value={4.6} >4.6</MenuItem>
                                        <MenuItem value={4.5} >4.5</MenuItem>
                                        <MenuItem value={4.4} >4.4</MenuItem>
                                        <MenuItem value={4.3} >4.3</MenuItem>
                                        <MenuItem value={4.2} >4.2</MenuItem>
                                        <MenuItem value={4.1} >4.1</MenuItem>
                                        <MenuItem value={4.0} >4.0</MenuItem>
                                        <MenuItem value={3.9} >3.9</MenuItem>
                                        <MenuItem value={3.8} >3.8</MenuItem>
                                        <MenuItem value={3.7} >3.7</MenuItem>
                                        <MenuItem value={3.6} >3.6</MenuItem>
                                        <MenuItem value={3.5} >3.5</MenuItem>
                                        <MenuItem value={3.4} >3.4</MenuItem>
                                        <MenuItem value={3.3} >3.3</MenuItem>
                                        <MenuItem value={3.2} >3.2</MenuItem>
                                        <MenuItem value={3.1} >3.1</MenuItem>
                                        <MenuItem value={3.0} >3.0</MenuItem>
                                        <MenuItem value={2.9} >2.9</MenuItem>
                                        <MenuItem value={2.8} >2.8</MenuItem>
                                        <MenuItem value={2.7} >2.7</MenuItem>
                                        <MenuItem value={2.6} >2.6</MenuItem>
                                        <MenuItem value={2.5} >2.5</MenuItem>
                                        <MenuItem value={2.4} >2.4</MenuItem>
                                        <MenuItem value={2.3} >2.3</MenuItem>
                                        <MenuItem value={2.2} >2.2</MenuItem>
                                        <MenuItem value={2.1} >2.1</MenuItem>
                                        <MenuItem value={2.0} >2.0</MenuItem>
                                        <MenuItem value={1.9} >1.9</MenuItem>
                                        <MenuItem value={1.8} >1.8</MenuItem>
                                        <MenuItem value={1.7} >1.7</MenuItem>
                                        <MenuItem value={1.6} >1.6</MenuItem>
                                        <MenuItem value={1.5} >1.5</MenuItem>
                                        <MenuItem value={1.4} >1.4</MenuItem>
                                        <MenuItem value={1.3} >1.3</MenuItem>
                                        <MenuItem value={1.2} >1.2</MenuItem>
                                        <MenuItem value={1.1} >1.1</MenuItem>
                                        <MenuItem value={1.0} >1.0</MenuItem>
                                        <FormHelperText>Please select your grade</FormHelperText>
                                    </Select>
                                </FormControl>
                            </div>
                            {success && <Alert severity="success" >Successfuly uploaded collectible!</Alert>}
                            {failed && <Alert severity="error" >Failed to upload collectible!</Alert>}
                            <Button variant="contained" type="submit" >Submit</Button>
                        </form>
                    </Paper>
                </div>
        </div>
    )
};

export default UploadCollectible;