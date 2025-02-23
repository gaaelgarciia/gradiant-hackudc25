import React, { useEffect, useState } from 'react';
import { fetchPerfil } from '../services/api';

const UserInfoPopup = ({ user, onClose, onLogout }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchPerfil(user.id);
        setUserInfo(data);
      } catch (err) {
        setError('Error al cargar la información del usuario');
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, [user.id]);

  if (loading) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="loading">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Error</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  const displayInfo = userInfo || user;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>User info</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="user-info-content">
          <p><strong>Email:</strong> {displayInfo.email}</p>
          {displayInfo.skills && (
            <>
              <h3>Skills</h3>
              <ul className="skills-list">
                {displayInfo.skills.map((skill, index) => (
                  <li key={index} className="skill-item">
                    {typeof skill === 'object' 
                      ? `${skill.skill}: Nivel ${skill.level}`
                      : skill}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="button-container">
            <button className="logout-button" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPopup;