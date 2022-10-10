import React, { useState } from "react";
import UserPool from "../UserPool";
import '../App.css';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { TextField, Button, Stack, FormGroup } from "@mui/material";

const Signup = () => {

    const setCognitoUserAttribute = (attributeKey, attributeValue) => {
        let data = {
          Name: attributeKey,
          Value: attributeValue
        };
      
        return new CognitoUserAttribute(data);
      };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    let attributeList = [];

    const onSubmit = (event) => {
        event.preventDefault();

        attributeList.push(setCognitoUserAttribute('given_name', firstName));
        attributeList.push(setCognitoUserAttribute('family_name', lastName));
        attributeList.push(setCognitoUserAttribute('email', email));

        UserPool.signUp(email, password, attributeList, null, (err, data) => {
            if (err) {
                console.error(err);
            }
            console.log(data);
        })
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');

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
                    <TextField label='First Name' 
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}/>
                        <br/>
                        <br/>
                    <TextField label='Last Name' 
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}/>
                        <br/>
                        <br/>
                    <TextField label='Password' 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}/>
                        <br/>
                        <br/>
                    <Button variant="contained"
                        type="submit">Register</Button>
                </form>
            </FormGroup>
        </Stack>
    );
};

export default Signup;