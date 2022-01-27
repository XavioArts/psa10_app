import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddCard from "./AddCard";
import CollectionCard from "./CollectionCard";
import CollectionComments from "./CollectionComments";
import { FlexColumnDiv } from "./Styles";

const Collection = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [collectionCards, setCollectionCards] = useState(null)
  const [collection, setCollection] = useState([])

  useEffect(() => {
    getCollectionCards();
  }, [])

  const getCollectionCards = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    setCollectionCards(res.data.cards)
    setCollection(res.data)
  }

  const deleteCollection = async (id) => {
    await axios.delete(`/api/collections/${params.id}`)
    setCollectionCards(collectionCards.filter((cc) => cc.id !== id));
    navigate("/profile/collections")
  }

  const addCard = (card) => {
    setCollectionCards([...collectionCards, card]);
  }

  const renderCollectionCards = () => {
    if (!collectionCards) {
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
    <div style={{padding: "20px"}} >
      <button className="link-button"><Link to={`/profile/collections`} style={{ textDecoration: "none" }}>Back to Collections</Link></button>
      <div>
        <h1 style={{ textAlign: "center" }}>{collection.name}</h1>
        <h3>Category: {collection.category}</h3>
        <p>Description: {collection.description}</p>
        <p>Likes: {collection.likes}</p>
      </div>
      <Link to={`/profile/collections/${params.id}/edit`}>Edit Collection</Link><br />
      <button onClick={() => deleteCollection(params.id)}>Delete this Collection</button>
      <AddCard collectionId={params.id} addCard={addCard} />
      <FlexColumnDiv>
        {renderCollectionCards()}
      </FlexColumnDiv>
      <hr />
      <CollectionComments collectionId={collection.user_id} />
    </div>
  )
}

export default Collection;