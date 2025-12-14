import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Navbar, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

// --- Icônes SVG (Use local ones for ActionCards if needed, or import from Layout if shared) ---
// Since we can't easily import from Layout without exporting, we'll keep ActionCard icons local here for simplicity.
const Icons = {
    Students: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    Grades: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

const EspaceProfesseur = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const result = localStorage.getItem('user');
        if (result) {
            setUser(JSON.parse(result));
        }
    }, []);

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            {/* Navbar du haut */}
            <Navbar bg="white" className="shadow-sm border-bottom px-4 py-3 sticky-top">
                <h5 className="mb-0 text-dark fw-bold">Tableau de bord Enseignant</h5>
            </Navbar>

            <Container fluid className="p-4">
                {/* Bannière de Bienvenue */}
                <Card className="border-0 shadow-sm mb-4 bg-success text-white overflow-hidden position-relative">
                    {/* Motif décoratif en arrière-plan */}
                    <div className="position-absolute end-0 bottom-0 opacity-25" style={{ transform: 'translate(10%, 10%)' }}>
                        <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                    </div>
                    <Card.Body className="p-4 position-relative z-1">
                        <h2 className="fw-bold">Bonjour, Pr. {user?.nom || 'Enseignant'} !</h2>
                        <p className="lead mb-0 opacity-90">Bienvenue sur votre espace de gestion académique.</p>
                    </Card.Body>
                </Card>

                {/* Cartes d'Actions Rapides */}
                <Row className="g-4">
                    <Col md={6}>
                        <ActionCard
                            icon={<Icons.Students />}
                            title="Gestion des Étudiants"
                            description="Consultez la liste de vos étudiants, leurs coordonnées et leur assiduité."
                            link="/etudiants"
                            color="primary"
                            btnText="Voir la liste"
                        />
                    </Col>
                    <Col md={6}>
                        <ActionCard
                            icon={<Icons.Grades />}
                            title="Saisie des Notes"
                            description="Ajoutez, modifiez ou validez les notes des examens et contrôles continus."
                            link="/saisie-notes"
                            color="success"
                            btnText="Saisir les notes"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// --- Composants Réutilisables ---

const ActionCard = ({ icon, title, description, link, color, btnText }) => (
    <Card className="border-0 shadow-sm h-100 hover-lift">
        <Card.Body className="p-4">
            <div className={`d-inline-flex p-3 rounded-3 bg-${color} bg-opacity-10 text-${color} mb-3`}>
                <span style={{ width: '32px', height: '32px' }}>{icon}</span>
            </div>
            <h4 className="fw-bold mb-2">{title}</h4>
            <p className="text-muted mb-4">{description}</p>
            <Button as={Link} to={link} variant={`outline-${color}`} className="d-flex align-items-center gap-2 fw-bold">
                {btnText} <Icons.ArrowRight />
            </Button>
        </Card.Body>
    </Card>
);

export default EspaceProfesseur;