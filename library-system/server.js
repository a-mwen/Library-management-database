const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(bodyParser.json());

// Use environment variables for database credentials
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.send('Library Management System');
});

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    const sql = 'INSERT INTO books SET ?';
    db.query(sql, newBook, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newBook });
    });
});

app.put('/books/:id', (req, res) => {
    const updatedBook = req.body;
    const { id } = req.params;
    const sql = 'UPDATE books SET ? WHERE book_id = ?';
    db.query(sql, [updatedBook, id], (err, result) => {
        if (err) throw err;
        res.json({ id, ...updatedBook });
    });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM books WHERE book_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book deleted', id });
    });
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newUser });
    });
});

app.put('/users/:id', (req, res) => {
    const updatedUser = req.body;
    const { id } = req.params;
    const sql = 'UPDATE users SET ? WHERE user_id = ?';
    db.query(sql, [updatedUser, id], (err, result) => {
        if (err) throw err;
        res.json({ id, ...updatedUser });
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.json({ message: 'User deleted', id });
    });
});

app.get('/loans', (req, res) => {
    const sql = 'SELECT * FROM loans';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/loans', (req, res) => {
    const newLoan = req.body;
    const sql = 'INSERT INTO loans SET ?';
    db.query(sql, newLoan, (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...newLoan });
    });
});

app.put('/loans/:id', (req, res) => {
    const updatedLoan = req.body;
    const { id } = req.params;
    const sql = 'UPDATE loans SET ? WHERE loan_id = ?';
    db.query(sql, [updatedLoan, id], (err, result) => {
        if (err) throw err;
        res.json({ id, ...updatedLoan });
    });
});

app.delete('/loans/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM loans WHERE loan_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Loan deleted', id });
    });
});

app.listen(8081, () => {
    console.log('Server running on port 8081');
});