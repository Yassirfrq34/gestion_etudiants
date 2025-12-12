import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EspaceEtudiant = () => {
    const navigate = useNavigate();

    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    const studentName = user ? `${user.prenom} ${user.nom}` : "Étudiant";

    return (
        <Container className="py-5">
            <div className="bg-light p-4 rounded-4 mb-5 shadow-sm border-start border-primary border-5">
                <h1 className="display-6 fw-bold text-primary">Bonjour, {studentName} !</h1>
                <p className="text-muted mb-0">Bienvenue sur votre espace personnel. Que souhaitez-vous faire aujourd'hui ?</p>
            </div>

            <Row className="g-4">
                <Col md={4} lg={4}>
                    <Card className="h-100 shadow-sm border-0 hover-effect">
                        <Card.Body className="d-flex flex-column align-items-center text-center p-5">
                            <div className="bg-primary bg-opacity-10 p-4 rounded-circle mb-4 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0m2-.25a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25z" />
                                    <path d="M4 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0m2-.25a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25z" />
                                    <path d="M4 5a1 1 0 1 1 2 0 1 1 0 0 1-2 0m2-.25a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25z" />
                                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zM1 1a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
                                </svg>
                            </div>

                            <Card.Title as="h3" className="mb-3">Mes Résultats</Card.Title>
                            <Card.Text className="text-muted mb-4">
                                Consultez vos notes récentes, votre moyenne générale et vos bulletins.
                            </Card.Text>
                            <Button variant="primary" size="lg" className="mt-auto px-4 rounded-pill" onClick={() => navigate('/notes')}>
                                Consulter les Notes
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} lg={4}>
                    <Card className="h-100 shadow-sm border-0 hover-effect">
                        <Card.Body className="d-flex flex-column align-items-center text-center p-5">
                            <div className="bg-success bg-opacity-10 p-4 rounded-circle mb-4 text-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>
                            </div>

                            <Card.Title as="h3" className="mb-3">Mon Planning</Card.Title>
                            <Card.Text className="text-muted mb-4">
                                Consultez votre emploi du temps et vos cours à venir.
                            </Card.Text>
                            <Button variant="success" size="lg" className="mt-auto px-4 rounded-pill" onClick={() => navigate('/mon-planning')}>
                                Voir le Planning
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4} lg={4}>
                    <Card className="h-100 shadow-sm border-0 hover-effect">
                        <Card.Body className="d-flex flex-column align-items-center text-center p-5">
                            <div className="bg-danger bg-opacity-10 p-4 rounded-circle mb-4 text-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                </svg>
                            </div>

                            <Card.Title as="h3" className="mb-3">Se Déconnecter</Card.Title>
                            <Card.Text className="text-muted mb-4">
                                Se déconnecter de la plateforme.
                            </Card.Text>
                            <Button variant="danger" size="lg" className="mt-auto px-4 rounded-pill" onClick={() => { localStorage.clear(); navigate('/'); }}> Se Déconnecter</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EspaceEtudiant;