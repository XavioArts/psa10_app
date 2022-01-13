import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = () => {

    const { authenticated, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div style={styles.container} > 
            <Link to="/" style={styles.link} >Home</Link>
            <Link to="/public" style={styles.link} >Public</Link>
            {authenticated && <Link to="/profile" style={styles.link} >My Profile</Link>}
            {/* {authenticated && <Link to="/collections" style={styles.link} >My Collection</Link>} */}
            {authenticated && <button style={styles.buttonLink} onClick={()=>handleLogout(navigate)} >Log Out</button>}
            
        </div>
    );
};

const styles = {
    container: {
        margin: "0px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "black",
    },
    link: {
        textDecoration: "none",
        margin: "10px",
        color: "white",
    },
    buttonLink: {
        textDecoration: "none",
        margin: "10px",
        color: "white",
        border: '0px',
        backgroundColor: 'black',
        fontSize: '16px',
    }
}

export default NavBar;