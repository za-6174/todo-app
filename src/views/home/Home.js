import { React, useContext } from 'react';

// ===== React packages import =====
import { Link } from 'react-router-dom';
import AuthContext from '../../AuthContext';

// ===== Bootstrap imports ====== 
import { Button, Row, Col, Container, Card } from 'react-bootstrap';


const Home = () => {
    const {user} = useContext(AuthContext)

    return (
        <Container fluid>
            <Row className='justify-content-center'>
                <Col xl={8}>
                    <Card className='m-5'>
                        <Card.Img variant="top" src="/assets/img/calendar-hero.png" width="auto" height={200} alt="Todo Application" style={{objectFit: "cover"}}/>    
                        <Card.Body>
                            <Card.Title>
                                {user ? `Hi ${user.name}👋`  : "Hey there👋"}
                            </Card.Title>
                            <h1>Welcome to our Todo Application for managing daily tasks</h1>
                            <Card.Text>
                                Get Started Now!
                            </Card.Text>
                            <Link to="/app">
                                <Button variant="success">Start Adding Tasks</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;