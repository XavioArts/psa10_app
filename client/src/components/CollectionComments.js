import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const CollectionComments = () => {
  const [collectionComments, setCollectionComments] = useState([]);
  const params = useParams();
  // console.log(params)

  useEffect(() => {
    getCollectionComments()
  }, [])

  const normalizeData = (data) => {
    let ids = data.map(u => u.user_id)
    let uniqueIds = [... new Set(ids)]
    let normalizedData = uniqueIds.map(id => {
      let comments = data.filter(d => d.user_id === id)
      let filterComments = comments.map(c => {
        return { key: c.id, content: c.content, image: c.image, nickname: c.nickname }
      })
      return {
        image: comments[0].image,
        nickname: comments[0].nickname,
        comments: filterComments
      }
    })
    return normalizedData
  }

  const getCollectionComments = async () => {
    try {
      let res = await axios.get(`/api/collections/${params.id}/collection_comments`)
      console.log(res.data)
      let normalizedData = normalizeData(res.data)
      setCollectionComments(normalizedData)
    } catch (err) {
      alert("error occurred getCollectionComments")
    }
  }

  // const deleteCollectionComments = async () =>{
  //   
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { content }
    let res = await axios.post(`/api/collections/${params.id}/collection_comments`, newComment)
    console.log(res)
    // props.addColelction(res.data)
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
        <div>
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
          <Divider variant="inset" component="li" />
        </div>
      ))
    )
  }

  return (
    <div>
      <h2>Comments:</h2>
      <form>
        <TextField
          required
          label="Add comment"
          variant="standard"
          value={collectionComments}
          onChange={(e) => setCollectionComments(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
        >
          Submit
        </Button>
      </form>
      <List sx={{ width: '100%', maxWidth: "80%", bgcolor: 'background.paper' }}>
        {renderCollectionComments()}
      </List>
      {/* {JSON.stringify(collectionComments)} */}
    </div>
  )
}

export default CollectionComments;