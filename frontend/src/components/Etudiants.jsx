import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Etudiants = () => {
    const navigate = useNavigate();
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEtudiants();
    }, []);

    const fetchEtudiants = async () => {
        try {
            // Assuming Laravel is running on port 8000
            const response = await axios.get('http://localhost:8000/api/etudiants');
            setEtudiants(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Erreur lors du chargement des étudiants:", err);
            setError("Impossible de charger la liste des étudiants. Vérifiez que le backend est lancé.");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
            try {
                await axios.delete(`http://localhost:8000/api/etudiants/${id}`);
                fetchEtudiants(); // Refresh list
            } catch (err) {
                console.error("Erreur lors de la suppression:", err);
                alert("Erreur lors de la suppression.");
            }
        }
    };

    if (loading) return (
        <Container className="mt-5 text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
            </Spinner>
        </Container>
    );

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestion des Étudiants</h2>
                <Button variant="primary" onClick={() => navigate('/etudiants/ajouter')}>
                    Ajouter un Étudiant
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {etudiants.length > 0 ? (
                        etudiants.map((etudiant) => (
                            <tr key={etudiant.id}>
                                <td>{etudiant.id}</td>
                                <td>{etudiant.nom}</td>
                                <td>{etudiant.prenom}</td>
                                <td>{etudiant.email}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2">Voir</Button>
                                    <Button variant="warning" size="sm" className="me-2">Modifier</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(etudiant.id)}>Supprimer</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">Aucun étudiant trouvé.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default Etudiants;
