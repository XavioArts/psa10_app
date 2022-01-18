import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const UserCollections = () => {

    const {user_id} = useParams();
  const [collections, setCollections] = useState([])
  console.log(collections)

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    let res = await axios.get(`/api/users/${user_id}/collections`);
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
          <h1><Link to={`/community/users/${user_id}/profile/collections/${c.id}`}>Collection Name: {c.name}</Link></h1>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {c.cards.slice( 0,3).map((cc) => {
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
      <hr />
      {renderCollectionCards()}
      <hr />
    </div>
  )
};

export default UserCollections;