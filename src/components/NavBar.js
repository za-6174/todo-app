import {React, useContext} from 'react';

// ===== React packages import =====
import { Link } from 'react-router-dom';

// ===== Bootstrap import =====
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// ==== Other components import =====
import AuthContext from '../AuthContext';

function NavBar(){
    const {user} = useContext(AuthContext)
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-white">
            <Container>
                <Link to="/" className='link'>
                    <Navbar.Brand style={{color: "#7D31A6", fontWeight: 600}}>Todo App</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/app" className='nav-link'>Add Tasks</Link>
                    </Nav>
                    <Nav>
                        {
                            !user ?
                                <Link to="/login" className='nav-link'>Login</Link>
                            :
                                <Link to="/logout" className='nav-link'>Logout</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;