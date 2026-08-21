import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  UserCheck, 
  Search, 
  Calculator, 
  Bell, 
  Upload, 
  FileSpreadsheet, 
  Download, 
  Smartphone, 
  Briefcase, 
  Sparkles,
  Calendar,
  Clock,
  FilePlus,
  ShieldCheck,
  CheckCircle2,
  Copy
} from 'lucide-react';

export const ModulesPitch: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'licencias' | 'tesoreria' | 'autogestion'>('licencias');

  // Interactive state for micro-tools
  // Tool 1: Buscador de suplentes
  const [selectedSubject, setSelectedSubject] = useState('Matemática - 3er Año Secundaria');
  const [assignedTeacher, setAssignedTeacher] = useState<string | null>(null);

  // Tool 2: Calculadora de días estatuto
  const [licenseTypeCalc, setLicenseTypeCalc] = useState('114a1'); // Enfermedad corta
  const [daysUsed, setDaysUsed] = useState(5);

  // Tool 3: Adelanto de sueldo
  const [advanceAmount, setAdvanceAmount] = useState(45000);
  const [advanceReason, setAdvanceReason] = useState('Gastos imprevistos de salud');
  const [advanceSuccess, setAdvanceSuccess] = useState(false);

  // Tool 4: Importación masiva de recibos
  const [importFile, setImportFile] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // Tool 5: Declaración jurada
  const [otherSchoolsCount, setOtherSchoolsCount] = useState(1);
  const [totalHours, setTotalHours] = useState(28);
  const [ddjjSuccess, setDdjjSuccess] = useState(false);

  // Tool 6: Solicitud de Constancia de Prestación de Servicios
  const [certType, setCertType] = useState('antiguedad');
  const [certReason, setCertReason] = useState('Trámite Bancario / Crédito');
  const [certSuccess, setCertSuccess] = useState(false);

  // Tool 7: Generador de Plan de Contingencia / Tarea Pedagógica por Ausencia
  const [absentCourse, setAbsentCourse] = useState('3ro A - Secundaria');
  const [contingencyTopic, setContingencyTopic] = useState('Revolución de Mayo y causas socio-económicas');
  const [contingencyLink, setContingencyLink] = useState('https://classroom.google.com/c/historia3a');
  const [contingencyCopied, setContingencyCopied] = useState(false);

  const mockSupplements = [
    { id: 1, name: 'Prof. Carlos Gómez', subject: 'Matemática', availability: 'Inmediata (Turno Mañana)', score: 98.4 },
    { id: 2, name: 'Prof. Laura Benítez', subject: 'Matemática / Física', availability: 'A partir de mañana', score: 95.1 },
    { id: 3, name: 'Prof. Esteban Quito', subject: 'Matemática', availability: 'Con disponibilidad horaria', score: 92.0 },
  ];

  const handleAssignSuplente = (teacherName: string) => {
    setAssignedTeacher(teacherName);
    setTimeout(() => setAssignedTeacher(null), 4000);
  };

  const handleImportSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file.name);
      setIsImporting(true);
      setTimeout(() => {
        setIsImporting(false);
      }, 1500);
    }
  };

  const handleAdvanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdvanceSuccess(true);
    setTimeout(() => setAdvanceSuccess(false), 3500);
  };

  const handleDdjjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDdjjSuccess(true);
    setTimeout(() => setDdjjSuccess(false), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header section */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#102419] to-red-950/40 rounded-2xl p-6 text-white shadow-lg border border-emerald-500/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Módulos Especiales para el Colegio
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Botonera de Gestión Institucional
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
              Explorá las funciones avanzadas diseñadas específicamente para agilizar la operativa diaria, tesorería y autogestión docente de la institución.
            </p>
          </div>
        </div>
      </div>

      {/* BOTONERA PRINCIPAL (TABS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Botón 1: Licencias y Suplencias */}
        <button
          onClick={() => setActiveModule('licencias')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
            activeModule === 'licencias'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/30'
              : 'bg-[#132019] text-slate-200 border-[#203529] hover:border-emerald-500/50 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-xl ${
              activeModule === 'licencias' ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-300'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
              activeModule === 'licencias' 
                ? 'bg-white/20 text-white border-white/30' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}>
              Operativa Diaria
            </span>
          </div>
          <h3 className="font-bold text-base leading-tight">1. Licencias y Suplencias</h3>
          <p className={`text-xs mt-1.5 leading-relaxed ${activeModule === 'licencias' ? 'text-emerald-100' : 'text-slate-400'}`}>
            Cobertura rápida de horas libres, cálculo automático de topes estatutarios y alertas de ausentismo.
          </p>
        </button>

        {/* Botón 2: Liquidación de Haberes y Tesorería */}
        <button
          onClick={() => setActiveModule('tesoreria')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
            activeModule === 'tesoreria'
              ? 'bg-red-700 text-white border-red-500 shadow-lg ring-2 ring-red-400/30'
              : 'bg-[#132019] text-slate-200 border-[#203529] hover:border-red-500/50 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-xl ${
              activeModule === 'tesoreria' ? 'bg-white/20 text-white' : 'bg-red-500/15 text-red-300'
            }`}>
              <DollarSign className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
              activeModule === 'tesoreria' 
                ? 'bg-white/20 text-white border-white/30' 
                : 'bg-red-500/20 text-red-300 border-red-500/30'
            }`}>
              Finanzas & RRHH
            </span>
          </div>
          <h3 className="font-bold text-base leading-tight">2. Liquidación y Tesorería</h3>
          <p className={`text-xs mt-1.5 leading-relaxed ${activeModule === 'tesoreria' ? 'text-red-100' : 'text-slate-400'}`}>
            Importación masiva desde sistemas contables, solicitudes de adelantos y certificados de haberes.
          </p>
        </button>

        {/* Botón 3: Experiencia Docente y Autogestión */}
        <button
          onClick={() => setActiveModule('autogestion')}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
            activeModule === 'autogestion'
              ? 'bg-emerald-700 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/30'
              : 'bg-[#132019] text-slate-200 border-[#203529] hover:border-emerald-500/50 hover:shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-xl ${
              activeModule === 'autogestion' ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-300'
            }`}>
              <UserCheck className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
              activeModule === 'autogestion' 
                ? 'bg-white/20 text-white border-white/30' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}>
              Autogestión
            </span>
          </div>
          <h3 className="font-bold text-base leading-tight">3. Portal de Autogestión</h3>
          <p className={`text-xs mt-1.5 leading-relaxed ${activeModule === 'autogestion' ? 'text-emerald-100' : 'text-slate-400'}`}>
            Declaración jurada de cargos, solicitudes de salidas didácticas e instalación PWA en celulares.
          </p>
        </button>

      </div>

      {/* CONTENIDO INTERACTIVO SEGÚN EL MÓDULO SELECCIONADO */}
      
      {/* ----------------- MÓDULO 1: LICENCIAS Y SUPLENCIAS ----------------- */}
      {activeModule === 'licencias' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-[#203529] pb-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                Módulo 1: Gestión de Licencias y Cobertura de Suplencias
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Herramientas interactivas para que la secretaría escolar resuelva el ausentismo sin demoras.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Tool A: Buscador Automático de Suplentes */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Buscador Inteligente de Suplentes</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                  Orden de Mérito
                </span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-400">
                  Seleccionar Materia / Curso a Cubrir:
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Matemática - 3er Año Secundaria">Matemática - 3er Año Secundaria (Turno Mañana)</option>
                  <option value="Prácticas del Lenguaje - 1er Año">Prácticas del Lenguaje - 1er Año</option>
                  <option value="Física y Química - 4to Año">Física y Química - 4to Año</option>
                  <option value="Historia - 2do Año Secundaria">Historia - 2do Año Secundaria</option>
                </select>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-slate-400">Candidatos disponibles en padrón:</p>
                  {mockSupplements.map((sup) => (
                    <div 
                      key={sup.id}
                      className="p-3 bg-[#0a110d] rounded-xl border border-[#203529] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{sup.name}</p>
                        <p className="text-slate-400 text-[11px]">{sup.availability} • Puntaje: {sup.score}</p>
                      </div>
                      <button
                        onClick={() => handleAssignSuplente(sup.name)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition shadow-2xs text-[11px] cursor-pointer"
                      >
                        Asignar Cobertura
                      </button>
                    </div>
                  ))}
                </div>

                {assignedTeacher && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-xl text-xs font-semibold text-center animate-fadeIn">
                    ¡Horas asignadas a <strong className="underline">{assignedTeacher}</strong>! Se ha enviado la notificación por WhatsApp.
                  </div>
                )}
              </div>
            </div>

            {/* Tool B: Calculadora de Topes Estatutarios */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Calculadora de Días por Estatuto (ABC)</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                  Reglamento
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Artículo / Tipo de Licencia:
                  </label>
                  <select
                    value={licenseTypeCalc}
                    onChange={(e) => setLicenseTypeCalc(e.target.value)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  >
                    <option value="114a1">Art. 114 a.1 - Enfermedad afección ordinaria (Máx. 30 días/año)</option>
                    <option value="114o">Art. 114 o - Atención de Familiar a Cargo (Máx. 20 días/año)</option>
                    <option value="114c">Art. 114 c - Examen Universitario (Máx. 28 días/año)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Días acumulados consumidos este año:
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={daysUsed}
                    onChange={(e) => setDaysUsed(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Calculation Result */}
                <div className="bg-[#0a110d] p-4 rounded-xl border border-[#203529] space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Tope Anual Autorizado:</span>
                    <strong className="text-white">
                      {licenseTypeCalc === '114a1' ? '30 días' : licenseTypeCalc === '114o' ? '20 días' : '28 días'}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Días Disponibles Restantes:</span>
                    <strong className="text-emerald-400 font-bold text-sm">
                      {Math.max(0, (licenseTypeCalc === '114a1' ? 30 : licenseTypeCalc === '114o' ? 20 : 28) - daysUsed)} días con goce de sueldo
                    </strong>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-start gap-2 text-[11px]">
                  <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    El sistema previene automáticamente que el docente solicite más días de los que le corresponden sin previa junta médica.
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- MÓDULO 2: LIQUIDACIÓN DE HABERES Y TESORERÍA ----------------- */}
      {activeModule === 'tesoreria' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-[#203529] pb-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Módulo 2: Liquidación de Haberes y Soluciones para Tesorería
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Herramientas financieras y administrativas para reducir reclamos de sueldo y agilizar la firma digital.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Tool C: Importación Masiva de Recibos */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Importador Masivo de Recibos</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                  Excel / CSV / Tango
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-400">
                  Subí la planilla de sueldos emitida por tu sistema contable para disponibilizar los recibos a todo el plantel docente en segundos.
                </p>

                <div className="relative border-2 border-dashed border-[#203529] rounded-2xl p-6 text-center hover:border-emerald-500 bg-[#0a110d]">
                  <input 
                    type="file" 
                    accept=".csv,.xlsx,.xls"
                    onChange={handleImportSimulate}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="w-6 h-6 text-emerald-400" />
                    {importFile ? (
                      <p className="font-bold text-white">{importFile}</p>
                    ) : (
                      <p className="font-semibold text-slate-300">
                        Arrastrá el archivo Excel de liquidación aquí
                      </p>
                    )}
                  </div>
                </div>

                {isImporting && (
                  <p className="text-center font-bold text-emerald-400 animate-pulse">
                    Procesando 85 recibos de sueldo...
                  </p>
                )}

                {importFile && !isImporting && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-xl text-center font-semibold">
                    ¡85 Recibos de Sueldo digitalizados y publicados correctamente!
                  </div>
                )}
              </div>
            </div>

            {/* Tool D: Solicitud de Adelanto de Sueldo */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Solicitud Digital de Adelanto</h3>
                </div>
                <span className="text-[10px] bg-red-600/20 text-red-300 font-semibold px-2 py-0.5 rounded border border-red-500/40">
                  Tesorería
                </span>
              </div>

              <form onSubmit={handleAdvanceSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Monto Solicitado ($ ARS):
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Motivo / Justificación:
                  </label>
                  <input
                    type="text"
                    value={advanceReason}
                    onChange={(e) => setAdvanceReason(e.target.value)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                >
                  Enviar Solicitud a Representación Legal
                </button>

                {advanceSuccess && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-xl text-center font-semibold animate-fadeIn">
                    ¡Solicitud de anticipo por ${advanceAmount.toLocaleString('es-AR')} enviada a revisión!
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- MÓDULO 3: EXPERIENCIA DOCENTE Y AUTOGESTIÓN ----------------- */}
      {activeModule === 'autogestion' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-[#203529] pb-3">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                Módulo 3: Portal de Autogestión y Experiencia Docente
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Simplifica los trámites presenciales de los profesores mediante autogestión 100% digital.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Tool E: Declaración Jurada de Cargos */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">DDJJ de Cargos e Incompatibilidad</h3>
                </div>
                <span className="text-[10px] bg-red-600/20 text-red-300 font-semibold px-2 py-0.5 rounded border border-red-500/40">
                  Obligatorio DGCyE
                </span>
              </div>

              <form onSubmit={handleDdjjSubmit} className="space-y-3 text-xs">
                <p className="text-slate-400">
                  Actualizá tu declaración de horas en otras instituciones educativas para control de superposición horaria.
                </p>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Cantidad de otros establecimientos donde ejerces:
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={otherSchoolsCount}
                    onChange={(e) => setOtherSchoolsCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Total general de horas cátedra semanales:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={totalHours}
                    onChange={(e) => setTotalHours(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                >
                  Firmar y Presentar DDJJ Digital
                </button>

                {ddjjSuccess && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-xl text-center font-semibold animate-fadeIn">
                    ¡Declaración Jurada presentada con éxito! Copia guardada en legajo.
                  </div>
                )}
              </form>
            </div>

            {/* Tool F: Solicitud de Constancias de Servicios y Certificados */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Certificados y Constancias Express</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                  Firma Digital Válida
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-400">
                  Emití constancias laborales al instante sin tener que ir a secretaría o esperar días.
                </p>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Tipo de Certificado:
                  </label>
                  <select 
                    value={certType}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="antiguedad">Certificado de Trabajo & Antigüedad</option>
                    <option value="prestacion">Constancia de Prestación de Servicios (Acompañamiento)</option>
                    <option value="ganancias">Formulario 649 / Impuesto a las Ganancias</option>
                    <option value="horarios">Constancia Horaria Institucional</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">
                    Presentar ante / Motivo:
                  </label>
                  <input 
                    type="text"
                    value={certReason}
                    onChange={(e) => setCertReason(e.target.value)}
                    placeholder="Ej: Entidad Bancaria, Obra Social, Obra Social, etc."
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCertSuccess(true);
                    setTimeout(() => setCertSuccess(false), 3500);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Generar y Descargar PDF Firmado
                </button>

                {certSuccess && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-3 rounded-xl text-center font-semibold animate-fadeIn flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ¡Documento descargado con Código QR de validación!
                  </div>
                )}
              </div>
            </div>

            {/* Tool G: Plan de Contingencia / Tarea Pedagógica por Ausencia */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <FilePlus className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Plan de Contingencia para Suplentes</h3>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  Aviso Preventivo
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-400">
                  Dejá indicaciones y la tarea pedagógica lista para los alumnos y la preceptoría cuando tenés que faltar.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-400 mb-1">Curso / Año:</label>
                    <input 
                      type="text" 
                      value={absentCourse}
                      onChange={(e) => setAbsentCourse(e.target.value)}
                      className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-400 mb-1">Link de Classroom / Drive:</label>
                    <input 
                      type="text" 
                      value={contingencyLink}
                      onChange={(e) => setContingencyLink(e.target.value)}
                      className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-400 mb-1">Tema / Actividad propuesta:</label>
                  <textarea 
                    rows={2}
                    value={contingencyTopic}
                    onChange={(e) => setContingencyTopic(e.target.value)}
                    className="w-full bg-[#0a110d] border border-[#203529] rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setContingencyCopied(true);
                      setTimeout(() => setContingencyCopied(false), 3000);
                    }}
                    className="flex-1 bg-[#1a2c21] hover:bg-[#233b2e] text-emerald-300 font-bold py-2.5 rounded-xl border border-[#294535] transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar para Preceptoría
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Plan de contingencia notificado a Vicedirección y Preceptoría del curso.")}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Notificar a Regencia
                  </button>
                </div>

                {contingencyCopied && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 p-2.5 rounded-xl text-center font-medium animate-fadeIn">
                    ¡Copiado al portapapeles! Listo para enviar por WhatsApp o correo institucional.
                  </div>
                )}
              </div>
            </div>

            {/* Tool H: App Móvil & Accesos Directos Útiles */}
            <div className="bg-[#132019] rounded-2xl border border-[#203529] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#203529] pb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white text-base">Acceso Móvil PWA & Utilidades</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
                  Experiencia Novedosa
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#0a110d] rounded-xl border border-[#203529] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-bold text-white">Calendario Escolar & Feriados Docentes</p>
                      <p className="text-slate-400 text-[11px]">Sincronización directa con Google / Outlook</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Sincronizando Calendario Académico DGCyE a tu calendario de Google...")}
                    className="bg-[#1a2c21] hover:bg-[#233b2e] border border-[#294535] text-white font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Sincronizar
                  </button>
                </div>

                <div className="p-3 bg-[#0a110d] rounded-xl border border-[#203529] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="font-bold text-white">Calculadora de Antigüedad y Trienios</p>
                      <p className="text-slate-400 text-[11px]">Simulá tus cobros por tramos de 3 y 5 años</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Antigüedad actual: 10 años (60%). Próximo tramo (70%): en 1 año y 10 meses.")}
                    className="bg-[#1a2c21] hover:bg-[#233b2e] border border-[#294535] text-white font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Calcular
                  </button>
                </div>

                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-center space-y-1">
                  <Smartphone className="w-6 h-6 mx-auto text-emerald-400" />
                  <p className="font-bold text-xs">Instalá la App en tu celular (PWA)</p>
                  <p className="text-[11px] text-emerald-400/90">
                    Abrí esta página en el celular y seleccioná "Agregar a la pantalla principal". Tendrás acceso rápido sin descargar nada de la tienda.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
