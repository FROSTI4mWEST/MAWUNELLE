import React, { useState } from 'react';
import { Lock, ShieldCheck, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose }) => {
  const { authenticateAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authenticateAdmin(password);
    if (success) {
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  const handleQuickUnlock = () => {
    authenticateAdmin('mawunelle2026');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#F8F3EE] rounded-3xl p-6 sm:p-8 border border-[#D8C7B7] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#3D302C]/60 hover:text-[#3D302C]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#3D302C] text-[#C5A46D] mx-auto flex items-center justify-center shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl text-[#3D302C] font-medium">
            MAWUNELLE Store Admin
          </h3>
          <p className="text-xs text-[#3D302C]/70">
            Enter the store credentials to access orders, stock levels, and revenue analytics.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#3D302C] block mb-1">
              Admin Passcode
            </label>
            <input
              type="password"
              autoFocus
              placeholder="Enter passcode (default: mawunelle2026)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
            />
            {error && (
              <span className="text-xs text-red-600 mt-1 block">
                Incorrect passcode. Try <strong>mawunelle2026</strong> or use 1-click unlock below.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider hover:bg-[#52413C] transition shadow-md"
          >
            Authenticate & Open Portal
          </button>

          <div className="pt-3 border-t border-[#D8C7B7]/50 text-center">
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="text-xs text-[#C5A46D] hover:underline font-semibold flex items-center justify-center gap-1.5 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Store Manager Access</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
