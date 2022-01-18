import { Alert, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { DateTime } from "luxon";
import EditCollection from "../components/EditCollection";
// import EditCard from "../components/EditCard";


const Protected = () => {

    const {user_id} = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        userInfo();
    }, [])

    const userInfo = async () => {
        if (user_id) {
            setLoading(true);
            try {
                let res = await axios.get(`/api/users/${user_id}`)
                setUser(res.data)
                console.log(res.data)
                setLoading(false);
                // console.log(auth.id)
            } catch (err) {
                console.log(err.response);
            }
        }
    }

    const styles = {
        center: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            overflow: "hidden"
        }
    }
    if (loading) {
        return (
            <div style={styles.center} >
                <p>Loading..</p>
                <div style={{width: "75vw"}} >
                    <LinearProgress />
                </div>
            </div>
        );
    }


    return (
        <div>
            {!auth.image && !user && <Alert severity="error" >Finish building your profile. <button onClick={() => navigate(`/users/${auth.id}/edit`)}>Edit Profile</button></Alert>}
            <div className="pageContainer">
            <div className='profileInfo'>
            {!user && auth.image && <img src={auth.image} alt="profile image" className='circletag' />}
            {user && <img src={user.image} alt="profile image" className='circletag' />}
            
            {!user &&
            <div>
                <h2>{auth.nickname}</h2>
                <p className='profileTextDate'>Joined {DateTime.fromISO(auth.created_at).toFormat('LLLL yyyy')}</p>
                <p className='profileText'>{auth.email}</p>
                <p className='profileText'>{auth.about}</p>
                <Link className='profileText' to={`/users/${auth.id}/edit`}>Edit Profile</Link>
            </div>}
            {user &&
            <div>
                <h2>{user.nickname}</h2>
                <p className='profileTextDate'>Joined {DateTime.fromISO(user.created_at).toFormat('LLLL yyyy')}</p>
                <p className='profileText'>{user.email}</p>
                <p className='profileText'>{user.about}</p>
            </div>}
            </div>
       
            <div className='profileNavContainer'>
                <Link className='profileNavText' to ={"/profile/overview"}>Overview</Link>
            {!user && <div className='profileNavContainer'>
                <Link className='profileNavText' to ={"/profile"}>Overview</Link>
                <Link className='profileNavText' to ={"/profile/collections"}>Collections</Link>
                <a className='profileNavText' href="/profile/sets">Sets</a>
                <Link className='profileNavText' to={"/profile/showcases"}>Showcases</Link>
            </div>}
            {user && <div className='profileNavContainer'>
                <Link className='profileNavText' to ={`/community/users/${user_id}/profile`}>Overview</Link>
                <Link className='profileNavText' to ={`/community/users/${user_id}/profile/collections`}>Collections</Link>
                <Link className='profileNavText' to ={`/community/users/${user_id}/profile/sets`}>Sets</Link>
                <Link className='profileNavText' to={`/community/users/${user_id}/profile/showcases`}>Showcases</Link>
            </div>}
    
            <Outlet />
            </div>
        </div>
    );
};

export default Protected;