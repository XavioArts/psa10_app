import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Modal, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../providers/AuthProvider";
import CollectionCommentEdit from "./CollectionCommentEdit";

const CollectionComments = (props) => {
  const auth = useContext(AuthContext)
  const [collectionComments, setCollectionComments] = useState([]);
  const [newContent, setNewContent] = useState([])
  const [editedComment, setEditedComment] = useState(false)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCollectionComments();
    setEditedComment(false)
  }, [editedComment])

  const getCollectionComments = async () => {
    try {
      let res = await axios.get(`/api/collections/${params.id}/collection_comments`)
      setCollectionComments(res.data)
    } catch (err) {
      alert("error occurred getCollectionComments")
    }
  }

  const deleteCollectionComments = async (id) => {
    await axios.delete(`/api/collections/${params.id}/collection_comments/${id}`)
    setCollectionComments(collectionComments.filter((cc) => cc.id !== id));
    navigate(`/profile/collections/${params.id}`)
  }

  const addComment = (collectionComment) => {
    let displayNewComment = { ...collectionComment, image: auth.image, nickname: auth.nickname }
    setCollectionComments([displayNewComment, ...collectionComments])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newComment = { content: newContent, collection_id: params.id, user_id: auth.id, image: auth.image, nickname: auth.nickname }
    let res = await axios.post(`/api/collections/${params.id}/collection_comments`, newComment)
    setNewContent("")
    addComment(res.data)
  }

  const renderCollectionComments = () => {
    if (!collectionComments) {
      return (
        <div>
          <h2>Be the first one to leave a comment on this collection!</h2>
        </div>
      )
    }
    return (
      collectionComments.map((cc) => (
        <div key={cc.id}>

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="userNickname" src={cc.image} />
            </ListItemAvatar>
            <ListItemText
              primary={cc.nickname}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {cc.content}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {auth.id === cc.user_id && <CollectionCommentEdit {...cc} setEditedComment={setEditedComment}/>}
          {(auth.id === cc.user_id || auth.id === props.collectionId) && <button onClick={() => deleteCollectionComments(cc.id)}>Delete this comment</button>}
          <Divider variant="inset" component="li" />
        </div>
        
      ))
      )
    }

  return (
    <div>
      <h2>Comments:</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Add comment"
          variant="standard"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <Button
          type = "submit"
          variant="contained"
          color="success"
        >
          Submit &nbsp;<SendIcon />
        </Button>
      </form>
      <List sx={{ width: '100%', maxWidth: "80%", bgcolor: 'background.paper' }}>
        {renderCollectionComments()}
      </List>
    </div>
  )
}

export default CollectionComments;