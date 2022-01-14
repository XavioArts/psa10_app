import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";



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

  const renderShowcases = () => {
    // let showcaseCards = 
    // figure out how to map showcase cards
    return showcases.map((s)=> {
      return (
        <div>
          <h3>Showcase Name: {s.name}</h3>
          <p>Description: {s.description}</p>
          <ButtonDiv>
          <Button onClick={()=>navigate(`/showcases/${s.id}/edit`)} variant="contained">Edit Showcase</Button>
          </ButtonDiv>
          <ButtonDiv>
          <Button onClick={()=>navigate("/profile")} variant="contained">Delete Showcase</Button>
          </ButtonDiv>
        </div>
      )
    }

    )
  }

  return (
    <div>
      {renderShowcases()}
      <Link to={'/showcase/new'}>Create A New Showcase</Link>
    </div>
  )

}

const ButtonDiv = styled.div`
    margin: 10px;
`

export default Showcase;