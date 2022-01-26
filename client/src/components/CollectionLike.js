import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const CollectionLike = (collection) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(collection.likes)
  console.log(collection)

  useEffect(() => {
    isLiked();
  },[])

  //checking to see if user has liked this collection.
  const isLiked = () => {
    // inclueds: checking to see if the liked_collections array has the params.id
    if(auth.liked_collections.includes(collection.id)) {
      setLiked(true)
    }
  }
  
  const handleLike = async (id) => {
    // like: liked ? likes -1 : likes +1
    if(!liked){
      setLiked(true);
      let likedArray = auth.liked_collections.push(id)
      let liked = like + 1
      let updateUserLikes = await axios.put(`/api/user_liked_collections`, { user: auth, liked_collection: likedArray})
      let updateCollectionLikes = await axios.put(`/api/collections/${id}`, {likes: liked})
      setLike(liked)
    }
    else{
      setLiked(false);
      let unlikedArray = auth.liked_collections.filter((ula) => ula.id !== id)
      let unliked = like - 1
      let removeUserLikes = await axios.put("/api/user_liked_collections", { user: auth, liked_collection: unlikedArray})
      let removeCollectionLikes = await axios.put(`/api/collections/${id}`, {likes: unliked})
      setLike(unliked)
    }
  }
  return (
    <button onClick = {()=>{handleLike(collection.id)}}><FavoriteBorderIcon/>{like}</button>
  );
}

export default CollectionLike;