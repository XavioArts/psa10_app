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
  const card = props
  // const { likes, available } = props

  return (
    <>
    <Card sx={{ maxWidth: 345 }} key={card.id}>
      <CardMedia
        component="img"
        // height="500"
        image={card.front_image}
        alt={props.name}
      />
      <CardActions disableSpacing>
        <Avatar sx={{ width: 24, height: 24 }} />
        <IconButton aria-label="like">
          <FavoriteIcon />{card.likes}
        </IconButton>
        <IconButton aria-label="trophy">
          <EmojiEventsIcon />
        </IconButton>
        {card.available === true && <Button variant="outlined" color="primary">
          Available
        </Button>}
        {card.available === false && <Button variant="outlined" color="secondary">
          Unavailable
        </Button>}

        {/* Placeholder for card comments */}
        <Typography component="p">Comments</Typography>
      </CardActions>
    </Card>
    </>
  );
}

export default CollectionCard;
