import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { Button, Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useNavigate } from "react-router";

const UserCollections = (props) => {

    const {user_id} = useParams();
  const [collections, setCollections] = useState(null)
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log(collections)
  console.log(props.user)

  useEffect(() => {
    getCollections();
  }, [])

  const getCollections = async () => {
    let res = await axios.get(`/api/users/${user_id}/collections`);
    let user_res = await axios.get(`/api/users/${user_id}`);
    setCollections(res.data);
    setUser(user_res.data);
    console.log(res.data)
  }

  const renderCollectionCards = () => {
    if (!collections) {
      return <p>Loading collections</p>
    }
    return collections.map((c,index) => {
      return (
        <div key={index}>
          <div className='flexLeft'>
          <h3 style={{ marginRight: '30px', textTransform: 'capitalize'}} ><Link style={{ textDecoration: 'none', color: '#272830'}} className='collectionTitle' to={`/community/users/${user_id}/profile/collections/${c.id}`}> {c.name}</Link></h3>
          <Button  onClick={()=>navigate(`/community/users/${user_id}/profile/collections/${c.id}`)} style={{borderRadius: "40px", margin: '10px 0px' }}  component="span">View Full Collection
          </Button>
          </div>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {c.cards.slice( 0,5).map((cc) => {
              return (
                <Grid item xs="auto" sm="auto" md="auto" key={cc.id}>
                  <CollectionCard key={cc.id} card={{...cc}} show={false} personal={false} user={user} size="small" />
                </Grid>
              )
            })}
          </Grid>
          <hr style={{marginTop: '30px'}}/>

        </div>
      )
    })
  }


  return (
      <Box sx={{width: "80vw", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "auto", padding: "20px"}} >
    <div>
      {renderCollectionCards()}
    </div>
      </Box>
  )
};

export default UserCollections;