import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, dividerClasses } from "@mui/material";
import Box from '@mui/material/Box';
import { ButtonDiv } from "./Styles";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const Overview = () => {
  const [primaryShowcase, setPrimaryShowcase] = useState("")
  const [user, setUser] = useState({})
  const {id} = useParams()
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    userShowcase();
  }, [user])


  const getUser = async () => {
    let user_id = id ? id : auth.id
    console.log(user_id)
    try {
      let res = await axios.get(`/api/users/${user_id}`);
      setUser(res.data)
      
  } catch (err) {
      console.log(err.response);
      alert("there was an error getting user")
  }
  }

  const userShowcase = async () => {
    // getUser()
    if (user === null) { return }
    let showcase_id = user.primary_showcase
    console.log(showcase_id)
    try {
      console.log(user.primary_showcase)
      let res_showcase = await axios.get(`/api/showcases/${showcase_id}`)
      console.log(res_showcase.data)
      setPrimaryShowcase(res_showcase.data)
      
  } catch (err) {
      console.log(err.response);
      // alert("there was an error getting showcase")
  }
  }


  const renderPrimaryShowcase = () => {
      return (
        <Box 
        sx={{
          maxWidth: '100vw',
          width: '1300px',
          height: 300,
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
      <p>Cards: {JSON.stringify(primaryShowcase.cards)}</p>
      <ButtonDiv>
      {/* <Button style={styles.button} onClick={()=>updatePrimaryShowcase(s.showcase_id)} variant="contained">Set to Primary Showcase</Button> */}
      </ButtonDiv>
      </Box>
 
      )
  }


  return (
    <div>
      <div className='statsContainer'>
        <a className='profileNavText'>stat1</a>
        <a className='profileNavText'>stat2</a>
        <a className='profileNavText'>stat3</a>
      </div>
      <div style={styles.centered}>
        <div style={styles.row}>
        <h3>This is my primary showcase</h3>
        </div>
        {renderPrimaryShowcase()}
        <p>Some other overview stuff will go here. </p>
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
  }
}

export default Overview; 