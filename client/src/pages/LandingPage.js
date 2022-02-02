import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Avatar, Button, Card, CardContent, Stack, Typography, Paper, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { theme } from '../components/Styles';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme} >
      <div style={{ display: "relative", justifyContent: "center", textAlign: "center", width: "100%", height: "100%", marginTop: '25px' }}>
        <h1>PSA 10</h1>
        <h5 style={{marginBottom: '100px'}}>A DIGITAL WAY TO SHOWCASE, TRADE AND CHAT WITH OTHER COLLECTORS</h5>
        <br />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 100, marginTop: '40px' }}>
          {/* <div style={{ display: "flex", position: "absolute", right: "50%", padding: "10px 50px 20px" }}> */}
          <div>
            <img style={{marginLeft: '25vw' }} id="left" width="500" height="600" src="https://cdn.shopify.com/s/files/1/1715/6019/products/TyranitarVFA155_500x.jpg?v=1618245446" />
          </div>
            <div style={{ justifyContent: "center", textAlign: "left", width: "50%", height: "50%" }}>
            <h1 style={{ font: 'DM Sans', fontSize: "35px", marginBottom: '0' }}>The</h1>
            <h1 style={{ fontSize: "35px", marginBottom: '0', marginTop: '5px' }}>Collector's</h1>
            <h1 style={{ fontSize: "35px", marginTop: '5px' }}>Network&reg;</h1>
            <br />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
              <div>
                <img
                  style={{marginTop: '15px'}}
                  src={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                  alt="Marc Price"
                  className="circletaglanding"
                />
              </div>
              <div>
                <p style={{ fontSize: "12px", marginBottom: '0' }}>Collector</p>
                <h5 style={{ fontSize: "15px", marginTop: '5px' }}>Marc Price</h5>
              </div>
              <div>
                <Button variant="contained" color="primary" size="small" sx={{mr: "15px", marginTop:'15px'}} >4trade</Button>
              </div>
            </div>
            <Paper style={{ width: 300, height: 100, textAlign: 'center', display: "inline-block", position: "relative", border: '1px solid #CDCDCD', borderRadius: '10px', marginBottom: '35px' }}>
              <h6 style={{ margin: '5px' }}>Battle Styles Set</h6>
              <h1>Tyranitar V</h1>
            </Paper>
            <br />
            <Button variant="contained" onClick={() => navigate("login")} style={{height:"40px", width: '300px', alignSelf: "center", borderRadius: "40px" }}>View Collection</Button>
          </div>
        </div>
        <div>

          <Box sx={{ width: '80%', height: 400, display: "inline-block", backgroundColor: "#f5f3f2", margin: '100px' }}>
            <h1>Collectors</h1>
            <h3>Popular</h3>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
              <Card />
              <Card sx={{ width: 150, height: 175, borderRadius: '10px', margin: '50px' }}>
                <CardContent>
                  <Button variant="contained" style={{height:"25px", width: '12px', alignSelf: "center", borderRadius: "40px" }}>{<EmojiEventsOutlinedIcon />} #1</Button>
                  <hr />
                  <div style={{alignContent: 'center'}}>
                    <img
                      style={{marginTop: '15px'}}
                      src={"https://i.pinimg.com/originals/94/d9/35/94d935055a035dea7d32cc10ff14874b.jpg"}
                      alt="Edd Harris"
                      className="circletaglanding"
                    />
                  </div>
                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Edd Harris
                  </Typography>
                  <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                    3000 Items
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width: 150, height: 175, borderRadius: '10px', margin: '50px' }}>
                <CardContent>
                <Button variant="contained" style={{height:"25px", width: '12px', alignSelf: "center", borderRadius: "40px" }}>{<EmojiEventsOutlinedIcon />} #2</Button>
                  <hr />
                  <div style={{alignContent: 'center'}}>
                    <img
                      style={{marginTop: '15px'}}
                      src={"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZSUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}
                      alt="Amanda Jones"
                      className="circletaglanding"
                    />
                  </div>
                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Amanda Jones
                  </Typography>
                  <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                    2550 Items
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width: 150, height: 175, borderRadius: '10px', margin: '50px' }}>
                <CardContent>
                <Button variant="contained" style={{height:"25px", width: '12px', alignSelf: "center", borderRadius: "40px" }}>{<EmojiEventsOutlinedIcon />} #3</Button>
                  <hr />
                  <div style={{alignContent: 'center'}}>
                    <img
                      style={{marginTop: '15px'}}
                      src={"https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2UlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
                      alt="Marlee Kupal"
                      className="circletaglanding"
                    />
                  </div>
                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Marlee Kupal
                  </Typography>
                  <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                    2000 Items
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width: 150, height: 175, borderRadius: '10px', margin: '50px' }}>
                <CardContent>
                <Button variant="contained" style={{height:"25px", width: '12px', alignSelf: "center", borderRadius: "40px" }}>{<EmojiEventsOutlinedIcon />} #4</Button>
                  <hr />
                  <div style={{alignContent: 'center'}}>
                    <img
                      style={{marginTop: '15px'}}
                      src={"https://media.istockphoto.com/photos/new-york-city-mind-state-concept-image-picture-id926810300?b=1&k=20&m=926810300&s=170667a&w=0&h=avbxokwIemrvD5RrCz3TzEktVzO_ShJC6gXzMh0Oj7o="}
                      alt="Payton Kunde"
                      className="circletaglanding"
                    />
                  </div>
                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Payton Kunde
                  </Typography>
                  <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                    1600 Items
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ width: 150, height: 175, borderRadius: '10px', margin: '50px' }}>
                <CardContent>
                <Button variant="contained" style={{height:"25px", width: '12px', alignSelf: "center", borderRadius: "40px" }}>{<EmojiEventsOutlinedIcon />} #5</Button>
                  <hr />
                  <div style={{alignContent: 'center'}}>
                    <img
                      style={{marginTop: '15px'}}
                      src={"https://media.istockphoto.com/photos/portrait-of-a-senior-man-in-dark-background-picture-id519532628?b=1&k=20&m=519532628&s=170667a&w=0&h=7sxobMpEnPSUAEf0mKxt62wVxd2hYP26Wo6EKmQPcUY="}
                      alt="Payton Buckridge"
                      className="circletaglanding"
                    />
                  </div>
                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    Payton Buckridge
                  </Typography>
                  <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                    1000 Items
                  </Typography>
                </CardContent>
              </Card>
              <Card />
            </Stack>
          </Box>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 75, marginBottom: '100px' }}>
        {/* <div style={{ display: "table", position: 'absolute', margin: '100px', textAlign: 'start', width: 400, height: 400 }}> */}
          <div></div>
          <div style={{ justifyContent: "center", textAlign: "left"}}> 
            <h1 style={{ fontSize: "45px", marginBottom: '0' }}>Collect and</h1>
            <h1 style={{ fontSize: "45px", marginBottom: '0', marginTop: '5px' }}>trade physical</h1>
            <h1 style={{ fontSize: "45px", marginBottom: '0', marginTop: '5px' }}>collections</h1>
            <h1 style={{ fontSize: "45px", marginTop: '5px' }}>digitally</h1>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "20px", marginRight: "20px" }}
              onClick={() => navigate("/login")} >Login</Button>
            <Button
              variant="outlined"
              color="black"
              sx={{ borderRadius: "20px", marginRight: "20px" }}
              onClick={() => navigate("/register")} >Sign Up</Button>
          </div>
          <div>
            <div>
              <img id="left" position="end" width="750" height="480" src="https://ca-times.brightspotcdn.com/dims4/default/8b65301/2147483647/strip/true/crop/6720x4480+0+0/resize/1486x991!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F1c%2Fbc%2F81deae894c2aad3ca867bb9b102f%2Fla-photos-1staff-820771-fi-0806-pandemic-collectibles-cmh-01.JPG" />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;