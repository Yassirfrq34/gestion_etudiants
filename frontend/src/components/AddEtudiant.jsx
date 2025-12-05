import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEtudiant = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/etudiants', {
                nom,
                prenom,
                email,
                mot_de_passe: motDePasse
            });
            navigate('/etudiants');
        } catch (err) {
            console.error("Erreur lors de l'ajout:", err);
            setError(`Erreur: ${err.message}`);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Ajouter un Étudiant</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required minLength="6" />
                </Form.Group>

                <Button variant="primary" type="submit">Ajouter</Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/etudiants')}>Annuler</Button>
            </Form>
        </Container>
    );
};

export default AddEtudiant;
