import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { IconButton } from '@mui/material';

const CardLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [like, setLike] = useState(props.likes)
  const [likedArray, setLikedArray] = useState(auth.liked_cards)


  useEffect(() => {
    if (likedArray.find((c)=> c === props.id)) {
      setLiked(true);
    }
  }, []);

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = async () => {
  //   let res = await axios.get(`/api/users/${auth.id}`)
  //   setLikedArray(res.data.liked_cards)
  //   setLiked(res.data.liked_cards.includes(props.id) ? true : false);
  // }

  const handleLike = async () => {
    setClicked(true);
    if (!liked) {
      setLiked(true);
      let likesArray = [...likedArray, props.id]
      console.log(likesArray)
      let liked = like + 1
      let updatedCardLikes = await axios.put(`/api/users/liked_cards`, { liked_cards: likesArray })
      let updateCardLikes = await axios.put(`/api/cards/${props.id}`, { likes: liked })
      console.log(updatedCardLikes.data)
      console.log("This is what im looking for:",updateCardLikes.data)
      props.setCard(updateCardLikes.data);
      auth.setUser(updatedCardLikes.data);
      setLikedArray(updatedCardLikes.data.liked_cards)
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
      props.setCard(removeCardLikes.data);
      auth.setUser(removeUserLikes.data);
      setLikedArray(removeUserLikes.data.liked_cards)
      setLike(unLiked)
    }
    setTimeout(()=>{setClicked(false)},1000)
  }

  return (
    <IconButton disabled={clicked} onClick={() => { handleLike() }}>
      {liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
    </IconButton>


  )
};

export default CardLike;