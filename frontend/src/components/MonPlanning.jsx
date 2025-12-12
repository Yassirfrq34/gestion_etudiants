import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MonPlanning = () => {
    const [plannings, setPlannings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || localStorage.getItem('role') !== 'etudiant') {
            navigate('/');
            return;
        }
        fetchPlanning();
    }, []);

    const fetchPlanning = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/plannings');
            // Filter plannings for the current student
            // Assuming the API returns all, we filter by user.id
            const myPlannings = response.data.filter(p => p.etudiant_id === user.id);
            setPlannings(myPlannings);
        } catch (err) {
            console.error(err);
            setError("Impossible de charger l'emploi du temps.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to format day/time
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const timeSlots = ['08:30', '10:30', '14:30', '16:30'];

    const getSession = (day, time) => {
        // This logic depends on how 'jour' and 'horaire' are stored.
        // Assuming 'jour' is a date string YYYY-MM-DD or day name.
        // Since the seeded data might be random dates, filtering by specific "Week" is complex.
        // For this demo context, let's just show a list or match by Day Name if possible.
        // If 'jour' is a Date (2023-11-20), we can get the Day Name.

        return plannings.find(p => {
            const d = new Date(p.jour);
            const dayName = d.toLocaleDateString('fr-FR', { weekday: 'long' });
            // Check if dayName matches 'day' and horaire matches 'time'
            // Simple normalization
            return dayName.toLowerCase() === day.toLowerCase() && p.horaire === time;
        });
    };

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
        </Container>
    );

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold text-primary">Mon Emploi du Temps</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {plannings.length === 0 ? (
                <Alert variant="info" className="shadow-sm border-0">
                    Aucun cours planifié pour le moment.
                </Alert>
            ) : (
                <Row className="g-4">
                    {/* Just listing them as cards for now to be safe against Date logic complexity */}
                    {plannings.map(session => (
                        <Col md={6} lg={4} key={session.id}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-between mb-3">
                                        <Badge bg="primary" className="p-2">{new Date(session.jour).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</Badge>
                                        <Badge bg="secondary" className="p-2">{session.horaire}</Badge>
                                    </div>
                                    <h4 className="card-title fw-bold text-dark mb-2">{session.matiere ? session.matiere.nom : 'Matière Inconnue'}</h4>
                                    <p className="text-muted mt-auto">Salle: Amphi A (Exemple)</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default MonPlanning;
