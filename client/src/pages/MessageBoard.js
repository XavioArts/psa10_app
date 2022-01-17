import React, { useEffect, useState } from 'react';
import axios from "axios";

const MessageBoard = () => {
  const [topics, setTopics] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    getTopics()
  },[])

  const getTopics = async () => {
    try {
      let res = await axios.get(`/api/topics`);
      console.log(res.data)
      setTopics(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error getting topics")
    }
  }

  const handleOnClick = () =>{
    console.log('Clicked')
  }

  return (
    <div>
      <h1>Message Board</h1>
      <div  onClick={handleOnClick()} style={{width: "85vw", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>This JSON is for testing purposes</h3>
        <code style={{overflowWrap: "break-word"}} >{JSON.stringify(topics)}</code>
      </div>
    </div>
  )
}

export default MessageBoard;