import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProfesseur = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/professeurs', {
                nom,
                email,
                mot_de_passe: motDePasse
            });
            navigate('/professeurs'); // Redirect to list after success
        } catch (err) {
            console.error("Erreur lors de l'ajout:", err);
            setError("Erreur lors de l'ajout. Vérifiez les données (Email unique ?).");
        }
    };

    return (
        <Container className="mt-5">
            <h2>Ajouter un Professeur</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNom">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez le nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Entrez l'email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        minLength="6"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ajouter
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/professeurs')}>
                    Annuler
                </Button>
            </Form>
        </Container>
    );
};

export default AddProfesseur;
