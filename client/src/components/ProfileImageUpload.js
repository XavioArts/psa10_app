import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import {FaceIcon} from "@mui/icons-material";
import { Button, Icon, Input } from "@mui/material";
import axios from "axios";

const ProfileImageUpload = () => {

    const auth = useContext(AuthContext);
    const [files, setFiles] = useState([]);

    const handleUpload = async (e) => {
        e.preventDefault();
        let file = document.getElementById("input").files[0].name;
        try {
            let res = await axios.post('/api/users/image', file);
            console.log(res.data)
        } catch (err) {
            console.log(err.response);
            alert("there was an error uploading")
        }
    }

    return (
        <div>
            <h3>Update your profile image</h3>
            {auth.image === null && 
                <div style={{width: "200px", height: "200px", background: "#D7D7D7", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
                    <Icon sx={{fontSize: "115px", margin: "0"}} >
                        image
                    </Icon>
                    <p style={{fontSize: "12px"}} >No profile image</p>
                </div>}
            <label htmlFor="contained-button-file" >
                <Input accept="image/*" value={files} type="file" id="input" onChange={(e)=>setFiles(e.target.value)} />
                <Button variant="contained" component="span" endIcon={<Icon>photocamera</Icon>} onClick={handleUpload} >Upload</Button>
            </label>
                <Button variant="contained" onClick={()=>console.log(files)} >Log Files</Button>
                <Button variant="contained" onClick={()=>console.log(document.getElementById("input").files[0])} >get file</Button>
        </div>
    )
}

export default ProfileImageUpload;