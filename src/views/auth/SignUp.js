import React, { useState, useEffect, useContext } from "react"

// ===== React packages import =====
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

// ===== Bootstrap imports ====== 
import { Form, Button, Card, Container, Row, Col} from 'react-bootstrap'

// ===== Auth imports ====== 
import AuthContext from '../../AuthContext';
import { showErrorToast } from "../../utils/toastUtils";
import { API_URL } from "../../utils/API";


function SignUp() {
	const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errors, setErrors] = useState({name: "", email: "", password: ""})

    const {user, setUser} = useContext(AuthContext);

    const navigate = useNavigate()

    useEffect(() => {
        if (user)
            navigate("/")
    }, [user, navigate])

    const register = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.post(`${API_URL}/signup`, {
                name: name,
                email: email,
                password: password
            }, {withCredentials: true})
            if(data) {
                console.log(data)
                if (data.errors) {
                    const {name, email, password} = data.errors;
                    if (name) showErrorToast(name)
                    else if (password) showErrorToast(password)
                    else if (email) showErrorToast(email)
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

    const validateForm = () => Object.keys(errors).length === 0

    const handleErrors = (key, value) => {
        let isValid = true;
        if (key === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(value)) {
                setErrors({...errors, [key]: `Invalid email address`})
                isValid = false
            }
        }
        else if (key === "password") {
            if (password.length < 8) {
                setErrors({...errors, [key]: `Password must be at least 8 characters long`})
                isValid = false
            }
        }
        else {
            if (value === "") {
                setErrors({ ...errors, [key]: `${key} cannot be empty` })
                isValid = false
            }
        }
        if (isValid) {
            const newErrors = { ...errors };
            delete newErrors[key];
            setErrors(newErrors);
        }
    }

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
                                        onKeyUp={(e) => handleErrors("name", e.target.value)}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <p className="text-danger mt-1">{errors.name}</p>
                                </Form.Group>
                                <Form.Group id="email" className="my-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={email}
                                        type="email"
                                        onKeyUp={(e) => handleErrors("email", e.target.value)}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <p className="text-danger mt-1">{errors.email}</p>
                                </Form.Group>
                                <Form.Group id="password" className="my-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={password}
                                        type="password"
                                        onKeyUp={(e) => handleErrors("password", e.target.value)}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <p className="text-danger mt-1">{errors.password}</p>
                                </Form.Group>
                                <Button variant="success" type="submit" className="my-2" disabled={!validateForm()}>
                                    Sign Up
                                </Button>
                                <Card.Text className="my-2">Already have an account? <Link to="/login">Login</Link></Card.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
	);
}

export default SignUp;