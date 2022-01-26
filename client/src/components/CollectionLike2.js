import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const CollectionLike2 = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(auth.liked_collections.includes(props.collection.id) ? true : false);
  const [like, setLike] = useState(props.collection.likes)
  const [clicked, setClicked] = useState(false)
  let likedArray = auth.liked_collections
  console.log(props.collection)
  console.log(auth)
  console.log(liked)

  const handleLike = async () => {
    // like: liked ? likes -1 : likes +1
    if (!liked) {
      setLiked(true);
      likedArray.push(props.collection.id)
      let liked = like + 1
      let updateUserLikes = await axios.put(`/api/users/liked_collections`, { liked_collections: likedArray })
      let updateCollectionLikes = await axios.put(`/api/collections/${props.collection.id}`, { likes: liked })
      console.log(updateUserLikes.data)
      setLike(liked)
      setClicked(true)
    }
    else {
      setLiked(false);
      likedArray = likedArray.filter((c) => props.collection.id !== c)
      console.log(likedArray)
      let unliked = like - 1
      let removeUserLikes = await axios.put(`/api/users/liked_collections`, { liked_collections: likedArray })
      let removeCollectionLikes = await axios.put(`/api/collections/${props.collection.id}`, { likes: unliked })
      console.log(removeUserLikes.data)
      setLike(unliked)
      setClicked(true)
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

export default CollectionLike2;