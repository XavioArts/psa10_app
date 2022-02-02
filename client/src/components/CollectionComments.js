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
import DeleteComment from "./DeleteComment";

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
    if (collectionComments.length === 0) {
      return (
        <div>
          <p style={{textAlign: "center"}}>Be the first one to leave a comment!</p>
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
          {auth.id === cc.user_id && <CollectionCommentEdit {...cc} setEditedComment={setEditedComment} />}
          {(auth.id === cc.user_id || auth.id === props.collectionId) && <DeleteComment {...cc} deleteCollectionComments={deleteCollectionComments} />}
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
                fullWidth
                multiline
                rows={2}
                variant="standard"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                type="submit"
                variant="contained"
                style = {{backgroundColor: "#6569C8"}}
              >
                Send &nbsp;<SendIcon />
              </Button>
              </div>
            </form>
            <List sx={{ width: '100%' }}>
              {renderCollectionComments()}
            </List>
          </div>
          )
}

          export default CollectionComments;