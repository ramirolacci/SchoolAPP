import React, { useState } from 'react';
import type { Payslip } from '../types/payslip';
import { PayslipList } from '../components/payslips/PayslipList';
import { PayslipDetailModal } from '../components/payslips/PayslipDetailModal';
import { Receipt, FileCheck } from 'lucide-react';

interface PayslipsProps {
  payslips: Payslip[];
  onSignPayslip: (id: string) => void;
}

export const Payslips: React.FC<PayslipsProps> = ({ payslips, onSignPayslip }) => {
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  const handleSelectPayslip = (payslip: Payslip) => {
    setSelectedPayslip(payslip);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#132019] p-6 rounded-2xl border border-[#203529] shadow-md backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-xl">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Recibos de Sueldo Digitales</h1>
              <span className="text-xs bg-emerald-500/15 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <FileCheck className="w-3 h-3 text-emerald-400" /> Ley Firma Digital N° 25.506
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Visualizá el desglose detallado de haberes y descuentos, descargá tus comprobantes en PDF y prestá conformidad digital.
            </p>
          </div>
        </div>
      </div>

      {/* Main List */}
      <PayslipList 
        payslips={payslips}
        onSign={onSignPayslip}
        onViewDetail={handleSelectPayslip}
      />

      {/* Detail Modal */}
      <PayslipDetailModal 
        payslip={selectedPayslip}
        onClose={() => setSelectedPayslip(null)}
        onSign={onSignPayslip}
      />

    </div>
  );
};
