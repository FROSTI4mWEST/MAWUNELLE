import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    deliveryFee,
    cartDiscount,
    cartTotal,
    setActiveTab,
    formatGHC,
  } = useApp();

  useEffect(() => {
    if (isCartDrawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 300;
  const amountToFreeShipping = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    setActiveTab('cart');
  };

  return (
    <div
      id="cart-drawer-container"
      className="fixed inset-0 z-[100] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        id="cart-drawer-backdrop"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-out Panel */}
      <div
        id="cart-drawer-panel"
        className="relative w-full max-w-md bg-[#F8F3EE] text-[#3D302C] h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250 border-l border-[#D8C7B7]"
        style={{ backgroundColor: '#F8F3EE', opacity: 1 }}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#D8C7B7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#3D302C]" />
            <h3 className="font-serif text-lg font-medium text-[#3D302C]">
              Your Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button
            id="btn-close-cart-drawer"
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-[#3D302C]/70 hover:text-[#3D302C] rounded-full hover:bg-[#D8C7B7]/30 transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator for Ghana */}
        <div className="px-5 py-3 bg-[#D8C7B7]/20 border-b border-[#D8C7B7]/40">
          <div className="flex items-center justify-between text-xs text-[#3D302C] mb-1.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#C5A46D]" />
              {amountToFreeShipping === 0
                ? 'You qualify for Free Delivery across Ghana!'
                : `Add ${formatGHC(amountToFreeShipping)} more for FREE Ghana Delivery`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#D8C7B7]/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A46D] transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#D8C7B7]/30 flex items-center justify-center text-[#3D302C]/40 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif text-lg text-[#3D302C]">Your bag is currently empty</p>
              <p className="text-xs text-[#3D302C]/60 max-w-xs mt-1 mb-6">
                Discover our curated Everyday Edit, soothing Glow Rituals, and Monthly Comfort packages.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActiveTab('shop');
                }}
                className="px-6 py-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-medium uppercase tracking-wider hover:bg-[#52413C] transition"
              >
                Shop The Edit
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={item.id ? `${item.id}-${idx}` : `cart-${idx}`}
                className="flex items-center gap-3 p-3 bg-white/70 rounded-xl border border-[#D8C7B7]/60"
              >
                {/* Product Thumbnail */}
                <img
                  src={item.product?.images?.[0] || (item as any)?.image || ''}
                  alt={item.product?.name || 'Item'}
                  className="w-18 h-18 object-cover rounded-lg bg-[#D8C7B7]/30 shrink-0"
                  referrerPolicy="no-referrer"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-sm font-medium text-[#3D302C] truncate">
                      {item.product?.name || (item as any)?.name || 'Piece'}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#3D302C]/40 hover:text-red-600 transition p-1"
                      aria-label={`Remove ${item.product?.name || 'item'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Variant info */}
                  <div className="text-[11px] text-[#3D302C]/60 space-x-2 mt-0.5">
                    {item.selectedColor && <span>{item.selectedColor}</span>}
                    {item.selectedSize && <span>• {item.selectedSize}</span>}
                    {item.selectedPackage && <span>• {item.selectedPackage}</span>}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#D8C7B7] rounded-md bg-[#F8F3EE] px-1.5 py-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#3D302C]/70 hover:text-[#3D302C]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium px-2 text-[#3D302C] min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#3D302C]/70 hover:text-[#3D302C]"
                        disabled={item.quantity >= (item.product?.stock ?? 99)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-[#3D302C]">
                      {formatGHC((item.product?.price ?? (item as any)?.price ?? 0) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#D8C7B7] bg-[#F8F3EE] space-y-3">
            <div className="space-y-1.5 text-xs text-[#3D302C]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#3D302C]">{formatGHC(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#C5A46D]">
                  <span>Voucher Discount</span>
                  <span>-{formatGHC(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatGHC(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#3D302C] pt-2 border-t border-[#D8C7B7]/40">
                <span>Total</span>
                <span>{formatGHC(cartTotal)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              id="btn-drawer-checkout"
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold tracking-wider uppercase hover:bg-[#52413C] active:scale-[0.99] transition shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Action */}
            <button
              id="btn-drawer-view-cart"
              onClick={handleViewFullCart}
              className="w-full text-center text-xs text-[#3D302C]/80 hover:text-[#3D302C] underline decoration-[#D8C7B7] transition py-1"
            >
              View Full Cart Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
