import { Alert, Paper, createTheme, ThemeProvider, Button, Modal } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, withRouter, useNavigate, Outlet, useParams, useLocation, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { DateTime } from "luxon";
import styled from "styled-components";
import UserContactIcons from "../components/UserContactIcons";
import { Box } from "@mui/system";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Welcome from "./Welcome";
import { theme } from "../components/Styles";



const Protected = () => {
    const {state} = useLocation();
    const { user_id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [open, setOpen] = useState(state ? true : false);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const handleClose = () => setOpen(false);

  useEffect(() => {
    userInfo();
    setLoading(auth.id ? false : true)
  }, []);

  const handleWelcomeModal = () => {
    if (state) {
      return (
        <Modal
        hideBackdrop
          open={open}
          onClose={handleClose}
        >
          <div><Welcome handleClose={handleClose}/></div>
        </Modal>
      )
    }
  }


  const normalizeStats = (cardStats, collectionStats) => {
      function add(accumulator, a) {
        return accumulator + a;
      }
      let cardLikes = cardStats.map((c)=>c.card_likes).reduce(add, 0) 
      let collectionLikes = collectionStats.map((c)=>c.collection_likes).reduce(add, 0)
      let totalCards = cardStats.map((c)=>c.card_id).length
      let gradedCards = cardStats.filter((c)=>c.graded == true).length
      let availableCards = cardStats.filter((c)=>c.available == true).length 
      const userStats = {cardLikes: cardLikes, collectionLikes: collectionLikes, totalCards: totalCards, gradedCards: gradedCards, availableCards: availableCards}
      setStats(userStats) 
  }

 const userInfo = async () => {
    if (user_id) {
      setLoading(false);
      try {
        let res = await axios.get(`/api/users/${user_id}`);
        setUser(res.data);
        let res_card_stats = await axios.get(`/api/users/${user_id}/card_stats`);
        let res_col_stats = await axios.get(`/api/users/${user_id}/collection_stats`);
        normalizeStats(res_card_stats.data, res_col_stats.data)
        setLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    } else {
    let res_card_stats = await axios.get(`/api/users/${auth.id}/card_stats`);
    let res_col_stats = await axios.get(`/api/users/${auth.id}/collection_stats`);
    normalizeStats(res_card_stats.data, res_col_stats.data)}
  };


    const coverImage = () => {
      if (user) {
        return user.cover_image;
      }
      return auth.cover_image;
    };

  const Cover = styled.div`
    background-image: url(${(props) => props.image}),
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    overflow: hidden;
  `;


  return (
    <ThemeProvider theme={theme} >
      <div>
        {handleWelcomeModal()}
        <div>
        <div >
          <Cover image={coverImage()} className="profileInfo">
          <div className="flexLeftStats">
            {!user && (
                <div className="leftRight">
              <Paper className="profileInfoTextBox" elevation={7}>
                {!user && auth.image && (
                  <img
                    src={auth.image}
                    alt="profile image"
                    className="circletag"
                  />
                )}
              {!user && (
                <>
                  <h2>{auth.nickname}</h2>
                  <p onClick={() => window.location = `mailto:${auth.email}`} className="profileEmailText"><EmailIcon style={{margin: "2px", position: "relative", top:"6px", fontSize:"medium"}}/> {auth.email}</p>
                  <p className="profileText">{auth.about}</p>
                  <UserContactIcons {...auth} />
                  <p className="profileTextDate"> Member Since {DateTime.fromISO(auth.created_at).toFormat("LLLL yyyy")}</p>
                </>
              )}
            </Paper>

              </div>
            )}
            {user && (
              <Paper className="profileInfoTextBox" elevation={3}>
                {user && (
                  <img
                    src={user.image}
                    alt="profile image"
                    className="circletag"
                  />
                )}
                <h2>{user.nickname}</h2>
                <p className="profileTextDate">Member Since {DateTime.fromISO(user.created_at).toFormat("LLLL yyyy")}</p>
                <p onClick={() => window.location = `mailto:${auth.email}`} className="profileEmailText"><EmailIcon style={{margin: "2px", position: "relative", top:"6px", fontSize:"medium"}}/> {user.email}</p>
                <p className="profileText">{user.about}</p>
                <UserContactIcons {...user} />
              </Paper>
            )}
            <div className="profileStats">
            <Box >
                  <h3>STATS</h3>
                  <h4>{stats.collectionLikes} collection likes</h4>
                  <h4>{stats.cardLikes} card likes</h4>  
                  <h4>{stats.totalCards} total cards</h4> 
                  <h4>{stats.gradedCards} graded cards</h4>
                  <h4>{stats.availableCards} cards for trade</h4>
                </Box>
            </div>
            </div>
            {!user && (
                <div className="flexEnd">
                        <div >
                        <Link className="profileButton" to={`/users/${auth.id}/edit`}> <AccountCircleIcon style={{margin: "2px", position: "relative", top:"8px"}}/> Edit Profile</Link>
                        <Link className="profileButton" to={"/profile/cover_image"}><AddAPhotoIcon style={{margin: "2px", position: "relative", top:"7px"}}/> Edit Cover Image</Link>
                        </div>
                        </div>)}
          </Cover>
            {!user && (
              <>
              <div className="profileNavContainer">
                <NavLink className="profileNavText" to="/profile/overview" activeClassName="active">Overview</NavLink>
                <NavLink className="profileNavText" to="/profile/collections" activeClassName="active">Collections</NavLink>
                <NavLink className="profileNavText" to="/profile/sets" activeClassName="active">Sets</NavLink>
                <NavLink className="profileNavText" to="/profile/showcases" activeClassName="active">Showcases</NavLink>
              </div>
                 <hr style={{marginTop: '30px'}}/>
                </>
            )}
            {user && (
              <>
              <div className="profileNavContainer">
                <NavLink className="profileNavText" to={`/community/users/${user_id}/profile/overview`} activeClassName="active" >Overview</NavLink>
                <NavLink className="profileNavText" to={`/community/users/${user_id}/profile/collections`} activeClassName="active">Collections</NavLink>
                <NavLink className="profileNavText" to={`/community/users/${user_id}/profile/sets`} activeClassName="active">Sets</NavLink>
                <NavLink className="profileNavText" to={`/community/users/${user_id}/profile/showcases`} activeClassName="active">Showcases</NavLink>
              </div>
                <hr style={{marginTop: '30px'}}/>
                </>
            )}
          <Outlet />
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    overflow: "hidden",
  },
};

export default Protected;
