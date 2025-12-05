import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Professeurs = () => {
    const [professeurs, setProfesseurs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfesseurs();
    }, []);

    const fetchProfesseurs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/professeurs');
            setProfesseurs(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce professeur ?')) {
            try {
                await axios.delete(`http://localhost:8000/api/professeurs/${id}`);
                setProfesseurs(professeurs.filter(prof => prof.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header className="bg-success text-white p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="mb-0 fw-bold">Gestion des Professeurs</h2>
                            <p className="mb-0 opacity-75">Liste de tous les enseignants</p>
                        </div>
                        <Button variant="light" className="fw-bold text-success rounded-pill px-4" onClick={() => navigate('/professeurs/ajouter')}>
                            + Ajouter un Professeur
                        </Button>
                    </div>
                </Card.Header>

                <Card.Body className="p-0">
                    {error && <Alert variant="danger" className="m-3">{error}</Alert>}

                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light text-muted text-uppercase small">
                            <tr>
                                <th className="ps-4 py-3">ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professeurs.map((prof) => (
                                <tr key={prof.id}>
                                    <td className="ps-4 text-muted">#{prof.id}</td>
                                    <td className="fw-semibold text-dark">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                                                {prof.nom.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                {prof.nom}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-secondary">{prof.email}</td>
                                    <td className="text-end pe-4">
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(prof.id)} className="rounded-pill">Supprimer</Button>
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

export default Professeurs;
