import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../shop/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, setActiveTab, products } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F3EE] py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#D9B8B2]/30 text-[#3D302C] flex items-center justify-center mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-[#3D302C]">Your wishlist is empty</h1>
        <p className="text-xs sm:text-sm text-[#3D302C]/70 max-w-sm mt-1 mb-6">
          Save your favourite bags, glow routine essentials, and monthly comfort packages to revisit anytime.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="px-6 py-3 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider hover:bg-[#52413C] transition"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D8C7B7]/40 mb-8 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
              Personal Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3D302C] font-medium">
              Saved Pieces ({wishlist.length})
            </h1>
          </div>

          <button
            onClick={clearWishlist}
            className="text-xs text-[#3D302C]/60 hover:text-red-600 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Saved Items</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item, index) => {
            // Support both WishlistItem { productId, product } and direct Product objects
            let prod = (item as any)?.product || item;
            if (!prod?.price) {
              const matched = products.find(
                (p) => p.id === (item as any)?.productId || p.id === (item as any)?.id
              );
              if (matched) prod = matched;
            }
            if (!prod || typeof prod.price !== 'number') return null;
            const uniqueKey = prod.id || (item as any)?.productId || `wishlist-item-${index}`;
            return <ProductCard key={uniqueKey} product={prod} />;
          })}
        </div>
      </div>
    </div>
  );
};
