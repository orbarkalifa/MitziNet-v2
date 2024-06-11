/* Or Bar Califa 318279429
Daniel Tselon Fradkin 316410885 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();

// Middleware setup
app.use(express.json());  // Parses incoming JSON requests
app.use(express.static('public'));  // Serves static files from the 'public' directory
app.use(cors());  // Enables Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024')
    .then(() => console.log('MongoDB connected'))  // Log on successful connection
    .catch(err => console.error('MongoDB connection error:', err));  // Log any connection errors

// Helper function to validate user data
const validate = (user) => {
    return validateEmail(user.email) &&
        validateName(user.firstName) &&
        validateName(user.lastName) &&
        validatePhoneNumber(user.phone) &&
        user.password.length >= 8 &&
        user.password === user.confirmPassword;
};

// Helper function to validate email format
const validateEmail = (email) => {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
};

// Helper function to validate name format
const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
};

// Helper function to validate phone number format
const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d*$/;
    return phoneRegex.test(phone);
};

// Endpoint to handle user signup
app.post("/signup", (req, res) => {
    const { firstName, lastName } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!firstName) {
        return res.status(422).json({ message: "First name is required" });
    }

    if (!lastName) {
        return res.status(422).json({ message: "Last name is required" });
    }

    // Validate complete user data
    if (validate(req.body)) {
        const newUser = new User(req.body);

        // Hash the password before saving the user
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password', err });
            }
            newUser.password = hash;  // Store the hashed password
            newUser.save()
                .then(user => res.status(201).json(user))  // Respond with the created user
                .catch(err => res.status(500).json({ message: 'Internal server error', err }));  // Handle save error
        });
    } else {
        res.status(422).json({ message: "Bad input" });
    }
});

// Endpoint to handle user deletion
app.delete("/signup", (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    User.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Compare provided password with stored hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: 'Error comparing passwords', err });
                }
                if (!isMatch) {
                    console.log("NO MATCH");
                    return res.status(401).json({ message: 'Invalid password' });
                }
                // Delete user if password matches
                User.deleteOne({ email }).exec()
                    .then(() => res.status(200).json({ message: 'User deleted successfully' }))
                    .catch(err => res.status(500).json({ message: 'Internal server error', err }));
            });
        })
        .catch(err => res.status(499).json({ message: 'Internal server error', err }));
});

// Endpoint to validate if an email already exists in the database
app.get("/validate-email", (req, res) => {
    User.findOne({ email: req.query.email }).exec()
        .then(user => {
            if (user) {
                return res.status(409).json({ message: 'Email already exists' });  // Conflict response if email exists
            } else {
                return res.status(200).json({ message: 'Email available' });  // OK response if email does not exist
            }
        })
        .catch(error => {
            console.error('Error validating email:', error);
            return res.status(500).json({ message: 'Internal server error' });  // Handle validation error
        });
});

// Start the server
app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});
