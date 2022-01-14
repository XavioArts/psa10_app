import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


// PUT THE BELOW CODE WHEREVER YOU WANT YOUR SHOWCASE COMPONENT TO DISPLAY
{/* <Showcase id={auth.id}/> */}


const Showcase = (props) => {
  const [showcases, setShowcases] = useState([]);
  const {id} = useParams()
  const auth = useContext(AuthContext);

  useEffect(() => {
    getShowcases();
  }, [])

  const getShowcases = async () => {
    let res_id = id ? id : auth.id
    try {
        let res = await axios.get(`/api/showcases/${res_id}`);
        // allShowcases = res.data
        console.log(res.data)
        setShowcases(res.data);
    } catch (err) {
        console.log(err.response);
        alert("there was an error getting showcases")
    }
}

  return (
    <div>
      {JSON.stringify(showcases)}
      <Link to={'/showcase/new'}>Create A New Showcase</Link>
    </div>
  )

}

export default Showcase;