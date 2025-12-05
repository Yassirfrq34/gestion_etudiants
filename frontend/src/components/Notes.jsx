import React from 'react';
import { Container, Table, Card, Badge, Row, Col } from 'react-bootstrap';

const Notes = () => {
    // Mock Data: 1 Student, Multiple Grades
    const studentInfo = {
        name: "Dupont Jean",
        id: "ETU-2023-042",
        class: "Licence 2 - Informatique"
    };

    const grades = [
        { subject: "Algorithmique", grade: 15, date: "2023-10-15" },
        { subject: "Bases de Données", grade: 12, date: "2023-10-20" },
        { subject: "Développement Web", grade: 18, date: "2023-10-22" },
        { subject: "Mathématiques", grade: 8, date: "2023-11-05" },
        { subject: "Anglais Technique", grade: 14, date: "2023-11-10" },
        { subject: "Systèmes d'exploitation", grade: 9.5, date: "2023-11-15" },
        { subject: "Réseaux", grade: 13, date: "2023-11-18" },
    ];

    // Calculate Average
    const average = (grades.reduce((acc, curr) => acc + curr.grade, 0) / grades.length).toFixed(2);

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
                            <span className="display-6 fw-bold">{average}/20</span>
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
                            {grades.map((item, index) => (
                                <tr key={index}>
                                    <td className="ps-4 fw-semibold text-dark">
                                        {item.subject}
                                    </td>
                                    <td className="text-secondary small">
                                        {new Date(item.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td>
                                        {/* Dynamic Badge Color */}
                                        <Badge bg={item.grade >= 10 ? 'success' : 'danger'} pill>
                                            {item.grade >= 10 ? 'Validé' : 'Non Validé'}
                                        </Badge>
                                    </td>
                                    <td className="text-end pe-4 fw-bold">
                                        <span className={item.grade >= 10 ? 'text-success' : 'text-danger'}>
                                            {item.grade}
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