import React, { useContext, useEffect, useState } from 'react';
import { Button, Paper, TextField } from "@mui/material";
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const Message = (props) => {
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState([])
  const [clickedEdit, setClickedEdit] = useState(false);
  const [content, setContent] = useState(props.content ? props.content : '')
  const [messageVerify, setMessageVerify] = useState(true);
  const [tic, setTic] = useState(false)

  useEffect(()=>{
    getMessage()
  },[tic])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!checkMessage()) {
      setMessageVerify(false)
    } if (checkMessage()) {
      let user_id = auth.id
      let newMessage = {content, user_id}
      try {
        let res =  await axios.put(`/api/topics/${props.topic_id}/messages/${props.id}`, newMessage)
        setClickedEdit(!clickedEdit)
        setTic(!tic)
      } catch(err){
        console.log(err)
      }
    }
  }

  const handleEditClicked = () => {
      setClickedEdit(!clickedEdit)
  }

  const getMessage = async () => {
    try {
      let res = await axios.get(`/api/topics/${props.topic_id}/messages/${props.id}`);
      setMessage(res.data[0]);
    } catch (err) {
      console.log(err.response);
      alert("Error getting messages")
    }
  }

  const checkMessage = () => {
    let verifyMessage = content
    let filter = /[0-9a-zA-Z]{1,}/
    if (!filter.test(verifyMessage)){
      return false
    } else {
        return true
    }
  }

  const handleMessageError = () => {
    if (!messageVerify){
        return(
          <TextField
            error
            style={{ marginLeft: '7px', marginTop: '25px', marginBottom: '15px', width: '99%'}}
            inputProps={{ maxLength: 250 }}
            multiline
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setMessageVerify(true)
            }}
            helperText="Messages can not be blank"
            />
        )
    } else {
        return(
            <TextField
            style={{ marginLeft: '7px', marginTop: '25px', marginBottom: '15px', width: '99%'}}
            inputProps={{ maxLength: 250 }}
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
        )
    }
  }

  if(clickedEdit){
    return(
        <Paper elevation={5} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
          <form onSubmit={handleSubmit}>
            <h6 style={{margin: '5px'}}>Posted by {message.user_nickname}</h6>
            {handleMessageError()}            
            <br/>
            {auth.id === message.user_id &&<Button variant="contained" type='submit'>Update</Button>}
            {auth.id === message.user_id &&<Button style={{ backgroundColor: 'red'}} variant="contained" onClick={()=>props.deleteMessage(message.id)}>Delete</Button>}
        </form>
      </Paper>
      )
  } else {
    return(
      <Paper elevation={5} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
        <h6 style={{margin: '5px'}}>Posted by {message.user_nickname}</h6>
        <h3 style={{margin: '5px', marginTop: '15px'}}>{message.content}</h3>
        {auth.id === message.user_id &&<Button variant="contained" onClick={handleEditClicked}>Edit</Button>}
        {auth.id === message.user_id &&<Button style={{ backgroundColor: 'red'}} variant="contained" onClick={()=>props.deleteMessage(message.id)}>Delete</Button>}
      </Paper>
    )
  }
}

export default Message;