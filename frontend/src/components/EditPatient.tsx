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
    <div>
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.first_name} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.last_name} onChange={handleChange} />
        </label>
        <label>
          PESEL:
          <input type="text" name="pesel" value={formData.pesel} onChange={handleChange} />
        </label>
        <label>
          Street:
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          Zip Code:
          <input type="text" name="zipCode" value={formData.zip_code} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditPatient;
