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
  // const [likedArray, setLikedArray] = useState(auth.liked_cards)


  useEffect(() => {
    if (auth.likedCards && auth.likedCards.filter((c)=> c === props.id).length > 0) {
      setLiked(true);
    }
  }, []);

  // console.log(likedArray.filter((c)=> c === props.id))
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
    // setLikedArray(auth.liked_cards);
    if (!liked) {
      setLiked(true);
      let likesArray = [...auth.likedCards, props.id]
      // console.log(likesArray)
      let liked = like + 1
      let updatedCardLikes = await axios.put(`/api/users/liked_cards`, { liked_cards: likesArray })
      let updateCardLikes = await axios.put(`/api/cards/${props.id}`, { likes: liked })
      // console.log("This is what im looking for:",updatedCardLikes.data)
      // console.log("This is what im looking for:",updateCardLikes.data)
      props.setCard(updateCardLikes.data);
      auth.setUser(updatedCardLikes.data);
      auth.setLikedCards(updatedCardLikes.data.liked_cards)
      setLike(liked)
    }
    else {
      setLiked(false);
      let unLikedArray = auth.likedCards.filter((c) => props.id !== c)
      let unLiked = like - 1
      let removeUserLikes = await axios.put(`/api/users/liked_cards`, { liked_cards: unLikedArray })
      let removeCardLikes = await axios.put(`/api/cards/${props.id}`, { likes: unLiked })
      // console.log(removeUserLikes.data)
      props.setCard(removeCardLikes.data);
      auth.setUser(removeUserLikes.data);
      auth.setLikedCards(removeUserLikes.data.liked_cards)
      setLike(unLiked)
    }
    setTimeout(()=>{setClicked(false)},700)
  }

  return (
    <IconButton disabled={clicked} onClick={handleLike}>
      {liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}
    </IconButton>


  )
};

export default CardLike;