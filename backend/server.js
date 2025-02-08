const express = require('express'); 
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 55050;

app.use(cors());

const db = mysql.createConnection({
  host: 'mysql.gb.stackcp.com', 
  user: 'terilastech-313936cd21',        
  password: 'Chegg@9297',     
  database: 'terilastech-313936cd21' ,
  port: 55050
});

db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
    } else {
      console.log('Connected to MySQL');
    }
  });
  
  app.get('/check-text/:text', (req, res) => {
    const { text } = req.params;
    
    const query = 'SELECT * FROM projectCreation WHERE project_name = ?';
   
  
    db.query(query, [text], (err, results) => {
      if (err) {
        console.error(`[${new Date().toISOString()}] Error querying the database:`, err);
        return res.status(500).json({ error: 'Error querying the database' });
      }
  
       
      return res.status(200).json({ p_name_exists:results });
    });
  });
  // Start server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });