import './SignUp.css';
import { useState } from 'react';

function SignUp() {

    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).catch(error => console.error('Error:', error));


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
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lname"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                        />
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
                    />
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
                    />
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        minLength="8"
                        required
                    />
                    <br />
                    <p id='message'></p>
                </div>
                <button type="submit" className="sign-up-btn">Sign Up</button>
            </form>
            <footer>
                <p>First Name: {data.firstName}</p>
                <p>Last Name: {data.lastName}</p>
                <p>Email: {data.email}</p>
                <p>Phone: {data.phone}</p>
            </footer>
        </main>
    );

}
export default SignUp;
