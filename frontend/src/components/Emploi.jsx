import React, { useState, useEffect } from 'react';
import { Container, Card, Nav, Navbar, Dropdown, Table, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// --- Icons ---
const Icons = {
    Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    Students: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Teachers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    Subjects: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    Planning: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
};

const Emploi = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // New Session Form
    const [newSession, setNewSession] = useState({
        jour: '',
        horaire: '',
        matiere_id: ''
    });

    useEffect(() => {
        const result = localStorage.getItem('user');
        if (result) setUser(JSON.parse(result));

        fetchStudents();
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            fetchSchedule(selectedStudent);
        }
    }, [selectedStudent]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/etudiants');
            setStudents(response.data);
            if (response.data.length > 0) setSelectedStudent(response.data[0].id);
        } catch (error) {
            console.error("Error fetching students", error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/matieres');
            setSubjects(response.data);
            if (response.data.length > 0) setNewSession(prev => ({ ...prev, matiere_id: response.data[0].id }));
        } catch (error) {
            console.error("Error fetching subjects", error);
        }
    };

    const fetchSchedule = async (studentId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/plannings?etudiant_id=${studentId}`);
            setSchedule(response.data);
        } catch (error) {
            console.error("Error fetching schedule", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleAddSession = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/plannings', {
                ...newSession,
                etudiant_id: selectedStudent
            });
            setShowModal(false);
            fetchSchedule(selectedStudent);
        } catch (error) {
            alert("Erreur lors de l'ajout");
        }
    };

    // --- Helper to map Day Name to Date for the grid ---
    // For simplicity, we just check if the session date corresponds to a week day
    // In a real app we'd match exact dates. Here we'll just check Day of Week matching?
    // User wants SIMPLE. 
    // Let's assume the user enters a Date. We will display it if it matches the current week?
    // OR BETTER: Just map columns to Day Names and check if the date string *contains* or is that day?
    // The DB stores 'YYYY-MM-DD'.
    // Let's make the grid "Generic Week" and just ask for "Day Name" in the form if we could, but DB needs Date.
    // Hack: We will ask for a Date in the form, and in the grid we display sessions whose Day of week matches the column.
    // This allows seeing any session on "Monday" regardless of specific date (Simple View).

    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const timeSlots = ["08:30 - 10:30", "10:30 - 12:30", "14:30 - 16:30", "16:30 - 18:30"];

    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { weekday: 'long' });
    };

    // Helper to find session in slot
    const getSession = (dayName, slot) => {
        // Find a session where the day matches and time matches start time
        // Slot format "08:30 - 10:30". We check if session.horaire starts with "08:30"
        const startTime = slot.split(' - ')[0];

        return schedule.find(s => {
            const sDay = getDayName(s.jour);
            // Loose comparison for day (capitalize first letter)
            const sDayCap = sDay.charAt(0).toUpperCase() + sDay.slice(1);

            // Loose comparison for time (DB "08:30:00" vs "08:30")
            const sTime = s.horaire.substring(0, 5);

            return sDayCap === dayName && sTime === startTime;
        });
    };

    const adminName = user ? user.nom || user.name : "Administrateur";
    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column">
                <Navbar bg="white" className="shadow-sm border-bottom px-4 py-3 sticky-top">
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <h5 className="mb-0 text-dark fw-bold">Emploi du temps</h5>
                        <div className="d-flex gap-3 align-items-center">
                            <Form.Select
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                                className="bg-light border-0 fw-medium shadow-none"
                                style={{ width: '250px' }}
                            >
                                <option value="">Sélectionner un étudiant</option>
                                {students.map(s => (
                                    <option key={s.id} value={s.id}>{s.nom} {s.prenom}</option>
                                ))}
                            </Form.Select>
                            <Button variant="primary" onClick={() => setShowModal(true)} disabled={!selectedStudent} className="d-flex align-items-center gap-2">
                                <Icons.Plus /> Séance
                            </Button>
                        </div>
                    </div>
                </Navbar>

                <Container fluid className="p-4">
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <Card.Header className="bg-white p-4 border-bottom-0 pb-0">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 p-2 rounded me-3 text-primary">
                                    <Icons.Planning />
                                </div>
                                <div>
                                    <h5 className="fw-bold mb-0">Planning de l'étudiant</h5>
                                    <p className="text-muted small mb-0">Vue hebdomadaire</p>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="table-responsive rounded-3 border">
                                <Table bordered hover className="mb-0 text-center align-middle">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="py-3 text-muted text-uppercase small" style={{ width: '100px' }}>Horaire</th>
                                            {days.map(day => (
                                                <th key={day} className="py-3 text-dark fw-bold">{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {timeSlots.map(slot => (
                                            <tr key={slot} style={{ height: '100px' }}>
                                                <td className="bg-light text-muted small fw-bold">{slot}</td>
                                                {days.map(day => {
                                                    const session = getSession(day, slot);
                                                    return (
                                                        <td key={`${day}-${slot}`} className="p-2 position-relative">
                                                            {session ? (
                                                                <div className="h-100 w-100 rounded-3 p-2 bg-primary bg-opacity-10 border border-primary border-opacity-25 text-start">
                                                                    <div className="fw-bold text-primary mb-1" style={{ fontSize: '0.9rem' }}>
                                                                        {session.matiere ? session.matiere.nom : 'Matière'}
                                                                    </div>
                                                                    <div className="d-flex align-items-center text-muted small mb-1">
                                                                        <Icons.Clock />
                                                                        <span className="ms-1">{slot}</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-muted opacity-25 small">-</span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>

            {/* Modal Add Session */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une séance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newSession.jour}
                                onChange={(e) => setNewSession({ ...newSession, jour: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Horaire</Form.Label>
                            <Form.Select
                                value={newSession.horaire}
                                onChange={(e) => setNewSession({ ...newSession, horaire: e.target.value })}
                            >
                                <option value="">Choisir un horaire</option>
                                <option value="08:30">08:30 - 10:30</option>
                                <option value="10:30">10:30 - 12:30</option>
                                <option value="14:30">14:30 - 16:30</option>
                                <option value="16:30">16:30 - 18:30</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Matière</Form.Label>
                            <Form.Select
                                value={newSession.matiere_id}
                                onChange={(e) => setNewSession({ ...newSession, matiere_id: e.target.value })}
                            >
                                {subjects.map(s => (
                                    <option key={s.id} value={s.id}>{s.nom}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
                    <Button variant="primary" onClick={handleAddSession}>Ajouter</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// Helper Item
const NavItem = ({ to, icon, label, active }) => (
    <Nav.Link
        as={Link}
        to={to}
        className={`d-flex align-items-center px-3 py-2 rounded mb-1 ${active ? 'bg-primary text-white shadow-sm' : 'text-white-50 hover-light'}`}
        style={{ transition: 'all 0.2s' }}
    >
        <span className="me-3 d-flex align-items-center">{icon}</span>
        <span className="fw-medium">{label}</span>
    </Nav.Link>
);

export default Emploi;