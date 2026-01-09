const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
router.get('/', (req, res) => {
    res.send('Welcome to the To-Do List API');
});

module.exports = router;