import React, { useState, useEffect } from "react";
import { uploadFile } from 'react-s3';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { TextField, Button, Stack} from "@mui/material";
import axios from 'axios';
//import { useNavigate } from "react-router-dom";
//const axios = require('axios');
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: 'cloudtech-project1',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
}

const Upload = ({user}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    //const [uploadTime, setUploadTime] = useState('');
    const [fileDesc, setFileDesc] = useState(null);
    const [fileName, setFileName] = useState(null);
    //const [fileURL, setFileURL] = useState(null);
    const firstName = user.attributes.given_name;
    const lastName = user.attributes.family_name;
    let uploadTime = '';
    let fileURL = '';
    const updatedTime = '-';
    

    const handleFile = (e) => {
        setFileName(e.target.files[0].name);
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const handleUpload = (file) => {
        uploadFile(file, config)
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err))
    }

    const handleUploadAndPost = (file) => {
        if(file){
            handleUpload(file);
            handlePostUpload();
        }
    }

    const handleFileDesc = (e) => {
        setFileDesc(e.target.value);
    }

    const handlePostUpload = async (event) => {
        uploadTime = new Date().toLocaleString();
        fileURL = "https://cloudtech-project1.s3.amazonaws.com/" + fileName;
        //event.preventDefault();
        await axios.post('/', {
           firstName: firstName,
           lastName: lastName,
           uploadTime: uploadTime,
           fileName: fileName,
           fileDesc: fileDesc,
           fileURL: fileURL,
           updatedTime: updatedTime
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    useEffect(() => {
        console.log("fileURL = " + fileURL);
    }, [fileURL]);

    return (
            <Stack spacing={2} direction="column">
                <Button
                variant="text"
                component="label">
                <input type="file" onChange={handleFile}/>
                </Button>
                <TextField id="outlined-basic" label="File Description" variant="outlined" onChange={handleFileDesc}/>
                <Button
                variant="contained"
                onClick={() => handleUploadAndPost(selectedFile)}>
                Upload
                </Button>
            </Stack>
    );
};

export default withAuthenticator(Upload);