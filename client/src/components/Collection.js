import { Button, Container, Grid } from "@mui/material";
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
    if (!collectionCards && !collection) {
      return <p>Loading cards</p>
    }
    return (
      <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
        <div>
          <h1 style={{ textAlign: "center" }}>{collection.name}</h1>
          <Container>
            <CollectionLike collection={collection} setCollection={setCollection} />
            <p>Description: {collection.description}</p>
          </Container>
          {auth.id === collection.user_id &&
            <div style={{ display: "flex", justifyContent: "right" }}>
              <EditCollection {...collection} setEditedCollection={setEditedCollection}/>
              <DeleteCollection {...collection} deleteCollection={deleteCollection}/>
            </div>
          }
        </div>
        {auth.id === collection.user_id && <AddCard collectionId={params.id} addCard={addCard} />}
        {renderCollectionCards()}
        <hr />
        <CollectionComments collectionId={collection.user_id} />
      </div>)}
    </>
  )
}

export default Collection;