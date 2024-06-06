const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line to import cors


const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Add this line to use cors


// Connect to MongoDB 
mongoose.connect('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.post("/signup", (req, res) => {
    console.log(req.body);

    // Create a new user from the request body
    const newUser = new User(req.body);

    // Save the user to the database
    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));


});






app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});
