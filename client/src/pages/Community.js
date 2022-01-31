import { Avatar, Box, Button, Icon, IconButton, Input, List, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageDiv } from "../components/Styles";
import UserContactModal from "../components/UserContactModal";
import { AuthContext } from "../providers/AuthProvider";

const Community = () => {

    const {authenticated} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [emptySearch, setEmptySearch] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            let res = await axios.get("/api/users");
            setUsers(res.data);
            setFilteredUsers(res.data);
        } catch (err) {
            console.log(err.response);
            alert('error getting users');
        }
    }

    const searchUsers = async (e) => {
        e.preventDefault();
        if (search === "") {
            setEmptySearch(true);
            return 
        }
        try {
            let res = await axios.get(`/api/users/search/${search}`);
            setFilteredUsers(res.data);
        } catch (err) {
            console.log(err.response);
            alert("error searching")
        }
    }

    const renderUsers = () => {
        if (filteredUsers.length === 0) {
            return <h1 style={{textAlign: "center"}} >No users found.</h1>
        }
        return filteredUsers.map((u) => {
            return (
                <ListItem key={u.id} secondaryAction={
                    <>
                    <label>View profile</label>
                    <IconButton onClick={()=>navigate(`/community/users/${u.id}/profile`)} >
                        <Icon>visibility</Icon>
                    </IconButton>
                    <label>Socials</label>
                    <UserContactModal {...u} />
                    </>
                } >
                    <ListItemAvatar onClick={()=>navigate(`/community/users/${u.id}/profile`)} >
                        <Avatar alt="profile" src={u.image} />
                    </ListItemAvatar>
                    <ListItemText onClick={()=>navigate(`/community/users/${u.id}/profile`)} primary={u.nickname} secondary={`${u.first_name} ${u.last_name}`} />
                </ListItem>
            )
        })
    }

    const clearSearch = (e) => {
        e.preventDefault();
        setFilteredUsers(users);
    }

    return (
        <PageDiv>
            {!authenticated && <h2>Loading..</h2>}
            { authenticated &&
            <>
            <h1 style={{textAlign: "center"}} >Community</h1>
            <div style={{width: "75vw", margin: "auto", padding: "10px"}} >
                <h3 style={{marginLeft: "3vw"}} >Find a collector</h3>
            </div>
            <div style={{width: "75vw", margin: "auto", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} >
                <div style={{width: "60vw", margin: "10px"}} >
                <Tooltip open={emptySearch} onClose={()=>setEmptySearch(false)} title="Please enter a search term" >
                    <Input 
                    fullWidth 
                    startAdornment={<Icon>search</Icon>} 
                    placeholder="Search by name, username, or email.." 
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    type="search" />
                </Tooltip>
                </div>
                <Stack spacing={1} direction="row" >    
                    <Button onClick={searchUsers} variant="contained" >Search</Button>
                    <Button onClick={clearSearch} variant="outlined" >Clear</Button>
                </Stack>
            </div>
            <Box sx={{display: "flex", justifyContent: "center"}} >
                <List sx={{width: "85vw", bgcolor: "background.paper"}} >
                    {renderUsers()}
                </List>
            </Box>
            </>}
        </PageDiv>
    );
};

export default Community;