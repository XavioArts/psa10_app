import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";


const EditTopic = (props) => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [title, setTitle] = useState(props.title ? props.title : '')
  const [body, setBody] = useState(props.body ? props.body : '')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    let user_id = auth.id
    let newTopic = {title, body, user_id}
    try {
      let res =  await axios.put(`/api/topics/${params.id}`, newTopic)
      props.editTopic()
    } catch(err){
      console.log(err)
    }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <h3>Edit Title</h3>
            <input value={title} onChange={(e) => setTitle(e.target.value)}/>
            <h3>Description</h3>
            <textarea style={{ resize: 'none', overflow: 'auto' }} rows="5" cols="47" value={body} onChange={(e) => setBody(e.target.value)}/>
            <Button style={{marginTop: '25px'}} variant="contained" type='submit'>Update</Button>
          </form>
        </Box>
  );
};

export default EditTopic;