import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import Slide1 from '../slides/slide1.mov'
import Slide2 from '../slides/slide2.mov'
import Slide3 from '../slides/slide3.mov'
import Slide4 from '../slides/slide4.mov'
import Slide5 from '../slides/slide5.mov'

const Welcome = (props) => {
  const navigate = useNavigate();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `900px`,
    height: `800px`,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  };

  const slides = [
    {id: 1, image: Slide1, text: 'First let head over to you collections and create you first collection'},
    {id: 2, image: Slide2, text: 'Start by clicking the "Add a Collection" button'},
    {id: 3, image: Slide3, text: 'Next give your collection a name, a category, and a description'},
    {id: 5, image: Slide4, text: 'Lets add your first collectable'},
    {id: 6, image: Slide5, text: "Finally fill out the collectable's info and add it to your collection"},
    {id: 7, image: 'https://i.pinimg.com/originals/9e/bf/a7/9ebfa7a509fb8a748c61497ac95a0ac3.gif', text: 'Great job!! Now your free to add more collectables, explore showcases, make new friends, and organize trades!!'}
  ]

  const renderSlides = () => {
    let slideshow = slides.map((s)=>{
      return(
        <div key={s.id}>
          <h3>{s.text}</h3>
          <br />
          <video style={{ width: `900px`, height: `460px`}} autoPlay loop muted>
            <source src={s.image} type="video/mp4"></source>
        </video>
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
        <br/>
        <Button style={{marginTop: '15px'}} variant="contained" onClick={()=>navigate('/FAQ')}>Have more question? Check out our FAQ</Button>
      </div>
    </Box>
  )
}

export default Welcome;

