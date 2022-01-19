import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, dividerClasses } from "@mui/material";
import Box from '@mui/material/Box';
import { ButtonDiv } from "./Styles";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const Showcase = (props) => {
  const [showcases, setShowcases] = useState([]);
  const [primaryShowcase, setPrimaryShowcase] = useState("")
  const {id} = useParams()
  const auth = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    getShowcases();
  }, [])

  const getShowcases = async () => {
    let res_id = id ? id : auth.id
    // need to pull user showcases not just showcase number one
    try {
        let res = await axios.get(`/api/showcases/user/${res_id}`);
        // allShowcases = res.data
        console.log(res.data)
        setShowcases(res.data);
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting showcases")
    }
}

// const normalizeData = () => {
//   let showcase_ids = showcases.map((s) => s.id);
//   let showcasesUnique = [...new Set(showcase_ids)];
//   let newData = showcasesUnique.map((id) => {
//       let cards = showcases.filter((i) => i.user_id === i.card_user_id);
//       let buyersIds = buyers.map((i)=>i.buyer_id);
//       let buyersUnique = [...new Set(buyersIds)];
//       let buyerData = buyersUnique.map((id) => {
//           let buyerProducts = data.filter((i)=> i.buyer_id === id)
//           let cleanProducts = buyerProducts.map((p) => {
//               return {id: p.product_id, price: p.price, category: p.category, description: p.description};
//           })
//           return {buyer_id: buyerProducts[0].buyer_id, buyer_name: buyerProducts[0].buyer_name, 
//               max_price: buyerProducts[0].max_price, desired_cat: buyerProducts[0].desired_cat, 
//               products: cleanProducts};
//       })
//       return {id: buyers[0].id, name: buyers[0].name, email: buyers[0].email, buyers: buyerData};
//       // let cleanProducts = products.map((p) => {
//       //     return {id: p.id, price: p.price, description: p.description, category: p.category}
//       // });
//       // return {name: products[0].name, email: products[0].email, id: products[0].id, products: cleanProducts};
//   });
//   let sellerNames = newData.map((s)=>s.name)
//   // may need to add seller id here ^^^^
//   setSellers(sellerNames);
//   return newData;
// }

// const normalizeShowcases = () => {
    
//   let showcaseCards = showcases.map((s) => {
//     return { id: }

//   // setUser({key: u.id, value: u.id, text: uname, gender: u.gender, age: u.age});
//   return { key: u.id, value: u.id, text: uname, gender: u.gender, age: u.age }
// })

// choices.push({key:0, value:0, text: "New User"})
// return choices;
// };


const deleteShowcase = async (id) => {
  let res_id = id
  console.log(res_id)
  await axios.delete(`/api/showcases/${res_id}`);
  // remove from UI
  setShowcases(showcases.filter((s) => s.showcase_id !== res_id));
};

const updatePrimaryShowcase = async (id) => {
  setPrimaryShowcase(id)
  try {
    return auth.handleUpdate({primary_showcase: id}, navigate);
  } catch(err) {
    console.log(err.response);
    alert("there was an error adding primary showcase")
}
}

  const renderShowcases = () => {
    // let showcaseCards = 
    // figure out how to map showcase cards
    const renderShowcaseCards = (s) => {
      for (let i in s.cards) {
        if (s.cards[i] == s.card_id) {
          return s.card_name
        } 
    }}
    return showcases.map((s)=> {
      return (
        <Box key={s.showcase_id}
        sx={{
          maxWidth: '100vw',
          width: '1300px',
          height: 300,
          borderRadius: '7px',
          padding: '20px',
          margin: '15px 30px',
          color: 'rgb(77, 77, 77)',
          backgroundColor: '#ebebeb',
          textAlign: "center",
          '&:hover': {
            backgroundColor: '#dbdbdb',
            // opacity: [0.9, 0.8, 0.7],
            
          },
        }}
      ><h3>{s.name}</h3>
      <p>{s.description}</p>
      <p>Cards: {JSON.stringify(s.cards)}</p>
      {renderShowcaseCards(s)}
      <ButtonDiv>
      <Button style={styles.button} onClick={()=>navigate(`/profile/showcases/${s.showcase_id}/edit`)} variant="contained">Edit Showcase</Button>
      <Button style={styles.button} onClick={()=>deleteShowcase(s.showcase_id)} variant="contained">Delete Showcase</Button>
      {auth.primary_showcase !== s.showcase_id && <Button style={styles.button} onClick={()=>updatePrimaryShowcase(s.showcase_id)} variant="contained">Set to Primary Showcase</Button>}
      </ButtonDiv>
      </Box>
 
      )
    }

    )
  }

  return (
    <div>
      <div className='statsContainer'>
        <a className='profileNavText'>cards.length</a>
        <a className='profileNavText'>showcase.likes</a>
        <a className='profileNavText'>Primary Showcase: {auth.primary_showcase}</a>
      </div>
      <div style={styles.centered}>
        <div style={styles.row}>
        <Button style={{margin:'10px 0px 0px 0px'}} onClick={()=>navigate('/showcase/new')} variant="contained">Create A New Showcase</Button>
        </div>
        {renderShowcases()}
        
      </div>
    </div>
  )

}


const styles = {
  button: {
    margin: '10px',
  },
  row: {
    margin: '10px 200px 0px 200px'
  },
  centered: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
}

export default Showcase;