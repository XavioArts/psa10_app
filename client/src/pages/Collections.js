import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import EditCollection from '../components/EditCollection';
import { FlexColumnDiv, PageDiv } from '../components/Styles';

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
          <h1><Link to={`/profile/collections/${c.id}`}>Collection Name: {c.name}</Link></h1>
          <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {c.cards.slice( 0,3).map((cc) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={cc.id}>
                  <CollectionCard key={cc.id} card={{...cc}} show={false} personal={false} />
                </Grid>
              )
            })}
          </Grid>
        </div>
      )
    })
  }


  return (
    <PageDiv>
      <a href = "/collection/new">Add a Collection</a>
      <hr />
      <FlexColumnDiv>
      {renderCollectionCards()}
      </FlexColumnDiv>
      {/* {JSON.stringify(collections)} */}
      <hr />
      {/* <CollectionComments /> */}
    </PageDiv>
  )
};

export default Collections;