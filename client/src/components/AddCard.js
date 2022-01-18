import { Alert, Button, CircularProgress, FormControlLabel, Input, LinearProgress, Paper, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import CardImageUpload from "./CardImageUpload";

const AddCard = (props) => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const {collectionId, addCard} = props;
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [set, setSet] = useState("");
    const [year, setYear] = useState(2022);
    const [card_number, setCardNumber] = useState("");
    const [available, setAvailable] = useState(false);
    const [showcase, setShowcase] = useState(false);

    const startCreation = async (e) => {
        setLoading(true);
        e.preventDefault();
        let newCard = {user_id: auth.id, collection_id: collectionId};
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
        e.preventDefault();
        let updatedCard = {name, category, condition, set, year, card_number, available, showcase};
        try {
            let res = await axios.put(`/api/cards/${card.id}`, updatedCard)
            addCard(res.data);
            setCard(null);
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
            setShowcase(false);
            //
            setSuccess(true);
            setTimeout(()=>setSuccess(false), 6000);
            // navigate("/profile");
        } catch (err) {
            console.log(err.response);
            setFailed(true);
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
            setShowcase(false);
            // navigate("/profile");
        } catch (err) {
            console.log(err.response);
            // setFailed(true);
        }
    };

    const handleAvailable = (e) => {
        setAvailable(e.target.value);
    };
    const handleShowcase = (e) => {
        setShowcase(e.target.value);
    };

    return(
        <div>
            {success && <Alert severity="success" >Successfuly created a new card!</Alert>}
            {failed && <Alert severity="error" >Failed to create a new card!</Alert>}
            <Box sx={{ m: 1, position: "relative"}} >
                <Button onClick={startCreation} disabled={clicked} variant="contained" >Add a new card</Button>
                <br/>
                {loading && (<LinearProgress />)}
            </Box>
            {/* <p>for collection {collectionId}</p> */}
            {card && 
                <div>
                    {/* <p>{JSON.stringify(card)}</p> */}
                    <Paper sx={{width: "85vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px"}} >
                    <h4>Please upload card images and then fill out card info</h4>
                    <CardImageUpload id={card.id} />
                        <form onSubmit={handleSubmit} > 
                            <label>Name: </label>
                            <Input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                            <label>Category: </label>
                            <Input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} />
                            <label>Condition: </label>
                            <Input type="text" value={condition} onChange={(e)=>setCondition(e.target.value)} />
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
                                    <label>Showcase</label>
                                    <RadioGroup value={showcase} onChange={handleShowcase} >
                                        <FormControlLabel value={true} control={<Radio/>} label="Yes" />
                                        <FormControlLabel value={false} control={<Radio/>} label="No" />
                                    </RadioGroup>
                                </div>
                            </div>
                            <Button variant="contained" type="submit" >Submit</Button>
                        </form>
                        <Button variant="contained" color="error" onClick={deleteCard} >Cancel</Button>
                    </Paper>
                </div>
            }
        </div>
    )
};

export default AddCard;