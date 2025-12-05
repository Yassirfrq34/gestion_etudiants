import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Etudiants = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEtudiants();
    }, []);

    const fetchEtudiants = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/etudiants');
            setEtudiants(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
            try {
                await axios.delete(`http://localhost:8000/api/etudiants/${id}`);
                setEtudiants(etudiants.filter(etudiant => etudiant.id !== id));
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError(err.message);
                }
            }
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                <Card.Header className="bg-primary text-white p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="mb-0 fw-bold">Gestion des Étudiants</h2>
                            <p className="mb-0 opacity-75">Liste de tous les étudiants inscrits</p>
                        </div>
                        <Button variant="light" className="fw-bold text-primary rounded-pill px-4" onClick={() => navigate('/etudiants/ajouter')}>
                            + Ajouter un Étudiant
                        </Button>
                    </div>
                </Card.Header>

                <Card.Body className="p-0">
                    {error && <Alert variant="danger" className="m-3">{error}</Alert>}

                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light text-muted text-uppercase small">
                            <tr>
                                <th className="ps-4 py-3">ID</th>
                                <th>Nom Complet</th>
                                <th>Email</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {etudiants.map((etudiant) => (
                                <tr key={etudiant.id}>
                                    <td className="ps-4 text-muted">#{etudiant.id}</td>
                                    <td className="fw-semibold text-dark">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                                                {etudiant.nom.charAt(0).toUpperCase()}{etudiant.prenom.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                {etudiant.nom} {etudiant.prenom}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-secondary">{etudiant.email}</td>
                                    <td className="text-end pe-4">
                                        {/* <Button variant="outline-warning" size="sm" className="me-2 rounded-pill">Modifier</Button> */}
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(etudiant.id)} className="rounded-pill">Supprimer</Button>
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

export default Etudiants;
