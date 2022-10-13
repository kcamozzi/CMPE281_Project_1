require('dotenv').config();
const database = require('./sqlConnection');
    
let tableName = 'user_uploads';

// Query to create table
let query = `CREATE TABLE ${tableName} 
    (id INT AUTO_INCREMENT PRIMARY KEY, 
    firstName VARCHAR(255), lastName VARCHAR(255), uploadTime VARCHAR(255), 
    fileName VARCHAR(255), fileDesc VARCHAR(255), fileURL VARCHAR(255),
    updatedTime VARCHAR(255))`;

database.query(query, (err, result) => {
      if(err) throw err;
      console.log("Table created");
});
