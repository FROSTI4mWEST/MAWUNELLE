import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'pill';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header', className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as installed standalone app, suppress prompt
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'pill') {
      return (
        <button
          id="btn-pwa-install-pill"
          onClick={install}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[#3D302C] text-[#F8F3EE] hover:bg-[#52413C] transition shadow-sm ${className}`}
        >
          <Download className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>Install App</span>
        </button>
      );
    }

    return (
      <button
        id="btn-pwa-install-header"
        onClick={install}
        aria-label="Install Mawunelle App"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[#D8C7B7] text-[#3D302C] hover:border-[#C5A46D] hover:bg-[#F8F3EE] transition ${className}`}
      >
        <Smartphone className="w-3.5 h-3.5 text-[#C5A46D]" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="btn-pwa-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-[#D8C7B7] text-[#3D302C] hover:border-[#C5A46D] hover:bg-[#F8F3EE] transition ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span className="hidden sm:inline">Install on iOS</span>
          <span className="sm:hidden">Get App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-[#F8F3EE] border border-[#D8C7B7] p-6 shadow-2xl text-[#3D302C]">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8C7B7]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#3D302C] text-[#F8F3EE] flex items-center justify-center font-serif text-sm">
                    M
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#3D302C]">Add Mawunelle to Home</h3>
                </div>
                <button
                  id="btn-close-ios-guide"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-[#3D302C]/60 hover:text-[#3D302C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-[#3D302C]/80 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D9B8B2] text-[#3D302C] flex items-center justify-center font-semibold text-[11px] shrink-0">1</span>
                  <p>Tap the <strong>Share button</strong> <span className="inline-block px-1.5 py-0.5 bg-white border border-[#D8C7B7] rounded text-[11px]">⎋</span> at the bottom of Safari.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D9B8B2] text-[#3D302C] flex items-center justify-center font-semibold text-[11px] shrink-0">2</span>
                  <p>Scroll down the share sheet and tap <strong>Add to Home Screen</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#D9B8B2] text-[#3D302C] flex items-center justify-center font-semibold text-[11px] shrink-0">3</span>
                  <p>Confirm by tapping <strong>Add</strong> in the top right corner.</p>
                </div>
              </div>

              <button
                id="btn-dismiss-ios-guide"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-full bg-[#3D302C] text-[#F8F3EE] py-2.5 text-xs font-medium hover:bg-[#52413C] transition"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
