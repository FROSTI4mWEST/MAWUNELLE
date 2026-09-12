import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Filter, X, ChevronDown, Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../shop/ProductCard';

export const ShopPage: React.FC = () => {
  const { activeTab, products, selectedCollectionFilter, setSelectedCollectionFilter, formatGHC } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Lock background scroll when mobile filter drawer is open
  useEffect(() => {
    if (mobileFilterOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileFilterOpen]);

  // Available Filter Options
  const collections = [
    { id: 'all', name: 'All Collections' },
    { id: 'everyday-edit', name: 'Everyday Edit' },
    { id: 'glow-ritual', name: 'Glow Ritual' },
    { id: 'monthly-product', name: 'Monthly Product' },
  ];

  const colors = [
    { name: 'all', label: 'All Colors', hex: 'transparent' },
    { name: 'Blush Pink', label: 'Blush', hex: '#D9B8B2' },
    { name: 'Nude Taupe', label: 'Nude', hex: '#D8C7B7' },
    { name: 'Warm Ivory', label: 'Ivory', hex: '#F8F3EE' },
    { name: 'Champagne Gold', label: 'Champagne', hex: '#C5A46D' },
    { name: 'Espresso', label: 'Espresso', hex: '#3D302C' },
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-100', label: 'Under GH₵ 100', min: 0, max: 100 },
    { id: '100-200', label: 'GH₵ 100 – GH₵ 200', min: 100, max: 200 },
    { id: 'above-200', label: 'Above GH₵ 200', min: 200, max: 9999 },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeTab === 'the-edit' && !product.isFeatured && product.badge !== 'Bestseller') {
        return false;
      }
      // Collection filter
      if (selectedCollectionFilter !== 'all' && product.collection !== selectedCollectionFilter) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = (product.colors || []).some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }
      // Price range
      const itemPrice = typeof product?.price === 'number' ? product.price : 0;
      if (selectedPriceRange === 'under-100' && itemPrice > 100) return false;
      if (selectedPriceRange === '100-200' && (itemPrice < 100 || itemPrice > 200)) return false;
      if (selectedPriceRange === 'above-200' && itemPrice < 200) return false;
      // In stock
      if (inStockOnly && (product?.stock ?? 0) <= 0) return false;

      return true;
    });
  }, [activeTab, products, selectedCollectionFilter, selectedCategory, selectedColor, selectedPriceRange, inStockOnly]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') return list.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
    if (sortBy === 'price-desc') return list.sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    if (sortBy === 'rating') return list.sort((a, b) => (b?.rating ?? 0) - (a?.rating ?? 0));
    return list; // featured default
  }, [filteredProducts, sortBy]);

  const clearFilters = () => {
    setSelectedCollectionFilter('all');
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedPriceRange('all');
    setInStockOnly(false);
  };

  const activeFiltersCount =
    (selectedCollectionFilter !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  // Dynamic header copy based on collection
  const headerInfo = useMemo(() => {
    if (activeTab === 'the-edit') {
      return {
        title: 'The Edit',
        tagline: 'A considered selection of customer favourites, new arrivals, and standout essentials.',
      };
    }
    if (selectedCollectionFilter === 'everyday-edit') {
      return {
        title: 'Everyday Edit',
        tagline: 'Lifestyle essentials, classic bags, iPhone cases and room pieces.',
      };
    }
    if (selectedCollectionFilter === 'glow-ritual') {
      return {
        title: 'Glow Ritual',
        tagline: 'Hand & foot care essentials, healing balms, and the Soft Feet routine.',
      };
    }
    if (selectedCollectionFilter === 'monthly-product') {
      return {
        title: 'Monthly Product',
        tagline: 'Comfort for your cycle: organic care packages, heating patches, and discreet essentials.',
      };
    }
    return {
      title: 'All Products',
      tagline: 'Beautiful things, thoughtfully chosen for your everyday living.',
    };
  }, [activeTab, selectedCollectionFilter]);

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Tagline */}
        <div className="mb-8 border-b border-[#D8C7B7]/40 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
            Mawunelle Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
            {headerInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#3D302C]/70 mt-1 font-light max-w-xl">
            {headerInfo.tagline}
          </p>
        </div>

        {/* Collection Pill Bar (Quick Tap on Mobile & Desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {collections.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCollectionFilter(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCollectionFilter === c.id
                  ? 'bg-[#3D302C] text-[#F8F3EE] shadow-sm'
                  : 'bg-white/80 text-[#3D302C] border border-[#D8C7B7] hover:border-[#3D302C]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Control Bar: Mobile Filter Toggle + Sorting Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#D8C7B7]/40 mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#D8C7B7] text-xs font-medium text-[#3D302C] shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#3D302C] text-[#F8F3EE] text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <span className="text-xs text-[#3D302C]/60">
              Showing <strong>{sortedProducts.length}</strong> items
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-[#3D302C]/60">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#D8C7B7] rounded-full px-4 py-2 pr-8 text-xs font-medium text-[#3D302C] outline-none cursor-pointer hover:border-[#3D302C]"
              >
                <option value="featured">Featured / Best</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#3D302C]/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Layout: Desktop Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar (Left) */}
          <div className="hidden lg:block space-y-7 pr-4">
            {/* Filter Header with Clear option */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D8C7B7]">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3D302C]">
                Filter Products
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[11px] text-[#C5A46D] hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Price Ranges */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-medium uppercase tracking-wider text-[#3D302C]/70">
                Price (GH₵)
              </h4>
              <div className="space-y-1.5 text-xs text-[#3D302C]">
                {priceRanges.map((pr) => (
                  <label key={pr.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRangeDesktop"
                      checked={selectedPriceRange === pr.id}
                      onChange={() => setSelectedPriceRange(pr.id)}
                      className="accent-[#3D302C]"
                    />
                    <span>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-medium uppercase tracking-wider text-[#3D302C]/70">
                Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition ${
                      selectedColor === c.name
                        ? 'border-[#3D302C] bg-white font-semibold'
                        : 'border-[#D8C7B7] bg-white/60 hover:bg-white text-[#3D302C]/80'
                    }`}
                  >
                    {c.hex !== 'transparent' && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-[#D8C7B7]/40">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#3D302C]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#3D302C] rounded"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Products Grid (Right 3 Columns on desktop, 2 on mobile) */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white/50 rounded-2xl border border-[#D8C7B7]">
                <p className="font-serif text-lg text-[#3D302C]">No matching items found</p>
                <p className="text-xs text-[#3D302C]/60 mt-1 mb-4">
                  Try adjusting or clearing your filters to see more of our curated pieces.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-medium"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Bottom Sheet - Rendered via Portal to body to avoid clipping and backdrop blur collision */}
      {mobileFilterOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-filter-drawer-container"
            className="fixed inset-0 z-[100] flex items-end justify-center lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Product Filters"
          >
            <div
              id="mobile-filter-backdrop"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div
              id="mobile-filter-panel"
              className="relative w-full max-h-[85vh] bg-[#F8F3EE] rounded-t-3xl shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-bottom duration-250 border-t border-[#D8C7B7]"
              style={{ backgroundColor: '#F8F3EE', opacity: 1 }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D8C7B7]">
                  <h3 className="font-serif text-lg text-[#3D302C]">Filters</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-[#3D302C]/60"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Collections */}
                <div className="py-4 border-b border-[#D8C7B7]/40">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3D302C] mb-2.5">
                    Collection
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {collections.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCollectionFilter(c.id)}
                        className={`px-3 py-1.5 rounded-full text-xs ${
                          selectedCollectionFilter === c.id
                            ? 'bg-[#3D302C] text-[#F8F3EE]'
                            : 'bg-white border border-[#D8C7B7] text-[#3D302C]'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="py-4 border-b border-[#D8C7B7]/40">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3D302C] mb-2.5">
                    Price Range
                  </h4>
                  <div className="space-y-2 text-xs">
                    {priceRanges.map((pr) => (
                      <label key={pr.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="priceRangeMobile"
                          checked={selectedPriceRange === pr.id}
                          onChange={() => setSelectedPriceRange(pr.id)}
                          className="accent-[#3D302C]"
                        />
                        <span>{pr.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Palette */}
                <div className="py-4 border-b border-[#D8C7B7]/40">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3D302C] mb-2.5">
                    Palette
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-2.5 py-1 rounded-full text-xs border ${
                          selectedColor === c.name
                            ? 'border-[#3D302C] bg-white font-semibold'
                            : 'border-[#D8C7B7] bg-white/70 text-[#3D302C]'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* In stock */}
                <div className="py-4">
                  <label className="flex items-center gap-2 text-xs text-[#3D302C]">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-[#3D302C] rounded"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#D8C7B7] flex items-center gap-3">
                <button
                  onClick={() => {
                    clearFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="w-1/2 py-3 rounded-full border border-[#D8C7B7] text-xs font-semibold uppercase tracking-wider text-[#3D302C]"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-1/2 py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
