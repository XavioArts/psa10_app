import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';

const MessageBoard = () => {
  const [topics, setTopics] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    getTopics()
  },[])

  const getTopics = async () => {
    try {
      let res = await axios.get(`/api/topics`);
      setTopics(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error getting topics")
    }
  }

  const renderTopics = (topics) => {
    let topicBox = topics.map(t=>{
      const handleOnClick = () =>{
        navigate(`/messageboard/${t.id}`)
      }
      return(
        <Box key={t.id} onClick={()=>handleOnClick()} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
          <h6 style={{margin: '5px'}}>Posted by User {t.user_id}</h6>
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
      {renderTopics(topics)}
      <div style={{width: "85vw", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>This JSON is for testing purposes</h3>
        <code style={{overflowWrap: "break-word"}} >{JSON.stringify(topics)}</code>
      </div>
    </div>
  )
}

export default MessageBoard;