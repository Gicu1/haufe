import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CreateParty from './pages/CreateParty';
import EditParty from './pages/EditParty';
import InviteUser from './pages/InviteUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/createparty" element={<ProtectedRoute><CreateParty /></ProtectedRoute>} />
        <Route path="/editparty/:id" element={<ProtectedRoute><EditParty /></ProtectedRoute>} />
        <Route path="/invite/:partyId" element={<ProtectedRoute><InviteUser /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
