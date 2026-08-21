import React, { useState } from 'react';
import type { License } from '../../types/license';
import { LicenseCard } from './LicenseCard';
import { Search, Plus, FileQuestion } from 'lucide-react';

interface LicenseListProps {
  licenses: License[];
  onSelectLicense: (license: License) => void;
  onOpenForm: () => void;
}

export const LicenseList: React.FC<LicenseListProps> = ({ 
  licenses, 
  onSelectLicense,
  onOpenForm 
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLicenses = licenses.filter((lic) => {
    const matchesStatus = filterStatus === 'todas' || lic.status === filterStatus;
    const matchesSearch = 
      lic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lic.startDate.includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  const getStatusCount = (status: string) => {
    if (status === 'todas') return licenses.length;
    return licenses.filter(l => l.status === status).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header */}
      <div className="bg-[#132019] p-4 sm:p-5 rounded-2xl border border-[#203529] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Buscar por N° trámite, diagnóstico o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a110d] border border-[#203529] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todas', label: 'Todas' },
          { id: 'pendiente', label: 'Pendientes' },
          { id: 'en_revision', label: 'En revisión' },
          { id: 'aprobada', label: 'Aprobadas' },
          { id: 'rechazada', label: 'Rechazadas' },
        ].map((tab) => {
          const count = getStatusCount(tab.id);
          const isActive = filterStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-[#132019] text-slate-300 border-[#203529] hover:border-slate-600 hover:bg-[#1a2c21]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-emerald-700 text-white' : 'bg-[#0a110d] text-slate-400 border border-[#203529]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* License List Cards Grid */}
      {filteredLicenses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLicenses.map((lic) => (
            <LicenseCard key={lic.id} license={lic} onSelect={onSelectLicense} />
          ))}
        </div>
      ) : (
        <div className="bg-[#132019] rounded-2xl border border-[#203529] p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#0a110d] text-slate-400 flex items-center justify-center mx-auto border border-[#203529]">
            <FileQuestion className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white">No se encontraron licencias</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchTerm || filterStatus !== 'todas'
              ? 'Intenta modificar el filtro o el término de búsqueda para ver más resultados.'
              : 'Aún no has registrado ninguna solicitud de licencia médica.'}
          </p>
          {onOpenForm && (
            <button
              onClick={onOpenForm}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/20 transition mt-2"
            >
              <Plus className="w-3.5 h-3.5" /> Registrar Primera Licencia
            </button>
          )}
        </div>
      )}

    </div>
  );
};
