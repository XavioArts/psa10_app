import { Button, TextField } from "@mui/material";
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
    const [passwordVerify, setPasswordVerify] = useState(null);
    const [firstNameVerify, setFirstNameVerify] = useState(true);
    const [lastNameVerify, setLastNameVerify] = useState(true);
    const [nicknameVerify, setNicknameVerify] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkPassword()
        if (!first_name) {
            setFirstNameVerify(false)
        } if (!last_name) {
            setLastNameVerify(false)
        } if (!nickname) {
            setNicknameVerify(false)
        } if (!checkEmail()) {
            setEmailVerify(false)
        } if (first_name && last_name && nickname &&  checkPassword() && checkEmail()) {
        handleRegister({ email, password, first_name, last_name, nickname }, navigate);
        }
    }

    const checkPassword = () => {
        let verifyPassword = password
        let verifyPasswordConfirm = passwordConfirm
        let filter = /[0-9a-zA-Z]{6,}/
        if (verifyPassword !== verifyPasswordConfirm) {
            setPasswordVerify(1)
            return false;
        } if (!filter.test(verifyPassword)){
            setPasswordVerify(2)
            return false;
        } else {
            return true
        }
    }

    const checkEmail = () => {
        let verifyEmail = email
        let filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!filter.test(verifyEmail)){
            return false
        } else {
            return true
        }
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
                    helperText="Valid email required"
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

    const handleFirstNameError = () => {
        if (!firstNameVerify){
            return(
                <TextField style={{margin: '10px'}}
                    error
                    label="First Name"
                    value={first_name}
                    onChange={(e) => {
                        setFirst_name(e.target.value)
                        setFirstNameVerify(true)
                    }}
                    helperText="First name required"
                /> 
        )
    } else {
            return(
                <TextField style={{margin: '10px'}}
                label="First Name"
                value={first_name} 
                onChange={(e) => setFirst_name(e.target.value)}
            />
            )
        }
    }

    const handleLastNameError = () => {
        if (!lastNameVerify){
            return(
                <TextField style={{margin: '10px'}}
                    error
                    label="Last Name"
                    value={last_name}
                    onChange={(e) => {
                        setLast_name(e.target.value)
                        setLastNameVerify(true)
                    }}
                    helperText="Last name required"
                /> 
        )
    } else {
            return(
                <TextField style={{margin: '10px'}}
                label="Last Name"
                value={last_name} 
                onChange={(e) => setLast_name(e.target.value)}
            />
            )
        }
    }

    const handleNicknameError = () => {
        if (!nicknameVerify){
            return(
                <TextField style={{margin: '10px'}}
                    error
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value)
                        setNicknameVerify(true)
                    }}
                    helperText="Nickname required"
                /> 
        )
    } else {
            return(
                <TextField style={{margin: '10px'}}
                label="Display Name"
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)}
            />
            )
        }
    }

    const handlePasswordError = () => {
        if (passwordVerify === 1){
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
                    helperText="Passwords must match"
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
                    helperText="Passwords must match"
                />
                </>
        )
    } if (passwordVerify === 2){
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
                helperText="Passwords must contain at least 6 characters"
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
                helperText="Passwords must contain at least 6 characters"
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
        <div style={{position: 'absolute', left: '15%', marginTop: '50px'}}>
            <h1>Create a new account</h1>
            <p>You can set preferred display name and manage other personal settings.</p>
            <div>
                <form onSubmit={handleSubmit} >
                    {handleFirstNameError()}
                    {handleLastNameError()}
                    <br />
                    {handleNicknameError()}
                    <br />
                    {handleEmailerror()}
                    <br />
                    {handlePasswordError()}
                    <br />
                    <Button style={{margin: '10px'}} variant="contained" type="submit" >Register</Button>
                </form>
            </div>
        </div>
    );
};

export default Register;