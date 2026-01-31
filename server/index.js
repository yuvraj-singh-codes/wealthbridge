const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic routing
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js server!');
});

// Example route for handling data
app.post('/data', async (req, res) => {
    try {
        const data = req.body;
        // Here you would typically save data to the database
        res.status(201).json({ message: 'Data received', data });
    } catch (error) {
        console.error('Error handling data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});