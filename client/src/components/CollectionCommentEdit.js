import React, { useState } from "react";
import { Box } from "@mui/system";
import { Modal, TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router";

const CollectionCommentEdit = (props) => {
  const { content, collection_id, user_id, id, setEditedComment } = props
  const [comment, setComment] = useState(content)
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    let commentId = id
    let newComment = { content: comment, collection_id: collection_id, user_id: user_id }
    let res = await axios.put(`/api/collections/${params.id}/collection_comments/${commentId}`, newComment)
    setComment(res.data.content)
    setEditedComment(true)
    setOpen(false)
    console.log(res)
    console.log(res.data)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{ margin: '10px' }}
      >
        Edit
      </button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <form onSubmit={handleEdit}>
            <h2>Edit this Comment</h2>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: 300 }}
              multiline
              rows={4}
            />
            <br />
            <br />
            <button type="submit">Edit Comment</button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default CollectionCommentEdit;