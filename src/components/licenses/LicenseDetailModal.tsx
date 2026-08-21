import React from 'react';
import type { License } from '../../types/license';
import { getStatusBadge } from './LicenseCard';
import { X, Calendar, Clock, FileText, Download, AlertTriangle, Stethoscope } from 'lucide-react';

interface LicenseDetailModalProps {
  license: License | null;
  onClose: () => void;
}

export const LicenseDetailModal: React.FC<LicenseDetailModalProps> = ({ license, onClose }) => {
  if (!license) return null;

  const handleDownloadProof = () => {
    alert(`Descargando comprobante oficial de solicitud de licencia ${license.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-start sm:items-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="bg-[#1e293b] text-slate-100 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-700 overflow-hidden my-auto flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0f172a] border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 border border-blue-500/40 rounded-2xl text-blue-300">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white">Solicitud de Licencia</h3>
                <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded font-mono border border-blue-500/40">
                  {license.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">Mis Licencias ABC - Colegio San Jorge</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5 text-slate-200 text-xs sm:text-sm bg-[#0f172a]">
          
          {/* Status Bar */}
          <div className="flex items-center justify-between bg-[#1e293b] p-3.5 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estado Actual</span>
            {getStatusBadge(license.status)}
          </div>

          {/* Type & Family info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#1e293b] rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 block mb-1">Tipo de Licencia</span>
              <span className="font-bold text-white capitalize">
                Licencia {license.type}
              </span>
            </div>
            
            <div className="p-3.5 bg-[#1e293b] rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 block mb-1">Causa / Parentesco</span>
              <span className="font-bold text-white">
                {license.type === 'familiar' ? `Atención Familiar (${license.familyMemberRelation || 'Familiar'})` : 'Enfermedad Personal'}
              </span>
            </div>
          </div>

          {/* Dates & Duration */}
          <div className="p-4 bg-blue-950/40 rounded-2xl border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Fecha de inicio:
              </span>
              <span className="font-bold text-white">{license.startDate}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Fecha de finalización:
              </span>
              <span className="font-bold text-white">{license.endDate}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-blue-500/20">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Total días de reposo:
              </span>
              <span className="font-extrabold text-blue-300 text-base">{license.durationDays} día(s)</span>
            </div>
          </div>

          {/* Medical Diagnosis */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Diagnóstico Médico
            </label>
            <div className="bg-[#1e293b] rounded-2xl p-4 border border-slate-700 text-slate-200 leading-relaxed text-xs sm:text-sm">
              {license.diagnosis}
            </div>
          </div>

          {/* Rejection notice if any */}
          {license.status === 'rechazada' && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 text-rose-200 text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                Motivo del Rechazo Administrativo
              </div>
              <p>{license.rejectionReason || "No se ha especificado motivo detallado."}</p>
            </div>
          )}

          {/* Attached Document */}
          <div className="bg-[#1e293b] p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{license.certificateFileName || 'Certificado_medico.pdf'}</p>
                <p className="text-[11px] text-slate-400">Documento de respaldo digitalizado</p>
              </div>
            </div>
            <button 
              onClick={() => alert("Abriendo certificado médico adjunto...")}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 font-bold px-3 py-1.5 rounded-xl transition"
            >
              Ver Archivo
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#0f172a] p-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={handleDownloadProof}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-700 transition"
          >
            <Download className="w-4 h-4 text-slate-400" /> Descargar Comprobante
          </button>

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
