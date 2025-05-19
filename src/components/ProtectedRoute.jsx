import React from 'react';
    import { Navigate } from 'react-router-dom';
    import { useAuth } from '@/contexts/AuthContext';
    import { Loader2 } from 'lucide-react';

    const ProtectedRoute = ({ children }) => {
      const { user, loadingAuth } = useAuth();

      if (loadingAuth) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
          </div>
        );
      }

      if (!user) {
        return <Navigate to="/admin/login" replace />;
      }

      return children;
    };

    export default ProtectedRoute;