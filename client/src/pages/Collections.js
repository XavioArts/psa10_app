import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { FlexColumnDiv, PageDiv } from '../components/Styles';
import CollectionNew from './CollectionNew';
import { useNavigate } from "react-router";


const Collections = () => {
  const [collections, setCollections] = useState(null)
  const navigate = useNavigate();

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
          <div className='flexLeft'>
          <h3 style={{ marginRight: '30px'}}><Link style={{ textDecoration: 'none', color: '#272830'}} className='collectionTitle' to={`/profile/collections/${c.id}`}> {c.name}</Link></h3>
          <Button  onClick={()=>navigate(`/profile/collections/${c.id}`)} style={{borderRadius: "40px", margin: '10px 0px' }}  component="span">View Full Collection
          </Button>
          </div>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {c.cards.slice(0, 5).map((cc) => {
              return (
                <Grid item xs="auto" sm="auto" md="auto" key={cc.id}>
                  <CollectionCard key={cc.id} card={{ ...cc }} show={true} personal={true} size="small" />
                </Grid>
              )
            })}
          </Grid>
          <hr style={{marginTop: '30px'}}/>
        </div>
        </>
      )
    })
  }


  return (
    <PageDiv>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CollectionNew />
      </div>
      <FlexColumnDiv>
        {renderCollectionCards()}
      </FlexColumnDiv>
    </PageDiv>
  )
};

export default Collections;