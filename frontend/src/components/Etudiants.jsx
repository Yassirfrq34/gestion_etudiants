import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Etudiants = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
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

    const handleDeleteClick = (id) => {
        setStudentToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!studentToDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/etudiants/${studentToDelete}`);
            setEtudiants(etudiants.filter(etudiant => etudiant.id !== studentToDelete));
            setShowDeleteModal(false);
            setStudentToDelete(null);
        } catch (err) {
            setShowDeleteModal(false);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
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
                                        {localStorage.getItem('role') === 'admin' && (
                                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(etudiant.id)} className="rounded-pill">Supprimer</Button>
                                        )}
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
                    <p>Voulez-vous vraiment supprimer cet étudiant ?</p>
                    <p className="text-muted small">Cette action est irréversible et supprimera également ses notes et son emploi du temps.</p>
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
        </Container>
    );
};

export default Etudiants;
