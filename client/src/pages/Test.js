import React from "react";
import { useParams } from "react-router-dom";
import AddCard from "../components/AddCard";

const Test = () => {
    
    const {id} = useParams();

    return(
        <div>
            <h1>ID: {id}</h1>
            <p>This page is to mimic a collection page with the id of {id}</p>
            <AddCard collectionId={id} />
        </div>
    )
};

export default Test;