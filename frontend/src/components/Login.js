import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Account";
import { TextField, Button, Stack, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(email, password)
        .then(data => {
            console.log("Logged in", data);
            setLoggedIn(true);
            console.log(loggedIn);
        })
        .catch(err => {
            console.error("Login Failed", err);
        })

        navigate("/dashboard");
        setEmail('');
        setPassword('');
    };

    return (
        <Stack spacing={2} direction="column">
            <FormGroup>
                <form className="formSpace"
                    onSubmit={onSubmit}>
                    <TextField label='Email' 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}/>
                        <br/>
                        <br/>
                    <TextField label='Password' 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}/>
                        <br/>
                        <br/>
                    <Button variant="contained"
                        type="submit">Log In</Button>
                </form>
            </FormGroup>
        </Stack>
    );
};

export default Login;