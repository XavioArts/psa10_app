import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CollectionCard from "../components/CollectionCard";
import CollectionComments from "../components/CollectionComments";


const UserCollectView = () => {

  const params = useParams()
  const [collectionCards, setCollectionCards] = useState(null)
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    getCollectionCards();
  }, [])

  const getCollectionCards = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    console.log(res.data)
    console.log(res.data.cards)
    setCollectionCards(res.data.cards)
    setCollection(res.data)
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
              <Grid item xs={2} sm={4} md={4}>
                <CollectionCard key={cc.id} {...cc} />
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
    <div>
      <Link to={`/community/users/${params.user_id}/profile/collections`} >Back to Collections</Link>
      <h1>{collection.name}</h1>
      <h3>Category: {collection.category}</h3>
      <p>Description: {collection.description}</p>
      <p>Likes: {collection.likes}</p>
      {renderCollectionCards()}
      <CollectionComments />
    </div>
  )
}

export default UserCollectView;