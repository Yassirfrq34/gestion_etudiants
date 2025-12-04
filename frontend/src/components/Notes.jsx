import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Notes = () => {
    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestion des Notes</h2>
                <Button variant="primary">
                    Saisir des Notes
                </Button>
            </div>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Étudiant</th>
                        <th>Matière</th>
                        <th>Note</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder data */}
                    <tr>
                        <td>Dupont Jean</td>
                        <td>Algorithmique</td>
                        <td>15/20</td>
                        <td>2023-10-15</td>
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

export default Notes;
