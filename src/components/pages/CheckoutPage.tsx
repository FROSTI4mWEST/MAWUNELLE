import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Phone,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Package,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    appliedVoucher,
    placeOrder,
    setActiveTab,
    formatGHC,
    showToast,
  } = useApp();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Accra');
  const [region, setRegion] = useState('Greater Accra');
  const [notes, setNotes] = useState('');
  const [discreetPackaging, setDiscreetPackaging] = useState(true);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'telecel_cash' | 'card' | 'cod'>('mtn_momo');
  const [momoNumber, setMomoNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const ghanaRegions = [
    'Greater Accra',
    'Ashanti',
    'Western',
    'Central',
    'Eastern',
    'Volta',
    'Northern',
    'Upper East',
    'Upper West',
    'Bono',
    'Bono East',
    'Ahafo',
    'Oti',
    'North East',
    'Savannah',
    'Western North',
  ];

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phone || !streetAddress || !city) {
      showToast('Please fill in your name, Ghana phone number, and delivery address.', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulate realistic payment gateway authorization (MoMo prompt / Card verification)
    setTimeout(() => {
      const order = placeOrder({
        customer: {
          name: customerName,
          email: email || `${phone.replace(/\s+/g, '')}@customer.mawunelle.com`,
          phone,
          altPhone: altPhone || undefined,
        },
        shippingAddress: {
          street: streetAddress,
          city,
          region,
          landmark: landmark || undefined,
        },
        paymentMethod,
        momoNumber: paymentMethod.includes('momo') || paymentMethod.includes('telecel') ? momoNumber || phone : undefined,
        notes: notes ? `${notes} ${discreetPackaging ? '[REQUESTED DISCREET PACKAGING]' : ''}` : (discreetPackaging ? '[REQUESTED DISCREET PACKAGING]' : undefined),
      });

      setIsProcessing(false);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F3EE] py-16 px-4 text-center">
        <h2 className="font-serif text-2xl text-[#3D302C]">No items in cart</h2>
        <button
          onClick={() => setActiveTab('shop')}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setActiveTab('cart')}
          className="inline-flex items-center gap-1.5 text-xs text-[#3D302C]/70 hover:text-[#3D302C] mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bag</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium mb-8">
          Checkout & Secure Payment
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left 7 Columns: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="p-6 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#D8C7B7]">
                <span className="w-6 h-6 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-lg text-[#3D302C] font-medium">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Afia Mensah"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Email Address (for receipt)
                  </label>
                  <input
                    type="email"
                    placeholder="afia@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Ghana Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="024 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Alternative Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="020 987 6543"
                    value={altPhone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address in Ghana */}
            <div className="p-6 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#D8C7B7]">
                <span className="w-6 h-6 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-lg text-[#3D302C] font-medium">Delivery Address</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Street Address / House Description *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House No. 24, Kofi Annan Avenue, Airport Residential"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Nearby Landmark (Essential for Ghana Couriers)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Shell filling station, or Behind Zenith Bank"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#3D302C] block mb-1">
                      City / Suburb *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Accra, Tema, Kumasi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#3D302C] block mb-1">
                      Region *
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C] cursor-pointer"
                    >
                      {ghanaRegions.map((r) => (
                        <option key={r} value={r}>
                          {r} Region
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Special Delivery Notes / Gate Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please call before arriving or leave with front security"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none focus:border-[#3D302C]"
                  />
                </div>

                {/* Discreet Packaging Option */}
                <div className="p-3 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="chk-discreet"
                    checked={discreetPackaging}
                    onChange={(e) => setDiscreetPackaging(e.target.checked)}
                    className="accent-[#3D302C] mt-0.5 rounded cursor-pointer"
                  />
                  <label htmlFor="chk-discreet" className="text-xs text-[#3D302C] cursor-pointer">
                    <strong className="font-semibold block">Discreet Packaging (Complimentary)</strong>
                    <span className="text-[#3D302C]/70">
                      Shipped in clean, unbranded protective packaging with no external labels identifying personal care or comfort items.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 3. Ghana Payment Methods */}
            <div className="p-6 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#D8C7B7]">
                <span className="w-6 h-6 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-lg text-[#3D302C] font-medium">Ghana Payment Method</h3>
              </div>

              <div className="space-y-3">
                {/* MTN Mobile Money */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'mtn_momo'
                      ? 'border-[#3D302C] bg-[#F8F3EE]'
                      : 'border-[#D8C7B7] hover:bg-[#F8F3EE]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'mtn_momo'}
                      onChange={() => setPaymentMethod('mtn_momo')}
                      className="accent-[#3D302C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#3D302C] block">
                        MTN Mobile Money (MoMo)
                      </span>
                      <span className="text-[11px] text-[#3D302C]/60">
                        Prompt will be sent directly to your phone for approval
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-[#FFCC00]/20 text-[#3D302C] px-2.5 py-1 rounded-full font-bold">
                    MoMo
                  </span>
                </label>

                {/* Telecel Cash */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'telecel_cash'
                      ? 'border-[#3D302C] bg-[#F8F3EE]'
                      : 'border-[#D8C7B7] hover:bg-[#F8F3EE]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'telecel_cash'}
                      onChange={() => setPaymentMethod('telecel_cash')}
                      className="accent-[#3D302C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#3D302C] block">
                        Telecel Cash (formerly Vodafone)
                      </span>
                      <span className="text-[11px] text-[#3D302C]/60">
                        Generate voucher code or approve instant wallet prompt
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-red-100 text-red-800 px-2 py-1 rounded-full font-bold">
                    Telecel
                  </span>
                </label>

                {/* Card Payment */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'border-[#3D302C] bg-[#F8F3EE]'
                      : 'border-[#D8C7B7] hover:bg-[#F8F3EE]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#3D302C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#3D302C] block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-[#3D302C]/60">
                        Visa & Mastercard secured with 3D Secure OTP
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-[#3D302C]/70" />
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    paymentMethod === 'cod'
                      ? 'border-[#3D302C] bg-[#F8F3EE]'
                      : 'border-[#D8C7B7] hover:bg-[#F8F3EE]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_choice"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#3D302C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#3D302C] block">
                        Pay On Delivery (Accra / Tema Only)
                      </span>
                      <span className="text-[11px] text-[#3D302C]/60">
                        Cash or Mobile Money transfer upon parcel arrival
                      </span>
                    </div>
                  </div>
                  <Truck className="w-4 h-4 text-[#3D302C]/70" />
                </label>
              </div>

              {/* MoMo Number input if MoMo or Telecel */}
              {(paymentMethod === 'mtn_momo' || paymentMethod === 'telecel_cash') && (
                <div className="pt-2">
                  <label className="text-xs font-medium text-[#3D302C] block mb-1">
                    Mobile Money Wallet Number
                  </label>
                  <input
                    type="tel"
                    placeholder={phone || '024 000 0000'}
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] outline-none"
                  />
                  <span className="text-[10px] text-[#3D302C]/50 mt-1 block">
                    You will receive a prompt on this SIM card to authorize payment of {formatGHC(cartTotal)}.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Summary & Confirm Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-5">
              <h3 className="font-serif text-lg text-[#3D302C] font-medium pb-3 border-b border-[#D8C7B7]">
                Order Items ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item, index) => (
                  <div key={item.id ? `${item.id}-${index}` : `cart-item-${index}`} className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product?.images?.[0] || (item as any)?.image || ''}
                        alt={item.product?.name || 'Item'}
                        className="w-12 h-12 object-cover rounded-lg bg-[#F8F3EE] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="font-medium text-[#3D302C] block line-clamp-1">
                          {item.product?.name || (item as any)?.name || 'Piece'}
                        </span>
                        <span className="text-[11px] text-[#3D302C]/60">
                          Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-[#3D302C] shrink-0">
                      {formatGHC((item.product?.price ?? (item as any)?.price ?? 0) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="pt-4 border-t border-[#D8C7B7]/40 space-y-2 text-xs text-[#3D302C]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#3D302C]">{formatGHC(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#C5A46D]">
                    <span>Voucher Discount</span>
                    <span>-{formatGHC(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ghana Courier Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatGHC(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#3D302C] pt-3 border-t border-[#D8C7B7]">
                  <span>Total Due</span>
                  <span>{formatGHC(cartTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="btn-place-order-submit"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#52413C] transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Authorizing Ghana Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Confirm & Pay {formatGHC(cartTotal)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#3D302C]/60 text-center">
                <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
                <span>256-Bit SSL Encrypted & Bank-Grade Security</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
