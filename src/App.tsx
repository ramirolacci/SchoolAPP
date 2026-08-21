import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import type { License } from './types/license';
import type { Payslip } from './types/payslip';
import { initialLicenses, initialPayslips } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './pages/Dashboard';
import { Licenses } from './pages/Licenses';
import { Payslips } from './pages/Payslips';
import { Profile } from './pages/Profile';
import { ModulesPitch } from './pages/ModulesPitch';
import { Login } from './pages/Login';

function AppContent() {
  const navigate = useNavigate();

  // Pre-login state for demo (default: false to present Login screen)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('school_app_auth');
    return savedAuth === 'true';
  });

  // Force 100% Dark Mode permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('school_app_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('school_app_auth');
  };

  // Mock Licenses & Payslips State
  const [licenses, setLicenses] = useState<License[]>(initialLicenses);
  const [payslips, setPayslips] = useState<Payslip[]>(initialPayslips);

  const handleAddLicense = (newLicense: License) => {
    setLicenses((prev) => [newLicense, ...prev]);
  };

  const handleSignPayslip = (id: string) => {
    setPayslips((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'firmado',
              signedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const pendingPayslipsCount = payslips.filter((p) => p.status === 'pendiente').length;
  const pendingLicensesCount = licenses.filter((l) => l.status === 'pendiente' || l.status === 'en_revision').length;

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1511] text-slate-100 transition-colors duration-200">
      <Header 
        pendingPayslipsCount={pendingPayslipsCount} 
        pendingLicensesCount={pendingLicensesCount} 
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                licenses={licenses} 
                payslips={payslips} 
                onOpenNewLicense={() => navigate('/licencias?nueva=true')}
                onSelectPayslip={() => navigate('/recibos')}
              />
            } 
          />
          <Route 
            path="/licencias" 
            element={
              <Licenses 
                licenses={licenses} 
                onAddLicense={handleAddLicense} 
              />
            } 
          />
          <Route 
            path="/recibos" 
            element={
              <Payslips 
                payslips={payslips} 
                onSignPayslip={handleSignPayslip} 
              />
            } 
          />
          <Route path="/modulos" element={<ModulesPitch />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
