import { LinearProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = () => {

    const auth = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    const timeRedirect = () => {
        setTimeout(()=>setRedirect(true), 5000);
    }

    if (!auth.authenticated) {
        return (
            <div style={styles.center} >
                <p>Checking authentication..</p>
                <div style={{width: "75vw"}} >
                    <LinearProgress />
                </div>
                {timeRedirect()}
                {redirect && <Navigate to="/" />}
            </div>
        );
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

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

export default RequireAuth;