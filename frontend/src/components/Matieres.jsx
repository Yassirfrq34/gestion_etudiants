import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Matieres = () => {
    const [matieres, setMatieres] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMatieres();
    }, []);

    const fetchMatieres = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/matieres');
            setMatieres(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cette matière ?')) {
            try {
                await axios.delete(`http://localhost:8000/api/matieres/${id}`);
                setMatieres(matieres.filter(matiere => matiere.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header className="bg-warning text-dark p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="mb-0 fw-bold">Gestion des Matières</h2>
                            <p className="mb-0 opacity-75">Liste de tous les cours dispenses</p>
                        </div>
                        <Button variant="light" className="fw-bold text-dark rounded-pill px-4 border" onClick={() => navigate('/matieres/ajouter')}>
                            + Ajouter une Matière
                        </Button>
                    </div>
                </Card.Header>

                <Card.Body className="p-0">
                    {error && <Alert variant="danger" className="m-3">{error}</Alert>}

                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light text-muted text-uppercase small">
                            <tr>
                                <th className="ps-4 py-3">ID</th>
                                <th>Nom du Cours</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matieres.map((matiere) => (
                                <tr key={matiere.id}>
                                    <td className="ps-4 text-muted">#{matiere.id}</td>
                                    <td className="fw-bold text-dark">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-warning bg-opacity-10 text-dark rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                                                {matiere.nom.charAt(0).toUpperCase()}
                                            </div>
                                            {matiere.nom}
                                        </div>
                                    </td>
                                    <td className="text-end pe-4">
                                        <Button variant="outline-dark" size="sm" className="me-2 rounded-pill" onClick={() => navigate(`/matieres/modifier/${matiere.id}`)}>Modifier</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(matiere.id)} className="rounded-pill">Supprimer</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Matieres;
