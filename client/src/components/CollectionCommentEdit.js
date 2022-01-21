import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

const CollectionCommentEdit = (props) => {
  const { content, collection_id, user_id, id } = props
  const [comment, setComment] = useState(content)
  const params = useParams();

  const handleEdit = async (e) => {
    e.preventDefault();
    let commentId = id
    let newComment = { content: content, collection_id: collection_id, user_id: user_id }
    let res = await axios.put(`/api/collections/${params.id}/collection_comments/${commentId}`, newComment)
    console.log(res)
    setComment(res.data)
    console.log("Handle Edit clicked")
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={style}>
      <form onSubmit={handleEdit}>
        <h2>Edit this Comment</h2>
        <TextField
          value={comment}
          onChange = {(e) => setComment(e.target.value)}
          style={{ width: 300 }}
          multiline
          rows={4}
        />
        <button type="submit">Edit Comment</button>
      </form>
    </Box>
  )
}

export default CollectionCommentEdit;