import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* Top Navbar */}
            <Navbar bg="white" expand="lg" className="shadow-sm border-bottom mb-4 sticky-top">
                <Container>
                    <Navbar.Brand
                        onClick={() => navigate(role === 'admin' ? '/dashboard' : '/')}
                        style={{ cursor: 'pointer', fontWeight: '800', color: '#0d6efd', fontSize: '1.5rem' }}
                    >
                        GestionÉtudiants
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            {role === 'admin' && (
                                <>
                                    <Nav.Link onClick={() => navigate('/etudiants')} className="fw-semibold mx-2">Étudiants</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/professeurs')} className="fw-semibold mx-2">Professeurs</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/matieres')} className="fw-semibold mx-2">Matières</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/notes')} className="fw-semibold mx-2">Notes</Nav.Link>
                                </>
                            )}

                            {role === 'etudiant' && (
                                <>
                                    <Nav.Link onClick={() => navigate('/espace-etudiant')} className="fw-semibold mx-2">Accueil</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/mon-planning')} className="fw-semibold mx-2">Mon Planning</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/notes')} className="fw-semibold mx-2">Mes Notes</Nav.Link>
                                </>
                            )}

                            {role === 'professeur' && (
                                <>
                                    <Nav.Link onClick={() => navigate('/espace-professeur')} className="fw-semibold mx-2">Accueil</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/etudiants')} className="fw-semibold mx-2">Liste Étudiants</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/saisie-notes')} className="fw-semibold mx-2">Saisie Notes</Nav.Link>
                                </>
                            )}

                            {token ? (
                                <Button variant="outline-danger" size="sm" className="ms-3 rounded-pill px-3" onClick={handleLogout}>
                                    Déconnexion
                                </Button>
                            ) : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content Area */}
            <main className="pb-5">
                <Outlet />
            </main>

            {/* Simple Footer */}
            <footer className="text-center text-muted py-4 small mt-auto border-top bg-white">
                <Container>
                    &copy; {new Date().getFullYear()} Gestion Etudiants. All rights reserved.
                </Container>
            </footer>
        </div>
    );
};

export default Layout;
