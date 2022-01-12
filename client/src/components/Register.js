import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {

    const navigate = useNavigate();
    const { handleRegister } = useContext(AuthContext);
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert("password does not match");
            return;
        }
        handleRegister({ email, password, first_name, last_name, nickname }, navigate);
    }

    return (
        <form onSubmit={handleSubmit} >
            <p>Name:</p>
            <input placeholder="First Name" value={first_name} onChange={(e)=>setFirst_name(e.target.value)} />
            <input placeholder="Last Name" value={last_name} onChange={(e)=>setLast_name(e.target.value)} />
            <p>Username</p>
            <input placeholder="Username" value={nickname} onChange={(e)=>{setNickname(e.target.value);}}/>
            <p>Email:</p>
            <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <p>Password:</p>
            <input placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <p>Confirm Password:</p>
            <input placeholder="Password Confirmation" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} />
            <button type="submit" >Register</button>
        </form>
    );
};

export default Register;