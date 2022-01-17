import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Grid } from '@mui/material';

const Collections = () => {

  const [collections, setCollections] = useState([])
  console.log(collections)

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    let res = await axios.get("/api/collections");
    setCollections(res.data);
    console.log(res.data)
  }

  const renderCollectionCards = () => {
    if (!collections) {
      return <p>Loading collections</p>
    }
    return collections.map((c,index) => {
      return (
        <div key={index}>
          <h1>Collection Name: {c.name}</h1>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {c.cards.map((cc) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={cc.id}>
                  <CollectionCard {...cc} />
                </Grid>
              )
            })}
          </Grid>
        </div>
      )
    })
  }


  return (
    <div>
      <a href = "/collection/new">Add a Collection</a>
      <hr />
      {renderCollectionCards()}
      {JSON.stringify(collections)}
      <hr />
      {/* <CollectionComments /> */}
    </div>
  )
};

export default Collections;