import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password
            });

            const { access_token, role } = response.data;

            // Store token (basic implementation)
            localStorage.setItem('token', access_token);
            localStorage.setItem('role', role);

            // Redirect based on role
            if (role === 'admin') {
                navigate('/dashboard');
            } else if (role === 'etudiant') {
                navigate('/espace-etudiant');
            } else if (role === 'professeur') {
                navigate('/espace-professeur');
            } else {
                navigate('/');
            }

        } catch (err) {
            console.error("Login error:", err);
            setError('Identifiants invalides.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Card style={{ width: '400px' }} className="shadow-lg border-0 rounded-3">
                <Card.Body className="p-5">
                    <h2 className="text-center mb-4 fw-bold text-primary">Connexion</h2>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Adresse Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Entrez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="py-2"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="py-2"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                            Se connecter
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;
