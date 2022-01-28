import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const CardLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(null);
  const [like, setLike] = useState(props.likes)
  const [likedArray, setLikedArray] = useState([])



  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let res = await axios.get(`/api/users/${auth.id}`)
    setLikedArray(res.data.liked_cards)
    setLiked(res.data.liked_cards.includes(props.id) ? true : false);
  }

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      let likesArray = [...likedArray, props.id]
      console.log(likesArray)
      let liked = like + 1
      let updatedCardLikes = await axios.put(`/api/users/liked_cards`, { liked_cards: likesArray })
      let updateCardLikes = await axios.put(`/api/cards/${props.id}`, { likes: liked })
      console.log(updatedCardLikes.data.liked_cards)
      setLike(liked)
    }
    else {
      setLiked(false);
      let unLikedArray = likedArray.filter((c) => props.id !== c)
      console.log(likedArray)
      let unLiked = like - 1
      let removeUserLikes = await axios.put(`/api/users/liked_cards`, { liked_cards: unLikedArray })
      let removeCardLikes = await axios.put(`/api/cards/${props.id}`, { likes: unLiked })
      console.log(removeUserLikes.data)
      setLike(unLiked)
    }
  }

  return (
    <button onClick={() => { handleLike() }}>
      {liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}{like}
    </button>


  )
};

export default CardLike;