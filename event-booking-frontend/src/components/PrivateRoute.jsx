import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, role }){
  const token = localStorage.getItem('token');
  const userRoles = localStorage.getItem('roles');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && !userRoles.includes(role)) {
    return <Navigate to="/login" />;
  }


  return children;
};
