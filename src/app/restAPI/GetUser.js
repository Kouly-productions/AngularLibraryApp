// Assuming you have an Express.js server
const express = require('express');
const sql = require('mssql');
const app = express();
const cors = require('cors');
app.use(cors());

const config = {
  user: 'test',
  password: '123',
  server: '192.168.21.24',
  database: 'AngularLibrary',
  driver: 'SQL Server Native Client 11.0',
  options: {
    encrypt: true, // This enables SSL
    trustServerCertificate: true // Only use if using self-signed certificate
  }
};

app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('password',sql.VarChar,password)
      .query(`SELECT * FROM Login where _username = @username and _password = @password`);
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); 