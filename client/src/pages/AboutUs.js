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

const AboutUs = () => {

  return (
    <div>
      <Paper sx={{ m: 10 }} elevation={4} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px" }} >
          <img src={FABIO_ICON} alt="fabio pokemon icon" width="450px" />
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px" }} >
              <Avatar src={FABIO_AVATAR} alt="fabio avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{ textAlign: "right" }} variant="h3" component="div" gutterBottom >
              Fabio Xavier
            </Typography>
            <Typography sx={{ textAlign: "right" }} variant="body1" component="div" gutterBottom >
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
      <Paper sx={{ m: 10 }} elevation={4} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px" }} >
          <img src={MADELINE_ICON} alt="madeline pokemon icon" width="450px" />
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px" }} >
              <Avatar src={MADELINE_AVATAR} alt="madeline avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{ textAlign: "right" }} variant="h3" component="div" gutterBottom >
              Madeline Armstrong
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
            Starting my career in tech with DevPoint labs is a decision I could have made. I can now confidently say I am ready for my first job in development. I love seeing a product go from idea to completion with full-stack development, and the feeling of accomplishment after an issue is fixed. I decided to enter into tech because I saw so many inefficiencies in my previous workplaces that could be solved with programming. I can't wait to start providing solutions that will make people's lives easier.
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{ m: 10 }} elevation={4} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px" }} >
          <img src={AUSTIN_ICON} alt="austin pokemon icon" width="450px" />
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px" }} >
              <Avatar src={AUSTIN_AVATAR} alt="austin avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{ textAlign: "right" }} variant="h3" component="div" gutterBottom >
              Austin Choi
            </Typography>
            <Typography sx={{ textAlign: "right" }} variant="body1" component="div" gutterBottom >
              Born and raised in sunny California, I recently made the decision to move to Salt Lake City, UT
              to better myself personally and grow professionally. So far, I have enjoyed the decision.
              Coming from an extensive yet successful background in sales, I have decided to change directions in to the tech world and
              pursue a career in Web Development / Software Engineering. Taking some time on online courses such as Code Academy and Udemy, brought up some
              past memories of my younger self tampering around with fonts and UI on MySpace and having a
              fond interest in computers and tech. Following with some research at other educational programs,
              I decided to enroll with Dev Point Labs for the Winter 2021 cohort, and my experience has been nothing but amazing.
              It was definitely one of the harder courses I have taken, but the education I have gained from my instructor, James Yeates,
              and the friends I have made in this class, was definitely well worth the long nights and mixed emotions.
              I am satisfied with the skills I have gained within the last 3 months from Dev Point Labs and I know my journey to
              learn more and polishing my skills in this field will never stop. I am excited for this life long journey.
              Thank you DPL and cheers to the future.
            </Typography>
          </div>
        </div>
      </Paper>
      <Paper sx={{ m: 10 }} elevation={4} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px" }} >
          <img src={JOHN_ICON} alt="john pokemon icon" width="450px" />
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px" }} >
              <Avatar alt="john avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{ textAlign: "right" }} variant="h3" component="div" gutterBottom >
              John Leosco
            </Typography>
            <Typography sx={{ textAlign: "right" }} variant="body1" component="div" gutterBottom >
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
      <Paper sx={{ m: 10 }} elevation={4} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "20px" }} >
          <img src={SKY_ICON} alt="sky pokemon icon" width="450px" />
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: "10px" }} >
              <Avatar alt="sky avatar" sx={{ width: 175, height: 175 }} />
            </div>
            <Typography sx={{ textAlign: "right" }} variant="h3" component="div" gutterBottom >
              Sky Lin
            </Typography>
            <Typography sx={{textAlign: "right"}} variant="body1" component="div" gutterBottom >
            I have always been interested in web development and have enjoyed the process of problem-solving since high school.
            After graduating from the University of Utah with a bachelor’s degree in information systems, I realized the skills and knowledge I have gained from school were limited and I wanted to become proficient in coding.
            I decided to resign from my full-time job and join DevPoint Labs. 
            After thirteen weeks of coding, I have advanced my skills in various programming languages, such as JavaScript, React, React Native, Ruby on Rails, etc. 
            I’m looking forward to the life after DevPoint and I’m excited to move on to the next chapter.
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default AboutUs;