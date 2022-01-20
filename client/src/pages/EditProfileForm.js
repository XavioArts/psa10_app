import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import ProfileImageUpload from "../components/ProfileImageUpload";
import { TextareaAutosize } from "@mui/base";


const EditUser = (props) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("")
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [nickname, setNickname] = useState("")
  const [about, setAbout] = useState("")
  const [twitter, setTwitter] = useState("")
  const [discord, setDiscord] = useState("")
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    // let res = await axios.get(`/api/users/${params.id}`)
    // console.log(res.data)
    setFirst_name(auth.first_name)
    setLast_name(auth.last_name)
    setEmail(auth.email)
    setNickname(auth.nickname)
    setAbout(auth.about)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, first_name, last_name, nickname, about })
    return auth.handleUpdate({ email, first_name, last_name, nickname, about }, navigate);
  };



  return (
    <div>
      <h1>Edit My Profile</h1>
      <ProfileImageUpload />
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <input
          placeholder="First Name"
          value={first_name}
          onChange={(e) => { setFirst_name(e.target.value); }} />
        <input
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => { setLast_name(e.target.value); }} />
        <p>Username</p>
        <input
          placeholder="Userame"
          value={nickname}
          onChange={(e) => { setNickname(e.target.value); }} />
        <p>Email</p>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); }} />
        <p>About</p>
        <TextareaAutosize
          placeholder="Tell Us About Yourself"
          style={{ width: 400, height: 100 }}
          value={about}
          onChange={(e) => { setAbout(e.target.value); }} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditUser;
