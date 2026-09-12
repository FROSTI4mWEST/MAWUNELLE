import React from 'react';
import { RotateCcw, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReturnsPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block">
            Hassle-Free Policy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
            Returns & Exchanges
          </h1>
          <p className="text-xs sm:text-sm text-[#3D302C]/70 max-w-xl mx-auto font-light">
            We want you to be thoroughly delighted with every piece chosen from Mawunelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 text-center space-y-2">
            <span className="w-10 h-10 rounded-full bg-[#D9B8B2] text-[#3D302C] font-bold text-sm mx-auto flex items-center justify-center mb-3">
              7
            </span>
            <h3 className="font-serif text-base font-semibold text-[#3D302C]">7-Day Window</h3>
            <p className="text-xs text-[#3D302C]/70">
              Initiate an exchange or return within 7 calendar days of receipt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 text-center space-y-2">
            <span className="w-10 h-10 rounded-full bg-[#D9B8B2] text-[#3D302C] font-bold text-sm mx-auto flex items-center justify-center mb-3">
              ✓
            </span>
            <h3 className="font-serif text-base font-semibold text-[#3D302C]">Original Condition</h3>
            <p className="text-xs text-[#3D302C]/70">
              Items must be unused, unwashed, with tags intact and original packaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 text-center space-y-2">
            <span className="w-10 h-10 rounded-full bg-[#D9B8B2] text-[#3D302C] font-bold text-sm mx-auto flex items-center justify-center mb-3">
              ⚡
            </span>
            <h3 className="font-serif text-base font-semibold text-[#3D302C]">Quick MoMo Refund</h3>
            <p className="text-xs text-[#3D302C]/70">
              Approved refunds are credited back directly to your Mobile Money wallet.
            </p>
          </div>
        </div>

        {/* Intimate Care Note */}
        <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 space-y-3">
          <h3 className="font-serif text-base font-semibold text-[#3D302C]">
            Hygiene & Intimate Care Restrictions
          </h3>
          <p className="text-xs text-[#3D302C]/80 leading-relaxed font-light">
            For personal hygiene and public health reasons, opened organic sanitary pads, period care kits, and opened personal balms from our Glow Ritual line cannot be returned once the inner tamper-evident protective seal is broken. If an item arrives damaged or defective, we will send an immediate replacement at zero cost.
          </p>
        </div>

        {/* Action WhatsApp */}
        <div className="p-6 rounded-3xl bg-[#25D366]/15 border border-[#25D366]/30 text-center space-y-3">
          <h3 className="font-serif text-lg font-semibold text-[#128C7E]">
            Need to request an exchange?
          </h3>
          <p className="text-xs text-[#3D302C]/80 max-w-md mx-auto font-light">
            Simply send your Order ID and photo to our WhatsApp concierge for same-day processing.
          </p>
          <a
            href="https://wa.me/233244567890?text=Hello%20Mawunelle,%20I%20would%20like%20to%20request%20an%20exchange%20for%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
