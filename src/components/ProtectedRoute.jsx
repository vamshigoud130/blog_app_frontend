import React from 'react'
import { useAuth } from '../store/authStore';

function ProtectedRoute() {

    const {loading,currentUser,isAuthenticated} = useAuth();
    if(loading)
    {
        return <p>loading....</p>
    }
    if(!isAuthenticated)
    {
        return <Navigate to = "/login" replace/>
    }

  return (
    <div>ProtectedRoute</div>
  )

  
}

export default ProtectedRoute;
