import React, { useState } from 'react';
import { addSkill } from '../services/api';

const SkillForm = ({ onSubmit, userEmail, onClose }) => { // Change userId to userEmail
  const [formData, setFormData] = useState({
    email: userEmail, // Change persona_id to email
    competencia: '',
    nivel: '',
    repositorio: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addSkill({
        email: formData.email,
        competencia: formData.competencia,
        nivel: parseInt(formData.nivel),
        repositorio: formData.repositorio
      });
      
      if (response) {
        onSubmit(formData);
        onClose();
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Add Skill</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Competencia:</label>
            <input
              type="text"
              name="competencia"
              value={formData.competencia}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nivel:</label>
            <input
              type="number"
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>Repositorio:</label>
            <input
              type="text"
              name="repositorio"
              value={formData.repositorio}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="add-button">Añadir</button>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;