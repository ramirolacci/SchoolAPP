import React from 'react';
import type { License, LicenseStatus } from '../../types/license';
import { Calendar, Clock, FileText, ChevronRight, AlertCircle } from 'lucide-react';

interface LicenseCardProps {
  license: License;
  onSelect: (license: License) => void;
}

export const getStatusBadge = (status: LicenseStatus) => {
  switch (status) {
    case 'pendiente':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Pendiente
        </span>
      );
    case 'en_revision':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          En Revisión
        </span>
      );
    case 'aprobada':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Aprobada
        </span>
      );
    case 'rechazada':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          Rechazada
        </span>
      );
    default:
      return null;
  }
};

export const LicenseCard: React.FC<LicenseCardProps> = ({ license, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(license)}
      className="bg-[#132019] border border-[#203529] rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer hover:border-emerald-500/50 group relative overflow-hidden"
    >
      {/* Accent left line */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${
          license.status === 'aprobada' ? 'bg-emerald-500' :
          license.status === 'rechazada' ? 'bg-rose-500' :
          license.status === 'en_revision' ? 'bg-emerald-400' : 'bg-amber-500'
        }`}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#0a110d] text-slate-300 border border-[#203529]">
            {license.id}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
            license.type === 'propia' 
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
              : 'bg-red-500/15 text-red-300 border border-red-500/30'
          }`}>
            {license.type === 'propia' ? 'Licencia Propia' : `Familiar (${license.familyMemberRelation || 'Familiar'})`}
          </span>
        </div>

        <div>
          {getStatusBadge(license.status)}
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-sm">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Desde <strong className="font-semibold text-white">{license.startDate}</strong> al <strong className="font-semibold text-white">{license.endDate}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 sm:justify-end">
          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Duración: <strong className="font-semibold text-white">{license.durationDays} día{license.durationDays > 1 ? 's' : ''}</strong>
          </span>
        </div>
      </div>

      {/* Diagnosis Preview */}
      <div className="bg-[#0a110d] rounded-xl p-3 text-xs text-slate-300 border border-[#203529] my-2">
        <p className="line-clamp-2 italic">
          "{license.diagnosis}"
        </p>
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between pt-3 border-t border-[#203529] mt-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-400">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span className="truncate max-w-[200px]">{license.certificateFileName || 'Certificado adjunto'}</span>
        </div>
        
        <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          Ver detalles <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {license.status === 'rechazada' && license.rejectionReason && (
        <div className="mt-3 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Motivo de rechazo:</strong> {license.rejectionReason}
          </div>
        </div>
      )}
    </div>
  );
};
