import React from 'react';
import type { Payslip } from '../../types/payslip';
import { 
  Receipt, 
  Download, 
  CheckCircle2, 
  Clock, 
  Eye, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';

interface PayslipCardProps {
  payslip: Payslip;
  onSign: (id: string) => void;
  onViewDetail: (payslip: Payslip) => void;
}

export const PayslipCard: React.FC<PayslipCardProps> = ({ payslip, onSign, onViewDetail }) => {
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Descargando comprobante de sueldo ${payslip.period} (PDF - ${payslip.fileSize})...`);
  };

  const handleSignClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSign(payslip.id);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      onClick={() => onViewDetail(payslip)}
      className={`bg-[#1e293b] rounded-2xl border transition-all cursor-pointer p-5 shadow-md hover:shadow-lg relative overflow-hidden group ${
        payslip.status === 'pendiente' 
          ? 'border-amber-500/40 ring-1 ring-amber-500/20 hover:border-amber-400' 
          : 'border-slate-700 hover:border-blue-500/50'
      }`}
    >
      {/* Top Accent bar */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          payslip.status === 'firmado' ? 'bg-emerald-500' : 'bg-amber-500'
        }`}
      />

      <div className="flex items-start justify-between gap-3 mb-4 pt-1">
        
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl border ${
            payslip.status === 'firmado' 
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}>
            <Receipt className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-white text-base leading-tight">
              {payslip.period}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Ref: {payslip.id} • {payslip.fileSize}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        {payslip.status === 'firmado' ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Firmado
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Pendiente de firma
          </span>
        )}

      </div>

      {/* Financial Amounts Summary */}
      <div className="bg-[#0f172a] rounded-xl p-3.5 border border-slate-700 my-4 grid grid-cols-2 gap-3">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Sueldo Neto a Cobrar</span>
          <span className="text-lg font-extrabold text-emerald-400">
            {formatCurrency(payslip.netSalary)}
          </span>
        </div>

        <div className="text-right border-l border-slate-700 pl-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Sueldo Bruto</span>
          <span className="text-sm font-bold text-slate-200">
            {formatCurrency(payslip.grossSalary)}
          </span>
        </div>
      </div>

      {/* Signature info if signed */}
      {payslip.status === 'firmado' && payslip.signedAt && (
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Conformidad firmada digitalmente el {new Date(payslip.signedAt).toLocaleDateString('es-AR')}</span>
        </div>
      )}

      {/* Card Actions */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-700 text-xs">
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(payslip);
          }}
          className="flex items-center gap-1 text-slate-300 hover:text-blue-400 font-semibold py-1.5 px-2.5 rounded-xl hover:bg-slate-800 transition"
        >
          <Eye className="w-3.5 h-3.5" />
          Ver Detalle
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-1.5 rounded-xl transition border border-slate-700"
            title="Descargar PDF"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar
          </button>

          {payslip.status === 'pendiente' && (
            <button
              type="button"
              onClick={handleSignClick}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition shadow-md"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Firmar Digitalmente
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
