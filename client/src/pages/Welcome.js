import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Carousel from '../components/Carousel';

const Welcome = (props) => {

  const images = [
    <img src={'https://www.jotform.com/blog/wp-content/uploads/2020/01/Productivity-featured.png'}/>,
    <img src={'https://www.jotform.com/blog/wp-content/uploads/2020/01/Productivity-featured.png'}/>,
    <img src={'https://www.jotform.com/blog/wp-content/uploads/2020/01/Productivity-featured.png'}/>,
    <img src={'https://www.jotform.com/blog/wp-content/uploads/2020/01/Productivity-featured.png'}/>,
    <img src={'https://www.jotform.com/blog/wp-content/uploads/2020/01/Productivity-featured.png'}/>
  ]

  return(
    <Box sx={{...style}}>
      <h1>Welcome to PSA10</h1>
      <p>Let's get started building you digital collection</p>
      <Carousel show={1} infiniteLoop={false} style={{margin: '10px'}}>
        {images}
      </Carousel>
      <Button onClick={props.handleClose}>Close Modal</Button>
    </Box>
  )
}

export default Welcome;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
