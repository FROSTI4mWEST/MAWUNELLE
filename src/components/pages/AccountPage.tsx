import React, { useState } from 'react';
import { Package, MapPin, Heart, Clock, ChevronRight, User, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AccountPage: React.FC = () => {
  const { orders, user, updateProfile, setActiveTab, setCurrentOrder, formatGHC } = useApp();

  const [activeTab, setLocalActiveTab] = useState<'orders' | 'profile'>('orders');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.defaultAddress.street);
  const [city, setCity] = useState(user.defaultAddress.city);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      defaultAddress: {
        street: address,
        city,
        region: user.defaultAddress.region,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleViewOrder = (order: any) => {
    setCurrentOrder(order);
    setActiveTab('order-confirmation');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase">Delivered</span>;
      case 'shipped':
        return <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase">Shipped / In Transit</span>;
      case 'processing':
        return <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase">Processing</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
            Client Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
            Welcome, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-[#3D302C]/70 mt-1 font-light">
            Manage your orders, saved Ghana delivery addresses, and account details.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#D8C7B7] space-x-6 text-xs uppercase tracking-wider font-semibold mb-8">
          <button
            onClick={() => setLocalActiveTab('orders')}
            className={`pb-3 transition relative ${
              activeTab === 'orders'
                ? 'text-[#3D302C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#3D302C]'
                : 'text-[#3D302C]/50 hover:text-[#3D302C]'
            }`}
          >
            My Orders ({orders.length})
          </button>
          <button
            onClick={() => setLocalActiveTab('profile')}
            className={`pb-3 transition relative ${
              activeTab === 'profile'
                ? 'text-[#3D302C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#3D302C]'
                : 'text-[#3D302C]/50 hover:text-[#3D302C]'
            }`}
          >
            Saved Delivery Details
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-[#D8C7B7]">
                <Package className="w-10 h-10 text-[#3D302C]/40 mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#3D302C]">No orders placed yet</h3>
                <p className="text-xs text-[#3D302C]/60 mt-1 mb-4">
                  Discover our curated Everyday Edit and soothe yourself with our Glow Rituals.
                </p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="px-6 py-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              orders.map((order, orderIndex) => (
                <div
                  key={order.id ? `${order.id}-${orderIndex}` : `order-${orderIndex}`}
                  className="p-5 rounded-2xl bg-white border border-[#D8C7B7]/60 shadow-xs hover:border-[#C5A46D]/60 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D8C7B7]/40">
                    <div>
                      <span className="font-serif text-base font-semibold text-[#3D302C]">
                        Order #{order.orderNumber || order.id || orderIndex + 1}
                      </span>
                      <span className="text-xs text-[#3D302C]/50 block sm:inline sm:ml-3">
                        Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <span className="text-sm font-bold text-[#3D302C]">
                        {formatGHC(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items List preview */}
                  <div className="py-3.5 space-y-2">
                    {(order.items || []).map((item, itemIndex) => {
                      const itemKey = item.id
                        ? `${order.id || orderIndex}-${item.id}-${itemIndex}`
                        : `${order.id || orderIndex}-${item.productId || 'item'}-${itemIndex}`;
                      return (
                        <div key={itemKey} className="flex items-center justify-between text-xs text-[#3D302C]">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product?.images?.[0] || (item as any)?.image || ''}
                              alt={item.product?.name || item.name || 'Product'}
                              className="w-10 h-10 object-cover rounded-lg bg-[#F8F3EE]"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="font-medium text-[#3D302C]">
                                {item.product?.name || item.name || 'Product'}
                              </span>
                              <span className="text-[11px] text-[#3D302C]/60 block">
                                Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                              </span>
                            </div>
                          </div>
                          <span className="font-medium text-[#3D302C]">
                            {formatGHC((item.product?.price ?? (item as any)?.price ?? 0) * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Delivery Location & Action */}
                  <div className="pt-3 border-t border-[#D8C7B7]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-[#3D302C]/70 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                      <span>{order.shippingAddress.street}, {order.shippingAddress.city}</span>
                    </span>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="inline-flex items-center gap-1 text-[#3D302C] font-semibold hover:text-[#C5A46D] transition"
                    >
                      <span>View Receipt & Tracking</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Profile & Ghana Address */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs space-y-6">
            <h3 className="font-serif text-lg text-[#3D302C] font-medium pb-2 border-b border-[#D8C7B7]">
              Customer Contact & Default Shipping Address
            </h3>

            {savedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium">
                Your profile & delivery address have been updated successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#3D302C] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#3D302C] block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#3D302C] block mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#3D302C] block mb-1">Default City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#3D302C] block mb-1">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7] text-xs outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider hover:bg-[#52413C] transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
