import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  pesel: string;
  street: string;
  city: string;
  zip_code: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/patients/');
        setPatients(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 window text-white p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Patient List</h2>
      <Link to="./add" className="text-black font-semibold mb-4 block">+ Add Patient</Link>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">First Name</th>
            <th className="text-left">Last Name</th>
            <th className="text-left">PESEL</th>
            <th className="text-left">Street</th>
            <th className="text-left">City</th>
            <th className="text-left">Zip Code</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="border-b border-white-900 ">
              <td className="px-0 py-2">{patient.first_name}</td>
              <td className="px-0 py-2">{patient.last_name}</td>
              <td className="px-0 py-2">{patient.pesel}</td>
              <td className="px-0 py-2">{patient.street}</td>
              <td className="px-0 py-2">{patient.city}</td>
              <td className="px-0 py-2">{patient.zip_code}</td>
              <td>
                <Link to={`./edit/${patient.id}`} className="text-black mr-2">Edit</Link>
                <button className="text-red-500" onClick={() => deletePatient(patient.id)}>Delete</button>
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
    await axios.delete(`http://127.0.0.1:8000/patients/${id}`);
    // Refresh patient list after successful deletion
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
  }
};

export default PatientList;
