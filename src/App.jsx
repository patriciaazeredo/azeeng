import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import HomePage from '@/pages/HomePage';
    import AdminLoginPage from '@/pages/AdminLoginPage';
    import AdminDashboardPage from '@/pages/AdminDashboardPage';
    import ProtectedRoute from '@/components/ProtectedRoute';
    import { Toaster } from '@/components/ui/toaster';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import { AuthProvider } from '@/contexts/AuthContext';

    function App() {
      return (
        <Router>
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-100 via-slate-50 to-stone-100 text-slate-800">
              <Navbar />
              <main className="flex-grow pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </AuthProvider>
        </Router>
      );
    }

    export default App;