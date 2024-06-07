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
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ message: 'Internal server error:', err }));

});


// Endpoint to validate email in db
app.get("/validate-email", (req, res) => {
    User.findOne({ email: req.query.email }).exec()
        .then(user => {
            if (user) {
                return res.status(409).json({ message: 'Email already exists' });
            } else {
                return res.status(200).json({ message: 'Email available' });
            }
        })
        .catch(error => {
            console.error('Error validating email:', error);
            return res.status(500).json({ message: 'Internal server error' });
        });
});


app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});
