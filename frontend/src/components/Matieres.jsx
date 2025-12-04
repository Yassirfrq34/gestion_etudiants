import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Matieres = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestion des Matières</h2>
                <Button variant="primary" onClick={() => navigate('/matieres/ajouter')}>
                    Ajouter une Matière
                </Button>
            </div>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Libellé</th>
                        <th>Coefficient</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder data */}
                    <tr>
                        <td>1</td>
                        <td>Algorithmique</td>
                        <td>4</td>
                        <td>Introduction aux algorithmes</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2">Modifier</Button>
                            <Button variant="danger" size="sm">Supprimer</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Base de données</td>
                        <td>3</td>
                        <td>SQL et modélisation</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2">Modifier</Button>
                            <Button variant="danger" size="sm">Supprimer</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default Matieres;
