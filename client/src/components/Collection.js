import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import CollectionComments from "./CollectionComments";

const Collection = () => {
  const id = useParams()
  const [collectionCards, setCollectionCards] = useState([])

  useEffect(() => {
    getCollectionCards();
  }, [])

  const getCollectionCards = async () => {
    let res = await axios.get("/api/collections")
    setCollectionCards(res.data)
    console.log(res.data)
  }

  const deleteCollection = () =>{

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


  return (
    <div>
      <h1>Collection Name</h1>
      <h3>Category</h3>
      <p>Description</p>
      <p>Likes</p>
      {renderCollectionCards()}
      <Link to={`/collections/${id}/edit`}>Edit Collection</Link>
      <button onClick={() => deleteCollection(id)}>Delete this Collection</button>
      {/* <CollectionComments /> */}
    </div>
  )
}

export default Collection;