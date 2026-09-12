import React from 'react';
import { Sparkles, Heart, Package, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block">
            Our Story & Intent
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#3D302C] font-medium leading-tight">
            "Beautiful things, <br />
            <span className="italic font-normal">thoughtfully chosen."</span>
          </h1>
          <p className="text-xs sm:text-base text-[#3D302C]/75 max-w-2xl mx-auto font-light leading-relaxed pt-2">
            Mawunelle was founded in Accra, Ghana, to bring quiet beauty and practical elegance to the everyday lives of modern women.
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-[16/9] border border-[#D8C7B7]">
          <img
            src="https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=85"
            alt="Mawunelle calm interior lifestyle setting"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-semibold">
              The Genesis
            </span>
            <h2 className="font-serif text-2xl text-[#3D302C] font-medium">
              More than a store, an ongoing ritual of calm.
            </h2>
            <p className="text-xs sm:text-sm text-[#3D302C]/80 leading-relaxed font-light">
              Too often, daily life in the city feels hurried and cluttered. Finding lifestyle pieces that feel truly refined, cohesive, and grounded in gentle aesthetics in Ghana used to require scouring dozens of disjointed vendors.
            </p>
            <p className="text-xs sm:text-sm text-[#3D302C]/80 leading-relaxed font-light">
              Mawunelle curates that sanctuary for you. Every tote bag, phone case, foot soak, and period comfort kit is hand-selected, tested, and wrapped with care.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#D9B8B2] flex items-center justify-center text-[#3D302C]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#3D302C] font-medium">
              Our Core Promise
            </h3>
            <p className="text-xs text-[#3D302C]/70 leading-relaxed">
              "We promise to never sell generic clutter. If it doesn’t elevate your morning routine, soothe your tired feet, or bring comfort to your monthly cycle, it doesn't belong in Mawunelle."
            </p>
            <span className="text-[11px] font-serif italic text-[#C5A46D] block">
              — The Mawunelle Founding Team, Accra
            </span>
          </div>
        </div>

        {/* The 3 Pillars of Mawunelle */}
        <div className="pt-6 border-t border-[#D8C7B7]/50 space-y-8">
          <div className="text-center max-w-md mx-auto">
            <h2 className="font-serif text-2xl text-[#3D302C] font-medium">
              Our Three Defining Editions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60">
              <span className="text-xs font-bold text-[#C5A46D] uppercase">01</span>
              <h3 className="font-serif text-base font-semibold text-[#3D302C] mt-2">Everyday Edit</h3>
              <p className="text-xs text-[#3D302C]/70 mt-2 leading-relaxed">
                Totes, tech sleeves, and bedside lights designed with understated luxury and enduring durability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60">
              <span className="text-xs font-bold text-[#C5A46D] uppercase">02</span>
              <h3 className="font-serif text-base font-semibold text-[#3D302C] mt-2">Glow Ritual</h3>
              <p className="text-xs text-[#3D302C]/70 mt-2 leading-relaxed">
                Formulations and guided physical routines dedicated specifically to hand softness and foot repair.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D8C7B7]/60">
              <span className="text-xs font-bold text-[#C5A46D] uppercase">03</span>
              <h3 className="font-serif text-base font-semibold text-[#3D302C] mt-2">Monthly Product</h3>
              <p className="text-xs text-[#3D302C]/70 mt-2 leading-relaxed">
                A compassionate, holistic response to period care with warming herbal patches and discreet delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 rounded-3xl bg-[#3D302C] text-[#F8F3EE] text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium">
            Step into the Mawunelle Lifestyle
          </h2>
          <p className="text-xs sm:text-sm text-[#D8C7B7] max-w-md mx-auto font-light">
            Browse our current edits or chat with our team on WhatsApp for personalized gifting recommendations.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setActiveTab('shop')}
              className="px-7 py-3 rounded-full bg-[#F8F3EE] text-[#3D302C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition flex items-center gap-2"
            >
              <span>Explore The Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
