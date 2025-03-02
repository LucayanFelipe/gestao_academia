import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user }) => {
  if (!user) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" />;
  }

  // Se o usuário estiver autenticado, renderiza a rota solicitada
  return <Outlet />;
};

export default ProtectedRoute;