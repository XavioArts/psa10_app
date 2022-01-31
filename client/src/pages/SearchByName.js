import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionCard from "../components/CollectionCard";
import { AuthContext } from "../providers/AuthProvider";

const SearchByName = () => {

    const auth = useContext(AuthContext);
    const {search} = useParams();
    const [cards, setCards] = useState(null);

    useEffect(()=>{
        if(auth.authenticated) {
            searchCards();
        }
    }, [])


    const searchCards = async () => {
        try {
            let res = await axios.get(`/api/cards/search_by_name/${search}`);
            setCards(res.data);
        } catch (err) {
            console.log(err.response);
            alert("error searching")
        }
    }

    const renderCards = () => {
        if (cards.length === 0) {
            return <h1>No cards found with the name "{search}"</h1>
        }
        return cards.map((c)=>{
        return (<div style={{margin: "10px"}} key={c.id}><CollectionCard key={c.id} card={{...c}} show={true} personal={true} size="medium" /></div>)
      });
    };

    return (
        <div>
            {!cards && <h2>Searching collectibles..</h2>}
            {cards && <Box sx={{width: "100vw", bgcolor: "#D7D7D7", margin: "auto", padding: "20px"}} >
                <div style={{margin: "auto"}} >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {renderCards()}
                    </Grid>
                </div>
            </Box>}
        </div>
    )
};

export default SearchByName;