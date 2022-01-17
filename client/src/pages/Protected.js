import { Alert } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
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
            <div className="pageContainer">
            <div className='profileInfo'>
            {auth.image && <img src={auth.image} alt="profile image" className='circletag' />}
            
                <h2>{auth.nickname}</h2>
                <p className='profileTextDate'>Joined {DateTime.fromISO(user.created_at).toFormat('LLLL yyyy')}</p>
                <p className='profileText'>{auth.email}</p>
                <p className='profileText'>{auth.about}</p>
                <Link className='profileText' to={`/users/${auth.id}/edit`}>Edit Profile</Link>
            </div>
       
            <div className='profileNavContainer'>
                <Link className='profileNavText' to ={"/profile/overview"}>Overview</Link>
                <Link className='profileNavText' to ={"/profile/collections"}>Collections</Link>
                <a className='profileNavText' href="/profile/sets">Sets</a>
                <Link className='profileNavText' to={"/profile/showcases"}>Showcases</Link>
            </div>
    
            <Outlet />
            </div>
        </div>
    );
};

export default Protected;