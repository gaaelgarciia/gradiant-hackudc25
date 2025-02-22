import React from 'react';
import './Popup.css'; // Asegúrate de tener los estilos CSS en un archivo separado

const MoreInfoPopup = ({ user, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Información del Usuario</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <h3>Skills</h3>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h3>Repositorios</h3>
          <ul>
            {user.repositories.map((repo, index) => (
              <li key={index}>{repo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoPopup;