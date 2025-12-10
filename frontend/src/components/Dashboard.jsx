import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    // Admins usually have 'name' in the User model, not 'nom'/'prenom'
    const adminName = user ? user.name : "Administrateur";

    const handleLogout = () => {
        // TODO: Clear auth tokens
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard" className="fw-bold">Gestion Étudiants</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/dashboard">Accueil</Nav.Link>
                            <Nav.Link as={Link} to="/etudiants">Étudiants</Nav.Link>
                            <Nav.Link as={Link} to="/professeurs">Professeurs</Nav.Link>
                            <Nav.Link as={Link} to="/matieres">Matières</Nav.Link>
                            <Nav.Link as={Link} to="/notes">Notes</Nav.Link>
                        </Nav>
                        <Button variant="outline-light" onClick={handleLogout} className="fw-bold">Déconnexion</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5">
                <h1 className="mb-4">Bonjour, {adminName} !</h1>
                <p className="lead">Bienvenue dans le système de gestion des étudiants.</p>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card text-white bg-success mb-3 h-100 shadow-sm">
                            <div className="card-header fw-bold">Étudiants</div>
                            <div className="card-body">
                                <h5 className="card-title">Gérer les étudiants</h5>
                                <p className="card-text">Ajouter, modifier ou supprimer des étudiants.</p>
                                <Link to="/etudiants" className="btn btn-light btn-sm mt-2">Accéder</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-info mb-3 h-100 shadow-sm">
                            <div className="card-header fw-bold">Professeurs</div>
                            <div className="card-body">
                                <h5 className="card-title">Gérer les professeurs</h5>
                                <p className="card-text">Gérer le corps enseignant de l'établissement.</p>
                                <Link to="/professeurs" className="btn btn-light btn-sm mt-2">Accéder</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card text-white bg-warning mb-3 h-100 shadow-sm">
                            <div className="card-header fw-bold text-dark">Matières</div>
                            <div className="card-body text-dark">
                                <h5 className="card-title">Gérer les matières</h5>
                                <p className="card-text">Configurer les cours et les programmes.</p>
                                <Link to="/matieres" className="btn btn-light btn-sm mt-2">Accéder</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Dashboard;
