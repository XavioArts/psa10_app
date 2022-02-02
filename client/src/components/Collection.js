import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import AddCard from "./AddCard";
import CollectionCard from "./CollectionCard";
import CollectionComments from "./CollectionComments";
import CollectionLike from "./CollectionLike";
import DeleteCollection from "./DeleteCollection";
import EditCollection from "./EditCollection";

const Collection = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();
  const [collectionCards, setCollectionCards] = useState(null);
  const [collection, setCollection] = useState(null);
  const [editedCollection, setEditedCollection] = useState(false);

  useEffect(() => {
    getCollectionCards();
    setEditedCollection(false)
  }, [editedCollection])

  const getCollectionCards = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    setCollectionCards(res.data.cards)
    setCollection(res.data)
  }

  const deleteCollection = async () => {
    await axios.delete(`/api/collections/${params.id}`)
    navigate("/profile/collections")
  }

  const addCard = (card) => {
    setCollectionCards([...collectionCards, card]);
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
              <Grid item xs={12} sm={6} md={4} lg={3} style={{ paddingBottom: "40px" }}>
                <CollectionCard key={cc.id} card={{ ...cc }} show={true} personal={true} size="medium" />
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }


  return (
    <>
      {collection && (<div style={{ padding: "20px" }}>
        <div>
          {auth.id === collection.user_id &&

            <div style={{ display: "flex", justifyContent: "right", margin: "20px" }}>
              <EditCollection {...collection} setEditedCollection={setEditedCollection} />
              <DeleteCollection {...collection} deleteCollection={deleteCollection} />
            </div>

          }
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
          {auth.id === collection.user_id &&
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
              <AddCard collectionId={params.id} addCard={addCard} />
            </div>
          }
          {renderCollectionCards()}
          <div style={{ padding: "20px 50px 50px 50px", backgroundColor: "#fcfcfc", borderRadius: "40px" }}>
            <CollectionComments collectionId={collection.user_id} />
          </div>
        </Box>
      </div>)}
    </>
  )
}


export default Collection;