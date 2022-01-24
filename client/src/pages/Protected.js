import { Alert, LinearProgress, Paper } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { DateTime } from "luxon";
import styled from "styled-components";
// import EditCard from "../components/EditCard";

const Protected = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    userInfo();
  }, []);

  const userInfo = async () => {
    if (user_id) {
      setLoading(false);
      try {
        let res = await axios.get(`/api/users/${user_id}`);
        setUser(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    }
    setLoading(auth.id ? false : true)
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <p>Loading..</p>
        <div style={{ width: "75vw" }}>
          <LinearProgress />
        </div>
      </div>
    );
  }

    const coverImage = () => {
      if (user) {
        console.log(user.cover_image);
        return user.cover_image;
      }
      // console.log(auth.cover_image);
      return auth.cover_image;
    };

  const Cover = styled.div`
    background-image: url(${(props) => props.image}),
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
    overflow: hidden;
  `;

  return (
    <div>
      {!auth.image && !user && (
        <Alert severity="error">
          Finish building your profile.{" "}
          <button onClick={() => navigate(`/users/${auth.id}/edit`)}>
            Edit Profile
          </button>
        </Alert>
      )}
      <div className="pageContainer">
        <Cover image={coverImage()} className="profileInfo">
          {!user && (
            <Paper className="profileInfoTextBox" elevation={3}>
              {!user && auth.image && (
                <img
                  src={auth.image}
                  alt="profile image"
                  className="circletag"
                />
              )}
              {user && (
                <img
                  src={user.image}
                  alt="profile image"
                  className="circletag"
                />
              )}
              {!user && (
                <>
                  <h2>{auth.nickname}</h2>
                  <p className="profileText">{auth.email}</p>
                  <p className="profileText">{auth.about}</p>
                  <p className="profileTextDate"> Member Since {DateTime.fromISO(auth.created_at).toFormat("LLLL yyyy")}</p>
                </>
              )}
            </Paper>
          )}
          {user && (
            <Paper className="profileInfoTextBox">
              <h2>{user.nickname}</h2>
              <p className="profileTextDate">
                Joined {DateTime.fromISO(user.created_at).toFormat("LLLL yyyy")}
              </p>
              <p className="profileText">{user.email}</p>
              <p className="profileText">{user.about}</p>
            </Paper>
          )}
            <Link className="profileButton" to={`/users/${auth.id}/edit`}>Edit Profile</Link>
            <Link className="profileButton" to={"/profile/cover_image"}>Edit Cover Image</Link>
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
              <Link
                className="profileNavText"
                to={`/community/users/${user_id}/profile`} >
                Overview
              </Link>
              <Link
                className="profileNavText"
                to={`/community/users/${user_id}/profile/collections`} >
                Collections
              </Link>
              <Link
                className="profileNavText"
                to={`/community/users/${user_id}/profile/sets`}>
                Sets
              </Link>
              <Link
                className="profileNavText"
                to={`/community/users/${user_id}/profile/showcases`} >
                Showcases
              </Link>
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
