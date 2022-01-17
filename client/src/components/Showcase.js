import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, dividerClasses } from "@mui/material";
import Box from '@mui/material/Box';


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const Showcase = (props) => {
  const [showcases, setShowcases] = useState([]);
  const {id} = useParams()
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    getShowcases();
  }, [])

  const getShowcases = async () => {
    let res_id = id ? id : auth.id
    // need to pull user showcases not just showcase number one
    try {
        let res = await axios.get(`/api/showcases/user/${res_id}`);
        // allShowcases = res.data
        console.log(res.data)
        setShowcases(res.data);
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting showcases")
    }
}


const deleteShowcase = async (id) => {
  let res_id = id
  console.log(res_id)
  await axios.delete(`/api/showcases/${res_id}`);
  // remove from UI
  setShowcases(showcases.filter((s) => s.showcase_id !== res_id));
};

  const renderShowcases = () => {
    // let showcaseCards = 
    // figure out how to map showcase cards
    return showcases.map((s)=> {
      return (
        <Box key={s.showcase_id}
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
      ><h3>{s.name}</h3>
      <p>{s.description}</p>
      <p>Cards: {JSON.stringify(s.cards)}</p>
      <ButtonDiv>
      <Button style={styles.button} onClick={()=>navigate(`/profile/showcases/${s.showcase_id}/edit`)} variant="contained">Edit Showcase</Button>
      <Button style={styles.button} onClick={()=>deleteShowcase(s.showcase_id)} variant="contained">Delete Showcase</Button>
      </ButtonDiv>
      </Box>
 
      )
    }

    )
  }

  return (
    <div>
      <div className='statsContainer'>
        <a className='profileNavText'>cards.length</a>
        <a className='profileNavText'>showcase.likes</a>
      </div>
      <div style={styles.centered}>
        <div style={styles.row}>
        <Button style={{margin:'10px 0px 0px 0px'}} onClick={()=>navigate('/showcase/new')} variant="contained">Create A New Showcase</Button>
        </div>
        {renderShowcases()}
        
      </div>
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
  row: {
    margin: '10px 200px 0px 200px'
  },
  centered: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
}

export default Showcase;