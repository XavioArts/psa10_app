import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router";
import { TextareaAutosize } from "@mui/base";
import { Button } from "@mui/material";
import styled from "styled-components";


const ShowcaseEdit = () => {
  const [cardChoices, setCardChoices] = useState([])
  const [showcaseName, setShowcaseName] = useState("")
  const [showcaseDescription, setShowcaseDescription] = useState("")
  const [selectedCards, setSelectedCards] = useState("")
  const {id, name, description} = useParams()
  const navigate = useNavigate();



  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    // need to pull user showcases not just showcase number one
    setShowcaseName(name)
    setShowcaseDescription(description)
    try {
        let res = await axios.get(`/api/cards`);
        setCardChoices(res.data);
        renderCards()
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting cards")
    }
}

  const updateShowcase = async () => {
    // error here user id is not populating
    let res_id = id
    const updatedShowcase = {id: res_id, name, description}
    console.log(updatedShowcase)
    try {
    await axios.put(`/api/showcases/${res_id}`, updatedShowcase)
    } catch(err) {
      console.log(err.response);
      alert("there was an error adding a showcase")
  }
  }

  const addCard = async (id) => {
    try {
      await axios.put(`/api/showcases/card/${id}`);
      // removeCatFromUI(id);
    } catch (err) {
      alert("err in addCard");
    }
  };

  const renderCards = () => {
    return cardChoices.map((c) => {
      return (
        <div key={c.id}>
          <h3>{c.name}</h3>
          <p>{c.available}</p>
          <p>user_id: {c.user_id}</p>
          <div onClick={()=>addCard(c.id)}>Add</div>
        </div>
    )
  }
  )}

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShowcase()
    navigate(`/profile/showcases/${id}`);
  };

  return (
    <div>
      <h1>Edit Showcase</h1>
      <form  onSubmit={handleSubmit}>
        <p>Showcase Name</p>
        <input 
        placeholder="Showcase Name" 
        value={showcaseName} 
        onChange={(e)=>{setShowcaseName(e.target.value);}}/>
        <p>Description</p>
        <TextareaAutosize 
        placeholder="Tell us about this showcase"  
        style={{ width: 400, height: 100 }}
        value={showcaseDescription} 
        onChange={(e)=>{setShowcaseDescription(e.target.value);}}/>
        <h3>Add Cards to Showcase</h3>
        {renderCards()}
        <br/>
        <ButtonDiv>
          <Button type="submit" variant="contained">Update Showcase</Button>
        </ButtonDiv>
        </form>

    </div>
  )
}

const ButtonDiv = styled.div`
    margin: 10px;
`

export default ShowcaseEdit;