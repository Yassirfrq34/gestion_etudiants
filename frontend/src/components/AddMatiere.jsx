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
            if (err.response && err.response.data && err.response.data.message) {
                // Check if it's a validation error (Laravel defaults to "The given data was invalid.")
                // and if specific field errors exist
                if (err.response.data.errors) {
                    // Extract the first error message
                    const firstError = Object.values(err.response.data.errors).flat()[0];
                    setError(firstError);
                } else {
                    setError(err.response.data.message);
                }
            } else {
                setError("Erreur lors de l'ajout. Veuillez réessayer.");
            }
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
