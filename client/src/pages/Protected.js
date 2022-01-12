import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Protected = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1>Protected</h1>
            <button onClick={()=>auth.handleLogout(navigate)} >Log Out</button>
            <button onClick={()=>navigate("/profile_image")} >Edit profile image</button>
        </div>
    );
};

export default Protected;