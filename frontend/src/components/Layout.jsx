import React from 'react';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';

const Icons = {
    Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
    Students: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Teachers: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    Subjects: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
    Planning: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Logout: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    Grades: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
};

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const location = useLocation();

    // Recover user safely
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        // ignore
    }

    const userName = user ? (user.nom || user.name) : (role === 'admin' ? 'Administrateur' : 'Utilisateur');
    const userLabel = role === 'admin' ? 'Admin' : (role === 'professeur' ? 'Enseignant' : 'Étudiant');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    // Helper for Sidebar Items
    const NavItem = ({ to, icon, label }) => (
        <Nav.Link
            as={Link}
            to={to}
            className={`d-flex align-items-center px-3 py-2 rounded mb-1 ${isActive(to)
                ? (role === 'professeur' ? 'bg-success text-white shadow-sm' : 'bg-primary text-white shadow-sm')
                : 'text-white-50 hover-light'
                }`}
            style={{ transition: 'all 0.2s' }}
        >
            <span className="me-3 d-flex align-items-center">{icon}</span>
            <span className="fw-medium">{label}</span>
        </Nav.Link>
    );

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            {/* --- Sidebar --- */}
            <div className="d-flex flex-column p-3 text-white bg-dark" style={{ width: '260px', minHeight: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100 }}>
                <div onClick={() => navigate(role === 'professeur' ? '/espace-professeur' : '/dashboard')}
                    className="d-flex align-items-center mb-4 text-white text-decoration-none px-2"
                    style={{ cursor: 'pointer' }}
                >
                    <div className={`rounded-circle d-flex align-items-center justify-content-center me-2 ${role === 'professeur' ? 'bg-success' : 'bg-primary'}`} style={{ width: '35px', height: '35px' }}>
                        {role === 'professeur' ? '👨‍🏫' : '🎓'}
                    </div>
                    <span className="fs-5 fw-bold">{role === 'professeur' ? 'Espace Prof' : 'Gestion École'}</span>
                </div>

                <Nav className="flex-column mb-auto gap-1">
                    {/* --- ADMIN LINKS --- */}
                    {role === 'admin' && (
                        <>
                            <NavItem to="/dashboard" icon={<Icons.Dashboard />} label="Tableau de bord" />
                            <NavItem to="/etudiants" icon={<Icons.Students />} label="Étudiants" />
                            <NavItem to="/professeurs" icon={<Icons.Teachers />} label="Professeurs" />
                            <NavItem to="/matieres" icon={<Icons.Subjects />} label="Matières" />
                            <NavItem to="/admin/planning" icon={<Icons.Planning />} label="Emploi du temps" />
                        </>
                    )}

                    {/* --- PROFESSOR LINKS --- */}
                    {role === 'professeur' && (
                        <>
                            <NavItem to="/espace-professeur" icon={<Icons.Home />} label="Accueil" />
                            <NavItem to="/etudiants" icon={<Icons.Students />} label="Mes Étudiants" />
                            <NavItem to="/saisie-notes" icon={<Icons.Grades />} label="Saisie des Notes" />
                        </>
                    )}

                    {/* --- STUDENT LINKS --- */}
                    {role === 'etudiant' && (
                        <>
                            <NavItem to="/espace-etudiant" icon={<Icons.Home />} label="Accueil" />
                            <NavItem to="/mon-planning" icon={<Icons.Planning />} label="Mon Emploi du Temps" />
                            <NavItem to="/notes" icon={<Icons.Grades />} label="Mes Notes" />
                        </>
                    )}
                </Nav>

                <hr className="border-secondary" />

                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic" className="d-flex align-items-center w-100 text-start border-0 px-2 py-2">
                        <div className="rounded-circle bg-secondary me-2 d-flex justify-content-center align-items-center text-white fw-bold" style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                            {userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-truncate fw-bold" style={{ fontSize: '0.9rem' }}>{userName}</div>
                            <div className="text-white-50 small" style={{ fontSize: '0.75rem' }}>{userLabel}</div>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="shadow border-0">
                        <Dropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2">
                            <Icons.Logout /> Déconnexion
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* --- Main Content Area --- */}
            <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '260px' }}>
                <main className="pb-5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
