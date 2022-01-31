import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import axios from "axios";


const AddTopic = (props) => {
  const auth = useContext(AuthContext);
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [titleVerify, setTitleVerify] = useState(true);
  const [BodyVerify, setBodyVerify] = useState(true);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!checkTitle()) {
      setTitleVerify(false)
    } if (!checkBody()) {
      setBodyVerify(false)
    } if (checkTitle() && checkBody()) {
      let user_id = auth.id
      let newTopic = {title, body, user_id}
      try {
        let res =  await axios.post('/api/topics', newTopic)
        console.log(res)
        props.addTopic(res.data)
      } catch(err){
        console.log(err)
      }
    }
  }

  const checkTitle = () => {
    let verifyTitle = title
    let filter = /[0-9a-zA-Z]{1,}/
    if (!filter.test(verifyTitle)){
      return false
    } else {
        return true
    }
  }

  const checkBody = () => {
    let verifyBody = body
    let filter = /[0-9a-zA-Z]{1,}/
    if (!filter.test(verifyBody)){
      return false
    } else {
        return true
    }
  }
 
  const handleTitleError = () => {
    if (!titleVerify){
        return(
            <TextField style={{margin: '10px'}}
                error
                label="Title"
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    setTitleVerify(true)
                }}
                helperText="Title required"
            /> 
        )
    } else {
        return(
            <TextField style={{margin: '10px'}}
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        )
    }
  }

  const handleBobyError = () => {
    if (!BodyVerify){
        return(
              <TextField
                error
                style={{ margin: '10px', width: 400}}
                id="filled-multiline-flexible"
                label="Description"
                multiline
                rows={4}
                value={body}
                onChange={(e) => {
                    setBody(e.target.value)
                    setBodyVerify(true)
                }}
                helperText="Description required"
            /> 
        )
    } else {
        return(
            <TextField
              style={{ margin: '10px', width: 400}}
              id="filled-multiline-flexible"
              label="Description"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              />
        )
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
          {handleTitleError()}
          <br/>
          {handleBobyError()}
            <Button style={{marginLeft: '10px', marginTop: '25px'}} variant="contained" type='submit'>Create</Button>
          </form>
        </Box>
  );
};

export default AddTopic;