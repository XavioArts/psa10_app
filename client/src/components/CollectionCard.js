import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  const [visibleImage, setVisibleImage] = React.useState(card.front_image);
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
  const flipCard = (e) => {
    e.preventDefault();
    if (visibleImage === card.front_image) {
      setVisibleImage(card.back_image);
    } else {
      setVisibleImage(card.front_image);
    };
  };

  return (
    <>
    <Card sx={{ maxWidth: 345 }} key={card.id}>
      <CardMedia
        component="div"
        sx={{height: "400px"}}
        image={visibleImage}
        alt={card.name}
         >
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: "100%"}} >
            <IconButton onClick={flipCard} >
              <ArrowBackIosIcon sx={{fontSize: "60px"}} />
            </IconButton>
            <div onClick={handleOpen} style={{height: "100%", width: "100%"}} />
            <IconButton onClick={flipCard} >
              <ArrowForwardIosIcon sx={{fontSize: "60px"}} />
            </IconButton>
          </div>
        </CardMedia>
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

      <CardActions disableSpacing >
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
