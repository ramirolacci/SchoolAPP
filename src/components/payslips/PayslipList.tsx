import { useState } from 'react';
import type { Payslip } from '../../types/payslip';
import { PayslipCard } from './PayslipCard';
import { Search, FileCheck, Clock, CheckCircle2, DollarSign } from 'lucide-react';

interface PayslipListProps {
  payslips: Payslip[];
  onSign: (id: string) => void;
  onViewDetail: (payslip: Payslip) => void;
}

export const PayslipList: React.FC<PayslipListProps> = ({ payslips, onSign, onViewDetail }) => {
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendiente' | 'firmado'>('todos');
  const [yearFilter, setYearFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const years = Array.from(new Set(payslips.map(p => p.year))).sort((a, b) => b - a);

  const pendingCount = payslips.filter(p => p.status === 'pendiente').length;
  const signedCount = payslips.filter(p => p.status === 'firmado').length;

  const filteredPayslips = payslips.filter((p) => {
    const matchesStatus = statusFilter === 'todos' || p.status === statusFilter;
    const matchesYear = yearFilter === 'todos' || p.year.toString() === yearFilter;
    const matchesSearch = p.period.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesYear && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner Stats Counter */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-[#1e293b] p-4 rounded-2xl border border-slate-700 shadow-md flex items-center gap-3">
          <div className="p-3 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Recibos</p>
            <p className="text-xl font-extrabold text-white">{payslips.length} recibos</p>
          </div>
        </div>

        <div className="bg-[#1e293b] p-4 rounded-2xl border border-amber-500/30 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-300 uppercase">Pendientes de Firma</p>
              <p className="text-xl font-extrabold text-amber-300">{pendingCount}</p>
            </div>
          </div>
          {pendingCount > 0 && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold px-2 py-0.5 rounded-full">
              ¡Requerido!
            </span>
          )}
        </div>

        <div className="bg-[#1e293b] p-4 rounded-2xl border border-emerald-500/30 shadow-md flex items-center gap-3">
          <div className="p-3 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-300 uppercase">Recibos Firmados</p>
            <p className="text-xl font-extrabold text-emerald-300">{signedCount}</p>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1e293b] p-4 sm:p-5 rounded-2xl border border-slate-700 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Buscar recibo por mes o año (ej: Julio)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          
          {/* Status Tabs */}
          <div className="bg-[#0f172a] p-1 rounded-xl flex items-center text-xs font-medium border border-slate-700">
            <button
              onClick={() => setStatusFilter('todos')}
              className={`px-3 py-1.5 rounded-lg transition ${
                statusFilter === 'todos' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('pendiente')}
              className={`px-3 py-1.5 rounded-lg transition ${
                statusFilter === 'pendiente' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              Pendientes ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('firmado')}
              className={`px-3 py-1.5 rounded-lg transition ${
                statusFilter === 'firmado' ? 'bg-emerald-600 text-white font-bold' : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              Firmados
            </button>
          </div>

          {/* Year Selector */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-[#0f172a] border border-slate-700 text-xs font-semibold text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos los años</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

        </div>

      </div>

      {/* Payslip Card Grid */}
      {filteredPayslips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPayslips.map((payslip) => (
            <PayslipCard 
              key={payslip.id} 
              payslip={payslip} 
              onSign={onSign} 
              onViewDetail={onViewDetail} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#1e293b] rounded-2xl border border-slate-700 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#0f172a] text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No se encontraron recibos</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No hay liquidaciones que coincidan con la búsqueda o el filtro seleccionado.
          </p>
        </div>
      )}

    </div>
  );
};
