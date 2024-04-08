import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPatient from './components/AddPatient';
import EditPatient from './components/EditPatient';
import PatientList from './components/PatientList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/patient/" element={<PatientList />} />
        <Route path="/patient/add" element={<AddPatient />} />
        <Route path="/patient/edit/:id" element={<EditPatient />} />
      </Routes>
    </Router>
  );
};

export default App;
