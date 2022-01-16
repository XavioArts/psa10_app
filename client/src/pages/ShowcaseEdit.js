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
  const {id} = useParams()
  const navigate = useNavigate();



  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    // need to pull user showcases not just showcase number one
    try {
        let res = await axios.get(`/api/cards`);
        setCardChoices(res.data);
        renderCards()
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting cards")
    }
    try {
      let resShowcase = await axios.get(`/api/showcases/${id}`);
      setShowcaseName(resShowcase.data.name);
      setShowcaseDescription(resShowcase.data.description)
  } catch (err) {
      console.log(err.response);
      alert("there was an error getting showcase")
  }
}

  const updateShowcase = async () => {
    // error here user id is not populating
    let res_id = id
    const updatedShowcase = {id: res_id, showcaseName, showcaseDescription}
    console.log(updatedShowcase)
    try {
    await axios.put(`/api/showcases/${res_id}`, updatedShowcase)
    } catch(err) {
      console.log(err.response);
      alert("there was an error adding a showcase")
  }
  }

  const addCard = async (card_id) => {
    let showcase_id = id
    try {
      await axios.put(`/api/showcases/${showcase_id}/card/${card_id}`);
      // addCardToUI(card_id);
    } catch (err) {
      alert("err in addCard");
    }
  };

  const addCardToUI = (id) => {
    // remove Cat from list
    // const showcaseCards = cats.filter((cat) => cat.id !== id);
    // get a new Cat to show
    setSelectedCards();
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