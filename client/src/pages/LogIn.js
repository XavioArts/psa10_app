import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/Register";
import { AuthContext } from "../providers/AuthProvider";

const LogIn = () => {
    const { handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("123456");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password }, navigate);
    };

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <div>
            <h1>Log In Page</h1>
            <form onSubmit={handleSubmit} >
                <label>Email:</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} />
                <label>Password:</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button type="submit" >Log in</button>
            </form>
            <p>Not you? Register here.</p>
            <button onClick={toggleShow} >{show ? "Cancel" : "Register"}</button>
            {show && <Register/>}
        </div>
    )

}

export default LogIn;