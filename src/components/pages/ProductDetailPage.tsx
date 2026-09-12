import React, { useState } from 'react';
import {
  Heart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Sparkles,
  CheckCircle2,
  PackageCheck,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { handleImageError } from '../../utils/imageFallback';
import { ProductCard } from '../shop/ProductCard';
import { INITIAL_PRODUCTS } from '../../data/products';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductSlug,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveTab,
    navigateToCollection,
    formatGHC,
    showToast,
  } = useApp();

  const product =
    products.find((p) => p.slug === selectedProductSlug) ||
    products[0] ||
    INITIAL_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
  const [selectedPackage, setSelectedPackage] = useState<string>(product?.packageOptions?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTabSection, setActiveTabSection] = useState<'description' | 'details' | 'reviews'>('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F3EE] flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="font-serif text-2xl text-[#3D302C]">Product Not Found</h2>
          <button
            onClick={() => setActiveTab('shop')}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] text-xs font-semibold uppercase tracking-wider"
          >
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const isFavorited = product.id ? isInWishlist(product.id) : false;
  const isSoldOut = (product.stock ?? 0) <= 0;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(product, {
      color: selectedColor,
      size: selectedSize,
      packageOption: selectedPackage,
      quantity,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'info');
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex items-center justify-between pb-6 border-b border-[#D8C7B7]/40 mb-6 text-xs text-[#3D302C]/60">
          <button
            onClick={() => setActiveTab('shop')}
            className="flex items-center gap-1.5 hover:text-[#3D302C] transition font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              onClick={() => navigateToCollection(product.collection)}
              className="cursor-pointer hover:underline uppercase tracking-wider text-[10px] text-[#C5A46D] font-medium"
            >
              {product.collectionName}
            </span>
            <span>/</span>
            <span className="text-[#3D302C] truncate max-w-[140px] sm:max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Product Hero Grid (Gallery Left + Info Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ============================================================ */}
          {/* Left Column: Image Gallery                                    */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-[#D8C7B7]/60">
              <img
                src={product.images?.[activeImageIndex] || product.images?.[0] || ''}
                alt={`${product.name} lifestyle view`}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#3D302C] border border-[#D8C7B7] text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}

              <button
                onClick={handleShare}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs text-[#3D302C] hover:bg-white flex items-center justify-center shadow-xs transition"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {(product.images || []).map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#3D302C] ring-2 ring-[#C5A46D]/30'
                      : 'border-[#D8C7B7]/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: Product Purchase Info                          */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Title & Reviews */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-1">
                {product.collectionName}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#3D302C] font-medium leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-2.5 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-bold text-[#3D302C]">
                  {formatGHC(product?.price ?? 0)}
                </span>
                {product.stock > 0 && product.stock <= product.lowStockThreshold && (
                  <span className="text-xs text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full font-medium">
                    Only {product.stock} left in stock
                  </span>
                )}
                {isSoldOut && (
                  <span className="text-xs text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full font-medium">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs text-[#3D302C]/70">
                <div className="flex items-center gap-0.5 text-[#C5A46D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A46D]" />
                  ))}
                </div>
                <span className="font-semibold text-[#3D302C]">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Benefit Statement */}
            <p className="text-xs sm:text-sm text-[#3D302C]/80 leading-relaxed font-light border-y border-[#D8C7B7]/40 py-3.5">
              {product.tagline}
            </p>

            {/* Colors Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-[#3D302C] block mb-2">
                  Colour: <span className="font-normal text-[#3D302C]/70">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={`Select ${c.name}`}
                      className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColor === c.name
                          ? 'border-[#3D302C] scale-110 shadow-xs'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor === c.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle2
                            className={`w-4 h-4 ${
                              c.hex === '#F8F3EE' ? 'text-[#3D302C]' : 'text-white'
                            }`}
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector (e.g. for phone cases) */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-[#3D302C] block mb-2">
                  Model / Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        selectedSize === s
                          ? 'border-[#3D302C] bg-[#3D302C] text-[#F8F3EE]'
                          : 'border-[#D8C7B7] bg-white text-[#3D302C] hover:border-[#3D302C]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Package Options (for Monthly Product) */}
            {product.packageOptions && product.packageOptions.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-[#3D302C] block mb-2">
                  Package Option
                </span>
                <div className="space-y-2">
                  {product.packageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedPackage(opt)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                        selectedPackage === opt
                          ? 'border-[#3D302C] bg-white shadow-xs'
                          : 'border-[#D8C7B7] bg-white/60 text-[#3D302C]/70 hover:bg-white'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedPackage === opt && <CheckCircle2 className="w-4 h-4 text-[#C5A46D]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Minus / Plus */}
                <div className="flex items-center border border-[#D8C7B7] rounded-full bg-white px-2 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || isSoldOut}
                    className="p-1.5 text-[#3D302C]/70 hover:text-[#3D302C] disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-semibold text-[#3D302C] min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock || isSoldOut}
                    className="p-1.5 text-[#3D302C]/70 hover:text-[#3D302C] disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  id="btn-add-to-cart"
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className={`flex-1 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition shadow-md flex items-center justify-center gap-2 ${
                    isSoldOut
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#3D302C] text-[#F8F3EE] hover:bg-[#52413C] active:scale-[0.99]'
                  }`}
                >
                  <span>{isSoldOut ? 'Sold Out' : 'Add to Cart'}</span>
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`w-12 h-12 rounded-full border border-[#D8C7B7] flex items-center justify-center transition shrink-0 ${
                    isFavorited
                      ? 'bg-[#D9B8B2] text-[#3D302C] border-[#D9B8B2]'
                      : 'bg-white text-[#3D302C]/70 hover:text-[#3D302C] hover:border-[#3D302C]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#3D302C]' : ''}`} />
                </button>
              </div>
            </div>

            {/* Delivery & Trust Badges */}
            <div className="p-4 rounded-2xl bg-[#D8C7B7]/25 border border-[#D8C7B7]/60 space-y-2.5 text-xs text-[#3D302C]/80">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Free shipping on orders over GH₵ 300 across Ghana</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Secure payments with MTN MoMo, Telecel Cash & Cards</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#C5A46D] shrink-0" />
                <span>Easy returns within 7 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SPECIAL TREATMENT: MONTHLY PRODUCT BREAKDOWN                  */}
        {/* ============================================================ */}
        {product.collection === 'monthly-product' && product.monthlyPackageItems && (
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C7B7]/60 shadow-xs">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
                Discreet & Thoughtful Care
              </span>
              <h3 className="font-serif text-2xl text-[#3D302C] font-medium">
                What’s Inside Your Comfort Sanctuary
              </h3>
              <p className="text-xs text-[#3D302C]/70 mt-1">
                Every element in this package is selected to bring physical soothing and emotional warmth during your cycle.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.monthlyPackageItems.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F8F3EE] border border-[#D8C7B7]/40">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#3D302C]">
                    <PackageCheck className="w-4 h-4 text-[#C5A46D]" />
                    <span>{item.item}</span>
                  </div>
                  <p className="text-[11px] text-[#3D302C]/70 mt-1.5 leading-relaxed font-light">
                    {item.purpose}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#D8C7B7]/40 flex items-center gap-2 text-xs text-[#3D302C]/70">
              <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
              <span><strong>Discreet Packaging Guarantee:</strong> Shipped in an unmarked, elegant outer box without clinical labels.</span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SPECIAL TREATMENT: GLOW RITUAL VISUAL ROUTINE                 */}
        {/* ============================================================ */}
        {product.collection === 'glow-ritual' && (
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#D8C7B7]/20 border border-[#D8C7B7]/60">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
                The Complete Glow Protocol
              </span>
              <h3 className="font-serif text-2xl text-[#3D302C] font-medium">
                The 3-Step Hand & Foot Ritual
              </h3>
              <p className="text-xs text-[#3D302C]/70 mt-1">
                Accompanied by the printed Mawunelle Soft Feet Routine Guidebook.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-white border border-[#D8C7B7]/60">
                <span className="w-6 h-6 rounded-full bg-[#D9B8B2] text-[#3D302C] text-xs font-bold flex items-center justify-center mb-3">
                  1
                </span>
                <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Hand Care</h4>
                <p className="text-xs text-[#3D302C]/70 mt-1 leading-relaxed">
                  Daily barrier protection with shea butter and sweet almond oil to keep skin and cuticles supple.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-white border border-[#D8C7B7]/60">
                <span className="w-6 h-6 rounded-full bg-[#D9B8B2] text-[#3D302C] text-xs font-bold flex items-center justify-center mb-3">
                  2
                </span>
                <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Foot Care Exfoliation</h4>
                <p className="text-xs text-[#3D302C]/70 mt-1 leading-relaxed">
                  Weekly botanical fruit acid peel booties and gentle pumice smoothing for dead skin renewal.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-white border border-[#D8C7B7]/60">
                <span className="w-6 h-6 rounded-full bg-[#D9B8B2] text-[#3D302C] text-xs font-bold flex items-center justify-center mb-3">
                  3
                </span>
                <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Overnight Maintenance</h4>
                <p className="text-xs text-[#3D302C]/70 mt-1 leading-relaxed">
                  Intensive heel balm massage paired with breathable cotton lock socks before sleep.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TABBED DETAILS & REVIEWS                                     */}
        {/* ============================================================ */}
        <div className="mt-14">
          <div className="flex border-b border-[#D8C7B7] space-x-8 text-xs uppercase tracking-widest font-semibold">
            <button
              onClick={() => setActiveTabSection('description')}
              className={`pb-3 transition relative ${
                activeTabSection === 'description'
                  ? 'text-[#3D302C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#3D302C]'
                  : 'text-[#3D302C]/50 hover:text-[#3D302C]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTabSection('details')}
              className={`pb-3 transition relative ${
                activeTabSection === 'details'
                  ? 'text-[#3D302C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#3D302C]'
                  : 'text-[#3D302C]/50 hover:text-[#3D302C]'
              }`}
            >
              Details & Dimensions
            </button>
            <button
              onClick={() => setActiveTabSection('reviews')}
              className={`pb-3 transition relative ${
                activeTabSection === 'reviews'
                  ? 'text-[#3D302C] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#3D302C]'
                  : 'text-[#3D302C]/50 hover:text-[#3D302C]'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-6 text-xs sm:text-sm text-[#3D302C]/80 leading-relaxed font-light">
            {activeTabSection === 'description' && (
              <div className="space-y-4 max-w-3xl">
                <p>{product.description}</p>
                {product.howToUse && (
                  <div className="p-4 rounded-xl bg-white border border-[#D8C7B7]/40">
                    <strong className="text-[#3D302C] font-semibold block mb-1">How to Use & Care:</strong>
                    <span>{product.howToUse}</span>
                  </div>
                )}
              </div>
            )}

            {activeTabSection === 'details' && (
              <div className="space-y-4 max-w-3xl">
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#3D302C]/85">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                {product.materials && (
                  <p className="text-xs pt-2">
                    <strong className="text-[#3D302C]">Materials / Composition:</strong> {product.materials}
                  </p>
                )}
                {product.dimensions && (
                  <p className="text-xs">
                    <strong className="text-[#3D302C]">Dimensions:</strong> {product.dimensions}
                  </p>
                )}
              </div>
            )}

            {activeTabSection === 'reviews' && (
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#D8C7B7]">
                  <div className="text-center pr-4 border-r border-[#D8C7B7]">
                    <span className="font-serif text-3xl font-bold text-[#3D302C]">{product.rating.toFixed(1)}</span>
                    <div className="flex text-[#C5A46D] justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C5A46D]" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#3D302C]">Verified Buyer Feedback</h4>
                    <p className="text-[11px] text-[#3D302C]/60 mt-0.5">
                      100% genuine reviews from customers across Ghana.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[#D8C7B7]/50">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-semibold text-[#3D302C]">Abena M.</span>
                      <span className="text-[11px] text-[#3D302C]/50">Accra • 3 days ago</span>
                    </div>
                    <div className="flex text-[#C5A46D] my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C5A46D]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#3D302C]/80 mt-1">
                      Exceeded my expectations! The craftsmanship is top-tier and the color is gorgeous. Arrived safely wrapped.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* RELATED PRODUCTS ("Complete the Ritual")                     */}
        {/* ============================================================ */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#D8C7B7]">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
              Thoughtful Pairings
            </span>
            <h2 className="font-serif text-2xl text-[#3D302C] font-medium mb-6">
              Complete the Ritual
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
