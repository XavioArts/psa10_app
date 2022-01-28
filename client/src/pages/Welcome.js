import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Welcome = (props) => {
  return(
    <Box sx={{...style}}>
      <h1>Welcome to PSA10</h1>
      <p>Let's get started building you digital collection</p>
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
