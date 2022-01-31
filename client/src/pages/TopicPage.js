import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Button, Paper } from "@mui/material";
import Modal from '@mui/material/Modal';
import EditTopic from '../components/EditTopic';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Message from '../components/Message';

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
    try {
      let res =  await axios.post(`/api/topics/${params.id}/messages`, newMessage)
      setMessages([res.data, ...messages])
      setContent('')
    } catch(err){
      console.log(err)
    }
  }

  const renderMessages = (messages) => {
    let messageBox = messages.map(m=>{
      return(
        <Message key={m.id} {...m} deleteMessage={deleteMessage}/>
      )
    })
    return messageBox
  }

  const renderLoginBox = () => {
    return(
      <div style={{width: "93%", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>Want to join the conversation?</h3>
        <h3>{<Link to="/login">Login</Link>} or {<Link to="/login">Register</Link>}</h3>
      </div>
    )
  }

  const editTopic = () => {
    handleClose()
  }

  const deleteMessage = async (id) => {
    await axios.delete(`/api/topics/${params.id}/messages/${id}`)
    setTic(!tic)
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
      {auth.authenticated ? <Paper elevation={5} style={{ padding: '5px', border: '1px solid grey', borderRadius: '10px', margin: '20px' }}>
        <form onSubmit={handleSubmit}>
          <h6 style={{margin: '5px'}}>Comment as {auth.nickname}</h6>
          <textarea style={{ resize: 'none', overflow: 'auto', marginTop: '25px', marginBottom: '15px', fontSize: '1.17em', width: '99%'}} rows="4"  value={content} onChange={(e) => setContent(e.target.value)}/>
          <br/>
          <Button variant="contained" type='submit'>Post</Button>
        </form>
      </Paper> : renderLoginBox()}
      {renderMessages(messages)}
    </div>
  )
}

export default TopicPage;