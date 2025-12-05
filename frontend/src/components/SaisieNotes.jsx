import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SaisieNotes = () => {
    const navigate = useNavigate();
    const [etudiants, setEtudiants] = useState([]);
    const [matieres, setMatieres] = useState([]);
    const [selectedEtudiant, setSelectedEtudiant] = useState('');
    const [selectedMatiere, setSelectedMatiere] = useState('');
    const [note, setNote] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Mock Prof ID (In real app, get from Auth Context)
    // We'll use the first prof in DB or a fixed ID. 
    // For now, let's assume we store the 'user' object in localStorage on login.
    const getProfId = () => {
        // Fallback or dynamic
        return 1;
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const etudiantsRes = await axios.get('http://localhost:8000/api/etudiants');
            const matieresRes = await axios.get('http://localhost:8000/api/matieres');
            setEtudiants(etudiantsRes.data);
            setMatieres(matieresRes.data);
        } catch (err) {
            console.error(err);
            setError("Impossible de charger les listes.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            await axios.post('http://localhost:8000/api/notes', {
                valeur: parseFloat(note),
                etudiant_id: selectedEtudiant,
                matiere_id: selectedMatiere,
                professeur_id: getProfId()
            });
            setMessage("Note enregistrée avec succès !");
            setNote('');
        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'enregistrement. Vérifiez les champs.");
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg border-0 rounded-4">
                <Card.Header className="bg-primary text-white p-4 rounded-top-4">
                    <h2 className="mb-0 fw-bold">Saisie des Notes</h2>
                    <p className="mb-0 opacity-75">Ajouter une nouvelle note pour un étudiant</p>
                </Card.Header>
                <Card.Body className="p-5">
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="selectEtudiant">
                                    <Form.Label className="fw-bold">Étudiant</Form.Label>
                                    <Form.Select
                                        value={selectedEtudiant}
                                        onChange={(e) => setSelectedEtudiant(e.target.value)}
                                        required
                                        className="py-2"
                                    >
                                        <option value="">-- Choisir un étudiant --</option>
                                        {etudiants.map(etu => (
                                            <option key={etu.id} value={etu.id}>
                                                {etu.nom} {etu.prenom} ({etu.email})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="selectMatiere">
                                    <Form.Label className="fw-bold">Matière</Form.Label>
                                    <Form.Select
                                        value={selectedMatiere}
                                        onChange={(e) => setSelectedMatiere(e.target.value)}
                                        required
                                        className="py-2"
                                    >
                                        <option value="">-- Choisir une matière --</option>
                                        {matieres.map(mat => (
                                            <option key={mat.id} value={mat.id}>
                                                {mat.nom}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-4" controlId="inputNote">
                            <Form.Label className="fw-bold">Note (/20)</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.5"
                                min="0"
                                max="20"
                                placeholder="Ex: 15.5"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                required
                                className="py-2"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => navigate('/espace-professeur')}>
                                Retour
                            </Button>
                            <Button variant="primary" type="submit" className="px-5 fw-bold">
                                Enregistrer
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SaisieNotes;
