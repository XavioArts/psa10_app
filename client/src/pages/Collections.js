import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { FlexColumnDiv, PageDiv } from '../components/Styles';
import styled from "styled-components"

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
    return collections.map((c, index) => {
      return (
        <div key={index}>
          <h1 style={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: "bold" }}><Link to={`/profile/collections/${c.id}`}>{c.name}</Link></h1>
          <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {c.cards.slice(0, 4).map((cc) => {
              return (
                <Grid item xs="auto" sm="auto" md="auto" key={cc.id}>
                  <CollectionCard key={cc.id} card={{ ...cc }} show={true} personal={false} size="small" />
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
      {/* flexbox */}
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button className="link-button"><Link to="/collection/new" className="link">Add a Collection</Link></button>
      </div>
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