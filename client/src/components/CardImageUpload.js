import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Alert, Button, Icon, Input } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CardImageUpload = () => {

    const {id} = useParams();

    const auth = useContext(AuthContext);
    const [card, setCard] = useState({});
    const [files, setFiles] = useState([]);
    const [filesBack, setFilesBack] = useState([]);
    const [success, setSuccess] = useState(false);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        setClicked(true);
        // let data = new FormData();
        // let file = document.getElementById("input").files[0];
        // data.append("file", file);
        // console.log(data)
        // try {
        //     // let res = await axios.post('/api/users/image', data);
        //     console.log(res.data)
        //     setSuccess(true);
        //     auth.setUser(res.data);
        //     setClicked(false);
        //     // setTimeout(()=>navigate("/"), 1500);
        // } catch (err) {
        //     console.log(err.response);
        //     alert("there was an error uploading")
        // }
    }

    return (
        <div>
            <h3>Upload your card images</h3>
            <p>{id}</p>
            {success && <Alert severity="success" >Successfully uploaded card pictures!</Alert>}
            <br/>
            <label htmlFor="contained-button-file" >
                <label>Upload front image of card:</label>
                <Input accept="image/*" value={files} type="file" id="input" onChange={(e)=>setFiles(e.target.value)} />
                <br/>
                <label>Upload back image of card:</label>
                <Input accept="image/*" value={filesBack} type="file" id="inputBack" onChange={(e)=>setFilesBack(e.target.value)} />
                <Button disabled={clicked} variant="contained" component="span" endIcon={<Icon>photocamera</Icon>} onClick={handleUpload} >Upload</Button>
            </label>
            <br/>
                <Button variant="contained" onClick={()=>console.log(files)} >Log Files</Button>
                <Button variant="contained" onClick={()=>console.log(filesBack)} >Log Files Two</Button>
            <br/>
                <Button variant="contained" onClick={()=>console.log(document.getElementById("input").files[0])} >get file</Button>
                <Button variant="contained" onClick={()=>console.log(document.getElementById("inputBack").files[0])} >get file two</Button>
        </div>
    )
}

export default CardImageUpload;