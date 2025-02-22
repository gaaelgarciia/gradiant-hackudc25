import React from 'react';

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="login-screen">
      <button className="login-button" onClick={onLogin}>
        Iniciar Sesión
      </button>
    </div>
  );
};

export default LoginScreen;