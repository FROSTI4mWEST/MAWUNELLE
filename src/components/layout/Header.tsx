import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  Search,
  User,
  Heart,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setSelectedCollectionFilter,
    navigateToCollection,
    cart,
    wishlist,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    isAdminAuthenticated,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);

  // Lock background body scroll when mobile sidebar drawer is open to eliminate background clashing
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Handle ESC key to dismiss mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleNavClick = (tab: any) => {
    if (tab === 'shop' || tab === 'the-edit') {
      setSelectedCollectionFilter('all');
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setCollectionsDropdownOpen(false);
  };

  const handleCollectionClick = (coll: any) => {
    navigateToCollection(coll);
    setMobileMenuOpen(false);
    setCollectionsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F3EE]/95 backdrop-blur-md border-b border-[#D8C7B7]/40 transition-all">
      {/* Top Banner */}
      <div className="bg-[#3D302C] text-[#F8F3EE] py-2 px-4 text-center text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 sm:gap-4 overflow-hidden">
        <span className="font-light">Free shipping on orders over GH₵300</span>
        <span className="text-[#C5A46D] hidden xs:inline">•</span>
        <span className="font-light hidden xs:inline">Secure Ghana Payments</span>
        <span className="text-[#C5A46D] hidden md:inline">•</span>
        <span className="font-light hidden md:inline">Everyday Comfort & Glow</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu & Search triggers (Left) */}
          <div className="flex items-center gap-1 sm:gap-3 lg:hidden">
            <button
              id="btn-mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#3D302C] hover:text-[#C5A46D] transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              id="btn-mobile-search-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#3D302C] hover:text-[#C5A46D] transition"
              aria-label="Open Product Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Navigation Links (Left) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-widest uppercase font-medium text-[#3D302C]">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#C5A46D] transition-colors relative py-1 ${
                activeTab === 'home' ? 'text-[#3D302C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3D302C]' : 'text-[#3D302C]/80'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-shop"
              onClick={() => handleNavClick('shop')}
              className={`hover:text-[#C5A46D] transition-colors relative py-1 ${
                activeTab === 'shop' ? 'text-[#3D302C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3D302C]' : 'text-[#3D302C]/80'
              }`}
            >
              Shop
            </button>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsDropdownOpen(true)}
              onMouseLeave={() => setCollectionsDropdownOpen(false)}
            >
              <button
                id="nav-link-collections"
                onClick={() => handleNavClick('collections')}
                className="flex items-center gap-1 hover:text-[#C5A46D] transition-colors py-1 text-[#3D302C]/80"
              >
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 text-[#3D302C]/60" />
              </button>

              {collectionsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-[#F8F3EE] border border-[#D8C7B7] rounded-xl shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-1.5 text-[10px] tracking-wider text-[#3D302C]/50 font-sans uppercase">
                    3 Launch Lines
                  </div>
                  <button
                    onClick={() => handleCollectionClick('everyday-edit')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#D9B8B2]/20 flex flex-col transition"
                  >
                    <span className="text-[#3D302C]">Everyday Edit</span>
                    <span className="text-[11px] text-[#3D302C]/60 font-light normal-case">Bags, cases & room pieces</span>
                  </button>
                  <button
                    onClick={() => handleCollectionClick('glow-ritual')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#D9B8B2]/20 flex flex-col transition"
                  >
                    <span className="text-[#3D302C]">Glow Ritual</span>
                    <span className="text-[11px] text-[#3D302C]/60 font-light normal-case">Hand & foot care essentials</span>
                  </button>
                  <button
                    onClick={() => handleCollectionClick('monthly-product')}
                    className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#D9B8B2]/20 flex flex-col transition"
                  >
                    <span className="text-[#3D302C]">Monthly Product</span>
                    <span className="text-[11px] text-[#3D302C]/60 font-light normal-case">Period care & menstrual comfort</span>
                  </button>
                </div>
              )}
            </div>

            <button
              id="nav-link-the-edit"
              onClick={() => handleNavClick('the-edit')}
              className={`hover:text-[#C5A46D] transition-colors relative py-1 ${
                activeTab === 'the-edit' ? 'text-[#3D302C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3D302C]' : 'text-[#3D302C]/80'
              }`}
            >
              The Edit
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#C5A46D] transition-colors relative py-1 ${
                activeTab === 'about' ? 'text-[#3D302C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3D302C]' : 'text-[#3D302C]/80'
              }`}
            >
              About
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#C5A46D] transition-colors relative py-1 ${
                activeTab === 'contact' ? 'text-[#3D302C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3D302C]' : 'text-[#3D302C]/80'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Centered Brand Logo */}
          <div className="flex flex-col items-center cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.12em] text-[#3D302C] font-medium leading-none">
              MAWUNELLE
            </span>
            <span className="hidden sm:inline text-[8px] sm:text-[9px] tracking-[0.28em] text-[#C5A46D] uppercase font-sans mt-1">
              A Luxury Lifestyle Store
            </span>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Desktop Search trigger */}
            <button
              id="btn-desktop-search"
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex p-2 text-[#3D302C] hover:text-[#C5A46D] transition"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              id="btn-header-account"
              onClick={() => handleNavClick('account')}
              className="hidden sm:flex p-2 text-[#3D302C] hover:text-[#C5A46D] transition"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              id="btn-header-wishlist"
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-[#3D302C] hover:text-[#C5A46D] transition"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D9B8B2] text-[#3D302C] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with Drawer Trigger */}
            <button
              id="btn-header-cart"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-[#3D302C] hover:text-[#C5A46D] transition"
              aria-label={`Cart with ${cartItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3D302C] text-[#F8F3EE] text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Entry Button */}
            <button
              id="btn-header-admin"
              onClick={() => handleNavClick('admin')}
              title={isAdminAuthenticated ? 'Admin Dashboard (Active)' : 'Store Admin Access'}
              className="p-1.5 rounded-full border border-[#D8C7B7] hover:border-[#C5A46D] text-[#3D302C] hover:bg-[#D9B8B2]/20 transition"
              aria-label="Admin Portal"
            >
              <ShieldCheck className={`w-4 h-4 ${isAdminAuthenticated ? 'text-[#C5A46D]' : 'text-[#3D302C]/60'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Drawer - Rendered via Portal directly to body to avoid backdrop-blur/containing block stacking conflicts */}
      {mobileMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-sidebar-container"
            className="fixed inset-0 z-[100] lg:hidden flex"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Opaque dark backdrop with blur: Completely dims & blurs underlying page so background text does not interfere */}
            <div
              id="mobile-sidebar-backdrop"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar Content Panel: Solid 100% opaque ivory/beige background with high contrast, right border, and clean scroll */}
            <div
              id="mobile-sidebar-panel"
              className="relative w-4/5 max-w-sm bg-[#F8F3EE] text-[#3D302C] h-full shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto animate-in slide-in-from-left duration-250 border-r border-[#D8C7B7]"
              style={{ backgroundColor: '#F8F3EE', opacity: 1 }}
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D8C7B7]">
                  <div>
                    <span className="font-serif text-xl text-[#3D302C] font-medium tracking-wider">MAWUNELLE</span>
                    <span className="hidden text-[8px] tracking-[0.2em] text-[#C5A46D] uppercase font-semibold">A Luxury Lifestyle Store</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-[#3D302C]/70 hover:text-[#3D302C] rounded-full hover:bg-[#D8C7B7]/30 transition"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Three Launch Lines Highlight */}
                <div className="mt-6 mb-6">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#3D302C]/60 mb-3 block">
                    Launch Collections
                  </span>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCollectionClick('everyday-edit')}
                      className="w-full text-left px-3 py-2.5 rounded-lg bg-white/80 border border-[#D8C7B7]/60 hover:bg-[#D8C7B7]/30 flex items-center justify-between transition shadow-xs"
                    >
                      <div>
                        <span className="font-serif text-sm font-medium text-[#3D302C] block">1. Everyday Edit</span>
                        <span className="text-[11px] text-[#3D302C]/70">Bags, cases & room pieces</span>
                      </div>
                      <span className="text-xs text-[#C5A46D] font-serif font-bold">→</span>
                    </button>

                    <button
                      onClick={() => handleCollectionClick('glow-ritual')}
                      className="w-full text-left px-3 py-2.5 rounded-lg bg-white/80 border border-[#D8C7B7]/60 hover:bg-[#D8C7B7]/30 flex items-center justify-between transition shadow-xs"
                    >
                      <div>
                        <span className="font-serif text-sm font-medium text-[#3D302C] block">2. Glow Ritual</span>
                        <span className="text-[11px] text-[#3D302C]/70">Hand & foot care essentials</span>
                      </div>
                      <span className="text-xs text-[#C5A46D] font-serif font-bold">→</span>
                    </button>

                    <button
                      onClick={() => handleCollectionClick('monthly-product')}
                      className="w-full text-left px-3 py-2.5 rounded-lg bg-white/80 border border-[#D8C7B7]/60 hover:bg-[#D8C7B7]/30 flex items-center justify-between transition shadow-xs"
                    >
                      <div>
                        <span className="font-serif text-sm font-medium text-[#3D302C] block">3. Monthly Product</span>
                        <span className="text-[11px] text-[#3D302C]/70">Period care & menstrual comfort</span>
                      </div>
                      <span className="text-xs text-[#C5A46D] font-serif font-bold">→</span>
                    </button>
                  </div>
                </div>

                {/* Main Nav Links */}
                <nav className="space-y-3 border-t border-[#D8C7B7] pt-4 text-sm font-medium uppercase tracking-wider text-[#3D302C]">
                  <button
                    onClick={() => handleNavClick('home')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavClick('shop')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => handleNavClick('collections')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    Collections
                  </button>
                  <button
                    onClick={() => handleNavClick('the-edit')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    The Edit
                  </button>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    About Mawunelle
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    Contact & Support
                  </button>
                  <button
                    onClick={() => handleNavClick('account')}
                    className="block w-full text-left py-1.5 hover:text-[#C5A46D] transition"
                  >
                    My Account / Orders
                  </button>
                </nav>
              </div>

              {/* Bottom Ghana WhatsApp Support Link */}
              <div className="pt-4 border-t border-[#D8C7B7] space-y-3 mt-6">
                <a
                  href="https://wa.me/233244567890?text=Hello%20Mawunelle,%20I%20would%20like%20assistance%20with%20an%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366]/15 text-[#128C7E] text-xs font-semibold hover:bg-[#25D366]/25 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Customer Care</span>
                </a>

                <div className="flex items-center justify-between text-[11px] text-[#3D302C]/60">
                  <button onClick={() => handleNavClick('delivery')} className="hover:underline">Delivery Info</button>
                  <span>•</span>
                  <button onClick={() => handleNavClick('returns')} className="hover:underline">Returns</button>
                  <span>•</span>
                  <button onClick={() => handleNavClick('admin')} className="hover:underline">Admin</button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
