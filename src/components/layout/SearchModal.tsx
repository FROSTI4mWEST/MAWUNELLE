import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    navigateToProduct,
    formatGHC,
  } = useApp();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen, setSearchQuery]);

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();
  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.collectionName.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    navigateToProduct(slug);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#F8F3EE] rounded-2xl shadow-2xl border border-[#D8C7B7] overflow-hidden">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#D8C7B7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#3D302C]/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bags, cases, glow rituals, period care..."
            className="w-full bg-transparent text-sm sm:text-base text-[#3D302C] placeholder-[#3D302C]/40 outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-[#3D302C]/40 hover:text-[#3D302C] text-xs"
            >
              Clear
            </button>
          )}
          <button
            id="btn-close-search"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#3D302C]/60 hover:text-[#3D302C] rounded-full"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#D8C7B7]/40">
          {!query ? (
            <div className="text-center py-8">
              <span className="text-xs uppercase tracking-widest text-[#3D302C]/50 block mb-3">
                Suggested Searches
              </span>
              <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                {['Classic Tote Bag', 'Foot Care Set', 'Monthly Comfort Box', 'iPhone Case', 'Room Lamp', 'Hand Cream'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 rounded-full bg-[#D8C7B7]/30 hover:bg-[#D9B8B2]/40 text-xs text-[#3D302C] transition"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-serif text-lg text-[#3D302C]">No products found for "{searchQuery}"</p>
              <p className="text-xs text-[#3D302C]/60 mt-1">
                Try searching for "tote", "hand cream", "comfort", or explore our 3 launch collections.
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.slug)}
                className="py-3 flex items-center justify-between gap-4 cursor-pointer group hover:bg-[#D9B8B2]/15 px-2 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-[#D8C7B7]/20 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-medium block">
                      {product.collectionName}
                    </span>
                    <h4 className="font-serif text-sm font-medium text-[#3D302C] group-hover:text-[#C5A46D] transition">
                      {product.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#3D302C]/90">
                      {formatGHC(product?.price ?? 0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#3D302C]/60 group-hover:text-[#3D302C]">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
