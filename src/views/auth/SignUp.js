import React, { useState, useEffect, useContext } from "react"

// ===== React packages import =====
import { useNavigate, Link } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";

// ===== Bootstrap imports ====== 
import { Form, Button, Card, Container, Row, Col} from 'react-bootstrap'

// ===== Auth imports ====== 
import AuthContext from '../../AuthContext';


function SignUp() {
	const [name, setName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmedPassword, setRegisterConfirmedPassword] = useState("");

    const {user, setUser} = useContext(AuthContext);

    const navigate = useNavigate()

    const register = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:4000/signup", {
                name: name,
                email: registerEmail,
                password: registerPassword
            }, {withCredentials: true})
            if(data) {
                if (data.errors) {
                    const {name, email, password} = data.errors;
                    if (email) generateError(email)
                    else if (password) generateError(password)
                    else if (name) generateError(name)
                }
                else {
                    setUser(data.user)
                    navigate("/")
                }
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const generateError = (err) => toast.error(err, {
        position: "bottom-right"
    })

	return (
        <Container fluid>
            <Row className='justify-content-center'>
                <Col xl={6}>
                    <Card className='m-5 p-5'>
                        <Card.Body>
                            <Card.Title>Sign Up to continue</Card.Title>
                            <Form onSubmit={register}>
                                <Form.Group id="name" className="my-2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        value={name}
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="email" className="my-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={registerEmail}
                                        type="email"
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password" className="my-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={registerPassword}
                                        type="password"
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="my-2">
                                    Sign Up
                                </Button>
                                <Card.Text className="my-2">Already have an account? <Link to="/login">Login</Link></Card.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
	);
}

export default SignUp;