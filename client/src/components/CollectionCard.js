import React from "react";
import { makeStyles } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    paddingTop: "100%"
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const CollectionCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://m.media-amazon.com/images/I/715E1JA9DRL._AC_SL1000_.jpg"
        title="Charizard"
      />
      <CardActions disableSpacing>
        <Avatar className={classes.small} />
        <IconButton aria-label="Like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <StarBorderIcon />
        </IconButton>
        <Button variant="outlined" color="primary">
          Available
        </Button>
        <Typography component="p">Comments</Typography>
      </CardActions>
    </Card>
  );
}

export default CollectionCard;