import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Etudiants from './components/Etudiants';
import Professeurs from './components/Professeurs';
import Matieres from './components/Matieres';
import Notes from './components/Notes';
import AddProfesseur from './components/AddProfesseur';
import AddMatiere from './components/AddMatiere';
import AddEtudiant from './components/AddEtudiant';
import ModifierMatiere from './components/ModifierMatiere';
import EspaceEtudiant from './components/EspaceEtudiant';
import EspaceProfesseur from './components/EspaceProfesseur';
import SaisieNotes from './components/SaisieNotes';
import MonPlanning from './components/MonPlanning';
import Emploi from './components/Emploi';

import Layout from './components/Layout';

import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Espaces */}
          <Route path="/espace-etudiant" element={<EspaceEtudiant />} />
          <Route path="/espace-professeur" element={<EspaceProfesseur />} />
          <Route path="/saisie-notes" element={<SaisieNotes />} />

          {/* Modules */}
          <Route path="/etudiants" element={<Etudiants />} />
          <Route path="/etudiants/ajouter" element={<AddEtudiant />} />


          <Route path="/mon-planning" element={<MonPlanning />} />
          <Route path="/admin/planning" element={<Emploi />} />

          <Route path="/professeurs" element={<Professeurs />} />
          <Route path="/professeurs/ajouter" element={<AddProfesseur />} />

          <Route path="/matieres" element={<Matieres />} />
          <Route path="/matieres/ajouter" element={<AddMatiere />} />
          <Route path="/matieres/modifier/:id" element={<ModifierMatiere />} />

          <Route path="/notes" element={<Notes />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
