import { Grid, Container, Paper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionCard from "../components/CollectionCard";
import CollectionComments from "../components/CollectionComments";
import CollectionLike from "../components/CollectionLike";
import { AuthContext } from "../providers/AuthProvider";


const UserCollectView = () => {

  const auth = useContext(AuthContext);
  const params = useParams()
  const [collectionCards, setCollectionCards] = useState(null)
  const [collection, setCollection] = useState(null)
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCollectionCards();
  }, [])

  const getCollectionCards = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    let user_res = await axios.get(`/api/users/${params.user_id}`);
    setUser(user_res.data);
    console.log(res.data)
    console.log(res.data.cards)
    setCollectionCards(res.data.cards)
    setCollection(res.data)
  }

  const renderCollectionCards = () => {
    if (collectionCards.length === 0) {
      return <p style={{ textAlign: "center" }}>You don't have any collectibles, start adding some!</p>
    }
    return (
      <div>
        <Grid
          container
          spacing={1}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        >
          {collectionCards.map(cc => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} style={{paddingBottom: "20px"}}>
                <CollectionCard key={cc.id} card={{...cc}} show={true} personal={false} user={user} size="medium" />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }

  if (!collection) {
    return <p>Loading cards</p>
  }

  return (
    <>
      {collection && (<div style={{ padding: "20px" }}>
        <div>
          <Box
          style={{
            width: "50%",
            margin: "auto",
          }}
        >
            <h1 style={{ textAlign: "center", textTransform: 'capitalize' }}><b>{collection.name}</b></h1>
            <p>{collection.description}</p>
            <CollectionLike collection={collection} setCollection={setCollection} />
          </Box>
        </div>
        <Box
          style={{
            width: "85%",
            margin: "auto",
            paddingTop: "10px",
            paddingBottom: "30px",
          }}
        >
          {renderCollectionCards()}
        </Box>
        <hr />
        <Container style ={{ padding: "20px 50px 50px 50px", backgroundColor: "#f7f7f7", borderRadius: "40px"}}>
          <CollectionComments collectionId={collection.user_id} />
        </Container>
      </div>)}
    </>
  )
}

export default UserCollectView;