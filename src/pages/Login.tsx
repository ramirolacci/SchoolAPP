import React, { useState } from 'react';
import { 
  UserCheck, 
  Lock, 
  User, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { mockUser } from '../data/mockData';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('27-34567890-4');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 500);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-[#0d1511] text-slate-100 transition-colors duration-200">
      
      {/* Container Box */}
      <div className="max-w-md w-full space-y-6">
        
        {/* Institutional Header Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-2 mb-1">
            <img 
              src="/logo.png" 
              alt="Logo Colegio San Jorge" 
              className="h-24 w-auto object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Colegio San Jorge
          </h1>
          <p className="text-xs sm:text-sm text-emerald-400/90 font-medium">
            Portal Oficial de Licencias & Recibos Digitales (DGCyE ABC)
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#132019] rounded-3xl border border-[#203529] shadow-xl p-6 sm:p-8 space-y-6">
          
          <div className="border-b border-[#203529] pb-4 text-center">
            <h2 className="text-base font-bold text-white">
              Acceso a la Plataforma
            </h2>
            <p className="text-xs text-slate-400">
              Ingresá con tu CUIL / DNI y clave institucional
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* CUIL / Legajo */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                CUIL / DNI del Agente
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="27-XXXXXXXX-X"
                  className="w-full bg-[#0a110d] border border-[#203529] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-mono"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a110d] border border-[#203529] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  required
                />
              </div>
            </div>

            {/* Standard Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? 'Ingresando...' : (
                <>
                  Iniciar Sesión <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#203529]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#132019] px-3 text-slate-400 font-semibold">
                O Modo Demostración
              </span>
            </div>
          </div>

          {/* GUEST DEMO BUTTON */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border-2 border-emerald-500/40 font-bold p-3.5 rounded-2xl transition-all shadow-sm flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-extrabold block">
                  Entrar como Invitado (DEMO)
                </span>
                <span className="text-sm font-extrabold text-white block">
                  {mockUser.name}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  {mockUser.role} • Legajo {mockUser.fileNumber}
                </span>
              </div>
            </div>

            <Sparkles className="w-5 h-5 text-amber-500 shrink-0 group-hover:rotate-12 transition-transform" />
          </button>

        </div>

        {/* Security Footer Note */}
        <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Firma Digital Certificada Ley N° 25.506 • Portal San Jorge</span>
        </div>

      </div>

    </div>
  );
};
