import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block">
            Transparency & Security
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-xs text-[#3D302C]/60">
            Last updated: September 2026 • Mawunelle Lifestyle Ltd, Accra, Ghana
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-6 text-xs text-[#3D302C]/80 leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-serif text-base font-semibold text-[#3D302C]">1. Data Privacy & Customer Information</h2>
            <p>
              At Mawunelle, we hold your privacy in the highest regard. Any personal information you provide — including your name, email, phone number, and Ghana delivery address — is used exclusively for order fulfillment, dispatch logistics, and critical account communications. We never sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-semibold text-[#3D302C]">2. Payment Processing Security</h2>
            <p>
              Payments processed via MTN Mobile Money, Telecel Cash, and Credit/Debit Cards are secured with bank-grade encryption protocols and authorized through licensed payment aggregators in Ghana. Mawunelle does not store your Mobile Money PIN or CVV credentials on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-semibold text-[#3D302C]">3. Discreet Delivery Protocol</h2>
            <p>
              We recognize the personal and private nature of women's care and period comfort items. All orders leaving our Accra dispatch hub are shipped in unbranded, discreet exterior boxes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base font-semibold text-[#3D302C]">4. Pricing and Currency</h2>
            <p>
              All prices listed on Mawunelle are quoted in Ghana Cedis (GH₵) and include applicable local service taxes. Delivery charges are calculated transparently at checkout prior to payment authorization.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
