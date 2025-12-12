import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EspaceProfesseur = () => {
    const navigate = useNavigate();

    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    const profName = user ? `${user.prenom} ${user.nom}` : "Professeur";

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Bonjour, {profName} !</h2>
            <Row>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Gestion des Étudiants</Card.Title>
                            <Card.Text>
                                Voir la liste des étudiants.
                            </Card.Text>
                            <Button variant="primary" onClick={() => navigate('/etudiants')}>
                                Accéder
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Saisie des Notes</Card.Title>
                            <Card.Text>
                                Ajouter ou modifier les notes.
                            </Card.Text>
                            <Button variant="success" onClick={() => navigate('/saisie-notes')}>
                                Accéder
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Déconnexion</Card.Title>
                            <Card.Text>
                                Quitter l'espace professeur.
                            </Card.Text>
                            <Button variant="danger" onClick={() => { localStorage.clear(); navigate('/'); }}>
                                Se déconnecter
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EspaceProfesseur;
