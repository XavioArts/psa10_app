import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Avatar, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "inline-block", justifyContent: "space-between", textAlign: "center", width: "100%", height: "100%" }}>
      <h5>A DIGITAL WAY TO SHOWCASE, TRADE AND CHAT WITH OTHER COLLECTORS</h5>
      <h1>PSA 10</h1>
      <Button>Start your search</Button>
      <hr />
      <div style={{ display: "flex", position: "absolute", right: "50%", padding: "10px 50px 20px" }}>
        <img id="left" width="500" height="600" src="https://cdn.shopify.com/s/files/1/1715/6019/products/TyranitarVFA155_500x.jpg?v=1618245446" />
      </div>
      <div style={{ display: "inline-block", textAlign: "end", width: "65%", height: "50%" }}>
        <h1 style={{ fontSize: "35px" }}>The Collectors Network&reg;</h1>
        <br />
        <h4>Collector</h4>
        <p>Marc Price</p>
        <br />
        <p>Available for Trade</p>
        <Box style={{ width: 200, height: 100, textAlign: 'center', display: "inline-block", position: "relative", border: '1px solid #CDCDCD', borderRadius: '10px', margin: '10px' }}>
          <h6 style={{ margin: '5px' }}>Battle Styles Set</h6>
          <h1>Tyranitar V</h1>
        </Box>
        <br />
        <Button variant="contained" onClick={() => navigate("login")}>View Collection</Button>
      </div>
      <div>

        <Box sx={{ width: 900, height: 400, display: "inline-block", backgroundColor: "#f5f3f2", margin: '300px' }}>
          <h3>Popular</h3>
          <h1>Collectors</h1>
          <Stack direction="row" spacing={2}>
            <Card sx={{ width: 125, height: 150, borderRadius: '10px', margin: '50px' }}>
              <CardContent>
                <EmojiEventsOutlinedIcon />
                <hr />
                <Avatar alt="Edd Harris" src="https://i.pinimg.com/originals/94/d9/35/94d935055a035dea7d32cc10ff14874b.jpg" />
                <br />
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Edd Harris
                </Typography>
                <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                  3000 Items
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ width: 125, height: 150, borderRadius: '10px', margin: '50px' }}>
              <CardContent>
                <hr />
                <Avatar alt="Amanda Jones" src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZSUyMHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
                <br />
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Amanda Jones
                </Typography>
                <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                  2550 Items
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ width: 125, height: 150, borderRadius: '10px', margin: '50px' }}>
              <CardContent>
                <hr />
                <Avatar alt="Marlee Kupal" src="https://images.unsplash.com/photo-1508184964240-ee96bb9677a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhY2UlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                <br />
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Marlee Kupal
                </Typography>
                <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                  2000 Items
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ width: 125, height: 150, borderRadius: '10px', margin: '50px' }}>
              <CardContent>
                <hr />
                <Avatar alt="Payton Kunde" src="https://media.istockphoto.com/photos/new-york-city-mind-state-concept-image-picture-id926810300?b=1&k=20&m=926810300&s=170667a&w=0&h=avbxokwIemrvD5RrCz3TzEktVzO_ShJC6gXzMh0Oj7o=" />
                <br />
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Payton Kunde
                </Typography>
                <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                  1600 Items
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ width: 125, height: 150, borderRadius: '10px', margin: '50px' }}>
              <CardContent>
                <hr />
                <Avatar alt="Payton Buckridge" src="https://media.istockphoto.com/photos/portrait-of-a-senior-man-in-dark-background-picture-id519532628?b=1&k=20&m=519532628&s=170667a&w=0&h=7sxobMpEnPSUAEf0mKxt62wVxd2hYP26Wo6EKmQPcUY=" />
                <br />
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Payton Buckridge
                </Typography>
                <Typography sx={{ mb: .5, fontSize: 9 }} color="text.secondary">
                  1000 Items
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
        <hr />
      </div>
      <div style={{ display: "table", position: 'absolute', margin: '100px', textAlign: 'start', width: 400, height: 400 }}>
        <p>THE PANDEMIC DOESN'T MEAN YOU HAVE TO STOP TRADING</p>
        <h1>Collect and trade physical collections digitally</h1>
        <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Sign up</Button>
      </div>
      <div style={{ display: "flex", position: "relative", left: "40%", padding: "10px 50px 20px" }}>
        <img id="left" position="end" width="575" height="400" src="https://ca-times.brightspotcdn.com/dims4/default/8b65301/2147483647/strip/true/crop/6720x4480+0+0/resize/1486x991!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F1c%2Fbc%2F81deae894c2aad3ca867bb9b102f%2Fla-photos-1staff-820771-fi-0806-pandemic-collectibles-cmh-01.JPG" />
      </div>
      <div>
      </div>
    </div>
  );
};

export default LandingPage;