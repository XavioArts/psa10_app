import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CollectionCard from "./CollectionCard";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const UserShowcases = (props) => {
  const [showcases, setShowcases] = useState([]);
  const [cards, setCards] = useState([]);
  const [primaryShowcase, setPrimaryShowcase] = useState("")
  const {user_id} = useParams()
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res_id = user_id ? user_id : auth.id
    try {
        let res = await axios.get("/api/cards");
        setCards(res.data);
        let res_showcases = await axios.get(`/api/showcases/user/${res_id}`);
        normalizeData(res_showcases.data, res.data);
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting data")
    }
    
}

const normalizeData = (res_showcases, res_cards) => {
  let showcaseCards = res_showcases.map((s)=> {
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
}

  const renderShowcases = () => {
    const renderShowcaseCards=(s) => s.cards.map((c)=>{
      return (<div style={styles.margin} key={c.id}><CollectionCard {...c} /></div>)
    })
    return showcases.map((s)=> {
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
        <div >
        {renderShowcases()}
        </div>
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

export default UserShowcases;