import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPatient: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    pesel: '',
    street: '',
    city: '',
    zip_code: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/patients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const createdPatient = await response.json();
        console.log("New patient created:", createdPatient);
        // Navigate to patient list after successful addition
        navigate('/patient/');
      } else {
        console.error("Failed to create patient:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
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
          <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPatient;
