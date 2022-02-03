import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";

const FABIO_ICON = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843045/Dev%20Icons/Pok%C3%A9mon_icons_fabio_peth2m.jpg";
const SKY_ICON = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843045/Dev%20Icons/Pok%C3%A9mon_icons_sky_algdau.jpg";
const MADELINE_ICON = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843045/Dev%20Icons/Pok%C3%A9mon_icons_madeline_oxdwfn.jpg";
const JOHN_ICON = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843045/Dev%20Icons/Pok%C3%A9mon_icons_john_hbceje.jpg";
const AUSTIN_ICON = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843044/Dev%20Icons/Pok%C3%A9mon_icons_austin_ynvmqm.jpg";
const FABIO_AVATAR = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843207/Dev%20Icons/20220202_140602_zcagvm.jpg"
const MADELINE_AVATAR = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843208/Dev%20Icons/Image_from_iOS_oyqjq4.jpg"
const AUSTIN_AVATAR = "https://res.cloudinary.com/dsm4zxnsy/image/upload/v1643843208/Dev%20Icons/IMG_1660_gqcjb9.jpg"

const AboutUs = () =>{

  return (
    <div>
      <Paper sx={{m: 10}} elevation={4} >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px"}} >
          <img src={FABIO_ICON} alt="fabio pokemon icon" width="450px" />
          <div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px"}} >
              <Avatar src={FABIO_AVATAR} alt="fabio avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{textAlign: "right"}} variant="h3" component="div" gutterBottom >
              Fabio Xavier
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
              I am a multimedia artist and illustrator, and an avid 
              fan of comics and games. Which made this project all 
              the more amazing because I love trading card games! 
              I really loved my time at DevPoint Labs. Before going 
              to the bootcamp, I had experience with javascript in 
              school when I got my bachelor's degree at the University of Utah. 
              I attended the game development program but on the art side,  
              which still required a bit of coding knowledge. This background 
              made the quick pace of DevPoint Labs perfect for me. Through this 
              experience I found out that I really love coding and problem solving, 
              but above all else I love creating. I am so grateful to DPL for helping 
              me jumpstart my new career in development!
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{m: 10}} elevation={4} >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px"}} >
          <img src={MADELINE_ICON} alt="madeline pokemon icon" width="450px" />
          <div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px"}} >
              <Avatar src={MADELINE_AVATAR} alt="madeline avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{textAlign: "right"}} variant="h3" component="div" gutterBottom >
              Madeline Armstrong
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{m: 10}} elevation={4} >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px"}} >
          <img src={AUSTIN_ICON} alt="austin pokemon icon" width="450px" />
          <div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px"}} >
              <Avatar src={AUSTIN_AVATAR} alt="austin avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{textAlign: "right"}} variant="h3" component="div" gutterBottom >
              Austin Choi
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{m: 10}} elevation={4} >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px"}} >
          <img src={JOHN_ICON} alt="john pokemon icon" width="450px" />
          <div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px"}} >
              <Avatar alt="john avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{textAlign: "right"}} variant="h3" component="div" gutterBottom >
              John Leosco
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{m: 10}} elevation={4} >
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px"}} >
          <img src={SKY_ICON} alt="sky pokemon icon" width="450px" />
          <div>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px"}} >
              <Avatar alt="sky avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{textAlign: "right"}} variant="h3" component="div" gutterBottom >
              Sky Lin
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default AboutUs;