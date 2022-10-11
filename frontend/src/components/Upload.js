import React, { useState, useContext, useEffect } from "react";
import { uploadFile } from 'react-s3';
import ReactDom from 'react-dom';
import ReactS3 from 'react-s3';
import { AccountContext } from "./Account";
import { TextField, Button, Stack, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: 'cloudtech-project1',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
}

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFile = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const handleUpload = (file) => {
        uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }

    return (
        <Stack spacing={2} direction="column">
            <Button
            variant="text"
            component="label">
            Select File
            <input type="file" onChange={handleFile}/>
            </Button>
            <Button
            variant="contained"
            onClick={() => handleUpload(selectedFile)}>
            Upload
            </Button>
        </Stack>
    );
};

export default Upload;