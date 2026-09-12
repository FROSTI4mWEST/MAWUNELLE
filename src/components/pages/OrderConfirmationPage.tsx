import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRight, Package, Truck, Calendar, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentOrder, setActiveTab, formatGHC } = useApp();

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#F8F3EE] py-16 px-4 text-center">
        <h2 className="font-serif text-2xl text-[#3D302C]">No recent order found</h2>
        <button
          onClick={() => setActiveTab('shop')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs uppercase"
        >
          Browse Catalogue
        </button>
      </div>
    );
  }

  const order = currentOrder;
  const whatsappOrderLink = `https://wa.me/233244567890?text=Hello%20Mawunelle,%20I%20just%20placed%20order%20%23${order.orderNumber}.%20Can%20you%20confirm%20delivery%20timing%3F`;

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D8C7B7]/60 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#D9B8B2]/30 text-[#3D302C] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#C5A46D]" />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-bold block mb-1">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
              Thank You, {order.customer.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-[#3D302C]/70 mt-2 max-w-md mx-auto font-light">
              Your order <strong className="font-semibold text-[#3D302C]">#{order.orderNumber}</strong> has been received and is being prepared with thoughtful care.
            </p>
          </div>

          {/* Delivery & Status Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8F3EE] border border-[#D8C7B7]/60 text-left text-xs">
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <div>
                <span className="text-[#3D302C]/50 block text-[10px] uppercase">Status</span>
                <span className="font-semibold text-[#3D302C] capitalize">{order.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <div>
                <span className="text-[#3D302C]/50 block text-[10px] uppercase">Destination</span>
                <span className="font-semibold text-[#3D302C] truncate">{order.shippingAddress.city}, Ghana</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <div>
                <span className="text-[#3D302C]/50 block text-[10px] uppercase">Est. Delivery</span>
                <span className="font-semibold text-[#3D302C]">1 – 2 Business Days</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Tracking */}
          <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div>
              <h4 className="text-xs font-semibold text-[#128C7E]">
                Need instant updates or personal assistance?
              </h4>
              <p className="text-[11px] text-[#3D302C]/70 mt-0.5">
                Connect directly with our Accra logistics concierge via WhatsApp.
              </p>
            </div>
            <a
              href={whatsappOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition flex items-center gap-1.5 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
              <span>WhatsApp Tracking</span>
            </a>
          </div>

          {/* Items Summary Table */}
          <div className="text-left pt-4 border-t border-[#D8C7B7]/40 space-y-3">
            <h3 className="font-serif text-base text-[#3D302C] font-medium">Order Items</h3>
            <div className="space-y-2.5">
              {(order.items || []).map((item, itemIdx) => (
                <div key={item.id ? `${item.id}-${itemIdx}` : `item-${itemIdx}`} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product?.images?.[0] || (item as any)?.image || ''}
                      alt={item.product?.name || item.name || 'Product'}
                      className="w-12 h-12 object-cover rounded-lg bg-[#F8F3EE]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-medium text-[#3D302C] block">
                        {item.product?.name || item.name || 'Product'}
                      </span>
                      <span className="text-[11px] text-[#3D302C]/60">
                        Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#3D302C]">
                    {formatGHC((item.product?.price ?? (item as any)?.price ?? 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#D8C7B7]/40 space-y-1.5 text-xs text-[#3D302C]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatGHC(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#C5A46D]">
                  <span>Discount</span>
                  <span>-{formatGHC(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee === 0 ? 'FREE' : formatGHC(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3D302C] pt-2 border-t border-[#D8C7B7]">
                <span>Total Paid</span>
                <span>{formatGHC(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider hover:bg-[#52413C] transition flex items-center justify-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D8C7B7] text-[#3D302C] text-xs font-semibold uppercase tracking-wider hover:bg-[#F8F3EE] transition"
            >
              View Order in Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
