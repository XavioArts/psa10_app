import { Button, Grid, Icon, Input, Stack, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import { AuthContext } from "../providers/AuthProvider";

const Sets = () => {

    const auth = useContext(AuthContext)
    const [allCards, setAllCards] = useState(null);
    const [cards, setCards] = useState(null);
    const [search, setSearch] = useState("");
    const [emptySearch, setEmptySearch] = useState(false);

    useEffect(()=>{
        getAll();
    }, [])

    const getAll = async () => {
        try {
            let res = await axios.get("/api/cards")
            setAllCards(res.data);
            setCards(res.data);
        } catch (err) {
            console.log(err.response);
        }
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setCards(allCards);
        setSearch("");
    }

    const searchCards = async (e) => {
        e.preventDefault();
        if (search === "") {
            setEmptySearch(true);
            return 
        }
        try {
            let res = await axios.get(`/api/cards/${auth.id}/search/${search}`);
            setCards(res.data);
        } catch (err) {
            console.log(err.response);
            alert("error searching")
        }
    }

    const renderCards = () => {
        if (cards.length === 0) {
            return <h1 style={{textAlign: "center"}} >No collectibles found with the set "{search}"</h1>
        }
        return cards.map((c)=>{
        return (<div style={{margin: "10px"}} key={c.id}><CollectionCard key={c.id} card={{...c}} show={true} personal={true} size="medium" /></div>)
      });
    };

    return (
        <div>
            <div style={{width: "75vw", margin: "auto", padding: "10px"}} >
                <h3 style={{marginLeft: "3vw"}} >Search through your cards by set</h3>
            </div>
            <div style={{width: "75vw", margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} >
                <div style={{width: "60vw", margin: "10px"}} >
                    <Tooltip open={emptySearch} onClose={()=>setEmptySearch(false)} title="Please enter a search term" >
                        <Input 
                        fullWidth 
                        startAdornment={<Icon>search</Icon>} 
                        placeholder="Search for a set.." 
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value)}}
                        type="search" />
                    </Tooltip>
                </div>
                <Stack spacing={1} direction="row" >    
                    <Button style={{borderRadius: '40px'}} onClick={searchCards} variant="contained" >Search</Button>
                    <Button style={{borderRadius: '40px'}} onClick={clearSearch} variant="outlined" >Clear</Button>
                </Stack>
            </div>
            
            {!cards && <Box sx={{width: "80vw", bgcolor: "#D7D7D7", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "auto", padding: "20px"}} >
                <Icon sx={{fontSize:"150px"}} >pageview</Icon>
                <p>There are no collectibles to diplay, please search for a set..</p>
            </Box>}
            {cards && <Box sx={{width: "100vw", margin: "auto", padding: "20px", width: "80vw"}} >
                <div >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ display: "flex", justifyContent: "center" }}>
                        {renderCards()}
                    </Grid>
                </div>
            </Box>}
        </div>
    )
};

export default Sets;