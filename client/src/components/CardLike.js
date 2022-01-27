import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../providers/AuthProvider';

const CardLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(auth.liked_cards.includes(props.card.id) ? true : false);
  const [like, setLike] = useState(props.card.likes)
  let likedArray = auth.liked_cards
  console.log(props.card)
  console.log(auth.liked_cards)
  console.log(liked)

  useEffect(() => {
    getUser();
  },[]);

  const getUser = async () => {
    let res = await axios.get(`/api/users/info/${auth.id}`)
  }

  const handleLike = async () => {
    if (!liked) {
      setLiked(true);
      likedArray.push(props.collection.id)
      let liked = like + 1
      let updatedCardLikes = await axios.put(`/api/users/liked_cards`, {liked_cards: likedArray})
      let updateCardLikes = await axios.put(`/api/cards/${props.card.id}, {likes: liked}`)
      console.log(updateUserLikes.data)
      setLike(liked)
    }
    else {
      setLiked(false);
      likedArray = likedArray.filter((c) => props.card.id !== c)
      console.log(likedArray)
      let unliked = like - 1
      let removeUserLikes = await axios.put(`/api/users/liked_card`, {liked_cards: likedArray})
      let removeCardLikes = await axios.put(`api/cards/${props.card.id}`, {likes: unLiked})
      console.log(removeUserLikes.data)
      setLike(unliked)
    }
  }

  return (
    <button onClick={() => {handleLike()}}>
      
    </button>

    
    )

export default CardLike;