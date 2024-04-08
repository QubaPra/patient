import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Patient {
  first_name: string;
  last_name: string;
  pesel: string;
  street: string;
  city: string;
  zip_code: string;
}

const EditPatient: React.FC = () => {
  const [formData, setFormData] = useState<Patient>({
    first_name: '',
    last_name: '',
    pesel: '',
    street: '',
    city: '',
    zip_code: '',
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/patients/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/patients/${id}`, formData);
      // Redirect to patient list after successful update
      navigate('/patient/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 window text-black p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-white">First Name:</label>
          <input type="text" id="firstName" name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 px-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-white">Last Name:</label>
          <input type="text" id="lastName" name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 px-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="pesel" className="block text-sm font-medium text-white">PESEL:</label>
          <input type="text" id="pesel" name="pesel" value={formData.pesel} onChange={handleChange} className="mt-1 px-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-white">Street:</label>
          <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} className="mt-1 px-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-white">City:</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 px-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-white">Zip Code:</label>
          <input type="text" id="zipCode" name="zip_code" value={formData.zip_code} onChange={handleChange} className="mt-1 px-1 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </div>
        <button type="submit" className="inline-block bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-600 focus:outline-none focus:bg-lime-600">Submit</button>
      </form>
    </div>
  );
};

export default EditPatient;
