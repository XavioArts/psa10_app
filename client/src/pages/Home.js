import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
    // This home page is just a place holder for the time being
    // And will probably become the dashboard page
    /// we will need a separate landing page

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // const logOut = (e) => {
    //     e.preventDefault()
    // }

    return (
        <div>
            <h1>Home</h1>
            {JSON.stringify(auth)}
            {auth.image && 
            <div style={{width: "200px", height: "200px", borderRadius: "50%", overflow: "hidden"}} >
                <img src={auth.image} alt="profile" style={{objectFit: "cover", width: "200px", height: "auto"}}/>
            </div>}
            <button onClick={()=>navigate("/login")} >Log In</button>
            <button onClick={()=>auth.handleLogout(navigate)} >Log Out</button>
            <button onClick={()=>navigate("/profile")}>User View</button>
        </div>
    );
};

export default Home;