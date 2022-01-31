import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = () => {

    return (
        <div>
            <NavBar />
            <div style={{height: "100vw"}} >
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;