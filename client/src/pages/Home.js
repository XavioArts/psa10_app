import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";

const Home = () => {
    // This home page is just a place holder for the time being
    // And will probably become the dashboard page
    /// we will need a separate landing page

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [cards, setCards] = useState(false);

    const getUserCards = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.get("/api/cards");
            setCards(res.data);
        } catch (err) {
            console.log(err.response);
            alert("there was an error getting cards")
        }
    }

    return (
        <div>
            <h1>Home</h1>
            {JSON.stringify(auth)}
            {auth.image && 
            <div style={{width: "200px", height: "200px", borderRadius: "50%", overflow: "hidden"}} >
                <img src={auth.image} alt="profile" style={{objectFit: "cover", width: "auto", height: "200px"}}/>
            </div>}
            <ButtonDiv>
                <Button variant="contained" onClick={()=>navigate("/login")} >Log In</Button>
                <Button variant="contained" onClick={()=>auth.handleLogout(navigate)} >Log Out</Button>
            </ButtonDiv>
            <br/>
            <ButtonDiv>
                <Button variant="contained" onClick={()=>navigate("/profile")}>User View</Button>
                <Button variant="contained" onClick={()=>navigate("/cards/1/image")}>Test card image upload</Button>
            </ButtonDiv>
            <br/>
            <ButtonDiv>
                <Button variant="contained" onClick={getUserCards}>Test get user cards</Button>
            </ButtonDiv>
            <br/>
            {cards && <p>{JSON.stringify(cards)}</p>}
        </div>
    );
};

const ButtonDiv = styled.div`
    margin: 10px;
`

export default Home;