import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, Tag, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    setActiveTab,
    formatGHC,
  } = useApp();

  const [voucherInput, setVoucherInput] = useState('');

  const freeShippingThreshold = 300;
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    applyVoucher(voucherInput.trim());
    setVoucherInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F3EE] py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#D8C7B7]/30 flex items-center justify-center text-[#3D302C]/40 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl text-[#3D302C]">Your bag is empty</h1>
        <p className="text-xs sm:text-sm text-[#3D302C]/70 max-w-sm mt-2 mb-6">
          Explore our calm essentials, soothing foot rituals, and thoughtful cycle packages.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-8 py-3.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#52413C] transition shadow-md"
        >
          Explore The Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setActiveTab('shop')}
          className="inline-flex items-center gap-1.5 text-xs text-[#3D302C]/70 hover:text-[#3D302C] mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium mb-8">
          Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items List (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 rounded-2xl bg-white border border-[#D8C7B7]/60 shadow-xs">
              <div className="flex items-center justify-between text-xs text-[#3D302C] mb-2">
                <span className="flex items-center gap-2 font-medium">
                  <Truck className="w-4 h-4 text-[#C5A46D]" />
                  {remainingForFree === 0
                    ? '🎉 You have unlocked Free Shipping across Ghana!'
                    : `Add ${formatGHC(remainingForFree)} more to get FREE Ghana delivery`}
                </span>
                <span className="font-semibold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 bg-[#D8C7B7]/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C5A46D] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items Cards */}
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={item.id ? `${item.id}-${idx}` : `cart-${idx}`}
                  className="p-4 rounded-2xl bg-white border border-[#D8C7B7]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.images?.[0] || (item as any)?.image || ''}
                      alt={item.product?.name || 'Item'}
                      className="w-20 h-20 object-cover rounded-xl bg-[#F8F3EE] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-medium block">
                        {item.product?.collectionName || 'Collection'}
                      </span>
                      <h3 className="font-serif text-base font-medium text-[#3D302C]">
                        {item.product?.name || (item as any)?.name || 'Product'}
                      </h3>
                      <div className="text-xs text-[#3D302C]/60 space-x-2 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
                        {item.selectedPackage && <span>• {item.selectedPackage}</span>}
                      </div>
                      <span className="text-xs font-semibold text-[#3D302C] block mt-1">
                        {formatGHC(item.product?.price ?? (item as any)?.price ?? 0)} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D8C7B7]/30">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#D8C7B7] rounded-full bg-[#F8F3EE] px-2 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#3D302C]/70 hover:text-[#3D302C]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-3 text-[#3D302C] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.product?.stock ?? 99)}
                        className="p-1 text-[#3D302C]/70 hover:text-[#3D302C]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total Item Price */}
                    <div className="text-right">
                      <span className="font-semibold text-sm text-[#3D302C] block">
                        {formatGHC((item.product?.price ?? (item as any)?.price ?? 0) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-[#3D302C]/40 hover:text-red-600 transition flex items-center gap-1 mt-1 justify-end"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary (Right 4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#D8C7B7]/60 shadow-xs space-y-6">
            <h2 className="font-serif text-lg font-medium text-[#3D302C] pb-3 border-b border-[#D8C7B7]">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div>
              <label className="text-xs font-medium text-[#3D302C] block mb-2">
                Have a discount code?
              </label>
              {appliedVoucher ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#D9B8B2]/20 border border-[#D9B8B2] text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#3D302C]" />
                    <span className="font-semibold text-[#3D302C]">{appliedVoucher.code}</span>
                  </div>
                  <button
                    onClick={removeVoucher}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs text-[#3D302C] uppercase outline-none focus:border-[#3D302C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase hover:bg-[#52413C] transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              <span className="text-[10px] text-[#3D302C]/50 mt-1 block">
                Try <strong>WELCOME10</strong> (10% off) or <strong>MAWUNELLEVIP</strong> (GH₵50 off)
              </span>
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-[#3D302C]/80 pt-3 border-t border-[#D8C7B7]/40">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#3D302C]">{formatGHC(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#C5A46D]">
                  <span>Discount ({appliedVoucher?.code})</span>
                  <span>-{formatGHC(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Ghana Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatGHC(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#3D302C] pt-3 border-t border-[#D8C7B7]">
                <span>Total</span>
                <span>{formatGHC(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="btn-cart-page-checkout"
              onClick={() => setActiveTab('checkout')}
              className="w-full py-4 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-widest hover:bg-[#52413C] active:scale-[0.99] transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
