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
import { Box, Icon, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CollectionCard = (props) => {
  const {card, show, personal} = props
  // const { likes, available } = props
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const editCard = (e, url) => {
    e.preventDefault();
    navigate(url);
}

  return (
    <>
    <Card sx={{ maxWidth: 345 }} key={card.id}>
      <CardMedia
        component="img"
        height="400"
        image={card.front_image}
        alt={card.name}
        onClick={handleOpen}
      />
      {show && 
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <h1>{card.name}</h1>
          <h4>Category: {card.category}</h4>
          <h4>Condition: {card.condition}</h4>
          <h4>Set: {card.set}</h4>
          <h4>Year: {card.year}</h4>
          <h4>Card No.: {card.card_number}</h4>
          {card.available === true && <Button variant="outlined" color="primary">
          Available
          </Button>}
          {personal && <Button startIcon={<Icon>settings</Icon>} variant="contained" color="success" onClick={(e)=>editCard(e,`/profile/edit_card/${card.id}`)} >Edit this card</Button>}
        </Box>
      </Modal>}

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
