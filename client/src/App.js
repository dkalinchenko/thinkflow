import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './App.css';

// Home page component
const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <h1>Welcome to ThinkFlow</h1>
        <p className="lead">A powerful decision matrix tool to help you make better decisions.</p>
        <Button variant="primary" as={Link} to="/dashboard" className="mt-3">Get Started</Button>
      </div>

      <Container>
        <h2 className="text-center mb-4">How It Works</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>1. Define Your Criteria</Card.Title>
                <Card.Text>
                  Start by identifying what factors are important in your decision.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>2. Weight Your Priorities</Card.Title>
                <Card.Text>
                  Assign importance to each criterion based on your priorities.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>3. Compare Options</Card.Title>
                <Card.Text>
                  Rate your alternatives and get a clear recommendation.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Dashboard component (placeholder)
const Dashboard = () => {
  return (
    <Container>
      <h1 className="my-4">Your Decisions</h1>
      <Card>
        <Card.Body>
          <Card.Title>Sample Decision</Card.Title>
          <Card.Text>
            This is a sample decision. Once the backend is connected, your decisions will appear here.
          </Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">ThinkFlow</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="text-center p-3">
          © 2023 ThinkFlow - Decision Matrix App
        </div>
      </footer>
    </Router>
  );
}

export default App; 