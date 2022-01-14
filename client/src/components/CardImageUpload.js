import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Alert, Button, Divider, Icon, Input, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const CardImageUpload = (props) => {

    // const {id} = useParams();
    const {id} = props;

    const auth = useContext(AuthContext);
    const [card, setCard] = useState({});
    const [files, setFiles] = useState([]);
    const [filesBack, setFilesBack] = useState([]);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const getCard = async (e) => {
        try {
            let res = await axios.get(`/api/cards/${id}`);
            setCard(res.data);
        } catch (err) {
            console.log(err.response);
            alert("there was an error getting card")
        }
    };

    useEffect(()=>{
        getCard();
    }, [])

    const handleUpload = async (e) => {
        e.preventDefault();
        setClicked(true);
        // let dataFront = new FormData();
        // let dataBack = new FormData();
        let data = new FormData();
        let fileFront = document.getElementById("input").files[0];
        let fileBack = document.getElementById("inputBack").files[0];
        data.append("fileFront", fileFront);
        data.append("fileBack", fileBack);
        console.log(data)
        // console.log(dataBack)
        try {
            let res = await axios.post(`/api/cards/${id}/upload`, data);
            console.log(res.data)
            setFailed(false);
            setSuccess(true);
            setCard(res.data);
            setClicked(false);
            // setTimeout(()=>navigate("/profile"), 1000);
        } catch (err) {
            console.log(err.response);
            setFailed(true);
            alert("there was an error uploading")
            setClicked(false);
        }
    }

    return (
        <CenteredDiv>
            <Paper sx={{width: "75vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px"}} >
            <h3>Upload your card images for {card.name}</h3>
            {/* <p>{id}</p>
            <p>{JSON.stringify(card)}</p> */}
            {success && <Alert severity="success" >Successfully uploaded card pictures!</Alert>}
            {failed && <Alert severity="error" >Failed! Please select a valid image for each side.</Alert>}
            <br/>
            <p>Current images</p>
            <div style={{display: "flex", margin: "10px", padding: "10px", justifyContent: "space-around", width: "500px"}} >
                <div>
                    <label>Front:</label>
                    {card.front_image === null && 
                        <div style={{width: "152px", height: "212px", background: "#D7D7D7", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
                            <Icon sx={{fontSize: "90px", margin: "0"}} >
                                cancel
                            </Icon>
                            <p style={{fontSize: "12px"}} >No image</p>
                    </div>}
                    {card.front_image && <div style={{width: "152px", height: "212px", overflow: "hidden"}} >
                        <img src={card.front_image} alt="front" style={{objectFit: "cover", width: "152px", height: "auto"}}/>
                    </div>}
                </div>
                <div>
                    <label>Back:</label>
                    {card.back_image === null && 
                        <div style={{width: "152px", height: "212px", background: "#D7D7D7", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
                            <Icon sx={{fontSize: "90px", margin: "0"}} >
                                cancel
                            </Icon>
                            <p style={{fontSize: "12px"}} >No image</p>
                    </div>}
                    {card.back_image && <div style={{width: "152px", height: "212px", overflow: "hidden"}} >
                        <img src={card.back_image} alt="back" style={{objectFit: "cover", width: "152px", height: "auto"}}/>
                    </div>}
                </div>
            </div>
            <Divider/>
            <div style={{width: "70vw"}} >
                <label htmlFor="contained-button-file" >
                    <label>Upload front image of card:</label>
                    <Input fullWidth accept="image/*" value={files} type="file" id="input" onChange={(e)=>setFiles(e.target.value)} />
                    <br/>
                    <label>Upload back image of card:</label>
                    <Input fullWidth accept="image/*" value={filesBack} type="file" id="inputBack" onChange={(e)=>setFilesBack(e.target.value)} />
                    <br/>
                    <Button disabled={clicked} variant="contained" component="span" endIcon={<Icon>photocamera</Icon>} onClick={handleUpload} >Upload</Button>
                </label>
            </div>
            {/* <br/>
                <Button variant="contained" onClick={()=>console.log(files)} >Log Files</Button>
                <Button variant="contained" onClick={()=>console.log(filesBack)} >Log Files Two</Button>
            <br/>
                <Button variant="contained" onClick={()=>console.log(document.getElementById("input").files[0])} >get file</Button>
                <Button variant="contained" onClick={()=>console.log(document.getElementById("inputBack").files[0])} >get file two</Button> */}
                </Paper>
        </CenteredDiv>
    )
}

const CenteredDiv = styled.div`
    text-align: center;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default CardImageUpload;