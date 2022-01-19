import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditTopic from '../components/EditTopic';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TopicPage = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [topic, setTopic] = useState([])
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState([])
  const [open, setOpen] = useState(false);
  const [tic, setTic] = useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate()
  
  const handleClose = () => {
    setOpen(false)
    setTic(!tic)
  }

  useEffect(()=>{
    getTopic()
    getMessages()
  },[tic])

  const routeBack = () => {
    navigate('/messageboard')
  }

  const getTopic = async () => {
    try {
      let res = await axios.get(`/api/topics/${params.id}`);
      setTopic(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error getting topic")
    }
  }

  const getMessages = async () => {
    try {
      let res = await axios.get(`/api/topics/${params.id}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error getting messages")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let user_id = auth.id
    let newMessage = {content, user_id}
    console.log(newMessage)
    try {
      let res =  await axios.post(`/api/topics/${params.id}/messages`, newMessage)
      console.log(res)
      setMessages([res.data, ...messages])
      setContent('')
    } catch(err){
      console.log(err)
    }
  }

  const renderMessages = (messages) => {
    let messageBox = messages.map(m=>{
      return(
        <Box key={m.id} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
          <h6 style={{margin: '5px'}}>Posted by User {m.user_id}</h6>
          <h3>{m.content}</h3>
          {auth.id === m.user_id &&<Button variant="contained">Edit</Button>}
          {auth.id === m.user_id &&<Button style={{ backgroundColor: 'red'}} variant="contained">Delete</Button>}
        </Box>
      )
    })
    return messageBox
  }

  const editTopic = () => {
    handleClose()
  }

  const deleteTopic = async (id) => {
    await axios.delete(`/api/topics/${id}`)
    navigate('/messageboard')
  }

  return (
    <div>
      <Button variant="contained" style={{ backgroundColor: 'green'}} onClick={routeBack}>Back to Message Board</Button>
      {auth.id === topic.user_id &&<Button variant="contained" onClick={handleOpen}>Edit Topic</Button>}
      <Modal open={open} onClose={handleClose}>
        <div><EditTopic title={topic.title} body={topic.body} editTopic={()=>{editTopic()}}/></div>
      </Modal>
      {auth.id === topic.user_id &&<Button variant="contained" style={{ backgroundColor: 'red'}} onClick={() => deleteTopic(topic.id)}>Delete Topic</Button>}
      <h1>{topic.title}</h1>
      <p>{topic.body}</p>
      <Box style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
        <form onSubmit={handleSubmit}>
          <h6 style={{margin: '5px'}}>Posted by User {auth.id}</h6>
          <textarea style={{ resize: 'none', overflow: 'auto', marginTop: '25px', marginBottom: '15px', fontSize: '1.17em', width: '99%'}} rows="4"  value={content} onChange={(e) => setContent(e.target.value)}/>
          <br/>
          <Button variant="contained" type='submit'>Post</Button>
        </form>
      </Box>
      {renderMessages(messages)}
      <div style={{width: "85vw", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>This JSON is for testing purposes</h3>
        <code style={{overflowWrap: "break-word"}} >{JSON.stringify(messages)}</code>
      </div>
    </div>
  )
}

export default TopicPage;