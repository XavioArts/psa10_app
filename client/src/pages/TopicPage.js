import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import EditTopic from '../components/EditTopic';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TopicPage = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const [topic, setTopic] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    getTopic()
  },[])

  const getTopic = async () => {
    try {
      let res = await axios.get(`/api/topics/${params.id}`);
      setTopic(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error getting topic")
    }
  }


  return (
    <div>
      <h1>{topic.title}</h1>
      <p>{topic.body}</p>
        <Button variant="contained" onClick={handleOpen}>Edit Topic</Button>
        <Modal open={open} onClose={handleClose}>
          <div><EditTopic /></div>
        </Modal>
      <div style={{width: "85vw", margin: "auto", padding: "10px", background: "#DCDCDC"}} >
        <h3>This JSON is for testing purposes</h3>
        <code style={{overflowWrap: "break-word"}} >{JSON.stringify(topic)}</code>
      </div>
    </div>
  )
}

export default TopicPage;