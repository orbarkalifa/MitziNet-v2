const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

const validate = (user) => {
    return validateEmail(user.email) &&
        validateName(user.firstName) &&
        validateName(user.lastName) &&
        validatePhoneNumber(user.phone) &&
        user.password.length >= 8 &&
        user.password === user.confirmPassword;
};

const validateEmail = (email) => {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d*$/;
    return phoneRegex.test(phone);
};


// Endpoint to handle user signup
app.post("/signup", (req, res) => {
    if (validate(req.body)) {
        const newUser = new User(req.body);

        // Hash the password before saving
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password', err });
            }
            newUser.password = hash;
            newUser.save()
                .then(user => res.status(201).json(user))
                .catch(err => res.status(500).json({ message: 'Internal server error', err }));

        });
    } else {
        res.status(422).json({ message: "bad input" });
    }
});



app.delete("/signup", (req, res) => {

    const { email, password } = req.body;

    User.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Error comparing passwords', err });
                }
                if (!isMatch) {
                    console.log("NO MATCH");
                    return res.status(401).json({ message: 'Invalid password' });
                }
                User.deleteOne({ email }).exec()
                    .then(() => res.status(200).json({ message: 'User deleted successfully' }))
                    .catch(err => res.status(500).json({ message: 'Internal server error', err }));
            });
        })
        .catch(err => res.status(499).json({ message: '1Internal server error', err }));
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
