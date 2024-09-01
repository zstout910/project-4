const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password", 
    database: "signup"
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit process with failure
    }
    console.log('Connected to the MySQL database');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.length === 0) return res.status(401).send('User not found');
        
        const storedPassword = results[0].password;

        if (password === storedPassword) { // Consider using hashed passwords
            // Send username back in the response
            res.status(200).json({ message: 'Login successful', username: username });
        } else {
            res.status(401).send('Invalid password');
        }
    });
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password, name, email } = req.body;

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Database error');
        if (results.length > 0) return res.status(409).send('User already exists');
        
        // Insert the new user into the database
        db.query('INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)', 
            [username, name, email, password], (err, result) => { // Consider hashing the password
            if (err) return res.status(500).send('Database error');
            res.status(201).json({ message: 'User registered successfully', username: username, name: name, email: email });
        });
    });
});


// Get all questions and answers
app.get('/questions', (req, res) => {
    const sql = 'SELECT * FROM questions_answers';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err.message);
            return res.status(500).send('Database error');
        }
        res.status(200).json(results);
    });
});

// Route to get money data
app.get('/money', (req, res) => {
    const sql = 'SELECT * FROM money';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Get all questions and answers
app.get('/about', (req, res) => {
    const sql = 'SELECT * FROM `help`';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err.message);
            return res.status(500).send('Database error');
        }
        res.status(200).json(results);
    });
});




// --------------------- Start the Server ---------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
