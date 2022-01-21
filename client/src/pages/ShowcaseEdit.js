import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { useNavigate } from "react-router";
import { TextareaAutosize } from "@mui/base";
import { Button } from "@mui/material";
import styled from "styled-components";
import CollectionCard from "../components/CollectionCard";


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
        // setCardChoices(res.data);
        let resShowcase = await axios.get(`/api/showcases/${id}`);
        setShowcase(resShowcase.data)
        setShowcaseName(resShowcase.data.name);
        console.log(resShowcase.data.name)
        setShowcaseDescription(resShowcase.data.description)
        console.log(resShowcase.data, res.data)
        normalizeData(resShowcase.data, res.data)
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting cards")
    }
}


  const normalizeData = (res_showcase, res_cards) => {
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

  // const normalizeData = (res_showcases, res_cards, res_user) => {
  //   console.log(res_showcases)
  //   let showcaseCards = res_showcases.map((s)=> {
  //     console.log(s.cards)
  //     let cards_array = s.cards
  //     let cardsOfShowcase = res_cards.filter((c) => {
  //       for (let i = 0; i<cards_array.length; i++) {
  //         if (cards_array[i] == c.id) {
  //           return true
  //       }
  //     }})
  //     return {key: s.showcase_id, id: s.showcase_id, name: s.name, description: s.description, cards: cardsOfShowcase}
  // })
  // setShowcases(showcaseCards)
  // userPrimaryShowcase(res_user, showcaseCards)
  // }

  const updateCards = async () => {
    let showcasedCards = selectedCards.map((c)=> {return {id: c.id, showcase: true}})
    console.log(showcasedCards)
    let endpoints = showcasedCards.map((c)=> {return {axios: `/api/cards/${c.id}`, id: c.id, showcase: true}})
    console.log(endpoints)
    try {
    let res = await axios.all(endpoints.map((e)=> axios.put(e.axios, {id: e.id, showcase: e.showcase})))
    console.log(res)
    } catch(err) {
      console.log(err.response);
      alert("there was an error updating cards")
  }
  // console.log("showcase updated")
  }

  const addCard = async (card_id) => {
    // let showcase_id = id
    updateUIAdd(card_id)
    //this code lets you add cards to the array as you go instead of on submit. May use later
    // try {
    //   await axios.put(`/api/showcases/${showcase_id}/card/${card_id}`);
    //   console.log()
    //   // updateUI(card_id);
    // } catch (err) {
    //   alert("err in addCard");
    // }
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
      return ( <div style={styles.margin}><CollectionCard key={c.id} card={{...c}} show={false} personal={false}/>
          <Button variant="contained" onClick={()=>removeCard(c)}>Remove Card</Button>
        </div>
      )
    })
  }

  const renderCardChoices = () => {
    return cardChoices.map((c)=>{
      return (  <div style={styles.margin}><CollectionCard key={c.id} card={{...c}} show={false} personal={false}/>
        <Button variant="contained" onClick={()=>addCard(c)}>Add Card</Button>
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
        
        <h2>Add Cards to Showcase</h2>
        <div style={styles.graybox}>
          <h4>Selected Cards</h4>
          <div style={styles.cardsDiv}>
          {renderSelectedCards()}
          </div>
        </div>
          <div style={styles.graybox}>
          <h4>Choose Cards to Add</h4>
          <div style={styles.cardsDiv}>
          {renderCardChoices()}
          </div>
        </div>
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

const styles = {
  button: {
    margin: '10px',
  },
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