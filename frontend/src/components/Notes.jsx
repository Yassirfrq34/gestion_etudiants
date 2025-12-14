import React, { useState, useEffect } from 'react';
import { Container, Table, Card, Badge, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Notes = () => {
    const user = JSON.parse(localStorage.getItem('user')) || { nom: 'Étudiant', prenom: 'Inconnu', id: 'N/A' };

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const studentInfo = {
        name: `${user.prenom} ${user.nom}`,
        id: `ETU-${user.id || 'N/A'}`,
        class: "Licence 2 - Informatique"
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/notes');
            // Filter notes for the current student
            const myNotes = response.data.filter(n => n.etudiant_id === user.id);
            setNotes(myNotes);
        } catch (error) {
            console.error("Erreur lors du chargement des notes", error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate Average
    const uniqueSubjects = [...new Set(notes.map(n => n.matiere_id))];
    const canShowAverage = uniqueSubjects.length >= 7;

    // Average calculation: Sum of all grades / Total number of grades
    // Note: If you want average per subject first, logic needs to change.
    // Assuming 1 grade per subject for now or simple average of all marks.
    const average = notes.length > 0
        ? (notes.reduce((acc, curr) => acc + parseFloat(curr.valeur), 0) / notes.length).toFixed(2)
        : "N/A";

    return (
        <Container className="mt-5 mb-5">
            {/* Main Card */}
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">

                {/* Header: Student Information (Appears Once) */}
                <div className="bg-primary text-white p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="mb-1 fw-bold">{studentInfo.name}</h2>
                            <p className="mb-0 opacity-75">{studentInfo.class} | ID: {studentInfo.id}</p>
                        </div>
                        <div className="text-end">
                            <span className="d-block text-uppercase small opacity-75">Moyenne Générale</span>
                            {/* Logic: Only show average if 7 subjects have marks */}
                            {canShowAverage ? (
                                <span className="display-6 fw-bold">{average}/20</span>
                            ) : (
                                <div>
                                    <span className="fs-5 fw-bold text-white-50">En attente</span>
                                    <div className="small opacity-50">{uniqueSubjects.length}/7 matières notées</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body: The Grades Table */}
                <Card.Body className="p-0">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light text-muted text-uppercase small">
                            <tr>
                                <th className="ps-4 py-3">Matière</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((item, index) => (
                                <tr key={index}>
                                    <td className="ps-4 fw-semibold text-dark">
                                        {item.matiere ? item.matiere.nom : 'Matière inconnue'}
                                    </td>
                                    <td className="text-secondary small">
                                        {new Date(item.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td>
                                        {/* Dynamic Badge Color */}
                                        <Badge bg={item.valeur >= 10 ? 'success' : 'danger'} pill>
                                            {item.valeur >= 10 ? 'Validé' : 'Non Validé'}
                                        </Badge>
                                    </td>
                                    <td className="text-end pe-4 fw-bold">
                                        <span className={item.valeur >= 10 ? 'text-success' : 'text-danger'}>
                                            {item.valeur}
                                        </span>
                                        <span className="text-muted small">/20</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>

                {/* Footer Actions */}
                <Card.Footer className="bg-light p-3 text-end">
                    <button className="btn btn-outline-secondary btn-sm me-2">Télécharger PDF</button>
                    <button className="btn btn-primary btn-sm">Envoyer le bulletin</button>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Notes;