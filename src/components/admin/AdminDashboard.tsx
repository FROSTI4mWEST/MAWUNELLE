import React, { useState } from 'react';
import {
  LayoutGrid,
  ShoppingBag,
  Box,
  Boxes,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Coins,
  TrendingUp,
  ChevronDown,
  Search,
  Plus,
  MessageCircle,
  Menu,
  X,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    updateProductStock,
    updateProductPrice,
    addNewProduct,
    orders,
    updateOrderStatus,
    customers,
    settings,
    updateSettings,
    setActiveTab,
    deauthenticateAdmin,
    formatGHC,
    showToast,
  } = useApp();

  type AdminTab = 'dashboard' | 'orders' | 'products' | 'inventory' | 'customers' | 'analytics' | 'settings';
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'This Week' | 'Today' | 'This Month' | 'This Year'>('This Week');
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);

  // Orders Management Filters
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [inventorySearch, setInventorySearch] = useState<string>('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New Product Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Bags & Totes');
  const [newProductCollection, setNewProductCollection] = useState<'everyday-edit' | 'glow-ritual' | 'monthly-product'>('everyday-edit');
  const [newProductPrice, setNewProductPrice] = useState(250);
  const [newProductStock, setNewProductStock] = useState(20);
  const [newProductTagline, setNewProductTagline] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80');

  // SVG Chart hovered day state
  const [hoveredDay, setHoveredDay] = useState<{ day: string; amount: number; x: number; y: number } | null>(null);

  // Computed metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);

  // Sales Overview data for Mon-Sun (exact coordinates matching the visual curve in dash.png)
  const salesChartData = [
    { day: 'Mon', amount: 1100, x: 70, y: 175 },
    { day: 'Tue', amount: 1700, x: 145, y: 140 },
    { day: 'Wed', amount: 1600, x: 220, y: 146 },
    { day: 'Thu', amount: 2250, x: 295, y: 107 },
    { day: 'Fri', amount: 2150, x: 370, y: 113 },
    { day: 'Sat', amount: 2850, x: 445, y: 71 },
    { day: 'Sun', amount: 3400, x: 520, y: 38 },
  ];

  // Best Selling Products matching dash.png exactly
  const bestSellingProducts = [
    {
      id: 1,
      name: 'Classic Tote Bag',
      sold: 36,
      price: 280,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'iPhone 15 Case - Blush',
      sold: 24,
      price: 180,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Aesthetic Room Lamp',
      sold: 18,
      price: 160,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Needs Attention matching dash.png
  const needsAttentionProducts = [
    {
      id: 1,
      name: 'Summer Tote Bag',
      sold: 2,
      price: 140,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'iPhone 14 Case',
      sold: 1,
      price: 170,
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Recent Orders matching dash.png exactly
  const recentOrdersData = [
    {
      id: '#MNE0024',
      customer: 'Ama K.',
      amount: 'GH₵240',
      status: 'Delivered',
      statusType: 'delivered',
    },
    {
      id: '#MNE0023',
      customer: 'Efua B.',
      amount: 'GH₵150',
      status: 'Pending',
      statusType: 'pending',
    },
    {
      id: '#MNE0022',
      customer: 'Priscilla A.',
      amount: 'GH₵280',
      status: 'Delivered',
      statusType: 'delivered',
    },
    {
      id: '#MNE0021',
      customer: 'Abena S.',
      amount: 'GH₵190',
      status: 'Processing',
      statusType: 'processing',
    },
  ];

  // Inventory Alert items matching dash.png
  const inventoryAlerts = [
    {
      id: 'alert-1',
      name: 'iPhone 14 Case',
      left: 3,
      badgeColor: 'text-[#D93829] bg-[#FEECEB] border-[#F8B4AF]',
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'alert-2',
      name: 'Tote Bag (Black)',
      left: 5,
      badgeColor: 'text-[#C47E10] bg-[#FEF5E7] border-[#FAD89A]',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'alert-3',
      name: 'Hand Cream',
      left: 3,
      badgeColor: 'text-[#D93829] bg-[#FEECEB] border-[#F8B4AF]',
      image: 'https://images.unsplash.com/photo-1608248597358-3e4b47c0b8fc?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const collectionNames = {
      'everyday-edit': 'Everyday Edit',
      'glow-ritual': 'Glow Ritual',
      'monthly-product': 'Monthly Product',
    };

    const newProd: Product = {
      id: `mw-custom-${Date.now()}`,
      name: newProductName,
      slug: newProductName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newProductCategory,
      collection: newProductCollection,
      collectionName: collectionNames[newProductCollection],
      price: Number(newProductPrice),
      description: newProductDescription || newProductTagline,
      tagline: newProductTagline || 'Carefully chosen everyday luxury piece.',
      images: [newProductImage],
      colors: [{ name: 'Warm Nude', hex: '#D8C7B7' }, { name: 'Blush', hex: '#D9B8B2' }],
      details: ['Handcrafted quality', 'Designed for Ghanaian climate & lifestyle'],
      stock: Number(newProductStock),
      lowStockThreshold: 3,
      costPrice: Math.round(Number(newProductPrice) * 0.45),
      packagingCost: 15,
      allocatedCost: 20,
      isFeatured: true,
      badge: 'New',
      rating: 5.0,
      reviewCount: 1,
    };

    addNewProduct(newProd);
    setShowAddProductModal(false);
    showToast(`Added ${newProductName} to store`, 'success');
    setNewProductName('');
    setNewProductTagline('');
    setNewProductDescription('');
  };

  const handleLogout = () => {
    deauthenticateAdmin();
    setActiveTab('home');
    showToast('Signed out of admin dashboard', 'info');
  };

  const filteredOrders = orderFilter === 'all'
    ? orders
    : orders.filter((o) => o.status === orderFilter);

  const filteredInventory = products.filter(
    (p) =>
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.collectionName.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF7F3] flex flex-col lg:flex-row text-[#2B1D19] font-sans antialiased">
      {/* Mobile Top Header with Hamburger */}
      <div className="lg:hidden bg-[#F6EFEA] px-4 py-3 border-b border-[#EBE3DC] flex items-center justify-between sticky top-0 z-30">
        <div>
          <span className="font-serif text-xl font-bold tracking-tight text-[#2B1D19] block">MAWUNELLE</span>
          <span className="text-[8px] tracking-[0.25em] text-[#7A6B66] uppercase font-semibold">Luxury Lifestyle Store</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="p-2 text-xs font-semibold text-[#7A6B66] hover:text-[#2B1D19]"
            title="Storefront"
          >
            Storefront
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-white border border-[#EBE3DC] text-[#2B1D19]"
            aria-label="Toggle Navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LEFT SIDEBAR NAVIGATION (Matches dash.png)                    */}
      {/* ============================================================ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#F6EFEA] border-r border-[#EFE4DC] flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-60 xl:w-64 shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Heading */}
          <div className="pt-2 pb-6">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#2B1D19] leading-tight">
              MAWUNELLE
            </h1>
            <p className="text-[9px] tracking-[0.22em] text-[#7A6B66] uppercase font-semibold mt-1">
              Luxury Lifestyle Store
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1.5" aria-label="Admin Navigation">
            {/* 1. Dashboard */}
            <button
              onClick={() => {
                setActiveAdminTab('dashboard');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'dashboard'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4 stroke-[2.2]" />
              <span>Dashboard</span>
            </button>

            {/* 2. Orders */}
            <button
              onClick={() => {
                setActiveAdminTab('orders');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'orders'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                <span>Orders</span>
              </div>
              {pendingOrdersCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#9E584E] text-white">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            {/* 3. Products */}
            <button
              onClick={() => {
                setActiveAdminTab('products');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'products'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <Box className="w-4 h-4 stroke-[2.2]" />
              <span>Products</span>
            </button>

            {/* 4. Inventory */}
            <button
              onClick={() => {
                setActiveAdminTab('inventory');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'inventory'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Boxes className="w-4 h-4 stroke-[2.2]" />
                <span>Inventory</span>
              </div>
              {lowStockProducts.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-600 text-white">
                  {lowStockProducts.length}
                </span>
              )}
            </button>

            {/* 5. Customers */}
            <button
              onClick={() => {
                setActiveAdminTab('customers');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'customers'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <Users className="w-4 h-4 stroke-[2.2]" />
              <span>Customers</span>
            </button>

            {/* 6. Analytics */}
            <button
              onClick={() => {
                setActiveAdminTab('analytics');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'analytics'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <BarChart2 className="w-4 h-4 stroke-[2.2]" />
              <span>Analytics</span>
            </button>

            {/* 7. Settings */}
            <button
              onClick={() => {
                setActiveAdminTab('settings');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition duration-150 ${
                activeAdminTab === 'settings'
                  ? 'bg-[#F4DDD7] text-[#2B1D19] shadow-2xs font-semibold'
                  : 'text-[#4A3C38] hover:bg-[#EFE4DC]/60'
              }`}
            >
              <Settings className="w-4 h-4 stroke-[2.2]" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section: Logout & Back to Storefront */}
        <div className="pt-4 border-t border-[#EBE1D8] space-y-1">
          <button
            onClick={() => setActiveTab('home')}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#7A6B66] hover:text-[#2B1D19] hover:bg-[#EFE4DC]/50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront Home</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8C3E35] hover:bg-[#FBECE9] transition"
          >
            <LogOut className="w-4 h-4 stroke-[2.2]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ============================================================ */}
      {/* MAIN DASHBOARD CONTENT AREA                                  */}
      {/* ============================================================ */}
      <main className="flex-1 min-w-0 p-5 sm:p-7 lg:p-8 overflow-y-auto">
        {/* ========================================================== */}
        {/* TAB: DASHBOARD (EXACT VISUAL REPLICA OF dash.png)          */}
        {/* ========================================================== */}
        {activeAdminTab === 'dashboard' && (
          <div className="max-w-[1380px] mx-auto space-y-6">
            {/* Top Bar: Title & "This Week" selector */}
            <div className="flex items-center justify-between pb-1">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2B1D19] font-bold tracking-tight">
                Dashboard
              </h2>

              <div className="relative">
                <button
                  onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                  className="bg-white border border-[#EDE4DC] rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-[#2B1D19] shadow-2xs hover:bg-[#FAF7F4] flex items-center gap-2 transition"
                >
                  <span>{timeRange}</span>
                  <ChevronDown className="w-4 h-4 text-[#7A6B66]" />
                </button>

                {showTimeRangeDropdown && (
                  <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-[#EDE4DC] py-1.5 z-20 text-xs">
                    {(['Today', 'This Week', 'This Month', 'This Year'] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setShowTimeRangeDropdown(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 hover:bg-[#FAF7F4] transition ${
                          timeRange === range ? 'font-bold text-[#9E584E]' : 'text-[#4A3C38]'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 1: Top 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Total Orders */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-5 shadow-xs transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4A3C38]">Total Orders</span>
                  <div className="w-9 h-9 rounded-full bg-[#FCEBE7] flex items-center justify-center text-[#9E584E]">
                    <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-bold text-[#2B1D19] mt-2">
                  48
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs">
                  <span className="text-[#1B8755] font-semibold flex items-center">
                    ↑ 12%
                  </span>
                  <span className="text-[#7A6B66]">from last week</span>
                </div>
              </div>

              {/* Card 2: Total Sales */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-5 shadow-xs transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4A3C38]">Total Sales</span>
                  <div className="w-9 h-9 rounded-full bg-[#FCEBE7] flex items-center justify-center text-[#9E584E]">
                    <Coins className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-bold text-[#2B1D19] mt-2">
                  GH₵ 3,240
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs">
                  <span className="text-[#1B8755] font-semibold flex items-center">
                    ↑ 18%
                  </span>
                  <span className="text-[#7A6B66]">from last week</span>
                </div>
              </div>

              {/* Card 3: Total Profit */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-5 shadow-xs transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4A3C38]">Total Profit</span>
                  <div className="w-9 h-9 rounded-full bg-[#FCEBE7] flex items-center justify-center text-[#9E584E]">
                    <TrendingUp className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-bold text-[#2B1D19] mt-2">
                  GH₵ 1,560
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs">
                  <span className="text-[#1B8755] font-semibold flex items-center">
                    ↑ 30%
                  </span>
                  <span className="text-[#7A6B66]">from last week</span>
                </div>
              </div>

              {/* Card 4: Customers */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-5 shadow-xs transition hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4A3C38]">Customers</span>
                  <div className="w-9 h-9 rounded-full bg-[#FCEBE7] flex items-center justify-center text-[#9E584E]">
                    <Users className="w-4 h-4 stroke-[2.2]" />
                  </div>
                </div>
                <div className="font-sans text-3xl sm:text-4xl font-bold text-[#2B1D19] mt-2">
                  36
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs">
                  <span className="text-[#1B8755] font-semibold flex items-center">
                    ↑ 15%
                  </span>
                  <span className="text-[#7A6B66]">from last week</span>
                </div>
              </div>
            </div>

            {/* Row 2: Middle Section (Sales Overview Chart + Best Selling Products) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left: Sales Overview Area Chart (col-span-12 lg:col-span-8) */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-6 shadow-xs lg:col-span-8 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-[#2B1D19]">
                    Sales Overview
                  </h3>
                  <button className="bg-white border border-[#EDE4DC] rounded-lg px-3 py-1 text-xs font-medium text-[#2B1D19] hover:bg-[#FAF7F4] flex items-center gap-1.5 transition">
                    <span>This Week</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#7A6B66]" />
                  </button>
                </div>

                {/* SVG Spline Chart */}
                <div className="relative w-full aspect-[16/7] min-h-[220px]">
                  <svg
                    viewBox="0 0 580 230"
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      {/* Gradient Fill underneath the spline */}
                      <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C66C63" stopOpacity="0.25" />
                        <stop offset="70%" stopColor="#C66C63" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#C66C63" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal gridlines */}
                    {[
                      { val: 'GH₵4,000', y: 15 },
                      { val: 'GH₵3,000', y: 65 },
                      { val: 'GH₵2,000', y: 115 },
                      { val: 'GH₵1,000', y: 165 },
                      { val: 'GH₵0', y: 215 },
                    ].map((grid, idx) => (
                      <g key={idx}>
                        <text
                          x="52"
                          y={grid.y + 4}
                          textAnchor="end"
                          className="text-[10px] fill-[#8C7D79] font-sans"
                        >
                          {grid.val}
                        </text>
                        <line
                          x1="65"
                          y1={grid.y}
                          x2="570"
                          y2={grid.y}
                          stroke="#EFE8E2"
                          strokeWidth="1"
                        />
                      </g>
                    ))}

                    {/* Area under the curve */}
                    <path
                      d="M 70 175 C 105 155, 120 142, 145 140 C 180 137, 195 150, 220 146 C 255 140, 270 109, 295 107 C 330 105, 345 116, 370 113 C 405 108, 420 75, 445 71 C 480 65, 495 42, 520 38 L 520 215 L 70 215 Z"
                      fill="url(#roseGradient)"
                    />

                    {/* Spline line curve */}
                    <path
                      d="M 70 175 C 105 155, 120 142, 145 140 C 180 137, 195 150, 220 146 C 255 140, 270 109, 295 107 C 330 105, 345 116, 370 113 C 405 108, 420 75, 445 71 C 480 65, 495 42, 520 38"
                      fill="none"
                      stroke="#C66C63"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive Points on Line */}
                    {salesChartData.map((pt, idx) => (
                      <g key={idx} className="cursor-pointer">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="4"
                          fill="#C66C63"
                          className="transition-transform duration-150 hover:scale-150"
                          onMouseEnter={() => setHoveredDay(pt)}
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                        {/* Day label */}
                        <text
                          x={pt.x}
                          y="228"
                          textAnchor="middle"
                          className="text-[11px] fill-[#8C7D79] font-sans font-medium"
                        >
                          {pt.day}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Tooltip on Hover */}
                  {hoveredDay && (
                    <div
                      className="absolute bg-[#2B1D19] text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-8"
                      style={{
                        left: `${(hoveredDay.x / 580) * 100}%`,
                        top: `${(hoveredDay.y / 230) * 100}%`,
                      }}
                    >
                      {hoveredDay.day}: GH₵{hoveredDay.amount.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Best Selling Products & Needs Attention (col-span-12 lg:col-span-4) */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-6 shadow-xs lg:col-span-4 flex flex-col justify-between space-y-6">
                {/* 1. Best Selling Products */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2B1D19] mb-4">
                    Best Selling Products
                  </h3>
                  <div className="space-y-3.5">
                    {bestSellingProducts.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[#8C7D79] w-3">
                            {item.id}.
                          </span>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-xl object-cover bg-[#F8F4F0] border border-[#EDE4DC]/50 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-[#2B1D19] line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#8C7D79] mt-0.5">
                              {item.sold} sold
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-[#FAF0EA] text-xs font-medium text-[#2B1D19] whitespace-nowrap">
                          GH₵ {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Needs Attention */}
                <div className="pt-2 border-t border-[#F2EAE3]">
                  <h3 className="font-serif text-lg font-bold text-[#2B1D19] mb-3">
                    Needs Attention
                  </h3>
                  <div className="space-y-3">
                    {needsAttentionProducts.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[#8C7D79] w-3">
                            {item.id}.
                          </span>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-11 h-11 rounded-xl object-cover bg-[#F8F4F0] border border-[#EDE4DC]/50 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-[#2B1D19] line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#8C7D79] mt-0.5">
                              {item.sold} sold
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-[#FAF0EA] text-xs font-medium text-[#2B1D19] whitespace-nowrap">
                          GH₵ {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Bottom 3 Cards (Product Performance + Recent Orders + Inventory Alert) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Card 1: Product Performance Donut Chart (col-span-12 lg:col-span-4) */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-6 shadow-xs lg:col-span-4 flex flex-col justify-between">
                <h3 className="font-serif text-lg font-bold text-[#2B1D19] mb-4">
                  Product Performance
                </h3>

                <div className="flex items-center justify-between gap-4 py-2">
                  {/* SVG Donut Chart */}
                  <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Segment 1: Everyday Edit (42%) -> circumference ~ 282.74, stroke-dasharray: 118.75 163.99 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="#C66C63"
                        strokeWidth="18"
                        strokeDasharray="92.3 220"
                        strokeDashoffset="0"
                      />
                      {/* Segment 2: Glow Ritual (33%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="#A65B53"
                        strokeWidth="18"
                        strokeDasharray="72.6 220"
                        strokeDashoffset="-93.3"
                      />
                      {/* Segment 3: Monthly Product (25%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="transparent"
                        stroke="#633E37"
                        strokeWidth="18"
                        strokeDasharray="55 220"
                        strokeDashoffset="-166.9"
                      />
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3 flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C66C63]" />
                        <span className="text-[#4A3C38]">Everyday Edit</span>
                      </div>
                      <span className="font-bold text-[#2B1D19]">42%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#A65B53]" />
                        <span className="text-[#4A3C38]">Glow Ritual</span>
                      </div>
                      <span className="font-bold text-[#2B1D19]">33%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#633E37]" />
                        <span className="text-[#4A3C38]">Monthly Product</span>
                      </div>
                      <span className="font-bold text-[#2B1D19]">25%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Recent Orders Table (col-span-12 lg:col-span-5) */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-6 shadow-xs lg:col-span-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg font-bold text-[#2B1D19]">
                    Recent Orders
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('orders')}
                    className="text-xs text-[#9E584E] font-medium hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[#8C7D79] font-medium border-b border-[#F2EAE3]">
                        <th className="pb-2.5 font-medium">Order #</th>
                        <th className="pb-2.5 font-medium">Customer</th>
                        <th className="pb-2.5 font-medium">Amount</th>
                        <th className="pb-2.5 font-medium text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F6EFEA]">
                      {recentOrdersData.map((order) => (
                        <tr key={order.id} className="hover:bg-[#FAF7F4] transition">
                          <td className="py-2.5 font-medium text-[#2B1D19]">{order.id}</td>
                          <td className="py-2.5 text-[#4A3C38]">{order.customer}</td>
                          <td className="py-2.5 font-medium text-[#2B1D19]">{order.amount}</td>
                          <td className="py-2.5 text-right">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                                order.statusType === 'delivered'
                                  ? 'bg-[#E5F4EC] text-[#227A4B]'
                                  : order.statusType === 'pending'
                                  ? 'bg-[#FDF3E3] text-[#B87A1E]'
                                  : 'bg-[#F9E9E5] text-[#A64E44]'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 3: Inventory Alert (col-span-12 lg:col-span-3) */}
              <div className="bg-white rounded-2xl border border-[#EDE4DC] p-6 shadow-xs lg:col-span-3 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-[#2B1D19]">
                    Inventory Alert
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('inventory')}
                    className="text-xs text-[#9E584E] font-medium hover:underline"
                  >
                    Manage
                  </button>
                </div>

                <div className="space-y-3.5">
                  {inventoryAlerts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-xl object-cover bg-[#F8F4F0] border border-[#EDE4DC]/50 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-semibold text-[#2B1D19]">
                          {item.name}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${item.badgeColor}`}
                      >
                        {item.left} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB: ORDERS MANAGEMENT                                     */}
        {/* ========================================================== */}
        {activeAdminTab === 'orders' && (
          <div className="max-w-[1380px] mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#EBE3DC] gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-bold">
                  Orders Management
                </h2>
                <p className="text-xs text-[#7A6B66] mt-1">
                  Track, update statuses, and communicate directly with Ghanaian customers via WhatsApp.
                </p>
              </div>
            </div>

            {/* Status Filter buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#EDE4DC] shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#2B1D19]">Status:</span>
                {['all', 'pending', 'processing', 'shipped', 'delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs capitalize font-medium transition ${
                      orderFilter === st
                        ? 'bg-[#2B1D19] text-[#FAF7F3]'
                        : 'bg-[#FAF7F3] text-[#4A3C38] hover:bg-[#EFE4DC]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <span className="text-xs text-[#7A6B66]">
                Showing {filteredOrders.length} orders
              </span>
            </div>

            {/* Orders Cards */}
            <div className="space-y-4">
              {filteredOrders.map((order, orderIdx) => {
                const whatsappMsg = `https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customer.name)},%20this%20is%20Mawunelle%20Ghana.%20Regarding%20your%20order%20%23${order.orderNumber}...`;

                return (
                  <div
                    key={order.id ? `${order.id}-${orderIdx}` : `order-${order.orderNumber || orderIdx}`}
                    className="p-6 rounded-2xl bg-white border border-[#EDE4DC] shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2EAE3] gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-bold text-[#2B1D19]">
                            Order #{order.orderNumber}
                          </span>
                          <span className="text-xs text-[#7A6B66]">• {order.createdAt}</span>
                        </div>
                        <span className="text-xs text-[#4A3C38] mt-0.5 block">
                          Customer: <strong>{order.customer.name}</strong> ({order.customer.phone})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="px-3 py-1 rounded-full border border-[#EDE4DC] text-xs font-semibold capitalize bg-[#FAF7F3] text-[#2B1D19] outline-none cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>

                        <a
                          href={whatsappMsg}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-full bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#20ba59] transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
                          <span>WhatsApp Client</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4A3C38] bg-[#FAF7F3] p-4 rounded-xl">
                      <div>
                        <strong className="text-[#2B1D19] block mb-1">Delivery Destination:</strong>
                        <p>{order.shippingAddress.street}</p>
                        {order.shippingAddress.landmark && (
                          <p className="text-[#9E584E] font-medium">Landmark: {order.shippingAddress.landmark}</p>
                        )}
                        <p>{order.shippingAddress.city}, {order.shippingAddress.region} Region</p>
                      </div>

                      <div>
                        <strong className="text-[#2B1D19] block mb-1">Payment & Packaging:</strong>
                        <p>Method: <span className="uppercase font-semibold">{order.paymentMethod}</span></p>
                        {order.momoNumber && <p>MoMo Number: {order.momoNumber}</p>}
                        {order.notes && (
                          <p className="mt-1 text-[#2B1D19] bg-white p-2 rounded-lg border border-[#EDE4DC]">
                            Notes: {order.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="divide-y divide-[#F2EAE3] text-xs">
                      {order.items.map((it, idx) => (
                        <div key={it.id || idx} className="py-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={it.product?.images?.[0] || (it as any)?.image || ''}
                              alt={it.product?.name || it.name || 'Product'}
                              className="w-8 h-8 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span>{it.product?.name || it.name || 'Product'} ({it.selectedColor || 'Standard'}) x {it.quantity}</span>
                          </div>
                          <span className="font-semibold text-[#2B1D19]">
                            {formatGHC((it.product?.price ?? it.price ?? 0) * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F2EAE3] flex justify-between font-bold text-sm text-[#2B1D19]">
                      <span>Order Total:</span>
                      <span>{formatGHC(order.total)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB: PRODUCTS & INVENTORY                                  */}
        {/* ========================================================== */}
        {(activeAdminTab === 'products' || activeAdminTab === 'inventory') && (
          <div className="max-w-[1380px] mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#EBE3DC] gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-bold">
                  {activeAdminTab === 'products' ? 'Products Catalogue' : 'Inventory & Stock Management'}
                </h2>
                <p className="text-xs text-[#7A6B66] mt-1">
                  Adjust live stock units, retail prices, and add new items to the 3 launch lines.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-full bg-[#2B1D19] text-[#FAF7F3] text-xs font-semibold uppercase tracking-wider hover:bg-[#4A3C38] transition flex items-center gap-2 self-start sm:self-auto shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Filter Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6B66]" />
              <input
                type="text"
                placeholder="Filter by title, category, or collection..."
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#EDE4DC] text-xs outline-none shadow-2xs"
              />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#EDE4DC] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F3] text-[#2B1D19] uppercase tracking-wider font-semibold border-b border-[#EDE4DC]">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Collection</th>
                      <th className="p-4">Price (GH₵)</th>
                      <th className="p-4">Stock Level</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2EAE3]">
                    {filteredInventory.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF7F4] transition">
                        <td className="p-4 flex items-center gap-3">
                          <img
                            src={prod.images?.[0] || ''}
                            alt={prod.name}
                            className="w-10 h-10 object-cover rounded-lg bg-[#FAF7F3]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-serif font-medium text-[#2B1D19] block">
                              {prod.name}
                            </span>
                            <span className="text-[11px] text-[#7A6B66]">{prod.category}</span>
                          </div>
                        </td>

                        <td className="p-4 text-[#4A3C38] font-medium">
                          {prod.collectionName}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <span className="text-[#7A6B66]">GH₵</span>
                            <input
                              type="number"
                              defaultValue={prod?.price ?? 0}
                              onBlur={(e) => updateProductPrice(prod.id, Number(e.target.value))}
                              className="w-20 px-2 py-1 bg-[#FAF7F3] border border-[#EDE4DC] rounded text-xs font-semibold text-[#2B1D19]"
                            />
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              defaultValue={prod.stock}
                              onBlur={(e) => updateProductStock(prod.id, Number(e.target.value))}
                              className={`w-16 px-2 py-1 border rounded text-xs font-semibold ${
                                prod.stock <= prod.lowStockThreshold
                                  ? 'bg-red-50 border-red-300 text-red-700'
                                  : 'bg-[#FAF7F3] border-[#EDE4DC] text-[#2B1D19]'
                              }`}
                            />
                            {prod.stock <= prod.lowStockThreshold && (
                              <span className="text-[10px] text-red-600 font-bold">Low!</span>
                            )}
                          </div>
                        </td>

                        <td className="p-4">
                          {prod.stock <= 0 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-800 font-bold">
                              Sold Out
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                              In Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB: CUSTOMERS                                             */}
        {/* ========================================================== */}
        {activeAdminTab === 'customers' && (
          <div className="max-w-[1380px] mx-auto space-y-6">
            <div className="pb-2 border-b border-[#EBE3DC]">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-bold">
                Customer Database
              </h2>
              <p className="text-xs text-[#7A6B66] mt-1">
                Directory of active Ghanaian shoppers, order frequencies, and lifetime value.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#EDE4DC] p-6 shadow-xs space-y-4">
              <div className="divide-y divide-[#F2EAE3]">
                {customers.map((c) => (
                  <div key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-serif text-sm font-semibold text-[#2B1D19] block">
                        {c.name}
                      </span>
                      <span className="text-[#7A6B66]">
                        {c.phone} • {c.email} • {c.city}, Ghana
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-[#2B1D19]">
                        Lifetime Spend: {formatGHC(c.totalSpend)}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0EA] text-[#2B1D19] text-[10px] font-semibold">
                        {c.ordersCount} Orders
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB: ANALYTICS                                             */}
        {/* ========================================================== */}
        {activeAdminTab === 'analytics' && (
          <div className="max-w-[1380px] mx-auto space-y-6">
            <div className="pb-2 border-b border-[#EBE3DC]">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-bold">
                Store Analytics & Insights
              </h2>
              <p className="text-xs text-[#7A6B66] mt-1">
                Deeper analytical reporting across sales lines, profit margins, and inventory velocities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC]">
                <span className="text-xs text-[#7A6B66] uppercase tracking-wider block">Average Order Value</span>
                <span className="font-serif text-2xl font-bold text-[#2B1D19] mt-2 block">
                  {formatGHC(orders.length > 0 ? totalRevenue / orders.length : 0)}
                </span>
                <span className="text-xs text-emerald-600 font-semibold mt-1 block">Above free delivery threshold</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC]">
                <span className="text-xs text-[#7A6B66] uppercase tracking-wider block">Gross Profit Margin</span>
                <span className="font-serif text-2xl font-bold text-[#2B1D19] mt-2 block">48.1%</span>
                <span className="text-xs text-[#7A6B66] mt-1 block">After packaging & allocated logistics</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EDE4DC]">
                <span className="text-xs text-[#7A6B66] uppercase tracking-wider block">Returning Customer Rate</span>
                <span className="font-serif text-2xl font-bold text-[#2B1D19] mt-2 block">33.3%</span>
                <span className="text-xs text-emerald-600 font-semibold mt-1 block">+5.2% vs previous cohort</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB: SETTINGS                                              */}
        {/* ========================================================== */}
        {activeAdminTab === 'settings' && (
          <div className="max-w-[1380px] mx-auto space-y-6">
            <div className="pb-2 border-b border-[#EBE3DC]">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2B1D19] font-bold">
                Store Settings
              </h2>
              <p className="text-xs text-[#7A6B66] mt-1">
                Configure delivery rates, Ghana MoMo receiving numbers, and WhatsApp concierge.
              </p>
            </div>

            <div className="max-w-2xl bg-white rounded-2xl border border-[#EDE4DC] p-6 sm:p-8 shadow-xs space-y-5 text-xs text-[#2B1D19]">
              <div>
                <label className="font-medium block mb-1">
                  Free Delivery Threshold (Ghana Cedis)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">GH₵</span>
                  <input
                    type="number"
                    value={settings.freeDeliveryThreshold}
                    onChange={(e) =>
                      updateSettings({ freeDeliveryThreshold: Number(e.target.value) })
                    }
                    className="w-32 px-3 py-2 rounded-xl bg-[#FAF7F3] border border-[#EDE4DC] outline-none font-semibold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium block mb-1">
                  Standard Greater Accra Delivery Fee (GH₵)
                </label>
                <input
                  type="number"
                  value={settings.deliveryFeeStandard}
                  onChange={(e) =>
                    updateSettings({ deliveryFeeStandard: Number(e.target.value) })
                  }
                  className="w-32 px-3 py-2 rounded-xl bg-[#FAF7F3] border border-[#EDE4DC] outline-none"
                />
              </div>

              <div>
                <label className="font-medium block mb-1">
                  Store Contact WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.contactWhatsApp}
                  onChange={(e) =>
                    updateSettings({ contactWhatsApp: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F3] border border-[#EDE4DC] outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => showToast('Logistics settings updated successfully', 'success')}
                  className="px-6 py-2.5 rounded-full bg-[#2B1D19] text-[#FAF7F3] text-xs font-semibold uppercase tracking-wider hover:bg-[#4A3C38] transition"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FAF7F3] rounded-2xl p-6 sm:p-8 border border-[#EDE4DC] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl text-[#2B1D19] font-bold mb-4 pb-2 border-b border-[#EDE4DC]">
              Add New Product to Catalogue
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-medium block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suede Structured Mini Tote"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium block mb-1">Collection</label>
                  <select
                    value={newProductCollection}
                    onChange={(e) => setNewProductCollection(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                  >
                    <option value="everyday-edit">Everyday Edit</option>
                    <option value="glow-ritual">Glow Ritual</option>
                    <option value="monthly-product">Monthly Product</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium block mb-1">Category</label>
                  <input
                    type="text"
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium block mb-1">Price (GH₵) *</label>
                  <input
                    type="number"
                    required
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">Initial Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                />
              </div>

              <div>
                <label className="font-medium block mb-1">Tagline / Short Hook</label>
                <input
                  type="text"
                  placeholder="Elevate your everyday rituals"
                  value={newProductTagline}
                  onChange={(e) => setNewProductTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDE4DC] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EDE4DC]">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-full border border-[#EDE4DC] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#2B1D19] text-[#FAF7F3] text-xs font-semibold uppercase"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
