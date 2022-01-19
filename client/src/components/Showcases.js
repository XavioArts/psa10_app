import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, dividerClasses } from "@mui/material";
import Box from '@mui/material/Box';
import { ButtonDiv } from "./Styles";
import CollectionCard from "./CollectionCard";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const Showcase = (props) => {
  const [showcases, setShowcases] = useState([]);
  const [cards, setCards] = useState([]);
  const [primaryShowcase, setPrimaryShowcase] = useState("")
  const {id} = useParams()
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res_id = id ? id : auth.id
    // need to pull user showcases not just showcase number one
    try {
        let res = await axios.get("/api/cards");
        // allShowcases = res.data
        console.log(res.data)
        setCards(res.data);
        let res_showcases = await axios.get(`/api/showcases/user/${res_id}`);
        // allShowcases = res.data
        console.log(res_showcases.data)
        normalizeData(res_showcases.data, res.data);
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting data")
    }
    
}

const normalizeData = (res_showcases, res_cards) => {
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
}
  
    


const deleteShowcase = async (id) => {
  let res_id = id
  console.log(res_id)
  await axios.delete(`/api/showcases/${res_id}`);
  // remove from UI
  setShowcases(showcases.filter((s) => s.showcase_id !== res_id));
};

const updatePrimaryShowcase = async (id) => {
  setPrimaryShowcase(id)
  try {
    return auth.handleUpdate({primary_showcase: id}, navigate);
  } catch(err) {
    console.log(err.response);
    alert("there was an error adding primary showcase")
}
}

  const renderShowcases = () => {
    const renderShowcaseCards=(s) => s.cards.map((c)=>{
      return (<CollectionCard {...c} />)
    })
    console.log("showcases", showcases)
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
      <ButtonDiv>
      <Button style={styles.button} onClick={()=>navigate(`/profile/showcases/${s.id}/edit`)} variant="contained">Edit Showcase</Button>
      <Button style={styles.button} onClick={()=>deleteShowcase(s.id)} variant="contained">Delete Showcase</Button>
      {auth.primary_showcase !== s.showcase_id && <Button style={styles.button} onClick={()=>updatePrimaryShowcase(s.id)} variant="contained">Set to Primary Showcase</Button>}
      </ButtonDiv>
      </Box>
 
      )
    }
    )
  }

  return (
    <div>
      <div style={styles.centered}>
        <div style={styles.row}>
        <Button style={{margin:'10px 0px 0px 0px'}} onClick={()=>navigate('/showcase/new')} variant="contained">Create A New Showcase</Button>
        </div>
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

export default Showcase;