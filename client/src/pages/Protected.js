import { Alert, LinearProgress, Paper } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { DateTime } from "luxon";
import styled from "styled-components";
import UserContactIcons from "../components/UserContactIcons";
import { Box } from "@mui/system";

const Protected = () => {
    const { user_id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

  useEffect(() => {
    userInfo();
    setLoading(auth.id ? false : true)
  }, []);


//   const normalizeData = (res_showcases, res_cards) => {
//     let showcaseCards = res_showcases.map((s) => {
//       let cards_array = s.cards
//       let cardsOfShowcase = res_cards.filter((c) => {
//         for (let i = 0; i < cards_array.length; i++) {
//           if (cards_array[i] == c.id) {
//             return true
//           }
//         }
//       })
//       return { key: s.showcase_id, id: s.showcase_id, name: s.name, description: s.description, cards: cardsOfShowcase }
//     })
//     setShowcases(showcaseCards)
//   }

const normalizeStats = (cardStats, collectionStats) => {
    function add(accumulator, a) {
      return accumulator + a;
    }
    console.log("userCard:", cardStats)
    let cardLikes = cardStats.map((c)=>c.card_likes).reduce(add, 0) 
    console.log(cardLikes)
    let collectionLikes = collectionStats.map((c)=>c.collection_likes).reduce(add, 0)
    console.log(collectionLikes)
    let totalCards = cardStats.map((c)=>c.card_id).length
    console.log(totalCards)
    let gradedCards = cardStats.filter((c)=>c.graded == true).length
    console.log(gradedCards)
    let availableCards = cardStats.filter((c)=>c.available == true).length 
    console.log(availableCards)
    const userStats = {cardLikes: cardLikes, collectionLikes: collectionLikes, totalCards: totalCards, gradedCards: gradedCards, availableCards: availableCards}
    setStats(userStats) 
}


 const userInfo = async () => {
    if (user_id) {
      setLoading(false);
      try {
        let res = await axios.get(`/api/users/${user_id}`);
        setUser(res.data);
        console.log(res.data);
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
    <div>
      {(!auth.image || !auth.first_name || !auth.last_name || !auth.nickname || !auth.email || !auth.about) && !user && (
        <Alert severity="error">
          Finish building your profile.{" "}
          <button onClick={() => navigate(`/users/${auth.id}/edit`)}>
            Edit Profile
          </button>
        </Alert>
      )}
      <div >
        <Cover image={coverImage()} className="profileInfo">
        <div className="flexLeft">
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
                  <p className="profileText">{auth.email}</p>
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
              <p className="profileText">{user.email}</p>
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
                      <Link className="profileButton" to={`/users/${auth.id}/edit`}>Edit Profile</Link>
                      <Link className="profileButton" to={"/profile/cover_image"}>Edit Cover Image</Link>
                      </div>
                      </div>)}
        </Cover>

        <div className="profileNavContainer">
          {!user && (
            <div className="profileNavContainer">
              <Link className="profileNavText" to={"/profile/overview"}> Overview</Link>
              <Link className="profileNavText" to={"/profile/collections"}> Collections </Link>
              <Link className="profileNavText" to={"/profile/sets"}> Sets </Link>
              <Link className="profileNavText" to={"/profile/showcases"}> Showcases </Link>
            </div>
          )}
          {user && (
            <div className="profileNavContainer">
              <Link className="profileNavText" to={`/community/users/${user_id}/profile`} >Overview</Link>
              <Link className="profileNavText" to={`/community/users/${user_id}/profile/collections`} >Collections</Link>
              <Link className="profileNavText" to={`/community/users/${user_id}/profile/sets`}>Sets</Link>
              <Link className="profileNavText" to={`/community/users/${user_id}/profile/showcases`} >Showcases</Link>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    </div>
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
