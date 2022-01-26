import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../providers/AuthProvider';

const CardLike = (props) => {
  const auth = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(props.card.likes)
  console.log(props.card.likes)
  console.log(auth)

  useEffect(() => {
    cardLiked();
  }, [])

  const cardLiked = () => {
    if (auth.liked_cards.includes(props)) {
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
      let unLiked = like - 1
      setLike(unLiked)
    }
  }

  return (
    <button onClick={() => { handleLike() }}> {liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon />}{like}</button >
  );
}

export default CardLike;