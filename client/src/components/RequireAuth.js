import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = () => {

    const auth = useContext(AuthContext);

    if (!auth.authenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default RequireAuth;