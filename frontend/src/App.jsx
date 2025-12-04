import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Etudiants from './components/Etudiants';
import Professeurs from './components/Professeurs';
import Matieres from './components/Matieres';
import Notes from './components/Notes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/professeurs" element={<Professeurs />} />
        <Route path="/matieres" element={<Matieres />} />
        <Route path="/notes" element={<Notes />} />
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
