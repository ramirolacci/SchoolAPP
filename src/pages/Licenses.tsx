import React, { useState } from 'react';
import type { License } from '../types/license';
import { LicenseList } from '../components/licenses/LicenseList';
import { LicenseForm } from '../components/licenses/LicenseForm';
import { LicenseDetailModal } from '../components/licenses/LicenseDetailModal';
import { Plus, List } from 'lucide-react';

interface LicensesProps {
  licenses: License[];
  onAddLicense: (newLicense: License) => void;
  showFormInitial?: boolean;
}

export const Licenses: React.FC<LicensesProps> = ({ 
  licenses, 
  onAddLicense,
  showFormInitial = false 
}) => {
  const [isFormOpen, setIsFormOpen] = useState(showFormInitial);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const handleFormSubmit = (newLic: License) => {
    onAddLicense(newLic);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-md backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Gestión de Licencias Médicas</h1>
            <span className="text-xs bg-blue-500/20 text-blue-300 font-semibold px-2.5 py-0.5 rounded-full border border-blue-400/30">
              Mis Licencias ABC
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Carga digitalizada de certificados médicos, consulta de estado y seguimiento de trámites en tiempo real.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm ${
            isFormOpen 
              ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
          }`}
        >
          {isFormOpen ? (
            <>
              <List className="w-4 h-4" /> Ver Lista de Licencias
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Cargar Nueva Licencia
            </>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {isFormOpen ? (
        <LicenseForm 
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <LicenseList 
          licenses={licenses}
          onSelectLicense={(lic) => setSelectedLicense(lic)}
          onOpenForm={() => setIsFormOpen(true)}
        />
      )}

      {/* Detail Modal */}
      <LicenseDetailModal 
        license={selectedLicense}
        onClose={() => setSelectedLicense(null)}
      />

    </div>
  );
};
