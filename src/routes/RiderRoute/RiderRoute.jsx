import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router';
import useRole from '../../hooks/useRole';
import { ClimbingBoxLoader } from 'react-spinners';
import { AuthContext } from '../../contexts/AuthProvider';
import Forbidden from '../../components/Forbidden';

const RiderRoute = ({children}) => {
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
  
    if (role !== 'rider') {
      // যদি user admin না হয়
      return <Forbidden />;
    }
  
    return children;
}

export default RiderRoute
