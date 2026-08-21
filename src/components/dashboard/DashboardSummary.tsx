import React from 'react';
import type { License } from '../../types/license';
import type { Payslip } from '../../types/payslip';
import { mockUser } from '../../data/mockData';
import { 
  FileText, 
  Receipt, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  UserCheck, 
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardSummaryProps {
  licenses: License[];
  payslips: Payslip[];
  onOpenNewLicense: () => void;
  onSelectPayslip: (payslip: Payslip) => void;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  licenses,
  payslips,
  onOpenNewLicense,
  onSelectPayslip
}) => {
  const pendingPayslips = payslips.filter((p) => p.status === 'pendiente');
  const pendingLicenses = licenses.filter((l) => l.status === 'pendiente' || l.status === 'en_revision');
  const approvedLicenses = licenses.filter((l) => l.status === 'aprobada');
  const recentLicenses = licenses.slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-500/30 relative overflow-hidden">
        {/* Soft glow */}
        <div className="absolute -right-8 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute right-20 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 mb-2">
              <GraduationCap className="w-3.5 h-3.5" /> Portal Docente Oficial ABC
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bienvenida, {mockUser.name.split(' ')[1]}
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              {mockUser.role} • Legajo <span className="font-mono font-semibold text-white">{mockUser.fileNumber}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenNewLicense}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-lg flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Cargar Licencia
            </button>
            <Link
              to="/recibos"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition text-sm flex items-center gap-2"
            >
              <Receipt className="w-4 h-4 text-blue-400" /> Ver Recibos
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Recibos Pendientes */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recibos por Firmar</span>
            <div className={`p-2.5 rounded-xl border ${pendingPayslips.length > 0 ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-[#0f172a] text-slate-400 border-slate-700'}`}>
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{pendingPayslips.length}</span>
            <span className="text-xs text-slate-400">pendiente(s)</span>
          </div>
          {pendingPayslips.length > 0 ? (
            <p className="text-xs text-amber-400 font-semibold mt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Requiere firma digital
            </p>
          ) : (
            <p className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Todos al día
            </p>
          )}
        </div>

        {/* Licencias en Trámite */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Licencias en Trámite</span>
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-300 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{pendingLicenses.length}</span>
            <span className="text-xs text-slate-400">en proceso</span>
          </div>
          <p className="text-xs text-blue-400 font-medium mt-2">
            Pendientes o en revisión
          </p>
        </div>

        {/* Licencias Aprobadas */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Licencias Aprobadas</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{approvedLicenses.length}</span>
            <span className="text-xs text-slate-400">aprobadas este año</span>
          </div>
          <p className="text-xs text-emerald-400 font-medium mt-2">
            Histórico procesado correctamente
          </p>
        </div>

        {/* Último Sueldo Neto */}
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-md hover:border-blue-500/50 transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Última Liquidación</span>
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-emerald-400">{formatCurrency(payslips[0]?.netSalary || 0)}</span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-2">
            {payslips[0]?.period || 'Julio 2026'}
          </p>
        </div>

      </div>

      {/* Main Grid section: Urgent Payslip Alert & Recent Licenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Action Needed: Pending Payslips */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Recibos de Sueldo Pendientes</h3>
            </div>
            <Link to="/recibos" className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1">
              Ver todos ({payslips.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingPayslips.length > 0 ? (
            <div className="space-y-3">
              {pendingPayslips.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => onSelectPayslip(p)}
                  className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-amber-500/20 transition"
                >
                  <div>
                    <h4 className="font-bold text-amber-200 text-sm">{p.period}</h4>
                    <p className="text-xs text-amber-300 font-medium mt-0.5">
                      Neto: <span className="font-bold">{formatCurrency(p.netSalary)}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition shadow-md"
                  >
                    Firmar Ahora
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center bg-[#0f172a] rounded-xl border border-slate-700 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-semibold text-white">¡No tenés recibos pendientes de firma!</p>
              <p className="text-xs text-slate-400">Todas tus liquidaciones de haberes han sido confirmadas.</p>
            </div>
          )}
        </div>

        {/* Recent Licenses */}
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-base">Últimas Licencias Solicitadas</h3>
            </div>
            <Link to="/licencias" className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1">
              Ir a Licencias <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLicenses.map((lic) => (
              <div 
                key={lic.id}
                className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{lic.id}</span>
                    <span className="text-slate-400">• {lic.startDate} ({lic.durationDays}d)</span>
                  </div>
                  <p className="text-slate-300 line-clamp-1 mt-0.5">{lic.diagnosis}</p>
                </div>

                <span className={`px-2.5 py-1 rounded-full font-semibold capitalize shrink-0 ${
                  lic.status === 'aprobada' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                  lic.status === 'rechazada' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' :
                  lic.status === 'en_revision' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}>
                  {lic.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onOpenNewLicense}
            className="w-full py-2.5 rounded-xl border border-dashed border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Cargar Nueva Solicitud Médica
          </button>
        </div>

      </div>

    </div>
  );
};
