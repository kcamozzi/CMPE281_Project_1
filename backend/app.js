const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const database = require('./sqlConnection');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.post('/uploads', (req, res) => {
  const data = req.body;
  console.log(data)
  let query = `SELECT * from user_uploads WHERE (firstName = '${data.firstName}' AND lastName = '${data.lastName}')`;

  database.query(query, (err,result) => {
    if(err){
      res.send('Error');
    }else{
      console.log(result);
      res.send(result);
    }
  });
});

app.post('/uploads_admin', (req, res) => {
  const data = req.body;
  console.log(data)
  let query = `SELECT * from user_uploads`;

  database.query(query, (err,result) => {
    if(err){
      res.send('Error');
    }else{
      console.log(result);
      res.send(result);
    }
  });
});

app.post('/', (req,res) =>{
  const data = req.body;

  database.query("INSERT INTO user_uploads SET ?", data, (err,result) => {
    if(err){
      res.send('Error');
    }else{
      res.send(result);
    }
  })
  
});

app.post('/delete', (req,res) =>{
  const data = req.body;

  let query = `DELETE FROM user_uploads WHERE fileName = '${data.fileName}'`;
  database.query(query, data, (err,result) => {
    if(err){
      res.send('Error');
    }else{
      res.send(result);
    }
  })
  
});

/* app.get("/", (req, res) => {
      
  let tableName = 'test_table';

  // Query to create table
  let query = `CREATE TABLE ${tableName} 
      (id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255), address VARCHAR(255))`;

  database.query(query, (err, rows) => {
      if(err) return res.status(500)
          .send("Table Creation Failed");

      return res.send(
`Successfully Created Table - ${tableName}`);
  })
}); */

/* app.use('/api', require('./routes/api.route')); */

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
