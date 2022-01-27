import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
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
    const [emailVerify, setEmailVerify] = useState(true);
    const [passwordVerify, setPasswordVerify] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setPasswordVerify(false);
            return;
        } if (!email) {
            setEmailVerify(false)
            return; 
        }
        handleRegister({ email, password, first_name, last_name, nickname }, navigate);
    }

    const handleEmailerror = () => {
        if (!emailVerify){
            return(
                <TextField style={{margin: '10px'}}
                    error
                    label="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailVerify(true)
                    }}
                    helperText="Email required"
                /> 
        )
    } else {
            return(
                <TextField style={{margin: '10px'}}
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            )
        }
    }
    const handlePasswordError = () => {
        if (!passwordVerify){
            return(
                <>
                <TextField style={{margin: '10px'}}
                    error
                    label="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setPasswordVerify(true)}
                    }
                    helperText="Passwords do not match"
                />
                <br />
                <TextField style={{margin: '10px'}}
                    error
                    label="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value)
                        setPasswordVerify(true)}
                    }
                    helperText="Passwords do not match"
                />
                </>
        )
    } else {
            return(
                <>
                <TextField style={{margin: '10px'}}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <TextField style={{margin: '10px'}}
                    label="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                </>
            )
        }
    }

    return (
        <Box style={{margin:'50px'}}>
            <h1>Create a new account</h1>
            <p>You can set preferred display name and manage other personal settings.</p>
            <div>
                <form onSubmit={handleSubmit} >
                    <TextField style={{margin: '10px'}}
                        label="First Name"
                        variant="outlined"
                        value={first_name} 
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                    <TextField style={{margin: '10px'}}
                        label="Last Name"
                        variant="outlined"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                    <br />
                    <TextField style={{margin: '10px'}}
                        label="Display Name"
                        variant="outlined"
                        value={nickname}
                        onChange={(e) => { setNickname(e.target.value); }}
                    />
                    <br />
                    {handleEmailerror()}
                    <br />
                    {handlePasswordError()}
                    <br />
                    <Button style={{margin: '10px'}} variant="contained" type="submit" >Register</Button>
                </form>
            </div>
        </Box>
    );
};

export default Register;