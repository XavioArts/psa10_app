import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = () => {

    const { authenticated, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div style={styles.container} > 
            <Link to="/" style={styles.link} >Home</Link>
            {authenticated && <Link to="/profile/overview" style={styles.link} >My Profile</Link>}
            {authenticated && <Link to="/profile/collections" style={styles.link} >My Collection</Link>}
            {authenticated && <Link to="/community" style={styles.link} >Community</Link>}
            <Link to="/messageboard" style={styles.link} >Message Board</Link>
            <Link to="/about" style={styles.link} >About Us</Link>
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