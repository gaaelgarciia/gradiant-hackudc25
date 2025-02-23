import React, { useState, useEffect } from 'react';
import { addSkill, fetchProgrammingLanguages } from '../services/api';

const SkillForm = ({ onSubmit, userEmail, onClose }) => {
  const [formData, setFormData] = useState({
    email: userEmail,
    competencia: '',
    nivel: '',
    repositorio: ''
  });
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const programmingLanguages = await fetchProgrammingLanguages();
        setLanguages(programmingLanguages);
        // Set first language as default if available
        if (programmingLanguages.length > 0) {
          setFormData(prev => ({
            ...prev,
            competencia: programmingLanguages[0]
          }));
        }
      } catch (error) {
        console.error('Error loading programming languages:', error);
      }
    };

    loadLanguages();
  }, []);

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
            <label>Knowledge:</label>
            <select
              name="competencia"
              value={formData.competencia}
              onChange={handleChange}
              required
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Level:</label>
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
            <label>Repository:</label>
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