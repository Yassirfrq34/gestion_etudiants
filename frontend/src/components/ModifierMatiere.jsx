import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ModifierMatiere = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatiere();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMatiere = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/matieres/${id}`);
            setNom(response.data.nom);
            setLoading(false);
        } catch (err) {
            console.error("Erreur lors du chargement:", err);
            setError("Impossible de charger la matière.");
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/matieres/${id}`, {
                nom
            });
            navigate('/matieres');
        } catch (err) {
            console.error("Erreur lors de la modification:", err);
            setError("Erreur lors de la modification.");
        }
    };

    if (loading) return <Container className="mt-5">Chargement...</Container>;

    return (
        <Container className="mt-5">
            <h2>Modifier une Matière</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNom">
                    <Form.Label>Nom de la Matière</Form.Label>
                    <Form.Control
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="warning" type="submit">
                    Modifier
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/matieres')}>
                    Annuler
                </Button>
            </Form>
        </Container>
    );
};

export default ModifierMatiere;
