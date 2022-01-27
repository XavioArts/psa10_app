import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const LogIn = () => {
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("123456");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password }, navigate);
    };

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} >
                <TextField style={{marginRight: '25px'}}label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <TextField label="Password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <br />
                <Button style={{marginTop: '15px'}}variant="contained" type="submit" >Log in</Button>
            </form>
        </div>
    )

}

export default LogIn;