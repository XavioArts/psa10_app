import {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpload";
import { TextareaAutosize } from "@mui/base";
import { Button } from "@mui/material";
import styled from "styled-components";
import Showcase from "./Showcases";
import UserShowcases from "./UserShowcases";



// need to get serialize working before selected cards can be set? maybe just add card ids to an array here?

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
  }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    addShowcase()
    
  };



  return (
    <div>
      <h1>Create A Showcase</h1>
      <form  onSubmit={handleSubmit}>
        <p>Showcase Name</p>
        <input 
        placeholder="Showcase Name" 
        value={name} 
        onChange={(e)=>{setName(e.target.value);}}
        maxLength= "40"
        />
        <p>Description</p>
        <TextareaAutosize 
        placeholder="Tell us about this showcase"  
        style={{ width: 400, height: 100 }}
        value={description} 
        onChange={(e)=>{setDescription(e.target.value);}}/>
        <br/>
        <ButtonDiv>
          <Button type="submit" variant="contained">Add Showcase</Button>
        </ButtonDiv>
        </form>

    </div>
    
  );
};

const ButtonDiv = styled.div`
    margin: 10px;
`

export default ShowcaseNewForm;
