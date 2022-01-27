import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CollectionLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(null);
  const [like, setLike] = useState(props.collection.likes)
  const [likedArray, setLikedArray] = useState([]);
  
  useEffect(()=>{
    getUser();
  },[]);
  
  const getUser = async () => {
    let res = await axios.get(`/api/users/${auth.id}`)
    setLikedArray(res.data.liked_collections)
    setLiked(res.data.liked_collections.includes(props.collection.id) ? true : false)
  }

  const handleLike = async () => {
    // like: liked ? likes -1 : likes +1
    if (!liked) {
      setLiked(true);
      let likingArray = [...likedArray, props.collection.id]
      let liked = like + 1
      let updateUserLikes = await axios.put(`/api/users/liked_collections`, { liked_collections: likingArray })
      let updateCollectionLikes = await axios.put(`/api/collections/${props.collection.id}`, { likes: liked })
      setLike(liked)
    }
    else {
      setLiked(false);
      let unlikedArray = likedArray.filter((c) => props.collection.id !== c)
      let unliked = like - 1
      let removeUserLikes = await axios.put(`/api/users/liked_collections`, { liked_collections: unlikedArray })
      let removeCollectionLikes = await axios.put(`/api/collections/${props.collection.id}`, { likes: unliked })
      setLike(unliked)
    }
  }

  return (
    <button
      onClick={() => { handleLike() }}
    >
      {liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
      {like}
    </button>
  );
}

export default CollectionLike;