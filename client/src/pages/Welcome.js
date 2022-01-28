import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Carousel from '../components/Carousel';
import useWindowSize from '../components/UseWindowSize';
import Slide1 from '../slides/slide1.png'
import Slide2 from '../slides/slide2.png'
import Slide3 from '../slides/slide3.png'
import Slide4 from '../slides/slide4.png'
import Slide5 from '../slides/slide5.png'
import Slide6 from '../slides/slide6.png'

const Welcome = (props) => {
  const size = useWindowSize();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `900px`,
    height: `750px`,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  };

  console.log(size.height)

  const slides = [
    {id: 1, image: Slide1, text: 'First let head over to you collections and create you first collection'},
    {id: 2, image: Slide2, text: 'Start by clicking the "Add a Collection" button'},
    {id: 3, image: Slide3, text: 'Next give your collection a name, a category, and a description'},
    {id: 4, image: Slide4, text: 'Now click on the name of you collection'},
    {id: 5, image: Slide5, text: 'Lets add your first collectable'},
    {id: 6, image: Slide6, text: "Finally fill out the collectable's info and add it to your collection"},
    {id: 7, image: 'https://i.pinimg.com/originals/9e/bf/a7/9ebfa7a509fb8a748c61497ac95a0ac3.gif', text: 'Great job!! Now your free to add more collectables, explore showcases, make new friends, and organize trades!!'}
  ]

  const renderSlides = () => {
    let slideshow = slides.map((s)=>{
      return(
        <div key={s.id}>
          <h3>{s.text}</h3>
          <br />
          <img src={s.image} style={{ width: `900px`, height: `460px`}}/>
        </div>
      )
    })
    return slideshow
  }

  return(
    <Box sx={{...style}}>
      <div>
        <h1>Welcome to PSA10</h1>
        <p>Let's get started building you digital collection</p>
        <div style={{Position: 'absolute', left: '50%'}}>
          <Carousel show={1} infiniteLoop={false} style={{margin: '10px'}}>
            {renderSlides()}
          </Carousel>
        </div>
        <Button style={{marginTop: '15px'}} variant="contained" onClick={props.handleClose}>I'm ready to get started!</Button>
      </div>
    </Box>
  )
}

export default Welcome;

