import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Dropdown, Table, Button, Modal, Alert, Form } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// --- Internal SVG Icons (Same as Dashboard for consistency) ---
const Icons = {
    Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    Students: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Teachers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    Subjects: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    Planning: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
};

const Etudiants = () => {
    // --- Existing Logic & State ---
    const [etudiants, setEtudiants] = useState([]);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch User Info
        const result = localStorage.getItem('user');
        if (result) {
            setUser(JSON.parse(result));
        }
        // Fetch Data
        fetchEtudiants();
    }, []);

    const fetchEtudiants = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/etudiants');
            setEtudiants(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteClick = (id) => {
        setStudentToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!studentToDelete) return;
        try {
            await axios.delete(`http://localhost:8000/api/etudiants/${studentToDelete}`);
            setEtudiants(etudiants.filter(etudiant => etudiant.id !== studentToDelete));
            setShowDeleteModal(false);
            setStudentToDelete(null);
        } catch (err) {
            setShowDeleteModal(false);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError(err.message);
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const adminName = user ? user.nom || user.name : "Administrateur";
    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* --- Main Content --- */}
            <div className="flex-grow-1 d-flex flex-column">
                <Navbar bg="white" className="shadow-sm border-bottom px-4 py-3 sticky-top justify-content-between">
                    <h5 className="mb-0 text-dark fw-bold">Gestion des Étudiants</h5>
                    <div className="d-flex gap-3 align-items-center">
                        <div className="input-group d-none d-md-flex" style={{ width: '250px' }}>
                            <span className="input-group-text bg-light border-end-0"><Icons.Search /></span>
                            <Form.Control type="text" placeholder="Rechercher..." className="bg-light border-start-0 shadow-none" />
                        </div>
                    </div>
                </Navbar>

                <Container fluid className="p-4">
                    {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="fw-bold text-dark mb-1">Liste des Étudiants</h2>
                            <p className="text-muted mb-0">Gérez les inscriptions et les informations scolaires.</p>
                        </div>
                        <Button variant="primary" onClick={() => navigate('/etudiants/ajouter')} className="d-flex align-items-center gap-2 px-4 py-2 shadow-sm">
                            <Icons.Plus /> Nouveau
                        </Button>
                    </div>

                    <Card className="border-0 shadow-sm overflow-hidden">
                        <Table hover responsive className="mb-0 align-middle">
                            <thead className="bg-light text-muted small text-uppercase">
                                <tr>
                                    <th className="ps-4 py-3 border-bottom-0">ID</th>
                                    <th className="border-bottom-0">Étudiant</th>
                                    <th className="border-bottom-0">Email</th>
                                    <th className="text-end pe-4 border-bottom-0">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {etudiants.length > 0 ? (
                                    etudiants.map((etudiant) => (
                                        <tr key={etudiant.id}>
                                            <td className="ps-4 text-muted small">#{etudiant.id}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center me-3 fw-bold" style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                                                        {etudiant.nom?.charAt(0)}{etudiant.prenom?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold text-dark">{etudiant.nom} {etudiant.prenom}</div>
                                                        <div className="small text-muted">Inscrit</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-secondary">{etudiant.email}</td>
                                            <td className="text-end pe-4">
                                                {localStorage.getItem('role') === 'admin' && (
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(etudiant.id)}
                                                        className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                                                        style={{ width: '32px', height: '32px' }}
                                                        title="Supprimer"
                                                    >
                                                        <Icons.Trash />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted">
                                            Aucun étudiant trouvé. Commencez par en ajouter un.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </Container>
            </div>

            {/* --- Delete Confirmation Modal --- */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton className="border-bottom-0 pb-0">
                    <Modal.Title className="fw-bold text-danger">Supprimer l'étudiant ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center my-3">
                        <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex p-3 mb-3">
                            <Icons.Trash />
                        </div>
                        <p className="fw-medium mb-1">Voulez-vous vraiment supprimer cet étudiant ?</p>
                        <p className="text-muted small">Cette action est irréversible. Toutes les données associées (notes, emploi du temps) seront perdues.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0 pb-4 justify-content-center">
                    <Button variant="light" onClick={() => setShowDeleteModal(false)} className="px-4">
                        Annuler
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} className="px-4">
                        Confirmer la suppression
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// Helper Component for Sidebar Items
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

export default Etudiants;