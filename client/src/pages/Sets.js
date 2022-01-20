import { Button, Icon, Input, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Sets = () => {

    const auth = useContext(AuthContext)
    const [cards, setCards] = useState(null);
    const [search, setSearch] = useState("");

    const clearSearch = (e) => {
        e.preventDefault();
        setCards(null);
        setSearch("");
    }

    const searchCards = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.get(`/api/cards/${auth.id}/search/${search}`);
            setCards(res.data);
        } catch (err) {
            console.log(err.response);
            alert("error searching")
        }
    }

    return (
        <div>
            <div style={{width: "75vw", margin: "auto", padding: "10px"}} >
                <h3 style={{marginLeft: "3vw"}} >Search through your cards by set</h3>
            </div>
            <div style={{width: "75vw", margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} >
                <div style={{width: "60vw", margin: "10px"}} >
                <Input 
                fullWidth 
                startAdornment={<Icon>search</Icon>} 
                placeholder="Search for a set.." 
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
                type="search" />
                </div>
                <Stack spacing={1} direction="row" >    
                    <Button onClick={searchCards} variant="contained" >Search</Button>
                    <Button onClick={clearSearch} variant="outlined" >Clear</Button>
                </Stack>
            </div>
            <hr/>
            {!cards && <Box sx={{width: "80vw", bgcolor: "#D7D7D7", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "auto", padding: "20px"}} >
                <Icon sx={{fontSize:"150px"}} >pageview</Icon>
                <p>There are no cards to diplay, please search for a set..</p>
            </Box>}
            {cards && <Box sx={{width: "80vw", bgcolor: "#D7D7D7", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "auto", padding: "20px"}} >
                <code>{JSON.stringify(cards)}</code>
            </Box>}
        </div>
    )
};

export default Sets;