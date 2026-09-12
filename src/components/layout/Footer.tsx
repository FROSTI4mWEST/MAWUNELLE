import React from 'react';
import { MessageCircle, Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, navigateToCollection } = useApp();

  return (
    <footer className="bg-[#3D302C] text-[#F8F3EE] pt-14 pb-24 lg:pb-14 border-t border-[#52413C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#52413C]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-wider text-[#F8F3EE] font-medium block">
              MAWUNELLE
            </span>
            <p className="text-xs text-[#D8C7B7] max-w-sm leading-relaxed">
              "Beautiful things, thoughtfully chosen." A calm, feminine, curated lifestyle store designed around practical, beautiful everyday moments. Serving customers across Accra, Kumasi, and all regions of Ghana.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/233244567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center hover:bg-[#25D366]/30 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 text-[#F8F3EE] flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C7B7]">
              <li>
                <button
                  onClick={() => navigateToCollection('everyday-edit')}
                  className="hover:text-white transition"
                >
                  Everyday Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCollection('glow-ritual')}
                  className="hover:text-white transition"
                >
                  Glow Ritual
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCollection('monthly-product')}
                  className="hover:text-white transition"
                >
                  Monthly Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('the-edit')}
                  className="hover:text-white transition"
                >
                  The Edit / Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="hover:text-white transition"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C7B7]">
              <li>
                <button onClick={() => setActiveTab('delivery')} className="hover:text-white transition">
                  Delivery & Shipping
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('returns')} className="hover:text-white transition">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition">
                  Contact & WhatsApp
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('account')} className="hover:text-white transition">
                  Order Status & History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-white transition flex items-center gap-1">
                  <span>Store Admin</span>
                  <ArrowUpRight className="w-3 h-3 text-[#C5A46D]" />
                </button>
              </li>
            </ul>
          </div>

          {/* About & Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              About & Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C7B7]">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-white transition">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('terms')} className="hover:text-white transition">
                  Terms & Conditions
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-[#D8C7B7]/60 block">Ghana Customer Hotline</span>
                <span className="text-xs font-medium text-[#F8F3EE]">+233 (0) 24 456 7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8C7B7]/70">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MAWUNELLE Lifestyle Ltd. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Accra, Ghana</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#D8C7B7]">
            <span>MTN MoMo</span>
            <span>•</span>
            <span>Telecel Cash</span>
            <span>•</span>
            <span>Card Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
