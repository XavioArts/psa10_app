import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import { ButtonDiv } from "./Styles";
import CollectionCard from "./CollectionCard";
import Carousel from "./Carousel";
import useWindowSize from "./UseWindowSize";



// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */ }


const Showcase = (props) => {
  const [showcases, setShowcases] = useState([]);
  const [cards, setCards] = useState([]);
  const [primaryShowcase, setPrimaryShowcase] = useState("")
  const [cardSize, setCardSize] = useState(4)
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const size = useWindowSize();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res_id = auth.id
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
    let showcaseCards = res_showcases.map((s) => {
      let cards_array = s.cards
      let cardsOfShowcase = res_cards.filter((c) => {
        for (let i = 0; i < cards_array.length; i++) {
          if (cards_array[i] == c.id) {
            return true
          }
        }
      })
      return { key: s.showcase_id, id: s.showcase_id, name: s.name, description: s.description, cards: cardsOfShowcase }
    })
    setShowcases(showcaseCards)
  }




  const deleteShowcase = async (id) => {
    let res_id = id
    await axios.delete(`/api/showcases/${res_id}`);
    // remove from UI
    console.log(showcases)
    setShowcases(showcases.filter((s) => s.id !== res_id));
  };

  const updatePrimaryShowcase = async (id) => {
    setPrimaryShowcase(id)
    try {
      return auth.handleUpdate({ primary_showcase: id }, navigate);
    } catch (err) {
      console.log(err.response);
      alert("there was an error adding primary showcase")
    }
  }

  const sizeWindow = () => {
    if (size.width <= 575) {
      console.log(1)
      console.log(size.width)
      return 1
    }
    if (size.width > 575 && size.width <= 810) {
      // console.log(2)
      // console.log(size.width)
      return 2
    }  if (size.width > 810 && size.width <= 1070) {
      // console.log(3)
      // console.log(size.width)
      return 3
    } if (size.width > 1070 && size.width <= 1340) {
      // console.log(4)
      // console.log(size.width)
      return 4
    }if (size.width > 1340 && size.width <= 1620) {
      // console.log(5)
      // console.log(size.width)
      return 5
    } if (size.width > 1620) {
      // console.log(6)
      // console.log(size.width)
      return 6
    }  
  }


  const renderShowcases = () => {

    const renderShowcaseCards=(s) => s.cards.map((c)=>{
      return (<div style={styles.margin} key={c.id}><CollectionCard  key={c.id} card={{...c}} show={true} personal={true} size="small" /></div>)
    })

    return showcases.map((s)=> {
      return (
        <Box key={s.key}
          sx={{
            maxWidth: '100vw',
            width: '80%',
            height: 'auto',
            borderRadius: '7px',
            // padding: '20px',
            margin: 'auto',
            color: '#272830',
            backgroundColor: 'white',
            textAlign: "left",
            lineHeight: '5px',
            '&:hover': {
              backgroundColor: 'white',            
            },
          }}
        >
          <div>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
          </div>
          <div>
            {s.cards.length > 6 && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
              {renderShowcaseCards(s)}
            </Carousel>}
            {s.cards.length === 6 && (sizeWindow() === 6) &&
                <div style={{margin: "auto"}} >
                  <Grid style={{display: "flex", justifyContent: "left", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {renderShowcaseCards(s)}
                  </Grid>
                </div>}
            {s.cards.length === 6 && (sizeWindow() < 6) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
              {renderShowcaseCards(s)}
            </Carousel>}
            {s.cards.length === 5 && (sizeWindow() >= 5) &&
                <div style={{margin: "auto"}} >
                  <Grid style={{display: "flex", justifyContent: "left", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {renderShowcaseCards(s)}
                  </Grid>
                </div>}
            {s.cards.length === 5 && (sizeWindow() < 5) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
              {renderShowcaseCards(s)}
            </Carousel>}
            {s.cards.length === 4 && (sizeWindow() >= 4) &&
                <div style={{margin: "auto"}} >
                  <Grid style={{display: "flex", justifyContent: "left", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {renderShowcaseCards(s)}
                  </Grid>
                </div>}
            {s.cards.length === 4 && (sizeWindow() < 4) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
              {renderShowcaseCards(s)}
            </Carousel>}
            {s.cards.length === 3 && (sizeWindow() >= 3) &&
                <div style={{margin: "auto"}} >
                  <Grid style={{display: "flex", justifyContent: "left", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {renderShowcaseCards(s)}
                  </Grid>
                </div>}
            {s.cards.length === 3 && (sizeWindow() < 3) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
              {renderShowcaseCards(s)}
            </Carousel>}
            {s.cards.length === 2 && (sizeWindow() >= 2) &&
                <div style={{margin: "auto"}} >
                  <Grid style={{display: "flex", justifyContent: "left", alignItems: "center"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {renderShowcaseCards(s)}
                  </Grid>
                </div>}
            {s.cards.length === 2 && (sizeWindow() < 2) && <Carousel show={(sizeWindow())} infiniteLoop={true} style={styles.margin}>
              {renderShowcaseCards(s)}
            </Carousel>}
            {s.cards.length === 1 && (sizeWindow() >= 1) &&
                <div style={{margin: "auto"}} >
                  <Grid style={{display: "flex", justifyContent: "left", alignItems: "center", marginTop: '10px'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {renderShowcaseCards(s)}
                  </Grid>
                </div>}
            </div>
            <div style={{margin: '10px 0px'}}>
            <Button style={{borderRadius: "40px", margin: '10px' }} onClick={()=>navigate(`/profile/showcases/${s.id}/edit`)} variant="contained">Edit Showcase</Button>
            <Button style={{borderRadius: "40px", margin: '10px' }} onClick={()=>deleteShowcase(s.id)} variant="contained">Delete Showcase</Button>
            {auth.primary_showcase !== s.id && <Button style={{borderRadius: "40px", margin: '10px' }} onClick={()=>updatePrimaryShowcase(s.id)} variant="contained">Set to Primary Showcase</Button>}
          </div>
        </Box>
      )
    }
    )
  }

  

  return (

    <div style={styles.centered}>
        <div className='flexCenterColumn'>
        <Button style={{borderRadius: "40px", margin: '10px' }} onClick={()=>navigate(`/showcase/new`)} variant="contained">Create A New Showcase</Button>
        <div style={{margin: '0em 5em'}}>
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
    margin: '10px '
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

export default Showcase;