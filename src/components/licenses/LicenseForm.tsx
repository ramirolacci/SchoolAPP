import React, { useState } from 'react';
import type { License, LicenseType } from '../../types/license';
import { 
  FilePlus, 
  Upload, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Info,
  X
} from 'lucide-react';

interface LicenseFormProps {
  onSubmit: (newLicense: License) => void;
  onCancel?: () => void;
}

export const LicenseForm: React.FC<LicenseFormProps> = ({ onSubmit, onCancel }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [type, setType] = useState<LicenseType>('propia');
  const [familyMemberRelation, setFamilyMemberRelation] = useState<string>('Hijo/a');
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [durationDays, setDurationDays] = useState<number>(3);
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  
  // Validation state
  const [dateWarning, setDateWarning] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateDateWindow = (dateVal: string): boolean => {
    if (!dateVal) return false;
    const selected = new Date(dateVal + 'T00:00:00');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = selected.getTime() - today.getTime();
    const diffHours = diffTime / (1000 * 3600);

    if (diffHours < -48 || diffHours > 48) {
      setDateWarning(
        `Atención: La fecha seleccionada (${dateVal}) supera la ventana estándar de ±48 hs respecto a hoy. Se requerirá auditoría administrativa especial.`
      );
    } else {
      setDateWarning(null);
    }
    return true;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    setStartDate(dateVal);
    validateDateWindow(dateVal);
    if (errors.startDate) {
      setErrors((prev) => ({ ...prev, startDate: '' }));
    }
  };

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(1) + ' KB');
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: '' }));
      }
    }
  };

  const computeEndDate = (start: string, days: number): string => {
    if (!start || isNaN(days) || days < 1) return '';
    const d = new Date(start + 'T00:00:00');
    d.setDate(d.getDate() + (days - 1));
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!startDate) {
      newErrors.startDate = 'Debe indicar la fecha de inicio';
    }
    if (!durationDays || durationDays < 1 || durationDays > 90) {
      newErrors.durationDays = 'Ingrese una duración válida (entre 1 y 90 días)';
    }
    if (!diagnosis.trim() || diagnosis.trim().length < 10) {
      newErrors.diagnosis = 'El diagnóstico debe contener al menos 10 caracteres explicativos';
    }
    if (!fileName) {
      newErrors.file = 'Debe adjuntar el certificado médico oficial (PDF o imagen)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const calculatedEndDate = computeEndDate(startDate, durationDays);

    const newLicense: License = {
      id: `LIC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      type,
      startDate,
      durationDays,
      endDate: calculatedEndDate,
      diagnosis: diagnosis.trim(),
      status: 'pendiente',
      certificateFileName: fileName,
      createdAt: new Date().toISOString(),
      familyMemberRelation: type === 'familiar' ? familyMemberRelation : undefined,
    };

    setIsSuccess(true);
    setTimeout(() => {
      onSubmit(newLicense);
    }, 1200);
  };

  const endDateComputed = computeEndDate(startDate, durationDays);

  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-xl p-6 sm:p-8">
      
      <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-xl">
            <FilePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Cargar Nueva Licencia Médica</h2>
            <p className="text-xs text-slate-400">Módulo oficial digital - Aplicación Mis Licencias (ABC)</p>
          </div>
        </div>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isSuccess ? (
        <div className="py-12 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-white">¡Licencia enviada con éxito!</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            La solicitud ha ingresado al sistema en estado <span className="font-semibold text-amber-300">Pendiente</span> de auditoría médica.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Tipo de Licencia */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Tipo de Licencia <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  type === 'propia' 
                    ? 'bg-blue-500/20 border-blue-500 ring-2 ring-blue-500/30 font-semibold text-white' 
                    : 'bg-[#0f172a] border-slate-700 hover:border-slate-600 text-slate-300'
                }`}
              >
                <input 
                  type="radio" 
                  name="licenseType" 
                  value="propia" 
                  checked={type === 'propia'}
                  onChange={() => setType('propia')}
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <div className="text-sm">Licencia Propia</div>
                  <div className="text-xs text-slate-400 font-normal">Afección de salud del docente</div>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  type === 'familiar' 
                    ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30 font-semibold text-white' 
                    : 'bg-[#0f172a] border-slate-700 hover:border-slate-600 text-slate-300'
                }`}
              >
                <input 
                  type="radio" 
                  name="licenseType" 
                  value="familiar" 
                  checked={type === 'familiar'}
                  onChange={() => setType('familiar')}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                />
                <div>
                  <div className="text-sm">Atención de Familiar</div>
                  <div className="text-xs text-slate-400 font-normal">Cuidado de grupo familiar a cargo</div>
                </div>
              </label>
            </div>
          </div>

          {/* If Familiar, Select Relation */}
          {type === 'familiar' && (
            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 space-y-2 animate-fadeIn">
              <label className="block text-xs font-semibold text-amber-300">
                Vínculo Familiar / Parentesco <span className="text-rose-400">*</span>
              </label>
              <select
                value={familyMemberRelation}
                onChange={(e) => setFamilyMemberRelation(e.target.value)}
                className="w-full bg-[#0f172a] border border-amber-500/40 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Hijo/a">Hijo / Hija</option>
                <option value="Cónyuge">Cónyuge / Conviviente</option>
                <option value="Padre/Madre">Padre / Madre</option>
                <option value="Hermano/a">Hermano / Hermana</option>
                <option value="Otro a cargo">Otro familiar con declaración jurada</option>
              </select>
            </div>
          )}

          {/* Dates & Duration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Start Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Fecha de Inicio <span className="text-rose-400">*</span>
              </label>
              <input 
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className={`w-full bg-[#0f172a] border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 ${
                  errors.startDate ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.startDate && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.startDate}
                </p>
              )}
            </div>

            {/* Duration Days */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Días de Duración <span className="text-rose-400">*</span>
              </label>
              <input 
                type="number"
                min={1}
                max={90}
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)}
                className={`w-full bg-[#0f172a] border rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 ${
                  errors.durationDays ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-blue-500'
                }`}
              />
              {errors.durationDays && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.durationDays}
                </p>
              )}
            </div>

          </div>

          {/* Validation Notice for +-48hs */}
          {dateWarning && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Normativa de Carga (ABC Argentina):</p>
                <p>{dateWarning}</p>
              </div>
            </div>
          )}

          {/* Calculated End Date Preview */}
          {startDate && durationDays > 0 && (
            <div className="bg-blue-500/10 rounded-xl p-3 text-xs text-blue-300 border border-blue-500/30 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Fecha estimada de alta / reintegro:
              </span>
              <strong className="text-sm text-white font-bold">
                {endDateComputed}
              </strong>
            </div>
          )}

          {/* Diagnosis Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Diagnóstico Médico / Indicaciones <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Describa brevemente el diagnóstico figurante en el certificado médico (ej. Cuadro afección respiratoria con indicación de reposo)..."
              value={diagnosis}
              onChange={(e) => {
                setDiagnosis(e.target.value);
                if (errors.diagnosis) setErrors((prev) => ({ ...prev, diagnosis: '' }));
              }}
              className={`w-full bg-[#0f172a] border rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 ${
                errors.diagnosis ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-blue-500'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.diagnosis ? (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.diagnosis}
                </p>
              ) : <span />}
              <span className="text-[11px] text-slate-400">{diagnosis.length} caracteres</span>
            </div>
          </div>

          {/* Medical Certificate Simulated Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Certificado Médico Digitalizado <span className="text-rose-400">*</span>
            </label>

            <div className="relative border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors bg-[#0f172a]">
              <input 
                type="file" 
                accept="image/*,.pdf"
                onChange={handleFileSimulate}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-3 bg-blue-500/20 text-blue-300 rounded-full">
                  <Upload className="w-6 h-6" />
                </div>

                {fileName ? (
                  <div className="text-center">
                    <p className="text-sm font-bold text-white flex items-center gap-1.5 justify-center">
                      <FileText className="w-4 h-4 text-blue-400" />
                      {fileName}
                    </p>
                    <p className="text-xs text-slate-400">{fileSize} • Archivo seleccionado</p>
                    <span className="inline-block mt-2 text-xs font-semibold text-blue-400 underline">
                      Cambiar archivo
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      Arrastrá o haz clic para adjuntar el certificado
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Formatos permitidos: PDF, JPG, PNG (máx. 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {errors.file && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.file}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 transition"
              >
                Cancelar
              </button>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <FilePlus className="w-4 h-4" />
              Enviar Licencia
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
