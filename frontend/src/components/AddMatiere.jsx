import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMatiere = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/matieres', {
                nom
            });
            navigate('/matieres');
        } catch (err) {
            console.error("Erreur lors de l'ajout:", err);
            setError("Erreur lors de l'ajout. Cette matière existe peut-être déjà.");
        }
    };

    return (
        <Container className="mt-5">
            <h2>Ajouter une Matière</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNom">
                    <Form.Label>Nom de la Matière</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: Mathématiques, Java, Algèbre"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ajouter
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/matieres')}>
                    Annuler
                </Button>
            </Form>
        </Container>
    );
};

export default AddMatiere;
