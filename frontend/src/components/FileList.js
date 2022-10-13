import React, { useState, useEffect } from "react";
import { deleteFile } from 'react-s3';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { TextField, Button, Stack} from "@mui/material";
import axios from 'axios';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
//import { useNavigate } from "react-router-dom";
//const axios = require('axios');
//window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: 'cloudtech-project1',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
}

const FileList = ({user}) => {

    const [uploads, setUploads] = useState([]);
    const firstName = user.attributes.given_name;
    const lastName = user.attributes.family_name;
    const [adminCheck, setAdminCheck] = useState(false);

    const checkForAdmin = () => {
        if(user.attributes.email == process.env.REACT_APP_ADMIN){
            console.log("checking for admin");
            setAdminCheck(true);
        }
    }

    const handleDelete = (fileName) => {
        deleteFile(fileName, config)
        .then(response => {
            console.log(response);
            handleDeleteFromDB(fileName);
        })
        .catch(err => console.error(err))
    }

    const handleDeleteFromDB = async (fileName) => {
        await axios.post('/delete', {
           fileName: fileName,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    const getAllUploads = async (event) => {
        await axios.post('/uploads', {
           firstName: firstName,
           lastName: lastName
        })
          .then((res) => {
            console.log(res);
            setUploads(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

    const getAllUploadsAdmin = async (event) => {
    await axios.post('/uploads_admin')
        .then((res) => {
        console.log(res);
        setUploads(res.data);
        })
        .catch((error) => {
        console.log(error);
        });
    }

    useEffect(() => {
        checkForAdmin();
        getAllUploads();
        console.log(user.attributes.email);
        //console.log(uploads);
        //console.log(typeof uploads);
    }, []);

    return (
            <Stack spacing={2} direction="column">
                <Button
                variant="contained"
                onClick={() => getAllUploads()}>
                Refresh List
                </Button>
                {adminCheck && <Button
                variant="contained"
                onClick={() => getAllUploadsAdmin()}>
                Admin Panel
                </Button>}
                <h1>Upload List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>File</th>
                        <th>Description</th>
                        <th>Date Uploaded</th>
                        <th>Uploaded By</th>
                        <th>Download</th>
                        <th>Delete?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        uploads.map((value, key) => {
                        return (
                            <tr key={key}>
                            <td>{value.fileName}</td>
                            <td>{value.fileDesc}</td>
                            <td>{value.uploadTime}</td>
                            <td>{value.firstName} {value.lastName}</td>
                            <td><Link href={value.fileURL} target="_blank" >
                            <DownloadIcon/>
                            </Link>
                            </td>
                            <td>
                                <IconButton onClick={() => handleDelete(value.fileName)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </td>
                            </tr>
                        )
                        })
                    }
                    </tbody>
                </table>
            </Stack>
    );
};

export default withAuthenticator(FileList);