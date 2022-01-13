import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const EditCard = (props) => {

  const navigate = useNavigate();
  const {
    id, user_id, collection_id, available: oldAvailable, category: oldCategory, name: oldName, condition: oldCondition,
    graded: oldGraded, grade: oldGrade, set: oldSet, year: oldYear, cardNumber: oldCardNumber } = props.card;
  const { toggleEditForm, updateUC } = props;

  const [available, setAvailable] = useState(oldAvailable);
  const [category, setCategory] = useState(oldCategory);
  const [name, setName] = useState(oldName);
  const [condition, setCondition] = useState(oldCondition);
  const [graded, setGraded] = useState(oldGraded);
  const [grade, setGrade] = useState(oldGrade);
  const [set, setSet] = useState(oldSet);
  const [year, setYear] = useState(oldYear);
  const [cardNumber, setCardNumber] = useState(oldCardNumber);

  const auth = useContext(AuthContext);

  useEffect(() => {
    getCards();
  }, [])

  // const getCards = async () => {
  //   let res = await axios.get("/api/cards");
  //   console.log(res);
  // };

  const getCards = async () => {
    setAvailable(auth.available)
    setCategory(auth.category)
    setName(auth.category)
    setCondition(auth.condition)
    setGraded(auth.graded)
    setGrade(auth.grade)
    setSet(auth.set)
    setYear(auth.year)
    setCardNumber(auth.CardNumber)

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newCard = {
      available: available,
      category: category,
      name: name,
      condition: condition,
      graded: graded,
      grade: grade,
      set: set,
      year: year,
      cardNumber: cardNumber,
    };
    await axios.put(`/api/cards/${id}`, newCard);
    toggleEditForm();
    updateUC(newCard);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/users/${user_id}/collections/${collection_id}`);
    navigate(`/users/${user_id}/collections/${collection_id}`);
  }

  return (
    <div>
      <h1>Edit {id}</h1>
      <button onClick={() => handleDelete()}>Delete Card</button>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Card Available:</p>
          <input value={available} onChange={(e) => setAvailable(e.target.value)} />
          <p>Category:</p>
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
          <p>Name:</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <p>Condition:</p>
          <input value={condition} onChange={(e) => setCondition(e.target.value)} />
          <p>Graded:</p>
          <input value={graded} onChange={(e) => setGraded(e.target.value)} />
          <p>Grade:</p>
          <input value={grade} onChange={(e) => setGrade(e.target.value)} />
          <p>Set:</p>
          <input value={set} onChange={(e) => setSet(e.target.value)} />
          <p>Year:</p>
          <input value={year} onChange={(e) => setYear(e.target.value)} />
          <p>Card Number:</p>
          <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          <br />
          <button>Submit Your Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditCard;