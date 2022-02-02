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
  console.log(collection)

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
    console.log(collectionCards)
    console.log(collection)
    if (collectionCards.length === 0) {
      return <p style={{ textAlign: "center" }}>You don't have any collectibles, start adding some!</p>
    }
    return (
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ display:'flex', justifyContent:'center' }}
        >
          {collectionCards.map(cc => {
            return (
              <Grid item xs="auto" sm="auto" md="auto">
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
        <div >
          {auth.id === collection.user_id &&
            <>
              <div style={{ display: "flex", justifyContent: "right", margin: "20px" }}>
                <EditCollection {...collection} setEditedCollection={setEditedCollection} />
                <DeleteCollection {...collection} deleteCollection={deleteCollection} />
              </div>
            </>
          }
          <Container>
            <h1 style={{ textAlign: "center", textTransform: 'capitalize' }}>{collection.name}</h1>
            <CollectionLike collection={collection} setCollection={setCollection} />
            <p><b>Description: </b>{collection.description}</p>
          </Container>
        </div>
        <Box
          style={{
            backgroundColor: "#C4C4C4",
            width: "80%",
            margin: "auto",
            paddingTop: "10px",
            paddingBottom: "40px"
          }}
        >
          {auth.id === collection.user_id &&
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
              <AddCard collectionId={params.id} addCard={addCard} />
            </div>
          }
          {renderCollectionCards()}
        </Box>
        <hr />
        <Container>
          <CollectionComments collectionId={collection.user_id} />
        </Container>
      </div>)}
    </>
  )
}

const collectionBox = {
  bgcolor: "#90BDEE"
}

export default Collection;