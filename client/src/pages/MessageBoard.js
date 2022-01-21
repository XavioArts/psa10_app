import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import AddTopic from '../components/AddTopic';
import { AuthContext } from '../providers/AuthProvider';

const MessageBoard = (props) => {
  const auth = useContext(AuthContext);
  const [topics, setTopics] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  useEffect(()=>{
    getTopics()
  },[open])

  const getTopics = async () => {
    try {
      let res = await axios.get(`/api/topics`);
      setTopics(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error getting topics")
    }
  }

  const addTopic = (topic) =>{
    setTopics([topic, ...topics])
    handleClose()
  }
  const renderLoginBox = () => {
    return(
      <div style={{width: "93%", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>Want to join the conversation?</h3>
        <h3>{<Link to="/login">Login</Link>} or {<Link to="/login">Register</Link>}</h3>
      </div>
    )
  }

  const renderTopics = (topics) => {
    let topicBox = topics.map(t=>{
      const handleOnClick = () =>{
        navigate(`/messageboard/${t.id}`)
      }
      return(
        <Box key={t.id} onClick={()=>handleOnClick()} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
          <h6 style={{margin: '5px'}}>Posted by {t.user_nickname}</h6>
          <h3>{t.title}</h3>
          <p>{t.body}</p>
        </Box>
      )
    })
    return topicBox
  }

  return (
    <div>
      <h1>Message Board</h1>
      {auth.authenticated ? <Button variant="contained" onClick={handleOpen}>Create Topic</Button> : renderLoginBox()}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div><AddTopic addTopic={addTopic}/></div>
      </Modal>
      {renderTopics(topics)}
    </div>
  )
}

export default MessageBoard;