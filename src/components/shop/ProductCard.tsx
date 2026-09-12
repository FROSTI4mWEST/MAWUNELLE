import React from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { handleImageError } from '../../utils/imageFallback';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProduct, addToCart, toggleWishlist, isInWishlist, formatGHC } = useApp();

  if (!product) return null;

  const isFavorited = product.id ? isInWishlist(product.id) : false;
  const isSoldOut = (product.stock ?? 0) <= 0;

  const handleCardClick = () => {
    if (product.slug) {
      navigateToProduct(product.slug);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;
    addToCart(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const mainImage =
    product.images?.[0] ||
    (product as any)?.image ||
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white/75 rounded-2xl border border-[#D8C7B7]/60 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#C5A46D]/50 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#F8F3EE] overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />

        {/* Badge (Bestseller / New / Sold Out) */}
        {isSoldOut ? (
          <span className="absolute top-3 left-3 bg-[#3D302C] text-[#F8F3EE] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-xs">
            Sold Out
          </span>
        ) : product.badge ? (
          <span className="absolute top-3 left-3 bg-[#F8F3EE]/95 backdrop-blur-xs text-[#3D302C] border border-[#D8C7B7] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-xs">
            {product.badge}
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-[#D9B8B2] text-[#3D302C] shadow-sm'
              : 'bg-white/80 backdrop-blur-xs text-[#3D302C]/70 hover:text-[#3D302C] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#3D302C]' : ''}`} />
        </button>

        {/* Desktop Quick Add Overlay */}
        {!isSoldOut && (
          <div className="absolute inset-x-3 bottom-3 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickAdd}
              className="w-full py-2.5 rounded-full bg-[#3D302C]/90 backdrop-blur-xs text-[#F8F3EE] text-xs font-medium uppercase tracking-wider hover:bg-[#3D302C] transition shadow-md flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Collection Category Subtitle */}
          <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block mb-1">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 className="font-serif text-sm sm:text-base font-medium text-[#3D302C] line-clamp-1 group-hover:text-[#C5A46D] transition-colors">
            {product.name}
          </h3>

          {/* Tagline / short description on mobile & desktop */}
          <p className="text-xs text-[#3D302C]/60 line-clamp-1 mt-1 font-light">
            {product.tagline}
          </p>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-[#3D302C]/50">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Mobile Add-to-Cart Action */}
        <div className="mt-3 pt-3 border-t border-[#D8C7B7]/40 flex items-center justify-between">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-[#3D302C]">
              {formatGHC(product?.price ?? (product as any)?.amount ?? 0)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isSoldOut}
            aria-label={`Add ${product.name} to cart`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1 ${
              isSoldOut
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#F8F3EE] hover:bg-[#3D302C] text-[#3D302C] hover:text-[#F8F3EE] border border-[#D8C7B7] hover:border-[#3D302C]'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span className="text-[11px]">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
