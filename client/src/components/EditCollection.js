import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { TextareaAutosize } from "@mui/material";


const EditCollection = () => {
  const params = useParams()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let res = await axios.get(`/api/collections/${params.id}`)
    setName(res.data.name)
    setCategory(res.data.category)
    setDescription(res.data.description)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, category, description })
    let updatedCollection = {name, category, description}
    let res = await axios.put(`/api/collections/${params.id}`, updatedCollection);
    navigate(`/profile/collections/${params.id}`)
  };

  return (
    <div>
      <h1>Edit Collection Page</h1>
      <form onSubmit={handleSubmit}>
        <p>Card Name</p>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => { setName(e.target.value); }} />
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => { setCategory(e.target.value); }} />
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
