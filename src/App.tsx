import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { SearchModal } from './components/layout/SearchModal';
import { CartDrawer } from './components/layout/CartDrawer';
import { ToastNotification } from './components/ui/ToastNotification';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { AccountPage } from './components/pages/AccountPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { DeliveryPage } from './components/pages/DeliveryPage';
import { ReturnsPage } from './components/pages/ReturnsPage';
import { PrivacyTermsPage } from './components/pages/PrivacyTermsPage';

// Admin
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAuthModal } from './components/admin/AdminAuthModal';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, isAdminAuthenticated } = useApp();
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const revealElements = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeTab]);

  // Check admin authentication when admin tab is navigated
  useEffect(() => {
    if (activeTab === 'admin' && !isAdminAuthenticated) {
      setIsAdminAuthModalOpen(true);
    }
  }, [activeTab, isAdminAuthenticated]);

  const handleCloseAdminModal = () => {
    setIsAdminAuthModalOpen(false);
    // If closed without authentication, redirect back to home
    if (!isAdminAuthenticated && activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'the-edit':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'account':
        return <AccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'returns':
        return <ReturnsPage />;
      case 'privacy':
      case 'terms':
        return <PrivacyTermsPage />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminDashboard />
        ) : (
          <div className="min-h-screen bg-[#F8F3EE] flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="font-serif text-2xl text-[#3D302C]">Authentication Required</h2>
              <p className="text-xs text-[#3D302C]/60 mt-1 mb-4">Please log in to manage store operations.</p>
              <button
                onClick={() => setIsAdminAuthModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider"
              >
                Log In to Admin
              </button>
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EE] text-[#3D302C] flex flex-col font-sans selection:bg-[#D9B8B2] selection:text-[#3D302C]">
      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Global Header */}
      <Header />

      {/* Dynamic Viewport Content */}
      <main className="flex-grow">{renderActiveView()}</main>

      {/* Global Footer (only on customer storefront) */}
      {activeTab !== 'admin' && <Footer />}

      {/* Mobile App Bar */}
      <MobileBottomNav />

      {/* Global Overlays & Drawers */}
      <SearchModal />
      <CartDrawer />
      <ToastNotification />
      <AdminAuthModal isOpen={isAdminAuthModalOpen} onClose={handleCloseAdminModal} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
