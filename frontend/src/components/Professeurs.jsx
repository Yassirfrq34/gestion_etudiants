import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Professeurs = () => {
    const [professeurs, setProfesseurs] = useState([]);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [profToDelete, setProfToDelete] = useState(null);
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

    const handleDeleteClick = (id) => {
        setProfToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!profToDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/professeurs/${profToDelete}`);
            setProfesseurs(professeurs.filter(prof => prof.id !== profToDelete));
            setShowDeleteModal(false);
            setProfToDelete(null);
        } catch (err) {
            setShowDeleteModal(false);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Une erreur est survenue lors de la suppression.");
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
                                        <Button variant="danger" size="sm" onClick={() => handleDeleteClick(prof.id)} className="rounded-pill">Supprimer</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>

            </Card>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger fw-bold">Confirmer la suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Voulez-vous vraiment supprimer ce professeur ?</p>
                    <p className="text-muted small"><strong>Attention :</strong> Cela supprimera également toutes les notes saisies par ce professeur.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
};

export default Professeurs;
