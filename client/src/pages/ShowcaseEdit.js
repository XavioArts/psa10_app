import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router";
import { TextareaAutosize } from "@mui/base";
import { Button } from "@mui/material";
import styled from "styled-components";


const ShowcaseEdit = () => {
  const [cardChoices, setCardChoices] = useState([])
  const [showcase, setShowcase] = useState({})
  const [showcaseName, setShowcaseName] = useState("")
  const [showcaseDescription, setShowcaseDescription] = useState("")
  const [selectedCards, setSelectedCards] = useState([])
  const {id} = useParams()
  const navigate = useNavigate();



  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
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
      setShowcase(resShowcase.data)
      setShowcaseName(resShowcase.data.name);
      setShowcaseDescription(resShowcase.data.description)
      // setShowcaseCards(resShowcase.data.cards)
  } catch (err) {
      console.log(err.response);
      alert("there was an error getting showcase")
  }
}


  const updateShowcase = async () => {
    // error here user id is not populating
    let res_id = id
    let cardIds = selectedCards.map((c)=>c.id)
    const updatedShowcase = {id: res_id, name: showcaseName, description: showcaseDescription, cards: cardIds}
    console.log(updatedShowcase)
    try {
    let res = await axios.put(`/api/showcases/${res_id}`, updatedShowcase)
    console.log(res)
    } catch(err) {
      console.log(err.response);
      alert("there was an error adding a showcase")
  }
  console.log("showcase updated")
  }

  const addCard = async (card_id) => {
    // let showcase_id = id
    updateUIAdd(card_id)
    console.log(selectedCards)
    // try {
    //   await axios.put(`/api/showcases/${showcase_id}/card/${card_id}`);
    //   console.log()
    //   // updateUI(card_id);
    // } catch (err) {
    //   alert("err in addCard");
    // }
  };

  const removeCard = async (card_id) => {
    // let showcase_id = id
    updateUIRemove(card_id)
    console.log(selectedCards)
    // try {
    //   await axios.put(`/api/showcases/${showcase_id}/card/${card_id}`, );
    //   console.log()
    //   // updateUI(card_id);
    // } catch (err) {
    //   alert("err in rmCard");
    // }
  };
  
  const updateUIAdd = (card) => {
    // remove card from unselected list
    console.log(card)
    const unselectedCards = cardChoices.filter((c) => c.id !== card.id);
    console.log("unselectedCards", unselectedCards)
    setCardChoices(unselectedCards)
    let showcaseCards = selectedCards
    showcaseCards.push(card)
    console.log(showcaseCards)
    setSelectedCards(showcaseCards);
  };

  const updateUIRemove = (card) => {
    // remove card from unselected list
    const nowSelectedCards = selectedCards.filter((c) => c.id !== card.id);
    console.log("nowSelectedCards", nowSelectedCards)
    setSelectedCards(nowSelectedCards)
    let choices = cardChoices
    choices.push(card)
    console.log(choices)
    setCardChoices(choices);
  };


  const renderSelectedCards = () => {
    return selectedCards.map((c)=>{
      return (
        <div key={c.id}>
          <h3>{c.name}</h3>
          <p>{c.available}</p>
          <p>user_id: {c.user_id}</p>
          <p>card_id: {c.id}</p>
          <div onClick={()=>removeCard(c)}>Add</div>
        </div>
      )
    })
  }

  const renderCardChoices = () => {
    return cardChoices.map((c)=>{
      return (
        <div key={c.id}>
          <h3>{c.name}</h3>
          <p>{c.available}</p>
          <p>user_id: {c.user_id}</p>
          <p>card_id: {c.id}</p>
          <div onClick={()=>addCard(c)}>Add</div>
        </div>
      )
    })
  }

  const renderCards = () => {
    return cardChoices.map((c) => {
      return (
        <div key={c.id}>
          <h3>{c.name}</h3>
          <p>{c.available}</p>
          <p>user_id: {c.user_id}</p>
          <p>card_id: {c.id}</p>
          <div onClick={()=>addCard(c.id)}>Add</div>
        </div>
    )
  }
  )}

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShowcase()
    navigate(`/profile/showcases/`);
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
        <p>In my showcase: {JSON.stringify(showcase)}</p>
        <h2>Selected Cards</h2>
        {renderSelectedCards()}
        <h2>Choose Cards to Add</h2>
        {renderCardChoices()}
        {/* {renderCards()} */}
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