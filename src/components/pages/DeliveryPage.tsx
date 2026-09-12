import React from 'react';
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeliveryPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block">
            Nationwide Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
            Delivery & Shipping Across Ghana
          </h1>
          <p className="text-xs sm:text-sm text-[#3D302C]/70 max-w-xl mx-auto font-light">
            We partner with reliable dispatch riders and courier partners to ensure safe, discreet, and prompt parcel arrival.
          </p>
        </div>

        {/* Free Shipping Highlight */}
        <div className="p-6 rounded-3xl bg-[#C5A46D]/15 border border-[#C5A46D]/40 text-center space-y-2">
          <Truck className="w-8 h-8 text-[#3D302C] mx-auto" />
          <h3 className="font-serif text-lg font-semibold text-[#3D302C]">
            Complimentary Ghana Shipping on Orders Over GH₵ 300
          </h3>
          <p className="text-xs text-[#3D302C]/80 max-w-md mx-auto">
            Enjoy free delivery on qualifying orders anywhere in Greater Accra, Kumasi, and all major regional capitals.
          </p>
        </div>

        {/* Rates and Timelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C5A46D]" />
              <h3 className="font-serif text-base font-semibold text-[#3D302C]">
                Greater Accra & Tema
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-[#3D302C]/80">
              <li className="flex items-center justify-between py-1 border-b border-[#D8C7B7]/30">
                <span>Standard Delivery (1-2 days)</span>
                <span className="font-semibold text-[#3D302C]">GH₵ 30 (Free over GH₵ 300)</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-[#D8C7B7]/30">
                <span>Same-Day Express Dispatch</span>
                <span className="font-semibold text-[#3D302C]">GH₵ 50</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span>Pay on Delivery</span>
                <span className="font-semibold text-[#3D302C]">Available</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#C5A46D]" />
              <h3 className="font-serif text-base font-semibold text-[#3D302C]">
                Other Regions Across Ghana
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs text-[#3D302C]/80">
              <li className="flex items-center justify-between py-1 border-b border-[#D8C7B7]/30">
                <span>Ashanti (Kumasi central)</span>
                <span className="font-semibold text-[#3D302C]">2 – 3 business days</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-[#D8C7B7]/30">
                <span>Western & Central (Takoradi/Cape Coast)</span>
                <span className="font-semibold text-[#3D302C]">2 – 3 business days</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span>Northern & Upper Regions</span>
                <span className="font-semibold text-[#3D302C]">3 – 5 business days</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Discreet Delivery Commitment */}
        <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />
            <h3 className="font-serif text-base font-semibold text-[#3D302C]">
              Our Discreet Packaging Guarantee
            </h3>
          </div>
          <p className="text-xs text-[#3D302C]/80 leading-relaxed font-light">
            We understand that menstrual and intimate comfort items require personal discretion. All packages from Mawunelle arrive in neutral, sealed, elegant gift boxes without external itemized labelling. Dispatch riders cannot see the contents of your parcel.
          </p>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setActiveTab('shop')}
            className="px-8 py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
