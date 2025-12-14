import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Dropdown, Table, Badge, Button, ProgressBar } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// --- Internal SVG Icons (No external dependencies needed) ---
const Icons = {
    Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    Students: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Teachers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    Subjects: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    Planning: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Components: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
};

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    // --- Mock Data (Replace with API calls later) ---
    const stats = {
        students: 124,
        teachers: 12,
        subjects: 8,
        hours: 24
    };

    const recentRegistrations = [
        { id: 1, name: "Amine Benali", course: "Informatique", date: "12 Déc", status: "Confirmé" },
        { id: 2, name: "Sarah Tazi", course: "Gestion", date: "11 Déc", status: "En attente" },
        { id: 3, name: "Kamal Idrissi", course: "Marketing", date: "10 Déc", status: "Confirmé" },
    ];

    useEffect(() => {
        const result = localStorage.getItem('user');
        if (result) {
            setUser(JSON.parse(result));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const adminName = user ? user.nom || user.name : "Administrateur";

    // Helper for Sidebar Active State
    const isActive = (path) => location.pathname === path;

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* --- Main Content --- */}
            <div className="flex-grow-1 d-flex flex-column">
                <Navbar bg="white" className="shadow-sm border-bottom px-4 py-3 sticky-top justify-content-between">
                    <h5 className="mb-0 text-dark fw-bold">Vue d'ensemble</h5>
                    <div className="text-muted small">Dernière connexion: Aujourd'hui</div>
                </Navbar>

                <Container fluid className="p-4">
                    {/* Stats Grid */}
                    <Row className="g-4 mb-4">
                        <StatCard
                            title="Étudiants"
                            count={stats.students}
                            color="primary"
                            icon="👨‍🎓"
                            trend="+5% ce mois"
                            link="/etudiants"
                        />
                        <StatCard
                            title="Professeurs"
                            count={stats.teachers}
                            color="success"
                            icon="👩‍🏫"
                            trend="Stable"
                            link="/professeurs"
                        />
                        <StatCard
                            title="Matières"
                            count={stats.subjects}
                            color="warning"
                            icon="📚"
                            trend="2 nouvelles"
                            link="/matieres"
                        />
                        <StatCard
                            title="Heures Cours"
                            count={stats.hours}
                            color="info"
                            icon="🗓️"
                            trend="Planning actif"
                            link="/admin/planning"
                        />
                    </Row>

                    {/* Content Section: Table & Tasks */}
                    <Row className="g-4">
                        {/* Recent Activity Table */}
                        <Col lg={8}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Header className="bg-white py-3 border-bottom-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0 fw-bold text-dark">Dernières Inscriptions</h6>
                                        <Button variant="light" size="sm" as={Link} to="/etudiants" className="text-primary fw-bold">Tout voir</Button>
                                    </div>
                                </Card.Header>
                                <Table responsive hover className="mb-0 align-middle text-nowrap">
                                    <thead className="bg-light text-muted small text-uppercase">
                                        <tr>
                                            <th className="ps-4 border-0">Nom</th>
                                            <th className="border-0">Filière</th>
                                            <th className="border-0">Date</th>
                                            <th className="border-0">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {recentRegistrations.map((student) => (
                                            <tr key={student.id}>
                                                <td className="ps-4 fw-bold text-dark">{student.name}</td>
                                                <td className="text-muted">{student.course}</td>
                                                <td className="text-muted small">{student.date}</td>
                                                <td>
                                                    <Badge bg={student.status === "Confirmé" ? "success-subtle" : "warning-subtle"}
                                                        text={student.status === "Confirmé" ? "success" : "warning"}
                                                        className="px-2 py-1 rounded-2">
                                                        {student.status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>

                        {/* Side Widgets */}
                        <Col lg={4}>
                            <Card className="border-0 shadow-sm mb-4">
                                <Card.Body>
                                    <h6 className="fw-bold mb-3">Progression du Semestre</h6>
                                    <div className="mb-3">
                                        <div className="d-flex justify-content-between small mb-1">
                                            <span>Cours terminés</span>
                                            <span className="fw-bold">45%</span>
                                        </div>
                                        <ProgressBar variant="primary" now={45} style={{ height: '6px' }} />
                                    </div>
                                    <div className="mb-1">
                                        <div className="d-flex justify-content-between small mb-1">
                                            <span>Examens</span>
                                            <span className="fw-bold">20%</span>
                                        </div>
                                        <ProgressBar variant="warning" now={20} style={{ height: '6px' }} />
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 shadow-sm bg-primary text-white">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 className="fw-bold mb-1">Besoin d'aide ?</h6>
                                        <p className="small mb-0 text-white-50">Contacter le support technique</p>
                                    </div>
                                    <div className="bg-white bg-opacity-25 rounded-circle p-2 fs-4">?</div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

// --- Reusable Sub-Components (Keep file clean) ---

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

const StatCard = ({ title, count, color, icon, trend, link }) => (
    <Col md={3}>
        <Card className="border-0 shadow-sm h-100 hover-lift" style={{ transition: 'transform 0.2s' }}>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className={`bg-${color} bg-opacity-10 rounded p-3`}>
                        <span className="fs-4">{icon}</span>
                    </div>
                    <Badge bg={`${color}-subtle`} text={color} className="rounded-pill">
                        {trend}
                    </Badge>
                </div>
                <h3 className="fw-bold text-dark mb-1">{count}</h3>
                <span className="text-muted small text-uppercase fw-bold">{title}</span>
                <Link to={link} className="stretched-link"></Link>
            </Card.Body>
        </Card>
    </Col>
);

export default Dashboard;