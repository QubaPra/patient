import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import PatientList from './components/PatientList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/add" element={<AddPatient />} />
        <Route path="/edit/:id" element={<EditPatient />} />
      </Routes>
    </Router>
  );
};

export default App;
