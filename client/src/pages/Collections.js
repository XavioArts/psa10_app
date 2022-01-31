import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { FlexColumnDiv, PageDiv } from '../components/Styles';
import CollectionNew from './CollectionNew';

const Collections = () => {
  const [collections, setCollections] = useState(null)
  console.log(collections)

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    let res = await axios.get("/api/collections");
    setCollections(res.data);
  }

  const renderCollectionCards = () => {
    if (!collections) {
      return <p>Loading collections</p>
    }
    return collections.map((c, index) => {
      return (
        <>
          <div key={index}>
            <h1 style={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: "bold" }}><Link to={`/profile/collections/${c.id}`}>{c.name}</Link></h1>
            {c.cards.length > 0 &&
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {c.cards.slice(0, 4).map((cc) => {
                  return (
                    <Grid item xs="auto" sm="auto" md="auto" key={cc.id}>
                      <CollectionCard key={cc.id} card={{ ...cc }} show={true} personal={false} size="small" />
                    </Grid>
                  )
                })}
              </Grid>}
            <hr />
          </div>
        </>
      )
    })
  }


  return (
    <PageDiv>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <CollectionNew />
      </div>
      <FlexColumnDiv>
        {renderCollectionCards()}
      </FlexColumnDiv>
    </PageDiv>
  )
};

export default Collections;