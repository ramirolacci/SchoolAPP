import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] border-t border-slate-800 text-slate-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center shrink-0">
            <img 
              src="/logo.png" 
              alt="Logo Colegio San Jorge" 
              className="h-9 w-auto object-contain"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">
              Colegio San Jorge • Portal Docente ABC (Gral. Pacheco)
            </p>
            <p className="text-[11px] text-slate-400">
              Sistema Digital de Licencias & Recibos de Sueldo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Firma Digital Certificada Ley N° 25.506</span>
        </div>

        <div className="text-xs text-slate-400 text-center sm:text-right">
          <p>© {new Date().getFullYear()} Colegio San Jorge. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
};
