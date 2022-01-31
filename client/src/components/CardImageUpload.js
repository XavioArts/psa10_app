import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Divider, Icon, Input, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import styled from "styled-components";

const CardImageUpload = (props) => {
    const {id, submitted, setSubmitted, setUpload} = props;
    const [card, setCard] = useState({});
    const [files, setFiles] = useState([]);
    const [filesBack, setFilesBack] = useState([]);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [noneChosen, setNoneChosen] = useState(false);

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
        console.log(submitted)
        if(submitted === true){
            handleUpload()
        }
    },[submitted])

    const handleUpload = async (e) => {
        if(e){e.preventDefault()}
        setClicked(true);
        setSubmitted(true)
        let data = new FormData();
        let fileFront = document.getElementById("input").files[0];
        let fileBack = document.getElementById("inputBack").files[0];
        if (fileFront === undefined || fileBack === undefined) {
            setNoneChosen(true);
            setClicked(false);
            return
        }
        data.append("fileFront", fileFront);
        data.append("fileBack", fileBack);
        try {
            let res = await axios.post(`/api/cards/${id}/upload`, data);
            setFailed(false);
            setSuccess(true);
            setCard(res.data);
            setClicked(false);
            setUpload(true)
        } catch (err) {
            console.log(err.response);
            setFailed(true);
            alert("there was an error uploading")
            setClicked(false);
        }
    }

    // useEffect(()=>{
    //     getCard();
    // }, [])

    // const handleUpload = async (e) => {
    //     e.preventDefault();
    //     setClicked(true);
    //     let data = new FormData();
    //     let fileFront = document.getElementById("input").files[0];
    //     let fileBack = document.getElementById("inputBack").files[0];
    //     data.append("fileFront", fileFront);
    //     data.append("fileBack", fileBack);
    //     try {
    //         let res = await axios.post(`/api/cards/${id}/upload`, data);
    //         setFailed(false);
    //         setSuccess(true);
    //         setCard(res.data);
    //         setClicked(false);
    //     } catch (err) {
    //         console.log(err.response);
    //         setFailed(true);
    //         alert("there was an error uploading")
    //         setClicked(false);
    //     }
    // }

    const fileValidation = () => {
        const fi = document.getElementById('input');
        // Check if any file is selected.
        if (fi.files.length > 0) {
            for (const i = 0; i <= fi.files.length - 1; i++) {
    
                const fsize = fi.files.item(i).size;
                const file = Math.round((fsize / 1024));
                // The size of the file.
                if (file >= 4096) {
                    alert(
                      "File too Big, please select a file less than 4mb");
                } else if (file < 200) {
                    alert(
                      "File too small, please select a file greater than 200kb");
                } else {
                    document.getElementById('size').innerHTML = '<b>'
                    + file + '</b> KB';
                }
            }
        }
    }
    
    const onChangeFuncFront = (e) => {
        setFiles(e)
        fileValidation(e)
    }

    const onChangeFuncBack = (e) => {
        setFilesBack(e)
        fileValidation(e)
    }

    return (
        <CenteredDiv>
                <Tooltip open={noneChosen} onClose={()=>setNoneChosen(false)} title="Please select an image to upload for each side" >
            <Paper sx={{width: "75vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "20px"}} >
            <h3>Upload your images</h3>
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
                    <Input fullWidth accept="image/*" value={files} type="file" id="input" onChange={(e)=>onChangeFuncFront(e.target.value)} />
                    <br/>
                    <label>Upload back image of card:</label>
                    <Input fullWidth accept="image/*" value={filesBack} type="file" id="inputBack" onChange={(e)=>onChangeFuncBack(e.target.value)} />
                    <br/>
                    <Button disabled={clicked} variant="contained" component="span" endIcon={<Icon>photocamera</Icon>} onClick={handleUpload} >Upload</Button>
                </label>
            </div>
                </Paper>
                </Tooltip>
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