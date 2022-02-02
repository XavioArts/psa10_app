import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Styles";


const Layout = () => {
    
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <div style={{ height: "100%" }} >
                <Outlet />
            </div>
            <div>
                {/* <Footer /> */}
            </div>
    </ThemeProvider>
    );

};

export default Layout;