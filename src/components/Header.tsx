import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FileText, 
  Receipt, 
  User, 
  LayoutDashboard, 
  Menu, 
  X, 
  Bell,
  Sparkles,
  LogOut
} from 'lucide-react';
import { mockUser } from '../data/mockData';

interface HeaderProps {
  pendingPayslipsCount?: number;
  pendingLicensesCount?: number;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  pendingPayslipsCount = 0,
  pendingLicensesCount = 0,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { 
      name: 'Licencias', 
      path: '/licencias', 
      icon: FileText,
      badge: pendingLicensesCount > 0 ? pendingLicensesCount : undefined
    },
    { 
      name: 'Recibos', 
      path: '/recibos', 
      icon: Receipt,
      badge: pendingPayslipsCount > 0 ? pendingPayslipsCount : undefined
    },
    { name: 'Módulos Colegio', path: '/modulos', icon: Sparkles },
    { name: 'Perfil', path: '/perfil', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 border-b border-slate-800 text-slate-100 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & School Name */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5 shrink-0 border border-slate-700/60 shadow-xs transition-transform duration-200 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Logo Colegio San Jorge" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-lg tracking-tight text-white leading-tight">
                Colegio San Jorge
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border bg-blue-500/20 text-blue-300 border-blue-400/30">
                  Portal ABC
                </span>
              </div>
              <p className="text-xs text-blue-400/80">
                Mis Licencias & Recibos Digitales
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/40 shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.badge !== undefined && (
                  <span className="ml-1 bg-amber-500 text-slate-950 font-extrabold text-[11px] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Quick Info & Actions */}
          <div className="flex items-center gap-3 border-l border-slate-700/60 pl-4">
            
            {/* Notifications Icon */}
            <div className="relative hidden sm:block">
              <button 
                type="button" 
                className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
                title="Notificaciones"
              >
                <Bell className="w-5 h-5" />
                {(pendingPayslipsCount > 0 || pendingLicensesCount > 0) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#0f172a] animate-pulse" />
                )}
              </button>
            </div>
            
            {/* User Pill */}
            <NavLink to="/perfil" className="hidden lg:flex items-center gap-2.5 group hover:opacity-90 transition">
              <div className="w-9 h-9 rounded-full font-semibold text-xs flex items-center justify-center border shadow-xs bg-blue-600/30 text-blue-300 border-blue-500/40">
                MR
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white group-hover:text-blue-300 transition">
                  {mockUser.name.split(' ')[1]} {mockUser.name.split(' ')[2]}
                </p>
                <p className="text-[11px] text-slate-400">{mockUser.fileNumber}</p>
              </div>
            </NavLink>

            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="hidden sm:flex p-2 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-slate-800/60 transition"
                title="Cerrar Sesión Demo"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-200 hover:bg-slate-800 md:hidden"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay & Side Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Animated Glass Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide Drawer Content */}
          <div className="relative w-full max-w-xs bg-gradient-to-b from-[#1a2032] via-[#161a29] to-[#0f121c] text-slate-100 h-full shadow-2xl border-l border-slate-700/50 flex flex-col z-10 animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header / Close Button */}
            <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-[#1f263b]/60 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5 shrink-0 border border-slate-700/60 shadow-xs">
                  <img 
                    src="/logo.png" 
                    alt="Colegio San Jorge" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Colegio San Jorge</h3>
                  <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase">Portal ABC</span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-transparent hover:border-slate-700"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Hero Card */}
            <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-blue-900/40 via-[#1e273e]/60 to-slate-900/80 border border-blue-500/20 shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-base flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-blue-400/30">
                    MR
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-[#161a29]" title="Usuario activo" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate leading-snug">
                    {mockUser.name}
                  </p>
                  <p className="text-xs text-blue-300/80 font-medium truncate">
                    {mockUser.role}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700 font-mono">
                      {mockUser.fileNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu Links */}
            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Navegación Principal
              </div>
              
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/30 to-indigo-600/20 text-white font-semibold border border-blue-500/40 shadow-sm shadow-blue-500/10'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-blue-500 text-white shadow-xs shadow-blue-500/50' 
                            : 'bg-slate-800/80 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-800'
                        }`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      
                      {item.badge !== undefined ? (
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                          {item.badge}
                        </span>
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isActive ? 'bg-blue-400' : 'bg-transparent group-hover:bg-slate-600'
                        }`} />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer / Quick Logout Actions */}
            <div className="p-4 border-t border-slate-800/80 bg-[#121522]/90 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Ciclo Lectivo 2026
                </span>
                <span className="font-mono text-[10px] text-slate-500">v2.4 ABC</span>
              </div>

              {onLogout && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500/15 to-rose-600/10 hover:from-rose-500/25 hover:to-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión Portal
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

