import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CollectionLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(props.collection.likes)
  console.log(props.collection.likes)
  console.log(auth)

  useEffect(() => {
    isLiked();
  }, [])

  const isLiked = () => {
    if (auth.liked_collections.includes(props.collection.id)) {
      setLiked(true)
    }
  }

  const handleLike = () => {
    if (!liked) {
      setLiked(true)
      let liked = like + 1
      setLike(liked)
    }
    else {
      setLiked(false)
      let unliked = like - 1
      setLike(unliked)
    }
  }


  return (
    <button onClick = {()=>{handleLike()}}>{liked === false ? <FavoriteBorderIcon/> : <FavoriteIcon />}{like}</button>
  );
}

export default CollectionLike;