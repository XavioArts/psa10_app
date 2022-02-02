import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import CollectionCard from "./CollectionCard";
import Carousel from "./Carousel";
import useWindowSize from "./UseWindowSize";
import { Grid } from "@mui/material";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const UserShowcases = (props) => {
  const [showcases, setShowcases] = useState([]);
  const [cards, setCards] = useState([]);
  const {user_id} = useParams()
  const size = useWindowSize();
  const [user, setUser] = useState(null);


    
  
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    let res_id = user_id
    try {
      let res = await axios.get("/api/cards/all_cards");
      let user_res = await axios.get(`/api/users/${user_id}`);
      setUser(user_res.data);
        console.log(res.data)
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
console.log(showcaseCards)
}

const sizeWindow = () => {
  if (size.width <= 500) {
    return 1}
  if (size.width > 500 && size.width < 900) {
    return 2} if (size.width > 900 && size.width < 1200) {
    return 3} if (size.width > 1200) {
    return 4}  
}

  const renderShowcases = () => {
    const renderShowcaseCards=(s) => s.cards.map((c)=>{
      return (<div style={styles.margin} key={c.id}><CollectionCard key={c.id} card={{...c}} show={true} personal={false} user={user} size="small" /></div>)
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
          color: '#272830',
          backgroundColor: 'white',
          textAlign: "center",
          '&:hover': {
            backgroundColor: 'white',            
          },
        }}
      ><h3>{s.name}</h3>
      <p>{s.description}</p>
      <div >
        {s.cards.length > 4 && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
          {renderShowcaseCards(s)}
        </Carousel>}
        {s.cards.length === 4 && (sizeWindow() === 4) &&
            <div style={{margin: "auto"}} >
              <Grid style={{display: "flex", justifyContent: "center", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {renderShowcaseCards(s)}
              </Grid>
            </div>}
        {s.cards.length === 4 && (sizeWindow() < 4) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
          {renderShowcaseCards(s)}
        </Carousel>}
        {s.cards.length === 3 && (sizeWindow() >= 3) &&
            <div style={{margin: "auto"}} >
              <Grid style={{display: "flex", justifyContent: "center", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {renderShowcaseCards(s)}
              </Grid>
            </div>}
        {s.cards.length === 3 && (sizeWindow() < 3) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
          {renderShowcaseCards(s)}
        </Carousel>}
        {s.cards.length === 2 && (sizeWindow() >= 2) &&
            <div style={{margin: "auto"}} >
              <Grid style={{display: "flex", justifyContent: "center", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {renderShowcaseCards(s)}
              </Grid>
            </div>}
        {s.cards.length === 2 && (sizeWindow() < 2) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
          {renderShowcaseCards(s)}
        </Carousel>}
        {s.cards.length === 1 && (sizeWindow() >= 1) &&
            <div style={{margin: "auto"}} >
              <Grid style={{display: "flex", justifyContent: "center", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {renderShowcaseCards(s)}
              </Grid>
            </div>}
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