import React, { useEffect, useState } from 'react';
import { fetchPerfil } from '../services/api';

const UserInfoPopup = ({ userId, onClose, onLogout }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchPerfil(userId);
      setUserInfo(data);
    };

    getUserInfo();
  }, [userId]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Información del Usuario</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div>
          <p><strong>Nombre:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <h3>Skills</h3>
          <ul>
            {userInfo.skills.map((skill, index) => (
              <li key={index}>{skill.skill}: Level {skill.level}</li>
            ))}
          </ul>
          <h3>Repositorios</h3>
          <ul>
            {userInfo.repositories.map((repo, index) => (
              <li key={index}>{repo}</li>
            ))}
          </ul>
          <div className="logout-button-container">
            <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPopup;