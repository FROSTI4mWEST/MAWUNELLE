import React from 'react';
import { Home, Grid, Heart, User, ShoppingBag, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cart, wishlist, setIsCartDrawerOpen } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Do not show bottom nav inside admin view to maintain clean business dashboard focus
  if (activeTab === 'admin') {
    return null;
  }

  return (
    <>
      {/* Sticky Floating WhatsApp Help Bubble for Ghana Customers */}
      <a
        id="btn-whatsapp-floating"
        href="https://wa.me/233244567890?text=Hello%20Mawunelle,%20I'm%20shopping%20on%20your%20app%20and%20need%20some%20help."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mawunelle on WhatsApp"
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-none" />
      </a>

      {/* Mobile App Bar */}
      <nav
        id="mobile-bottom-bar"
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#F8F3EE]/95 backdrop-blur-md border-t border-[#D8C7B7] lg:hidden pb-safe shadow-lg"
      >
        <div className="grid grid-cols-5 h-14 items-center max-w-md mx-auto">
          {/* Home */}
          <button
            id="mobile-tab-home"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'home' ? 'text-[#3D302C] font-semibold' : 'text-[#3D302C]/60 hover:text-[#3D302C]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
          </button>

          {/* Shop */}
          <button
            id="mobile-tab-shop"
            onClick={() => setActiveTab('shop')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'shop' || activeTab === 'product-detail'
                ? 'text-[#3D302C] font-semibold'
                : 'text-[#3D302C]/60 hover:text-[#3D302C]'
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Shop</span>
          </button>

          {/* Wishlist */}
          <button
            id="mobile-tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
              activeTab === 'wishlist' ? 'text-[#3D302C] font-semibold' : 'text-[#3D302C]/60 hover:text-[#3D302C]'
            }`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-[#D9B8B2] text-[#3D302C] text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
            <span className="text-[10px] mt-0.5 tracking-tight">Saved</span>
          </button>

          {/* Account */}
          <button
            id="mobile-tab-account"
            onClick={() => setActiveTab('account')}
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'account' ? 'text-[#3D302C] font-semibold' : 'text-[#3D302C]/60 hover:text-[#3D302C]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Account</span>
          </button>

          {/* Cart Bag */}
          <button
            id="mobile-tab-cart"
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 relative text-[#3D302C]/80 hover:text-[#3D302C] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-3 w-3.5 h-3.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] mt-0.5 tracking-tight">Bag</span>
          </button>
        </div>
      </nav>
    </>
  );
};
