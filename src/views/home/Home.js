import { React } from 'react';

// ===== React packages import =====
import { Link } from 'react-router-dom';

// ===== Bootstrap imports ====== 
import { Button, Row, Col, Container, Card } from 'react-bootstrap';


const Home = () => {
    return (
        <Container fluid>
            <Row className='justify-content-center'>
                <Col xl={10}>
                    <Card className='m-5'>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>Hey there👋</Card.Title>
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