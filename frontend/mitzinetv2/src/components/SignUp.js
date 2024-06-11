import { useState } from 'react';
import DeleteMeModal from './DeleteMeModal';
import './SignUp.css';


function SignUp() {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validate = () => {
        let validationErrors = {};
        if (!validateEmail(data.email)) validationErrors.email = 'Invalid email format';
        if (!validateName(data.firstName)) validationErrors.firstName = 'Invalid first name format';
        if (!validateName(data.lastName)) validationErrors.lastName = 'Invalid last name format';
        if (!validatePhoneNumber(data.phone)) validationErrors.phone = 'Invalid phone number format';
        if (data.password !== data.confirmPassword) validationErrors.password = 'Passwords do not match';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const validateEmail = (email) => {
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');

        return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
    };

    const checkEmail = async (email) => {
        try {
            const response = await fetch(`/validate-email?email=${email}`);
            return response.status === 200; // Return true only if the response status is 200
        } catch (error) {
            console.error('Error checking email:', error);
            setErrors(...errors, error.email = "Email already exists");
            return false; // Return false in case of error
        }
    };

    const handleBlur = async (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            const emailValid = await checkEmail(value);
            if (!emailValid) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: 'Email already exists'
                }));
            } else {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: '' // Clear error message if email is valid
                }));
            }
        }
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]*$/;
        return nameRegex.test(name);
    };

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d*$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => {
                    if (res.status === 201) {
                        alert("Registration successful");
                    } else if (res.status === 422) {
                        return res.json().then(error => {
                            alert(`Error: ${error.message}`);
                        });
                    } else {
                        alert("An unexpected error occurred");
                    }
                })
                .catch(err => {
                    alert("Failed to connect to the server");
                    console.error(err);
                });
        }
    };


    return (
        <main className="sign-up-container">
            <header>
                <div className="logo">
                    <img width="150px" src="./logo.jpeg" alt="Company Logo" />
                </div>
                <p>Join our community of professionals.</p>
            </header>
            <form id="signup-form" onSubmit={handleSubmit}>
                <div className="form-group names">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="fname"
                            name="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            style={{ borderColor: errors.firstName ? 'red' : '' }}
                        />
                        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            style={{ borderColor: errors.lastName ? 'red' : '' }}
                        />
                        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        style={{ borderColor: errors.phone ? 'red' : '' }}
                    />
                    {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ borderColor: errors.email ? 'red' : '' }}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        minLength="8"
                        required
                        onChange={handleChange}
                        style={{ borderColor: errors.password ? 'red' : '' }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        minLength="8"
                        required
                        onChange={handleChange}
                        style={{ borderColor: errors.password ? 'red' : '' }}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    className={`sign-up-btn ${errors.email ? 'disabled' : ''}`} // Add 'disabled' class when button is disabled
                    disabled={errors.email}
                >Sign Up</button>
            </form>
            <footer>
                <br />
                <div>
                    <button onClick={() => setShowModal(true)} className="sign-up-btn">
                        Delete me from db
                    </button>

                </div>
                <DeleteMeModal show={showModal} onHide={() => setShowModal(false)} />
            </footer>


        </main>
    );
}

export default SignUp;
