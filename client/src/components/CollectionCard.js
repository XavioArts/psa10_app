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
import { Badge, Box, CardContent, Icon, Modal, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { theme } from './Styles';
import CardLike from './CardLike';

const CollectionCard = (props) => {
  const auth = React.useContext(AuthContext)
  const {card, show, personal, user} = props
  const [cardData, setCardData] = React.useState(card)
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

  const setCard = (newData) => {
    setCardData(newData);
  }

  const findWidth = () => {
    if (props.size === "xs") {
      return "150px";
    } else if (props.size === "small") {
      return "200px";
    } else if (props.size === "medium") {
      return "250px";
    } else if (props.size === "large") {
      return "300px";
    }
    return "300px";
  }

  const findHeight = () => {
    if (props.size === "xs") {
      return "213px";
    } else if (props.size === "small") {
      return "283px";
    } else if (props.size === "medium") {
      return "354px";
    } else if (props.size === "large") {
      return "425px";
    }
    return "425px";
  }
  const findFontSize = () => {
    if (props.size === "xs") {
      return 11;
    } else if (props.size === "small") {
      return 13;
    } else if (props.size === "medium") {
      return 15;
    } else if (props.size === "large") {
      return 18;
    }
    return 18;
  }

  const findButtonSize = () => {
    if (props.size === "small") {
      return "35px";
    } else if (props.size === "medium") {
      return "45px";
    } else if (props.size === "large") {
      return "60px";
    }
    return "60px";
  }

  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ maxWidth: "300px", width: findWidth(), borderRadius: "15px" }} key={card.id} >
      <CardMedia
        component="div"
        sx={{height: findHeight(), maxHeight: "425px", borderRadius: "15px"}}
        image={visibleImage}
        alt={card.name}
         >
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", height: "100%"}} >
            {props.size !== "xs" && 
            <IconButton onClick={flipCard} sx={{background: "rgba(255,255,255,0.35)"}} >
              <ArrowBackIosIcon sx={{fontSize: findButtonSize()}} />
            </IconButton>}
            <div onClick={handleOpen} style={{height: "100%", width: "100%"}} />
            {props.size !== "xs" && <IconButton onClick={flipCard} sx={{background: "rgba(255,255,255,0.35)"}} >
              <ArrowForwardIosIcon sx={{fontSize: findButtonSize()}} />
            </IconButton>}
          </div>
          {card.graded === true &&
            <Box sx={{ position: "relative", width: "100%", height: "35px", top: "-45px", display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: 0 }} >
              <Box sx={{ borderRadius: "20px", backgroundColor: "#FFFFFF", width: 65, height: 30, display: "flex", alignItems: "center", justifyContent: "center", mr: 2, borderColor: "#90BDEE", borderWidth: "2px", borderStyle: "solid" }} >
                <Typography variant="body2" color="secondary" >PSA {card.grade}</Typography>
              </Box>
            </Box>}
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
          {card.graded && <h4>Grade: {card.grade}</h4>}
          {card.available === true && <Button variant="outlined" color="primary">
          Available
          </Button>}
          {card.graded === true && <Button variant="outlined" color="warning">
          Graded
          </Button>}
          {personal && <Button startIcon={<Icon>settings</Icon>} variant="contained" color="success" onClick={(e)=>editCard(e,`/profile/edit_card/${card.id}`)} >Edit this card</Button>}
        </Box>
      </Modal>}
      {/* <Box sx={{position: "relative", width: "100%", height: "35px", top: "-45px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 0}} >
        <Box sx={{borderRadius: "20px", backgroundColor: "#C4C4C4", width: 50, height: 25, display: "flex", alignItems: "center", justifyContent: "center"}} >
        </Box>
      </Box> */}
      {props.size !== "xs" && 
      <>
      <Box sx={{margin: "10px 0px 0px 0px", display: 'flex', alignItems: "center", justifyContent: "space-between"}} >
        <Typography sx={{ ml: '15px', textTransform: 'capitalize', fontWeight:"bold", fontSize: findFontSize()}}>
          {card.name}
        </Typography>
        {card.available && <Button variant="contained" color="primary" size="small" sx={{mr: "15px"}} >4trade</Button>}
        {!card.available && <Button variant="outlined" color="secondary" size="small" sx={{mr: "15px"}} >hodl</Button>}
      </Box>
      <CardActions disableSpacing >
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}} >
          <Avatar sx={{ width: 30, height: 30 }} src={user ? user.image : auth.image}/>
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}} >
            {/* <IconButton aria-label="like">
              <FavoriteIcon />
            </IconButton> */}
            <CardLike {...card} setCard={setCard} />
            <Box sx={{borderRadius: "20px", backgroundColor: "#C4C4C4", width: 50, height: 25, display: "flex", alignItems: "center", justifyContent: "center"}} >
              <p>{cardData.likes}</p>
            </Box>
          </Box>
        {!card.showcase && <IconButton disableRipple sx={{mr: 1}} aria-label="trophy">
          <EmojiEventsIcon  />
        </IconButton>}
        {card.showcase && <IconButton disableRipple sx={{mr: 1}} aria-label="trophy">
          <EmojiEventsIcon color="secondary" />
        </IconButton>}
        </Box>
      </CardActions>
      </>}
      {props.size === "xs" && 
      <CardContent>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}} >
          <Avatar sx={{ width: 30, height: 30 }} src={user ? user.image : auth.image}/>
          {card.available && <Button variant="contained" color="primary" size="small" sx={{mr: "15px"}} >4trade</Button>}
        {!card.available && <Button variant="outlined" color="secondary" size="small" sx={{mr: "15px"}} >hodl</Button>}
        </Box>
      </CardContent>
      }
    </Card>
    </ThemeProvider>
  );
}

export default CollectionCard;
