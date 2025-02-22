import React, { useState } from 'react';

const SkillForm = ({ onSubmit, selectedResult, onClose }) => {
  const [nombre, setNombre] = useState(selectedResult ? selectedResult.name : '');
  const [tipo, setTipo] = useState('');
  const [nivel, setNivel] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, tipo, nivel, descripcion });
    onClose(); // Cerrar el popup al enviar el formulario
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Skill</h2>
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
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>
          <div>
            <label>Nivel:</label>
            <input
              type="number"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
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
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;