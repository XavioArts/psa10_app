import {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpload";
import { TextareaAutosize } from "@mui/base";


const ShowcaseNewForm= (props) => {
  // const auth = useContext(AuthContext);
  // const [name, setName] = useState("")
  // const [description, setDescription] = useState("")
  // const [cardChoices, setCardChoices] = useState("")
  // const navigate = useNavigate();

  // useEffect(() => {
  //   getData();
  // }, [])

  // const getData = async () => {
  //   let res = await axios.get('/api/cards')
  //   let allCards = res.data 
  //   console.log(allCards)
  //   // console.log(res.data)
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log({email, first_name, last_name, nickname, about})
  //   return auth.handleUpdate({email, first_name, last_name, nickname, about}, navigate);
  // };



  return (
    <div>
      <h1>Create A Showcase</h1>
      {/* <ProfileImageUpload/>
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input 
        placeholder="First Name" 
        value={first_name} 
        onChange={(e)=>{setFirst_name(e.target.value);}}/>
        <input 
        placeholder="Last Name" 
        value={last_name} 
        onChange={(e)=>{setLast_name(e.target.value);}}/>
        <p>Username</p>
        <input 
        placeholder="Userame" 
        value={nickname} 
        onChange={(e)=>{setNickname(e.target.value);}}/>
        <p>Email</p>
        <input 
        placeholder="email" 
        value={email} 
        onChange={(e)=>{setEmail(e.target.value);}}/>
        <p>About</p>
        <TextareaAutosize 
        placeholder="Tell Us About Yourself" 
        style={{ width: 400, height: 100 }}
        value={about} 
        onChange={(e)=>{setAbout(e.target.value);}}/>
        <br/>
        <button>Submit</button>
      </form> */}
    </div>
  );
};

export default ShowcaseNewForm;
