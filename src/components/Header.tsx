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
    <header className="sticky top-0 z-40 bg-[#101b14]/95 border-b border-[#203529] text-slate-100 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & School Name */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Colegio San Jorge" 
                className="h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-lg tracking-tight text-white leading-tight">
                Colegio San Jorge
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border bg-red-600/20 text-red-300 border-red-500/40">
                  Portal ABC
                </span>
              </div>
              <p className="text-xs text-emerald-400/80">
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
                      ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 shadow-xs'
                      : 'text-slate-300 hover:bg-[#1a2c21] hover:text-white'
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
                className="p-2 rounded-xl text-slate-300 hover:bg-[#1a2c21] hover:text-white transition"
                title="Notificaciones"
              >
                <Bell className="w-5 h-5" />
                {(pendingPayslipsCount > 0 || pendingLicensesCount > 0) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#101b14] animate-pulse" />
                )}
              </button>
            </div>
            
            {/* User Pill */}
            <NavLink to="/perfil" className="hidden lg:flex items-center gap-2.5 group hover:opacity-90 transition">
              <div className="w-9 h-9 rounded-full font-semibold text-xs flex items-center justify-center border shadow-xs bg-emerald-600/30 text-emerald-300 border-emerald-500/40">
                MR
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-white group-hover:text-emerald-300 transition">
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
              className="p-2 rounded-xl text-slate-200 hover:bg-[#1a2c21] md:hidden"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#203529] bg-[#101b14] px-4 pt-2 pb-4 space-y-1">
          <div className="py-2 border-b border-slate-700/60 mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{mockUser.name}</p>
              <p className="text-xs text-slate-400">{mockUser.role} • {mockUser.fileNumber}</p>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs flex items-center gap-1"
                title="Salir"
              >
                <LogOut className="w-4 h-4" /> Salir
              </button>
            )}
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                    : 'text-slate-300 hover:bg-[#1a2c21] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && (
                <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2 py-0.5 rounded-full">
                  {item.badge} pendientes
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};
