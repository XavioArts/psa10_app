import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, IconButton, Typography } from "@mui/material";


const CollectionLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(props.collection.likes)
  // const [likedArray, setLikedArray] = useState([]);
  
  useEffect(()=>{
    if (auth.likedCollections && auth.likedCollections.filter((c)=> c === props.collection.id).length > 0) {
      setLiked(true);
    }
  },[]);
  
  // const getUser = async () => {
  //   let res = await axios.get(`/api/users/${auth.id}`)
  //   setLikedArray(res.data.liked_collections)
  //   setLiked(res.data.liked_collections.includes(props.collection.id) ? true : false)
  // }

  const handleLike = async () => {
    // like: liked ? likes -1 : likes +1
    setClicked(true);
    if (!liked) {
      setLiked(true);
      let likingArray = [...auth.likedCollections, props.collection.id]
      let liked = like + 1
      let updateUserLikes = await axios.put(`/api/users/liked_collections`, { liked_collections: likingArray })
      let updateCollectionLikes = await axios.put(`/api/collections/${props.collection.id}`, { likes: liked })
      setLike(liked)
      props.setCollection(updateCollectionLikes.data);
      auth.setUser(updateUserLikes.data);
      auth.setLikedCollections(updateUserLikes.data.liked_collections)
    }
    else {
      setLiked(false);
      let unlikedArray = auth.likedCollections.filter((c) => props.collection.id !== c)
      let unliked = like - 1
      let removeUserLikes = await axios.put(`/api/users/liked_collections`, { liked_collections: unlikedArray })
      let removeCollectionLikes = await axios.put(`/api/collections/${props.collection.id}`, { likes: unliked })
      setLike(unliked)
      props.setCollection(removeCollectionLikes.data);
      auth.setUser(removeUserLikes.data);
      auth.setLikedCollections(removeUserLikes.data.liked_collections)
    }
    setTimeout(()=>{setClicked(false)},700)

  }

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}} >
      <IconButton
        onClick={handleLike}
        disabled={clicked}
        sx={{color: '#90BDEE'}}
      >
        {liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
      </IconButton>
      <Box sx={{borderRadius: "20px", backgroundColor: "#90BDEE", color: "#FFFFFF",  width: 50, height: 25, display: "flex", alignItems: "center", justifyContent: "center"}} >
        <Typography variant="body2" >{like}</Typography>
      </Box>
    </Box>
  );
}

export default CollectionLike;