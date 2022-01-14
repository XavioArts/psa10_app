import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Grid } from '@mui/material';
import CollectionComments from '../components/CollectionComments';
import { Link } from 'react-router-dom';

const Collections = () => {
  // const auth = useContext(AuthContext);

  const [collections, setCollections] = useState([])
  const [collectionCards, setCollectionCards] = useState([])

  useEffect(() => {
    getCollections();
    getCollectionCards();
  }, [])

  const getCollections = async () => {
    let res = await axios.get("/api/collections");
    setCollections(res.data);
    console.log(res.data)
  }

  const getCollectionCards = async () => {
    let res = await axios.get("/api/cards")
    setCollectionCards(res.data)
    console.log(res.data)
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
      <a href = "/collection/new">Add a Collection</a>
      <hr />
      {renderCollectionCards()}
      {/* {JSON.stringify(collections)}
      {JSON.stringify(collectionCards)} */}
      <hr />
      {/* <CollectionComments /> */}
    </div>
  )
};

export default Collections;