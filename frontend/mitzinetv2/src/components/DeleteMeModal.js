/* Or Bar Califa 318279429
Daniel Tselon Fradkin 316410885 */

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteMeModal = ({ show, onHide }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });  // State to hold form data

    // Handler to update state with form input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handler to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/signup', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => {
            if (res.status === 200) {
                alert("User deleted successfully.");  // Success response
            } else if (res.status === 404) {
                alert("Email not found.");  // Email not found response
            } else if (res.status === 401) {
                alert("Password does not match.");  // Password mismatch response
            } else {
                alert("Server error.");  // General server error response
            }
        });
    };

    return (
        // Modal for delete confirmation
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete me from db</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            required
                            onChange={handleChange}  // Update state on input change
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            required
                            onChange={handleChange}  // Update state on input change
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="primary" onClick={handleSubmit}>
                    DELETE
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteMeModal;
