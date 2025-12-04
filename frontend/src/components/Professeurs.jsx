import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Professeurs = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestion des Professeurs</h2>
                <Button variant="primary" onClick={() => navigate('/professeurs/ajouter')}>
                    Ajouter un Professeur
                </Button>
            </div>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Spécialité</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder data */}
                    <tr>
                        <td>1</td>
                        <td>Durand</td>
                        <td>Pierre</td>
                        <td>Mathématiques</td>
                        <td>pierre.durand@example.com</td>
                        <td>
                            <Button variant="info" size="sm" className="me-2">Voir</Button>
                            <Button variant="warning" size="sm" className="me-2">Modifier</Button>
                            <Button variant="danger" size="sm">Supprimer</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default Professeurs;
