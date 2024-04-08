import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  pesel: string;
  street: string;
  city: string;
  zipCode: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/patients/');
        setPatients(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patient List</h2>
      <Link to="/add">Add Patient</Link>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>PESEL</th>
            <th>Street</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.pesel}</td>
              <td>{patient.street}</td>
              <td>{patient.city}</td>
              <td>{patient.zipCode}</td>
              <td>
                <Link to={`/edit/${patient.id}`}>Edit</Link> |{' '}
                <button onClick={() => deletePatient(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const deletePatient = async (id: number) => {
  try {
    await axios.delete(`/patients/${id}`);
    // Refresh patient list after successful deletion
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
  }
};

export default PatientList;
