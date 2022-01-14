import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CollectionComments = () => {
  const [collectionComments, setCollectionComments] = useState();
  const {collection} = useParams();
  console.log(collection)
  console.log(collectionComments)

  useEffect = (() => {
    getCollectionComments()
  }, [])

  const getCollectionComments = async (collection) => {
    let res = await axios.get(`api/collections/${collection.id}/collection_comments`)
    setCollectionComments(res.data)
    console.log(res.data)
    console.log(collection.id)
  }

  const renderCollectionComments = () => {
    return collectionComments.map((comment) => {
      return (
        <div>
          <p>{comment.content}</p>
        </div>
      )
    })
  }

  return (
    <div>
      <h2>Comments:</h2>
      {renderCollectionComments()};
    </div>
  )
}

export default CollectionComments;