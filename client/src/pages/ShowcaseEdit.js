import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router";
import { TextareaAutosize } from "@mui/base";
import { Button, TextField, ThemeProvider } from "@mui/material";
import styled from "styled-components";
import CollectionCard from "../components/CollectionCard";
import { AuthContext } from "../providers/AuthProvider";
import { theme } from "../components/Styles";

const ShowcaseEdit = () => {
  const [cardChoices, setCardChoices] = useState([])
  const [showcase, setShowcase] = useState({})
  const [showcaseName, setShowcaseName] = useState("")
  const [showcaseDescription, setShowcaseDescription] = useState("")
  const [selectedCards, setSelectedCards] = useState([])
  const [showcases, setShowcases] = useState([]);
  const [showcaseCards, setShowcaseCards] = useState([]);
  const auth = useContext(AuthContext);
  const {id} = useParams()
  const navigate = useNavigate();


  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res_id = auth.id
    try {
        let res = await axios.get(`/api/cards`);
        let resShowcase = await axios.get(`/api/showcases/${id}`);
        let res_showcases = await axios.get(`/api/showcases/user/${res_id}`);
        setShowcases(res_showcases.data)
        setShowcase(resShowcase.data)
        setShowcaseName(resShowcase.data.name);
        setShowcaseDescription(resShowcase.data.description)
        normalizeData(resShowcase.data, res.data, res_showcases.data)
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting cards")
    }
}


  const normalizeData = (res_showcase, res_cards, res_showcases) => {
    let cards_array = res_showcase.cards
    let cardsOfShowcase = res_cards.filter((c) => {
      for (let i = 0; i<cards_array.length; i++) {
        if (cards_array[i] == c.id) {
          return true
      }
    }})
    setSelectedCards(cardsOfShowcase)
    let unselectedCards = res_cards.filter((c) => !cardsOfShowcase.includes(c))
    setCardChoices(unselectedCards)
    let allShowcaseCardsArray = []
    let allShowcaseCards = res_showcases.map((s)=>{
      allShowcaseCardsArray = [...allShowcaseCardsArray, ...s.cards]
      return allShowcaseCardsArray
    })
    console.log(allShowcaseCardsArray)
    setShowcaseCards(allShowcaseCardsArray)
  }

  const updateShowcase = async () => {
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


  const updateCards = async () => {
    let showcaseCheck = cardChoices.map((c)=> {
      if (!showcaseCards.includes(c.id)) {
      return {id: c.id, showcase: false}} 
      else {return {id: c.id, showcase: true}}
    })
    let showcasedCards = selectedCards.map((c)=> {return {id: c.id, showcase: true}})
    let updatedCards = showcaseCheck.concat(showcasedCards)
    let endpoints = updatedCards.map((c)=> {return {axios: `/api/cards/${c.id}`, id: c.id, showcase: c.showcase}})
    try {
    let res = await axios.all(endpoints.map((e)=> axios.put(e.axios, {id: e.id, showcase: e.showcase})))
    } catch(err) {
      console.log(err.response);
      alert("there was an error updating cards")
  }
  }

  const addCard = async (card_id) => {
    updateUIAdd(card_id)
  };

  const removeCard = async (card_id) => {
    updateUIRemove(card_id)
  };
  
  const updateUIAdd = (card) => {
    // remove card from unselected list
    const unselectedCards = cardChoices.filter((c) => c.id !== card.id);
    setCardChoices(unselectedCards)
    let showcaseCards = selectedCards
    showcaseCards.push(card)
    setSelectedCards(showcaseCards);
  };

  const updateUIRemove = (card) => {
    // remove card from unselected list
    const nowSelectedCards = selectedCards.filter((c) => c.id !== card.id);
    setSelectedCards(nowSelectedCards)
    let choices = cardChoices
    choices.push(card)
    setCardChoices(choices);
  };


  const renderSelectedCards = () => {
    
    return selectedCards.map((c)=>{
      return ( <div style={styles.margin}><CollectionCard key={c.id} card={{...c}} show={false} personal={false} size="xs"/>
          <Button style={{borderRadius: "40px", margin: '10px'}} variant="contained" onClick={()=>removeCard(c)}>Remove Card</Button>
        </div>
      )
    })
  }

  const renderCardChoices = () => {
    return cardChoices.map((c)=>{
      return (  <div className='cardsContainer' ><CollectionCard key={c.id} card={{...c}} show={false} personal={false} size="xs" />
        <Button style={{borderRadius: "40px", margin: '10px'}} variant="contained" onClick={()=>addCard(c)}>Add Card</Button>
        </div>
      )
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateShowcase();
    updateCards();
    navigate(`/profile/showcases/`);
  };

  return (
    <ThemeProvider theme={theme} >
    <div className="messagePageContainer">
      <h1>Edit Showcase</h1>
      <form  onSubmit={handleSubmit}>
        <TextField style={{margin: '10px'}}
          label="Showcase Name" 
          value={showcaseName} 
          onChange={(e)=>{setShowcaseName(e.target.value);}}
          maxLength= "40"
          />
       <br/>
          <TextField
        style={{ margin: '10px', width: 400}}
        id="filled-multiline-flexible"
        label="Tell us about this showcase"
        multiline
        rows={5}
        value={showcaseDescription} 
        onChange={(e)=>{setShowcaseDescription(e.target.value);}}
        />
        
        <h2>Add Cards to Showcase</h2>
        <div className="editShowcaseCardsContainer">
          <h4>Selected Cards</h4>
          <div style={styles.cardsDiv}>
          {renderSelectedCards()}
          </div>
        </div>
          <div className="editShowcaseCardsContainer">
          <h4>Choose Cards to Add</h4>
          <div style={styles.cardsDiv}>
          {renderCardChoices()}
          </div>
        </div>
        <br/>
        <ButtonDiv>
          <Button style={{borderRadius: "40px"}} type="submit" variant="contained">Update Showcase</Button>
        </ButtonDiv>
        </form>

    </div>
    </ThemeProvider>

  )
}

const ButtonDiv = styled.div`
    margin: 10px;
`

const styles = {
  margin: {
    margin: '10px'
  },
  graybox: {
    backgroundColor: '#ebebeb',
    margin: '15px',
    padding: '15px'
  },
  cardsDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'left',
  }
}

export default ShowcaseEdit;