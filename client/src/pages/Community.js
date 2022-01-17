import { Button, Icon, Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Community = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            let res = await axios.get("/api/users");
            setUsers(res.data);
        } catch (err) {
            console.log(err.response);
            alert('error getting users');
        }
    }

    return (
        <div>
            <h1>Community</h1>
            <h3>Find a collector</h3>
            <div style={{width: "75vw", margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} >
                <div style={{width: "50vw", margin: "auto", padding: "10px"}} >
                <Input fullWidth startAdornment={<Icon>search</Icon>} placeholder="Find a collector.." type="search" />
                </div>
                <Button variant="contained" >Search</Button>
            </div>
            <div style={{width: "85vw", margin: "auto", padding: "10px"}} >
                <code style={{overflowWrap: "break-word"}} >{JSON.stringify(users)}</code>
            </div>
        </div>
    );
};

export default Community;