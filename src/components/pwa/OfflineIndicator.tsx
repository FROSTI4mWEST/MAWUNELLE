import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      id="pwa-offline-banner"
      role="status"
      className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:right-auto z-50 flex items-center gap-2.5 rounded-full bg-[#3D302C] text-[#F8F3EE] px-4 py-2 text-xs font-medium shadow-xl border border-[#C5A46D]/40 animate-bounce"
    >
      <WifiOff className="w-4 h-4 text-[#C5A46D]" />
      <span>Offline Mode — Browsing cached Mawunelle catalogue</span>
    </div>
  );
};
