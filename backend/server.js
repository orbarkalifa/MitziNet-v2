const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to handle user signup
app.post("/signup", (req, res) => {

    const newUser = new User(req.body);

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});
