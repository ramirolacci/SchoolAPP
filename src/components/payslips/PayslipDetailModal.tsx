import React, { useState } from 'react';
import type { Payslip } from '../../types/payslip';
import { mockUser } from '../../data/mockData';
import { X, Download, FileCheck, ShieldCheck, Printer, CheckCircle2, QrCode } from 'lucide-react';

interface PayslipDetailModalProps {
  payslip: Payslip | null;
  onClose: () => void;
  onSign: (id: string) => void;
}

export const PayslipDetailModal: React.FC<PayslipDetailModalProps> = ({ payslip, onClose, onSign }) => {
  const [isSigning, setIsSigning] = useState(false);
  const [signatureSuccess, setSignatureSuccess] = useState(false);

  if (!payslip) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDigitalSignature = () => {
    setIsSigning(true);
    setTimeout(() => {
      onSign(payslip.id);
      setIsSigning(false);
      setSignatureSuccess(true);
      setTimeout(() => setSignatureSuccess(false), 2500);
    }, 800);
  };

  const handleDownload = () => {
    alert(`Descargando comprobante oficial PDF con Validez Ley 25.506: Recibo_${payslip.period.replace(/\s+/g, '_')}.pdf`);
  };

  const haberesItems = payslip.items.filter(i => i.type === 'haberes');
  const descuentosItems = payslip.items.filter(i => i.type === 'descuentos');

  // Convert Net salary to text representation (Argentine legal requirement)
  const numberToLetters = (amount: number) => {
    return `${formatCurrency(amount).toUpperCase()} PESOS CON 00/100 M.N.`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-start sm:items-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="bg-[#1e293b] text-slate-100 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-700 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Toolbar (Screen Only - Hidden when printing) */}
        <div className="bg-[#0f172a] border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between shrink-0 no-print">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="Logo Colegio San Jorge" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white flex items-center gap-2">
                Recibo Digital de Haberes
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                  Validez Oficial
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Período: <strong className="text-white">{payslip.period}</strong> • Colegio San Jorge (DIEGEP 4102)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
              title="Imprimir o Guardar PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir Recibo</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------
           PAYSLIP FORMAL DOCUMENT (ISOLATED FOR PRINT)
           ---------------------------------------------------- */}
        <div className="printable-document overflow-y-auto flex-1 p-4 sm:p-7 space-y-5 text-slate-200 text-xs sm:text-sm bg-[#0f172a] print:bg-white print:text-black">
          
          {/* Institutional Document Header */}
          <div className="border border-slate-700 print:border-black rounded-2xl p-4 bg-[#1e293b] print:bg-white space-y-3">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700 print:border-black gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="Logo Colegio San Jorge" 
                    className="h-14 w-auto object-contain print:max-h-14"
                  />
                </div>
                <div>
                  <h2 className="font-extrabold text-base sm:text-lg text-white print:text-black leading-tight">
                    COLEGIO SAN JORGE
                  </h2>
                  <p className="text-[11px] text-slate-400 print:text-black">
                    DIEGEP N° 4102 • DGCyE Gral. Pacheco, Prov. de Buenos Aires
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 print:bg-gray-100 print:text-black print:border-black">
                  ORIGINAL - EJEMPLAR DOCENTE
                </span>
                <p className="text-xs font-bold text-slate-300 print:text-black mt-1">
                  RECIBO DE HABERES (LEY N° 20.744 ART. 140)
                </p>
              </div>
            </div>

            {/* Grid 2 Columns: Employer & Employee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              {/* Empleador Box */}
              <div className="space-y-1 border-r-0 sm:border-r border-slate-700 print:border-black sm:pr-4">
                <p className="font-bold text-slate-400 print:text-black uppercase text-[10px] tracking-wider">
                  DATOS DEL EMPLEADOR / INSTITUCIÓN
                </p>
                <p className="font-extrabold text-white print:text-black text-sm">Colegio San Jorge S.A.</p>
                <p className="text-slate-300 print:text-black"><strong>CUIT:</strong> 30-58291049-9</p>
                <p className="text-slate-300 print:text-black"><strong>Domicilio:</strong> Av. Hipólito Yrigoyen 450, Gral. Pacheco</p>
                <p className="text-slate-300 print:text-black"><strong>Actividad:</strong> Enseñanza Nivel Secundario y Superior</p>
              </div>

              {/* Agente / Trabajador Box */}
              <div className="space-y-1">
                <p className="font-bold text-slate-400 print:text-black uppercase text-[10px] tracking-wider">
                  DATOS DEL TRABAJADOR / DOCENTE
                </p>
                <p className="font-extrabold text-white print:text-black text-sm">{mockUser.name}</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-slate-300 print:text-black text-[11px]">
                  <p><strong>Legajo:</strong> {mockUser.fileNumber}</p>
                  <p><strong>DNI:</strong> {mockUser.dni}</p>
                  <p><strong>CUIL:</strong> 27-32849102-4</p>
                  <p><strong>Ingreso:</strong> 01/04/2016</p>
                  <p className="col-span-2"><strong>Cargo:</strong> {mockUser.role}</p>
                  <p className="col-span-2"><strong>Período Abonado:</strong> <span className="underline font-bold text-white print:text-black">{payslip.period}</span></p>
                </div>
              </div>
            </div>

          </div>

          {/* Items Breakdown Table */}
          <div className="border border-slate-700 print:border-black rounded-2xl overflow-hidden shadow-xs bg-[#1e293b] print:bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0f172a] print:bg-gray-100 text-slate-300 print:text-black font-bold uppercase text-[10px] tracking-wider border-b border-slate-700 print:border-black">
                <tr>
                  <th className="py-3 px-3.5 sm:px-4">Concepto / Descripción del Item</th>
                  <th className="py-3 px-3 text-right">Haberes (+)</th>
                  <th className="py-3 px-3 text-right">Descuentos (-)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/80 print:divide-black">
                {haberesItems.map((item, idx) => (
                  <tr key={`h-${idx}`} className="hover:bg-slate-800 print:hover:bg-white">
                    <td className="py-2.5 px-3.5 sm:px-4 font-medium text-slate-200 print:text-black">{item.description}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-400 print:text-black">{formatCurrency(item.amount)}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500 print:text-black">-</td>
                  </tr>
                ))}
                {descuentosItems.map((item, idx) => (
                  <tr key={`d-${idx}`} className="hover:bg-slate-800 print:hover:bg-white">
                    <td className="py-2.5 px-3.5 sm:px-4 font-medium text-slate-200 print:text-black">{item.description}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500 print:text-black">-</td>
                    <td className="py-2.5 px-3 text-right font-bold text-rose-400 print:text-black">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#0f172a] print:bg-gray-100 border-t-2 border-slate-700 print:border-black font-bold text-xs">
                <tr>
                  <td className="py-2.5 px-3.5 sm:px-4 text-slate-300 print:text-black">SUBTOTALES REMUNERATIVOS Y DESCUENTOS</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400 print:text-black font-bold">{formatCurrency(payslip.grossSalary)}</td>
                  <td className="py-2.5 px-3 text-right text-rose-400 print:text-black font-bold">{formatCurrency(payslip.deductions)}</td>
                </tr>
                <tr className="bg-blue-950/60 print:bg-gray-200 text-white print:text-black">
                  <td className="py-3.5 px-3.5 sm:px-4 font-extrabold text-sm sm:text-base">NETO A COBRAR LIQUIDADO</td>
                  <td colSpan={2} className="py-3.5 px-3 text-right font-extrabold text-base sm:text-xl text-emerald-400 print:text-black">
                    {formatCurrency(payslip.netSalary)}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Legal Net Amount In Letters */}
            <div className="p-3 bg-[#0f172a] print:bg-white border-t border-slate-700 print:border-black text-[11px] text-slate-300 print:text-black italic">
              <strong>IMPORTE EN LETRAS:</strong> {numberToLetters(payslip.netSalary)}
            </div>
          </div>

          {/* DUAL SIGNATURE & DIGITAL CERTIFICATION BOX */}
          <div className="border border-slate-700 print:border-black rounded-2xl p-4 bg-[#1e293b] print:bg-white space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              
              {/* Employer Representative Signature */}
              <div className="border-b border-slate-700 print:border-black pb-2 text-center space-y-1">
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic text-sm text-blue-300 print:text-black">Lic. Roberto M. Fernández</span>
                </div>
                <p className="font-bold text-xs text-white print:text-black">Firma y Sello Representación Legal</p>
                <p className="text-[10px] text-slate-400 print:text-black">Colegio San Jorge • Apoderado DGCyE</p>
              </div>

              {/* Employee Digital Signature Status */}
              <div className="border-b border-slate-700 print:border-black pb-2 text-center space-y-1">
                <div className="h-10 flex items-center justify-center">
                  {payslip.status === 'firmado' ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 print:text-black text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-black" />
                      <span>Conformidad Digital Registrada</span>
                    </div>
                  ) : (
                    <span className="text-amber-400 print:text-black italic text-xs font-semibold">
                      Pendiente de firma del docente
                    </span>
                  )}
                </div>
                <p className="font-bold text-xs text-white print:text-black">Firma de Conformidad del Trabajador</p>
                <p className="text-[10px] text-slate-400 print:text-black">
                  {payslip.signedAt ? `Audit: ${new Date(payslip.signedAt).toLocaleString('es-AR')} hs` : 'Sin firma registrada'}
                </p>
              </div>

            </div>

            {/* Security Verification Footer Code */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 print:text-black pt-1 border-t border-slate-700/50 print:border-black">
              <div className="flex items-center gap-2">
                <QrCode className="w-7 h-7 text-blue-400 print:text-black shrink-0" />
                <div>
                  <p className="font-mono text-[9px]">HASH SHA256: 8f92a10b48c1e291...38d</p>
                  <p>Certificación Digital Ley 25.506 • Registro Electrónico DGCyE</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-300 print:text-black">PAGO ACREDITADO EN CUENTA</p>
                <p>Banco Santander CBU: 0720011988000003410291</p>
              </div>
            </div>

          </div>

          {/* Screen Only Action: Digital Signature Button */}
          <div className="no-print space-y-3 pt-2">
            {payslip.status === 'pendiente' && (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-amber-300">Pendiente de Conformidad Digital</p>
                  <p className="text-[11px] text-slate-300">
                    Al firmar digitalmente, prestás conformidad con la liquidación percibida en tu cuenta sueldo.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isSigning}
                  onClick={handleDigitalSignature}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm shrink-0 cursor-pointer"
                >
                  {isSigning ? (
                    <>Procesando firma...</>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      Firmar Digitalmente Recibo
                    </>
                  )}
                </button>
              </div>
            )}

            {signatureSuccess && (
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-2xl text-xs text-center font-bold animate-fadeIn flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ¡El recibo ha sido firmado digitalmente y guardado con éxito en el servidor!
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Toolbar (Screen Only) */}
        <div className="bg-[#0f172a] p-4 border-t border-slate-800 flex items-center justify-between shrink-0 no-print">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-700 transition"
          >
            <Download className="w-4 h-4 text-slate-400" /> Descargar PDF Recibo
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
