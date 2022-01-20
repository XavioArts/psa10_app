import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Box from '@mui/material/Box';
import CollectionCard from "./CollectionCard";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const Overview = () => {
  const [primaryShowcase, setPrimaryShowcase] = useState("")
  const [user, setUser] = useState({})
  const {id} = useParams()
  const auth = useContext(AuthContext);
  const [showcases, setShowcases] = useState([]);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    getData();
  }, [])


  const getData = async () => {
    let res_id = auth.id
    console.log(res_id)
    // need to pull user showcases not just showcase number one
    try {
        let res_user = await axios.get(`/api/users/${res_id}`);
        console.log(res_user.data)
        setUser(res_user.data)
        let res = await axios.get("/api/cards");
        // allShowcases = res.data
        console.log(res.data)
        setCards(res.data);
        let res_showcases = await axios.get(`/api/showcases/user/${res_id}`);
        // allShowcases = res.data
        console.log(res_showcases.data)
        normalizeData(res_showcases.data, res.data, res_user.data);
        
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting data")
    }
}

  const normalizeData = (res_showcases, res_cards, res_user) => {
    console.log(res_showcases)
    let showcaseCards = res_showcases.map((s)=> {
      console.log(s.cards)
      let cards_array = s.cards
      let cardsOfShowcase = res_cards.filter((c) => {
        for (let i = 0; i<cards_array.length; i++) {
          if (cards_array[i] == c.id) {
            return true
        }
      }})
      return {key: s.showcase_id, id: s.showcase_id, name: s.name, description: s.description, cards: cardsOfShowcase}
  })
  setShowcases(showcaseCards)
  userPrimaryShowcase(res_user, showcaseCards)
  }

  const userPrimaryShowcase = (user, showcaseCards) => {
    // getUser()
    if (user === null) { return }
    let showcase_id = user.primary_showcase
    console.log(showcase_id)
      console.log(user.primary_showcase)
      console.log(showcaseCards)
      let res_showcase = showcaseCards.find((s)=> s.id == showcase_id)
      console.log(res_showcase)
      setPrimaryShowcase(res_showcase)
  }


  const renderPrimaryShowcase = () => {
    const renderShowcaseCards=(s) => s.cards.map((c)=>{
      return (<div style={styles.margin} key={c.id}><CollectionCard key={c.id} card={{...c}} show={true} personal={false} /></div>)
    })
      return (
        <Box 
        sx={{
          maxWidth: '100vw',
          width: '1300px',
          height: 'auto',
          borderRadius: '7px',
          padding: '20px',
          margin: '15px 30px',
          color: 'rgb(77, 77, 77)',
          backgroundColor: '#ebebeb',
          textAlign: "center",
          '&:hover': {
            backgroundColor: '#dbdbdb',
            // opacity: [0.9, 0.8, 0.7],
            
          },
        }}
      ><h3>{primaryShowcase.name}</h3>
      <p>{primaryShowcase.description}</p>
      <div style={styles.cardsDiv}>
      {renderShowcaseCards(primaryShowcase)}
      </div>
      </Box>
 
      )
  }

  const renderShowcases = () => {
    const renderShowcaseCards=(s) => s.cards.map((c)=>{
      return (<div style={styles.margin} key={c.id}><CollectionCard key={c.id} card={{...c}} show={true} personal={false} /></div>)
    })
    console.log("showcases", showcases)
    if (primaryShowcase) {
    return showcases.map((s)=> {if (s.id !== primaryShowcase.id){
      return (
        <Box key={s.key}
        sx={{
          maxWidth: '100vw',
          width: '1300px',
          height: 'auto',
          borderRadius: '7px',
          padding: '20px',
          margin: '15px 30px',
          color: 'rgb(77, 77, 77)',
          backgroundColor: '#ebebeb',
          textAlign: "center",
          '&:hover': {
            backgroundColor: '#dbdbdb',
            // opacity: [0.9, 0.8, 0.7],
            
          },
        }}
      ><h3>{s.name}</h3>
      <p>{s.description}</p>
      <div style={styles.cardsDiv}>
      {renderShowcaseCards(s)}
      </div>
      </Box>
 
      )
    }
  }
    )}
    else return showcases.map((s)=> {
      return (
        <Box key={s.key}
        sx={{
          maxWidth: '100vw',
          width: '1300px',
          height: 'auto',
          borderRadius: '7px',
          padding: '20px',
          margin: '15px 30px',
          color: 'rgb(77, 77, 77)',
          backgroundColor: '#ebebeb',
          textAlign: "center",
          '&:hover': {
            backgroundColor: '#dbdbdb',
            // opacity: [0.9, 0.8, 0.7],
            
          },
        }}
      ><h3>{s.name}</h3>
      <p>{s.description}</p>
      <div style={styles.cardsDiv}>
      {renderShowcaseCards(s)}
      </div>
      </Box>
 
      )
    }
  
    )
  }


  return (
    <div>
      <div style={styles.centered}>
        <div style={styles.row}>
        <h3>This is my primary showcase</h3>
        </div>
        
        {primaryShowcase && <div>{renderPrimaryShowcase()}</div>}
        <div style={styles.row}>
        <h3>These are the rest of my showcases</h3>
        </div>
        {showcases && <div>{renderShowcases()}</div>}
      </div>
    </div>
  )

}

const styles = {
  button: {
    margin: '10px',
  },
  row: {
    margin: '10px 200px 0px 200px'
  },
  margin: {
    margin: '10px'
  },
  centered: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardsDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}

export default Overview; 