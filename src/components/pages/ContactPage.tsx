import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our concierge team', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
            Customer Care
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
            We’d Love to Hear from You
          </h1>
          <p className="text-xs sm:text-sm text-[#3D302C]/70 mt-2 font-light">
            Whether you have questions about our launch collections, delivery across Ghana, or custom corporate gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Contact Details (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Priority Card */}
            <div className="p-6 rounded-3xl bg-[#25D366]/15 border border-[#25D366]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#128C7E]">
                <MessageCircle className="w-5 h-5 fill-[#128C7E] stroke-none" />
                <h3 className="font-serif text-base font-semibold">Instant WhatsApp Concierge</h3>
              </div>
              <p className="text-xs text-[#3D302C]/80 leading-relaxed font-light">
                For rapid response, delivery coordinate tracking, or order modifications, reach us directly on WhatsApp.
              </p>
              <a
                href="https://wa.me/233244567890?text=Hello%20Mawunelle,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition shadow-xs mt-1"
              >
                <span>Chat with Us Now</span>
              </a>
            </div>

            {/* Direct Info List */}
            <div className="p-6 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-4 text-xs text-[#3D302C]/80">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#3D302C] block">Ghana Support Line:</strong>
                  <span>+233 (0) 24 456 7890 / +233 (0) 20 123 4567</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#3D302C] block">Email Inquiries:</strong>
                  <span>care@mawunelle.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#3D302C] block">Studio & Fulfillment:</strong>
                  <span>East Legon / Airport Residential, Accra, Ghana</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#3D302C] block">Operating Hours:</strong>
                  <span>Monday – Saturday: 8:30 AM – 6:30 PM GMT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs">
              <h3 className="font-serif text-xl text-[#3D302C] font-medium pb-4 border-b border-[#D8C7B7]">
                Send Us a Note
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#C5A46D] mx-auto" />
                  <h4 className="font-serif text-xl text-[#3D302C]">Thank you for reaching out</h4>
                  <p className="text-xs text-[#3D302C]/70 max-w-sm mx-auto font-light">
                    Our team in Accra has received your message and will respond within 2 to 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-5 py-2 rounded-full border border-[#D8C7B7] text-xs font-semibold text-[#3D302C]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="text-xs font-medium text-[#3D302C] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ama Serwaa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none focus:border-[#3D302C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#3D302C] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ama@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none focus:border-[#3D302C]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#3D302C] block mb-1">
                        Order Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="MW-1002"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none focus:border-[#3D302C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#3D302C] block mb-1">
                      How can we assist you? *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us what you need help with..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none focus:border-[#3D302C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#52413C] transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
