import React, { useState, useEffect, useContext } from "react"

// ===== React packages import =====
import { useNavigate, Link } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";

// ===== Bootstrap imports ====== 
import { Form, Button, Card, Container, Row, Col} from 'react-bootstrap'

// ===== Auth imports ====== 
import AuthContext from '../../AuthContext';


function Login() {
	const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const {user, setUser} = useContext(AuthContext);

    const navigate = useNavigate()


    const login = async (event) => {
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
                            <Card.Title>Sign in to continue</Card.Title>
                            <Form onSubmit={login}>
                                <Form.Group id="email" className="my-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={loginEmail}
                                        type="email"
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group id="password" className="my-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={loginPassword}
                                        type="password"
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="my-2">
                                    Login
                                </Button>
                                <Card.Text className="my-2">Don't have an account? <Link to="/signup">Sign Up</Link></Card.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
	);
}

export default Login;