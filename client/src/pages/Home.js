import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";

const Home = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [cards, setCards] = useState(null);

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

    const editCard = (e, url) => {
        e.preventDefault();
        navigate(url);
    }

    const renderCards = () => {
        return cards.map((c) => {
            return (
                <div key={c.id} >
                    <h4>{c.name} - id no. {c.id}</h4>
                    <Button variant="contained" onClick={(e) => editCard(e, `/profile/edit_card/${c.id}`)} >Edit this card</Button>
                </div>
            )
        });
    };

    const resetShowcase = async () => {
        cards.forEach( async (c) => {
            try {
                let reset = {showcase: false}
                let res = await axios.put(`/api/cards/${c.id}`, reset)
                console.log(res.data);
            } catch (err) {
                console.log(err.response);
                alert("there was an error")
            }
        })
    }

    return (
        <div>
            <h1>Home</h1>
            <p>This is a page for testing things</p>
            <div style={{ width: "85vw", margin: "auto", padding: "10px" }} >
                <code style={{ overflowWrap: "break-word" }} >{JSON.stringify(auth)}</code>
            </div>
            {auth.image &&
                <div style={{ width: "200px", height: "200px", borderRadius: "50%", overflow: "hidden" }} >
                    <img src={auth.image} alt="profile" style={{ objectFit: "cover", width: "auto", height: "200px" }} />
                </div>}
            <ButtonDiv>
                <Button variant="contained" onClick={() => navigate("/login")} >Log In</Button>
                <Button variant="contained" onClick={() => auth.handleLogout(navigate)} >Log Out</Button>
            </ButtonDiv>
            <br />
            <ButtonDiv>
                <Button variant="contained" onClick={() => navigate("/profile")}>User View</Button>
                {/* vvv this button no longer works vvv */}
                <Button disabled variant="contained" onClick={() => navigate("/cards/1/image")}>Test card image upload</Button>
            </ButtonDiv>
            <br />
            <ButtonDiv>
                <Button variant="contained" onClick={getUserCards}>Test get user cards</Button>
                <Button variant="contained" onClick={() => navigate("/test/1")}>Test page Id 1</Button>
            </ButtonDiv>
            <br />
            {cards && 
                <div>
                    <Button onClick={resetShowcase} >Reset Showcase All</Button>
                    {renderCards()}
                </div>
            }

        </div>

    );
};

const ButtonDiv = styled.div`
    margin: 10px;
`

export default Home;