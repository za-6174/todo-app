import {React, useContext} from 'react';

// ===== React packages import =====
import { Link } from 'react-router-dom';

// ===== React packages import =====
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../AuthContext';

function NavBar(){
    const {user} = useContext(AuthContext)
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/" className='link'>
                    <Navbar.Brand>Todo App</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/app">Add Tasks</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            !user ?
                                <Nav.Link href="/login">Login</Nav.Link>
                            :
                                <Nav.Link href="/logout">Logout</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;