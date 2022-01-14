import { Alert, Button, FormControlLabel, Input, Paper, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardImageUpload from "../components/CardImageUpload";
import { AuthContext } from "../providers/AuthProvider";


const EditCard = () => {

    const auth = useContext(AuthContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null);
    const [failed, setFailed] = useState(false);
    const [success, setSuccess] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [set, setSet] = useState("");
    const [year, setYear] = useState(2022);
    const [card_number, setCardNumber] = useState("");
    const [available, setAvailable] = useState(false);
    const [showcase, setShowcase] = useState(false);

    const getCard = async () => {
        try {
            let res = await axios.get(`/api/cards/${id}`);
            setCard(res.data);
            setName(res.data.name);
            setCategory(res.data.category);
            setCondition(res.data.condition);
            setSet(res.data.set);
            setYear(res.data.year);
            setCardNumber(res.data.card_number);
            setAvailable(res.data.available);
            setShowcase(res.data.showcase);
        } catch (err) {
            console.log(err.response);
            alert("there was an error getting card")
        }
    };

    // const populateForm = () => {
    //     //set form values
    //     setName(card ? card.name : "");
    //     setCategory(card ? card.category : "");
    //     setCondition(card ? card.condition : "");
    //     setSet(card ? card.set : "");
    //     setYear(card ? card.year : 2022);
    //     setCardNumber(card ? card.card_number : "");
    //     setAvailable(card ? card.available : false);
    //     setShowcase(card ? card.showcase : false);
    // }

    useEffect(()=>{
        getCard();
        // populateForm();
        //set form values
        // setName(card.name ? card.name : "");
        // setCategory(card.category ? card.category : "");
        // setCondition(card.condition ? card.condition : "");
        // setSet(card.set ? card.set : "");
        // setYear(card.year ? card.year : 2022);
        // setCardNumber(card.card_number ? card.card_number : "");
        // setAvailable(card.available ? card.available : false);
        // setShowcase(card.showcase ? card.showcase : false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedCard = {name, category, condition, set, year, card_number, available, showcase};
        try {
            let res = await axios.put(`/api/cards/${card.id}`, updatedCard)
            setCard(res.data);
            setFailed(false);
            setSuccess(true);
            setTimeout(()=>navigate("/profile"), 1500);
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
            setFailed(false);
            navigate("/profile");
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
            {success && <Alert severity="success" >Successfuly edited your card!</Alert>}
            {failed && <Alert severity="error" >Failed to update card!</Alert>}
            {card && 
                <div>
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
                            {success && <Alert severity="success" >Successfuly edited your card!</Alert>}
                            {failed && <Alert severity="error" >Failed to update card!</Alert>}
                            <Button variant="contained" type="submit" >Submit</Button>
                        </form>
                        <Button variant="contained" color="error" onClick={deleteCard} >Delete this card</Button>
                    </Paper>
                </div>
            }
        </div>
    )
};

export default EditCard;