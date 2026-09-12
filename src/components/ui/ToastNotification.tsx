import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastNotification: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#C5A46D] shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#3D302C] shrink-0" />,
  };

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-sm pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="bg-[#3D302C] text-[#F8F3EE] px-4 py-3 rounded-xl shadow-2xl border border-[#C5A46D]/40 flex items-center gap-3">
        {icons[toast.type || 'success']}
        <p className="text-xs sm:text-sm font-medium leading-tight">{toast.message}</p>
      </div>
    </div>
  );
};
