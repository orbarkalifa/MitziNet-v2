/* Or Bar Califa 318279429
Daniel Tselon Fradkin 316410885 */

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const DeleteMeModal = ({ show, onHide }) => {

    const [data, setData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

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
                alert("DELETED SUCCESSFULY");
            }
        });
    };


    return (
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
                            required
                            onChange={handleChange}
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
