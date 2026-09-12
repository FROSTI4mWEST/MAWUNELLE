import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../shop/ProductCard';
import { handleImageError, PRODUCT_IMAGE_FALLBACK } from '../../utils/imageFallback';

export const HomePage: React.FC = () => {
  const { products, setActiveTab, navigateToCollection, navigateToProduct, reviews } = useApp();

  const bestSellers = products.filter((p) => p.isFeatured || p.badge === 'Bestseller').slice(0, 6);
  const heroProducts = products
    .filter((product) => (product.isFeatured || product.badge === 'Bestseller') && product.images?.length)
    .slice(0, 5);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    if (heroProducts.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => (currentIndex + 1) % heroProducts.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [heroProducts.length]);

  useEffect(() => {
    if (activeHeroIndex >= heroProducts.length) {
      setActiveHeroIndex(0);
    }
  }, [activeHeroIndex, heroProducts.length]);

  const activeHeroProduct = heroProducts[activeHeroIndex];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F3EE]">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (Matches Visual Reference)                   */}
      {/* ============================================================ */}
      <section data-scroll-reveal className="relative min-h-[min(760px,calc(100vh-7rem))] overflow-hidden bg-[#3D302C] text-[#F8F3EE]">
        {heroProducts.length > 0 ? (
          heroProducts.map((product, index) => (
            <img
              key={product.id}
              src={product.images?.[0] || PRODUCT_IMAGE_FALLBACK}
              alt={product.name}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
                index === activeHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              aria-hidden={index !== activeHeroIndex}
            />
          ))
        ) : (
          <img
            src={PRODUCT_IMAGE_FALLBACK}
            alt="MAWUNELLE"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d1512]/90 via-[#3D302C]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1512]/80 via-transparent to-[#1d1512]/10" />

        <div className="relative z-10 mx-auto flex min-h-[min(760px,calc(100vh-7rem))] max-w-7xl items-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D9B8B2] sm:text-xs">
              {activeHeroProduct ? 'Trending at MAWUNELLE' : "Ghana's Curated Lifestyle Store"}
            </span>
            <h1 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Beautiful things, <span className="italic font-normal">thoughtfully chosen.</span>
            </h1>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-[#F8F3EE]/85 sm:text-sm">
              {activeHeroProduct?.tagline ?? 'Your everyday essentials, glow rituals, and monthly comfort - all in one calm, beautifully curated place.'}
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <button
                id="btn-hero-shop"
                onClick={() => setActiveTab('shop')}
                className="flex items-center justify-center gap-2 rounded-full bg-[#F8F3EE] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#3D302C] shadow-lg transition hover:bg-white active:scale-[0.98]"
              >
                <span>Shop The Edit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              {activeHeroProduct && (
                <button
                  id="btn-hero-product"
                  onClick={() => navigateToProduct(activeHeroProduct.slug)}
                  className="rounded-full border border-[#F8F3EE]/60 px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#F8F3EE] transition hover:border-white hover:bg-white/10"
                >
                  View Product
                </button>
              )}
            </div>

            {heroProducts.length > 1 && (
              <div className="mt-10 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {heroProducts.map((product, index) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setActiveHeroIndex(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === activeHeroIndex ? 'w-10 bg-[#F8F3EE]' : 'w-5 bg-[#F8F3EE]/45 hover:bg-[#F8F3EE]/75'
                      }`}
                      aria-label={`Show ${product.name}`}
                      aria-current={index === activeHeroIndex}
                    />
                  ))}
                </div>
                <span className="max-w-[12rem] truncate text-[10px] uppercase tracking-widest text-[#F8F3EE]/70">
                  {activeHeroProduct?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. THREE LAUNCH CARDS                                        */}
      {/* ============================================================ */}
      <section data-scroll-reveal className="py-12 sm:py-16 bg-[#F8F3EE] border-t border-[#D8C7B7]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3D302C] font-medium">
              Three Thoughtful Lines
            </h2>
            <p className="text-xs sm:text-sm text-[#3D302C]/70 mt-2 font-light">
              Designed to bring ease, softness, and practical luxury to your daily routine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* 1. Everyday Edit */}
            <div
              onClick={() => navigateToCollection('everyday-edit')}
              className="group bg-white/80 rounded-2xl border border-[#D8C7B7]/60 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#D8C7B7]/20">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
                  alt="Everyday Edit Bags and Accessories"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-semibold">
                    Line 01
                  </span>
                  <h3 className="font-serif text-xl text-[#3D302C] font-medium mt-1">
                    Everyday Edit
                  </h3>
                  <p className="text-xs text-[#3D302C]/70 mt-2 font-light leading-relaxed">
                    Lifestyle essentials, classic bags, sleek iPhone cases, and warm room pieces.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#D8C7B7]/40 flex items-center text-xs font-semibold text-[#3D302C] group-hover:text-[#C5A46D] transition">
                  <span className="uppercase tracking-wider">Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 2. Glow Ritual */}
            <div
              onClick={() => navigateToCollection('glow-ritual')}
              className="group bg-white/80 rounded-2xl border border-[#D8C7B7]/60 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#D8C7B7]/20">
                <img
                  src="https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80"
                  alt="Glow Ritual Hand and Foot Care"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-semibold">
                    Line 02
                  </span>
                  <h3 className="font-serif text-xl text-[#3D302C] font-medium mt-1">
                    Glow Ritual
                  </h3>
                  <p className="text-xs text-[#3D302C]/70 mt-2 font-light leading-relaxed">
                    Care for hands & feet, botanical healing sets, and the signature Soft Feet Routine Guide.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#D8C7B7]/40 flex items-center text-xs font-semibold text-[#3D302C] group-hover:text-[#C5A46D] transition">
                  <span className="uppercase tracking-wider">Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 3. Monthly Product */}
            <div
              onClick={() => navigateToCollection('monthly-product')}
              className="group bg-white/80 rounded-2xl border border-[#D8C7B7]/60 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#D8C7B7]/20">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                  alt="Monthly Product Period Care Packages"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-semibold">
                    Line 03
                  </span>
                  <h3 className="font-serif text-xl text-[#3D302C] font-medium mt-1">
                    Monthly Product
                  </h3>
                  <p className="text-xs text-[#3D302C]/70 mt-2 font-light leading-relaxed">
                    Comfort for your cycle: discreet organic packages, soothing herbal warmth, and travel pouches.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#D8C7B7]/40 flex items-center text-xs font-semibold text-[#3D302C] group-hover:text-[#C5A46D] transition">
                  <span className="uppercase tracking-wider">Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. BEST SELLERS / THE EDIT                                   */}
      {/* ============================================================ */}
      <section data-scroll-reveal className="py-12 sm:py-16 bg-[#F8F3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
                The Edit
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#3D302C] font-medium">
                Best Sellers
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('the-edit')}
              className="mt-2 sm:mt-0 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#3D302C] hover:text-[#C5A46D] transition"
            >
              <span>View All Picks</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Responsive Grid with swipe on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHY MAWUNELLE? (Exact Strip from Visual Reference)        */}
      {/* ============================================================ */}
      <section data-scroll-reveal className="py-10 bg-[#D8C7B7]/25 border-y border-[#D8C7B7]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-serif text-xl sm:text-2xl text-[#3D302C] font-medium">
              Why Mawunelle?
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* 1. Curated Quality */}
            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C5A46D] shadow-xs mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Curated Quality</h4>
              <p className="text-xs text-[#3D302C]/70 mt-1">Only the best for you</p>
            </div>

            {/* 2. Secure Payments */}
            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C5A46D] shadow-xs mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Secure Payments</h4>
              <p className="text-xs text-[#3D302C]/70 mt-1">Shop with confidence</p>
            </div>

            {/* 3. Fast Delivery */}
            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C5A46D] shadow-xs mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Fast Delivery</h4>
              <p className="text-xs text-[#3D302C]/70 mt-1">Across Ghana</p>
            </div>

            {/* 4. Easy Returns */}
            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#C5A46D] shadow-xs mb-3">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#3D302C]">Easy Returns</h4>
              <p className="text-xs text-[#3D302C]/70 mt-1">Hassle-free guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BRAND STORY STRIP (Matches Visual Reference)             */}
      {/* ============================================================ */}
      <section data-scroll-reveal className="py-14 sm:py-20 bg-[#F8F3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-lg bg-[#3D302C] text-[#F8F3EE]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium">
                  The Mawunelle Philosophy
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-medium leading-tight">
                  More than just a store, <br />
                  <span className="italic font-normal text-[#D9B8B2]">it's a lifestyle.</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#D8C7B7] leading-relaxed font-light">
                  Mawunelle is born from a desire for quiet, thoughtful luxury. We believe your everyday moments — from stepping out with a spacious tote, to unhurried evening self-care rituals, to feeling supported during your menstrual cycle — deserve beauty, comfort, and care.
                </p>
                <div className="pt-3">
                  <button
                    id="btn-story-discover"
                    onClick={() => setActiveTab('about')}
                    className="px-6 py-3 rounded-full bg-[#F8F3EE] text-[#3D302C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition flex items-center gap-2"
                  >
                    <span>Discover Mawunelle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Story Lifestyle Image */}
              <div className="aspect-[4/3] lg:aspect-auto h-full min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1512290900672-1f02381283d6?auto=format&fit=crop&w=1000&q=80"
                  alt="Cozy aesthetic bedroom atmosphere with warm lighting"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. SOCIAL PROOF / CUSTOMER LOVE (Reviews)                    */}
      {/* ============================================================ */}
      <section data-scroll-reveal className="py-12 sm:py-16 bg-[#F8F3EE] border-t border-[#D8C7B7]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
              Social Proof
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3D302C] font-medium">
              Loved by Our Customers
            </h2>
            <div className="flex items-center justify-center gap-1 mt-2 text-[#C5A46D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C5A46D]" />
              ))}
              <span className="text-xs text-[#3D302C]/80 ml-1 font-semibold">4.9 / 5.0 across Ghana</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white/70 border border-[#D8C7B7]/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-0.5 text-[#C5A46D] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A46D]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#3D302C]/80 leading-relaxed font-light italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8C7B7]/40">
                  <span className="font-serif text-xs font-semibold text-[#3D302C] block">
                    {rev.customerName}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-[#3D302C]/50 mt-0.5">
                    <span>{rev.location}</span>
                    <span className="text-[#C5A46D] font-medium">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. NEWSLETTER & WHATSAPP CONCIERGE                           */}
      {/* ============================================================ */}
      <section className="py-14 bg-[#D8C7B7]/30 border-t border-[#D8C7B7]/50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium block mb-1">
            Stay Connected
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3D302C] font-medium">
            Join the Mawunelle Circle
          </h2>
          <p className="text-xs sm:text-sm text-[#3D302C]/75 mt-2 max-w-md mx-auto font-light">
            Be the first to hear about new seasonal drops, limited restocks, and private WhatsApp concierge offers.
          </p>

          {/* Quick WhatsApp Connect */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              id="btn-home-whatsapp-chat"
              href="https://wa.me/233244567890?text=Hello%20Mawunelle,%20I%20would%20like%20to%20join%20the%20VIP%20broadcast%20list."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#20ba59] transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => setActiveTab('contact')}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#3D302C] text-[#3D302C] text-xs font-semibold hover:bg-[#3D302C] hover:text-[#F8F3EE] transition"
            >
              Send an Email
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
