import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";
import { TextareaAutosize } from "@mui/material";


const EditCollection = (props) => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setName(auth.name)
    setCategory(auth.category)
    setDescription(auth.description)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, category, description })
    return auth.handleUpdate({ name, category, description }, navigate);
  };

  return (
    <div>
      <h1>Edit Collection Page</h1>
      <form onSubmit={handleSubmit}>
        <p>Card Name</p>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => { name(e.target.value); }} />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => { category(e.target.value); }} />
        <br />
        <TextareaAutosize
          placeholder="Description"
          style={{ width: 350, height: 100 }}
          value={description}
          onChange={(e) => { setDescription(e.target.value); }} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default EditCollection;
