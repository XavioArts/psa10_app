import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Collections = () => {

  // const auth = useContext(AuthContext);

  const [collections, setCollections] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    getCollections();
    getCards();
  },[])

  const getCollections = async () => {
    let res = await axios.get("/api/collections");
    setCollections(res.data);
    console.log(res.data)
  }

  const getCards = async () => {
    let res = await axios.get("/api/cards")
    setCards(res.data)
    console.log(res.data)
  }

  return (
    <div>
      <h1>My Collections:</h1>
      {JSON.stringify(collections)}
      {JSON.stringify(cards)}
    </div>
  )
};

export default Collections;