import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router';
import Forbidden from '../components/Forbidden';
import { ClimbingBoxLoader } from 'react-spinners';
import useRole from '../hooks/useRole';
import { AuthContext } from '../contexts/AuthProvider';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  if (!user) {
    // যদি user login না থাকে, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'admin') {
    // যদি user admin না হয়
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;