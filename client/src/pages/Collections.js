import { Divider } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CollectionCard from '../components/CollectionCard';
import { AuthContext } from '../providers/AuthProvider';

const Collections = () => {

  const auth = useContext(AuthContext);

  const [collections, setCollections] = useState([])
  const [collectionCards, setCollectionCards] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    getCollections();
    getCollectionCards();
    userInfo();
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

  const userInfo = async () => {
    let res = await axios.get(`/api/users/${auth.id}`)
    setUser(res.data)
    console.log(res.data)
    console.log(auth.id)
  }

  // const renderCollectionCards = () => {
  //   if(!collectionCards) {
  //     return <p>Loading cards</p>
  //   }
  //   return(
  //     <div>
  //       <h3>Collection Name</h3>
  //       <div style={{ height:250, width: "100%"}}>
  //         {collectionCards.map(cc => {
  //           return (
  //             <DataGrid 
  //             columns={[{ field: nickname }]}
  //             rows = { [<CollectionCard />] }>
  //             </DataGrid>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div>
        {auth.image && <img src={auth.image} height="200px" />}
        <h3>{auth.nickname}</h3>
        <p>Joined: {user.created_at}</p>
        <p>{auth.email}</p>
        <p>{auth.about}</p>
      </div>
      <Divider />
      {/* a second NavBar here for overview, collection, sets, and showcases */}
      <div>
        <a href="/dashboard">Overview</a>
        <a href="/collections">Collections</a>
        <a href="/sets">Sets</a>
        <a href="/showcases">Showcases</a>
      </div>
      <Divider />
      {/* {renderCollectionCards()} */}
      {/* <Outlet /> */}
      {JSON.stringify(collections)}
      {JSON.stringify(collectionCards)}
    </div>
  )
};

export default Collections;