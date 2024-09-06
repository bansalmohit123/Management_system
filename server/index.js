const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); // Import path module

// Import routes
const studentRouter = require('./routes/student');
const instructorRouter = require('./routes/instructor');
const adminRouter = require('./routes/admin');

// Import database connection
const connection = require('./db');

const app = express();
const PORT = 5000;

// Set up the view engine (if using Jade or another templating engine)
app.set('views', path.join(__dirname, '../screens'));
app.set('view engine', 'jade'); // Only if you're using Jade templates

// Serve static files from the "screens" folder
app.use('/screens', express.static(path.join(__dirname, '../screens')));
app.use('/public', express.static(path.join(__dirname, '../screens/public'))); // Serve public files like CSS

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(express.static(path.join(__dirname, '../screens'))); // Serve static files from the "screens" directory

// Use routes
app.use(studentRouter); // Prefix the student routes
app.use(instructorRouter); // Prefix the instructor routes
app.use(adminRouter); // Prefix the admin routes

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../screens', 'index.html')); // Correct path to index.html
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
