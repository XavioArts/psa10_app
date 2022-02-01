import {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { Button, TextField, ThemeProvider } from "@mui/material";
import styled from "styled-components";
import { theme } from "./Styles";

const ShowcaseNewForm= (props) => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();
  const {id} = useParams()


  const addShowcase = async (props) => {
    // error here user id is not populating
    let res_id = id ? id : auth.id
    const newShowcase = {user_id: res_id, name, description}
    console.log(newShowcase)
    try {
    let res = await axios.post('/api/showcases', newShowcase)
    navigate(`/profile/showcases/${res.data.id}/edit`);
    } catch(err) {
      console.log(err.response);
      alert("there was an error adding a showcase")
  }}


  const handleSubmit = (e) => {
    e.preventDefault();
    addShowcase()
  };


  return (
    <ThemeProvider theme={theme} >
    <div className="messagePageContainer">
    <h1>Create A Showcase</h1>
    <form  onSubmit={handleSubmit}>
    <TextField style={{margin: '10px'}}
          label="Showcase Name" 
          value={name} 
          onChange={(e)=>{setName(e.target.value);}}
          maxLength= "40"
          />
          <br/>
          <TextField
        style={{ margin: '10px', width: 400}}
        id="filled-multiline-flexible"
        label="Tell us about this showcase"
        multiline
        rows={5}
        value={description} 
        onChange={(e)=>{setDescription(e.target.value);}}
        />
        <br/>
        <ButtonDiv>
        <Button style={{borderRadius: "40px"}} type="submit" variant="contained" color="primary" >Add Showcase</Button>
        </ButtonDiv>
        </form>

    </div>
    </ThemeProvider>
  );
};

const ButtonDiv = styled.div`
    margin: 10px;
`

export default ShowcaseNewForm;
