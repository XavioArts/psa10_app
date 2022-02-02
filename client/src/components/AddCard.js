import { Alert, Autocomplete, Button, FormControl, FormControlLabel, FormHelperText, Input, InputLabel, LinearProgress, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Tooltip, ThemeProvider, FormLabel } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Navigate } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import CardImageUpload from "./CardImageUpload";
import { categories, conditions } from "../components/FormChoices";
import { theme } from "./Styles";


const AddCard = (props) => {

    const auth = useContext(AuthContext);
    const { collectionId, addCard } = props;
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [name, setName] = useState("");
    const [chosenCategory, setChosenCategory] = useState("");
    const [chosenCondition, setChosenCondition] = useState("");
    const [set, setSet] = useState("");
    const [year, setYear] = useState(2022);
    const [card_number, setCardNumber] = useState("");
    const [available, setAvailable] = useState(false);
    const [graded, setGraded] = useState(false);
    const [grade, setGrade] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [upload, setUpload] = useState(false);
    const [trueSubmit, setTrueSubmit] = useState(false)
    const [notUploaded, setNotUploaded] = useState(false);
    const [notUploadedAlert, setNotUploadedAlert] = useState(false);

    useEffect(() => {
        console.log("true", trueSubmit)
        if (upload && trueSubmit) {
            handleSubmit()
        }
    }, [upload]);

    const [category, setCategory] = useState(categories[0]);
    const [condition, setCondition] = useState(conditions[0]);


    const startCreation = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log({ user_id: auth.id, collection_id: collectionId, likes: 0 })
        let newCard = { user_id: auth.id, collection_id: collectionId, likes: 0 };
        try {
            let res = await axios.post("/api/cards", newCard);
            setCard(res.data);
            setClicked(true);
            setFailed(false);
            setLoading(false);
        } catch (err) {
            console.log(err.response);
            setFailed(true);
        }
    };

    const handleSubmit = async (e) => {
        if (e) { e.preventDefault(); }
        if (upload === true) {
            let updatedCard = { name, category: chosenCategory, condition: chosenCondition, set, year, card_number, available, grade, graded };
            console.log(updatedCard)
            try {
                let res = await axios.put(`/api/cards/${card.id}`, updatedCard)
                console.log(res.data)
                console.log('hi')
                addCard(res.data);
                setCard(null);
                setClicked(false);
                setFailed(false);
                //reset form values
                setName("");
                setCategory(categories[0]);
                setCondition(conditions[0]);
                console.log("hey")
                setSet("");
                setYear(2022);
                setCardNumber("");
                setAvailable(false);
                setSuccess(true);
                console.log("hey")
                setUpload(false)
                setTrueSubmit(false)
                setTimeout(() => setSuccess(false), 6000);
                console.log("hey")
                Navigate(`/profile/collections/${collectionId}`)
                if (submitted === true) {
                    setSubmitted(false)
                }
            } catch (err) {
                console.log(err.response);
                setFailed(true);
                setTimeout(() => setFailed(false), 6000);
            }
        }
    }

    const deleteCard = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.delete(`/api/cards/${card.id}`)
            setCard(null)
            setClicked(false);
            setFailed(false);
            //reset form values
            setName("");
            setCategory("");
            setCondition("");
            setSet("");
            setYear(2022);
            setCardNumber("");
            setAvailable(false);
        } catch (err) {
            console.log(err.response);
        }
    };

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

    const finished = () => {
        if (!upload) {
            setNotUploaded(true);
            setNotUploadedAlert(true);
            return
        }
        setSubmitted(true)
        setTrueSubmit(true)
    }

    return (
        <ThemeProvider theme={theme} >
        <div >
            {success && <Alert severity="success" >Successfuly created a new collectible!</Alert>}
            {failed && <Alert severity="error" >Failed to create a new collectible!</Alert>}
            <Box sx={{  position: "relative",  }} >
                <Button style={{borderRadius: "40px"}} onClick={startCreation} disabled={clicked} variant="contained" >Add a new collectible</Button>
                {loading && (<LinearProgress />)}
            </Box>
            <br/>
            {card &&
                <div>
                    <br/>
                    <h4>Please upload card images and then fill out card info</h4>
                    <CardImageUpload id={card.id} submitted={submitted} setSubmitted={setSubmitted} setUpload={setUpload} />
                    <form onSubmit={handleSubmit} >
                        <TextField style={{ margin: '10px' }}
                            label="Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            inputProps={{ maxLength: 20 }}
                            />

                        <FormControl sx={{ m: 1, minWidth: 250 }} >
                            <Autocomplete
                                options={categories}
                                groupBy={(cat) => cat.subCategory}
                                getOptionLabel={(cat) => cat.name}
                                renderInput={(params) => <TextField {...params} label="Select category" />}
                                value={category}
                                onChange={(e, newValue) => setCategory(newValue)}
                                inputValue={chosenCategory}
                                onInputChange={(e, newValue) => setChosenCategory(newValue)}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 250 }} >
                            <Autocomplete
                                options={conditions}
                                getOptionLabel={(c) => c.name}
                                renderInput={(params) => <TextField {...params} label="Select condition" />}
                                value={condition}
                                onChange={(e, newValue) => setCondition(newValue)}
                                inputValue={chosenCondition}
                                onInputChange={(e, newValue) => setChosenCondition(newValue)}
                                required
                            />
                        </FormControl>
                        <br />
                        <TextField style={{ margin: '10px' }}
                            label="Set"
                            value={set}
                            required
                            onChange={(e) => setSet(e.target.value)}
                            />
                        <TextField style={{ margin: '10px' }}
                            label="Year"
                            value={year}
                            required
                            onChange={(e) => setYear(e.target.value)}
                            />
                        <TextField style={{ margin: '10px' }}
                            label="Card Number"
                            value={card_number}
                            onChange={(e) => setCardNumber(e.target.value)}
                            />
                        <br />
                        <div style={{ display: "flex", alignItems: "left", justifyContent: "flex-start" }} >
                            <div style={{margin: '10px 30px'}}>
                                <RadioGroup value={available} onChange={handleAvailable} >
                                <FormLabel>Available</FormLabel>
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </div>
                            <div style={{margin: '10px 20px'}}>
                                <FormLabel>Graded</FormLabel>
                                <RadioGroup value={graded} onChange={handleGraded} >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" labelPlacement="start"/>
                                    <FormControlLabel value={false} control={<Radio />} label="No" labelPlacement="start"/>
                                </RadioGroup>
                            </div> 
                            <FormControl sx={{ m: 3, minWidth: 150 }} >
                                <InputLabel id="grade-select-label" >Grade</InputLabel>
                                <Select
                                    value={grade}
                                    label="Grade"
                                    labelId="grade-select-label"
                                    onChange={(e) => setGrade(e.target.value)}
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
                        {notUploadedAlert && <Alert onClose={() => { setNotUploadedAlert(false) }} severity="error" >Please upload your images first</Alert>}
                        <Tooltip open={notUploaded} onClose={() => setNotUploaded(false)} title="Please upload your images" >
                            <Button style={{borderRadius: "40px"}} variant="contained" type="submit" onClick={() => finished()} >Submit</Button>
                        </Tooltip>
                    <Button style={{borderRadius: "40px", margin: '10px' }} variant="contained" color="error" onClick={deleteCard} >Cancel</Button>
                    </form>
                    {/* </Paper> */}
                </div>
            }
        </div>
        </ThemeProvider>

    )
};

export default AddCard;