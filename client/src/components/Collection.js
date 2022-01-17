// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CollectionCard from "./CollectionCard";

// const Collection = (props) => {
//   const { collection_id } = props
//   const [collectionCards, setCollectionCards] = useState([])

//   useEffect(() => {
//     getCollectionCards();
//   }, [])

//   const getCollectionCards = async () => {
//     let res = await axios.get("/api/cards")
//     setCollectionCards(res.data)
//     console.log(res.data)
//   }

//   const renderCollectionCards = () => {
//     if (!collectionCards) {
//       return <p>Loading cards</p>
//     }
//     return (
//       <div>
//         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//           {collectionCards.map(cc => {
//             return (
//               <Grid item xs={2} sm={4} md={4}>
//                 <CollectionCard key={cc.id} {...cc} />
//               </Grid>
//             )
//           })}
//         </Grid>
//       </div>
//     )
//   }


//   return (
//     <div>
//       {renderCollectionCards()}
//       <Link to={`/collections/${props.collection_id}/edit`}>Edit Collection</Link>
//       <button onClick={() => deletePokemon(id)}>Delete this Collection</button>
//     </div>
//   )
// }

// export default Collection;