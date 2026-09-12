import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CollectionType } from '../../types';

const collections: Array<{
  id: CollectionType;
  name: string;
  description: string;
  image: string;
}> = [
  {
    id: 'everyday-edit',
    name: 'Everyday Edit',
    description: 'Bags, phone cases, and room pieces made for your everyday rhythm.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'glow-ritual',
    name: 'Glow Ritual',
    description: 'Hand and foot care essentials for soft, unhurried self-care.',
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'monthly-product',
    name: 'Monthly Product',
    description: 'Discreet cycle comfort and thoughtful essentials for every month.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
  },
];

export const CollectionsPage: React.FC = () => {
  const { navigateToCollection } = useApp();

  return (
    <div className="min-h-screen bg-[#F8F3EE] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#C5A46D]">
            Explore MAWUNELLE
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#3D302C] sm:text-5xl">Our Collections</h1>
          <p className="mt-3 text-xs font-light leading-relaxed text-[#3D302C]/70 sm:text-sm">
            Three thoughtful lines, each created to bring beauty, comfort, and ease into your everyday.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => navigateToCollection(collection.id)}
              className="group overflow-hidden rounded-3xl border border-[#D8C7B7]/60 bg-white/80 text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#D8C7B7]/20">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <h2 className="font-serif text-2xl font-medium text-[#3D302C]">{collection.name}</h2>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#3D302C]/70">{collection.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3D302C] transition-colors group-hover:text-[#C5A46D]">
                  Explore collection
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
