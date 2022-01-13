import { Alert } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Protected = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    return (
        <div>
            {!auth.image && <Alert severity="error" >Finish building your profile. <button onClick={()=>navigate(`/users/${auth.id}/edit`)}>Edit Profile</button></Alert>}
            <h2>My Profile</h2>
            <h3>Hey, {auth.nickname}!</h3>
            {auth.image && <img src={auth.image} alt="profile image" width="200px"/>}
            <button onClick={()=>navigate("/profile_image")} >Edit profile image</button>
            <p>About Me: {auth.about}</p>
            <p>Name: {auth.first_name} {auth.last_name}</p>
            <p>Email: {auth.email}</p>
            <p>My ID {auth.id}</p>
            <button onClick={()=>auth.handleLogout(navigate)} >Log Out</button>
            
            <Link to={`/users/${auth.id}/edit`}>Edit Profile</Link>
            <hr/>
            <h1>Showcase Cards Display Here</h1>
        </div>
    );
};

export default Protected;