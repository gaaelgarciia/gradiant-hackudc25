import React, { useState, useEffect } from 'react';
import { fetchProgrammingLanguages, addSkill } from '../services/api';

const SkillForm = ({ onSubmit, selectedResult, onClose }) => {
  const [nombre, setNombre] = useState(selectedResult ? selectedResult.name : '');
  const [tipo, setTipo] = useState('');
  const [nivel, setNivel] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [programmingLanguages, setProgrammingLanguages] = useState([]);

  useEffect(() => {
    const loadLanguages = async () => {
      const languages = await fetchProgrammingLanguages();
      setProgrammingLanguages(languages);
    };
    
    loadLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personaId = selectedResult ? selectedResult.id : null;
    const response = await addSkill(personaId, tipo, nivel, descripcion);
    if (response) {
      onSubmit({ nombre, tipo, nivel, descripcion });
      onClose(); // Cerrar el popup al enviar el formulario
    } else {
      console.error("Error adding skill");
    }
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
            <label>Nombre del Tópico:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tipo del Tópico:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Seleccione un tipo</option>
              {programmingLanguages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Nivel:</label>
            <input
              type="number"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-button">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;