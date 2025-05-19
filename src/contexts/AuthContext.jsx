import React, { createContext, useContext, useState, useEffect } from 'react';
    import { supabase } from '@/lib/supabase';
    import { useNavigate } from 'react-router-dom';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [session, setSession] = useState(null);
      const [loadingAuth, setLoadingAuth] = useState(true);
      const navigate = useNavigate();

      useEffect(() => {
        const getSession = async () => {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoadingAuth(false);
        };
        
        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (_event, sessionState) => {
            setSession(sessionState);
            setUser(sessionState?.user ?? null);
            setLoadingAuth(false);
          }
        );

        return () => {
          authListener?.subscription.unsubscribe();
        };
      }, []);

      const login = (userData, sessionData) => {
        setUser(userData);
        setSession(sessionData);
      };

      const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        navigate('/admin/login');
      };

      const value = {
        user,
        session,
        login,
        logout,
        loadingAuth,
      };

      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };