import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CollectionCard = (props) => {
  const { likes, available } = props

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="400"
        image="https://m.media-amazon.com/images/I/715E1JA9DRL._AC_SL1000_.jpg"
        alt="Charizard"
      />
      <CardActions disableSpacing>
        <Avatar sx={{ width: 24, height: 24 }} />
        <IconButton aria-label="like">
          <FavoriteIcon />{likes}
        </IconButton>
        <IconButton aria-label="trophy">
          <EmojiEventsIcon />
        </IconButton>
        {available === true && <Button variant="outlined" color="primary">
          Available
        </Button>}
        {available === false && <Button variant="outlined" color="secondary">
          Unavailable
        </Button>}

        {/* Placeholder for card comments */}
        <Typography component="p">Comments</Typography>
      </CardActions>
    </Card>
  );
}

export default CollectionCard;
