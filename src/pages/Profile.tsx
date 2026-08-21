import React, { useState } from 'react';
import { mockUser } from '../data/mockData';
import { 
  Mail, 
  BadgeCheck, 
  Edit3, 
  Check, 
  Key,
  GraduationCap
} from 'lucide-react';

export const Profile: React.FC = () => {
  const [userState, setUserState] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneInput, setPhoneInput] = useState(userState.phone);
  const [addressInput, setAddressInput] = useState(userState.address);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserState(prev => ({
      ...prev,
      phone: phoneInput,
      address: addressInput
    }));
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="bg-[#132019] rounded-2xl border border-[#203529] shadow-md overflow-hidden backdrop-blur-xs">
        {/* Cover Accent */}
        <div className="h-32 bg-gradient-to-r from-emerald-950 via-[#102419] to-red-950/40 border-b border-emerald-800/40 relative">
          <div className="absolute right-4 bottom-3 bg-[#0a110d]/80 backdrop-blur-xs text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/40 font-medium">
            Agente Activo DGCyE
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            
            {/* Avatar */}
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-emerald-700 text-white font-extrabold text-2xl flex items-center justify-center border-4 border-[#132019] shadow-xl">
                MR
              </div>
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-white leading-tight flex items-center gap-2">
                  {userState.name}
                  <BadgeCheck className="w-5 h-5 text-emerald-400" />
                </h1>
                <p className="text-sm font-semibold text-emerald-300">
                  {userState.role}
                </p>
                <p className="text-xs text-slate-400">
                  {userState.school}
                </p>
              </div>
            </div>

            {/* Quick Action */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[#294535] bg-[#1a2c21] text-slate-200 text-xs font-semibold hover:bg-[#233b2e] transition shadow-sm self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancelar Edición' : 'Editar Contacto'}
            </button>

          </div>

          {savedSuccess && (
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2.5 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400" /> Datos de contacto actualizados correctamente.
            </div>
          )}

          {/* User Attributes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            
            {/* Legajo & Identification Box */}
            <div className="bg-[#0a110d] p-4 rounded-xl border border-[#203529] space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" /> Identificación Institucional
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#203529]">
                  <span className="text-slate-400">Número de Legajo:</span>
                  <span className="font-bold text-white font-mono">{userState.fileNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#203529]">
                  <span className="text-slate-400">Documento (DNI):</span>
                  <span className="font-semibold text-white">{userState.dni}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#203529]">
                  <span className="text-slate-400">Antigüedad Docente:</span>
                  <span className="font-semibold text-white">{userState.seniority}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Turno de Trabajo:</span>
                  <span className="font-semibold text-white">{userState.shift}</span>
                </div>
              </div>
            </div>

            {/* School & Unit Box */}
            <div className="bg-[#0a110d] p-4 rounded-xl border border-[#203529] space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" /> Establecimiento de Destino
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#203529]">
                  <span className="text-slate-400">Escuela:</span>
                  <span className="font-bold text-white">{userState.school}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#203529]">
                  <span className="text-slate-400">Jurisdicción:</span>
                  <span className="font-semibold text-white">DGCyE Provincia de Buenos Aires</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#203529]">
                  <span className="text-slate-400">Estado de revista:</span>
                  <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Titular</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Carga Horaria:</span>
                  <span className="font-semibold text-white">20 Horas Cátedra</span>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Information Section / Form */}
          <div className="mt-6 border-t border-[#203529] pt-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" /> Datos de Contacto y Notificaciones
            </h3>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg bg-[#0a110d] p-4 rounded-xl border border-[#203529]">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Correo Electrónico Oficial (No editable)
                  </label>
                  <input 
                    type="email"
                    disabled
                    value={userState.email}
                    className="w-full bg-[#132019] text-slate-400 text-xs rounded-xl px-3 py-2 border border-[#203529]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Teléfono de Contacto
                  </label>
                  <input 
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full bg-[#132019] text-white text-xs rounded-xl px-3 py-2 border border-[#203529] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Domicilio Declarado
                  </label>
                  <input 
                    type="text"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full bg-[#132019] text-white text-xs rounded-xl px-3 py-2 border border-[#203529] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-[#1a2c21] hover:bg-[#233b2e] text-slate-300 font-semibold text-xs px-4 py-2 rounded-xl transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-[#0a110d] rounded-xl border border-[#203529]">
                  <span className="text-slate-400 block mb-1">Correo Electrónico</span>
                  <span className="font-semibold text-slate-200">{userState.email}</span>
                </div>
                <div className="p-3 bg-[#0a110d] rounded-xl border border-[#203529]">
                  <span className="text-slate-400 block mb-1">Teléfono</span>
                  <span className="font-semibold text-slate-200">{userState.phone}</span>
                </div>
                <div className="p-3 bg-[#0a110d] rounded-xl border border-[#203529]">
                  <span className="text-slate-400 block mb-1">Domicilio Declarado</span>
                  <span className="font-semibold text-slate-200">{userState.address}</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
