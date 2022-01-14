import { Alert } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Showcase from "../components/Showcase";
import { AuthContext } from "../providers/AuthProvider";
import { DateTime } from "luxon";
import EditCollection from "../components/EditCollection";
// import EditCard from "../components/EditCard";


const Protected = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        userInfo();
    }, [])

    const userInfo = async () => {
        let res = await axios.get(`/api/users/${auth.id}`)
        setUser(res.data)
        console.log(res.data)
        console.log(auth.id)
    }

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    return (
        <div>
            {!auth.image && <Alert severity="error" >Finish building your profile. <button onClick={() => navigate(`/users/${auth.id}/edit`)}>Edit Profile</button></Alert>}
            <h2>My Profile</h2>
            {auth.image && <img src={auth.image} alt="profile image" width="200px" />}
            <button onClick={() => navigate("/profile_image")} >Edit profile image</button>
            <h2>{auth.nickname}</h2>
            <p>Joined: {DateTime.fromISO(user.created_at).toFormat('LLLL yyyy')}</p>
            <p>Email: {auth.email}</p>
            <p>About Me: {auth.about}</p>
            <p>Name: {auth.first_name} {auth.last_name}</p>
            <p>My ID {auth.id}</p>
            <Link to={`/users/${auth.id}/edit`}>Edit Profile</Link>
            <hr />
            <div>
                <a href="/profile">Overview</a>
                <a href="/profile/collections">Collections</a>
                <a href="/profile/sets">Sets</a>
                <Link to={"/profile/showcases"}>Showcases</Link>
            </div>
            <hr />
            <Outlet />
            <EditCollection />
        </div>
    );
};

export default Protected;