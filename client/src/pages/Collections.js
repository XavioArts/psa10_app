import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import CollectionCard from '../components/CollectionCard';

const Collections = () => {

  const auth = useContext(AuthContext);

  const [collections, setCollections] = useState([])
  const [collectionCards, setCollectionCards] = useState([])

  useEffect(() => {
    getCollections();
    getCollectionCards();
  },[])

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
      <CollectionCard />
      {/* {renderCollectionCards()} */}
      {JSON.stringify(collections)}
      {JSON.stringify(collectionCards)}
    </div>
  )
};

export default Collections;