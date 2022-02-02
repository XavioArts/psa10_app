import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Box from "@mui/material/Box";
import { Button, TextField, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { theme } from '../components/Styles';


const EditTopic = (props) => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [title, setTitle] = useState(props.title ? props.title : '')
  const [body, setBody] = useState(props.body ? props.body : '')
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
        let res =  await axios.put(`/api/topics/${params.id}`, newTopic)
        props.editTopic()
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
    <ThemeProvider theme={theme} >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
          {handleTitleError()}
          <br/>
          {handleBobyError()}
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "20px", margin: "20px" }}
              type='submit'>Update</Button>
          </form>
        </Box>
    </ThemeProvider>
  );
};

export default EditTopic;