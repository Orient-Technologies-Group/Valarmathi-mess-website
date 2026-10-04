import React, { useState, useEffect } from 'react';
import { X, Phone, Copy, Check, Clock, MapPin, MessageCircle, Navigation, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OUTLETS, type Outlet } from '../data/tapriwalaData';

interface OutletContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOutletId?: string;
}

export const OutletContactModal: React.FC<OutletContactModalProps> = ({
  isOpen,
  onClose,
  initialOutletId
}) => {
  const [activeOutletId, setActiveOutletId] = useState<string>(initialOutletId || OUTLETS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialOutletId) {
      setActiveOutletId(initialOutletId);
    }
  }, [initialOutletId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      setCopied(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const currentOutlet: Outlet = OUTLETS.find((o) => o.id === activeOutletId) || OUTLETS[0];
  const rawPhone = (currentOutlet.phone || '+91 80565 44622').replace(/\s+/g, '');
  const cleanNumberWithoutCountry = rawPhone.replace(/^\+91/, '');

  const handleCopy = () => {
    const phoneToCopy = currentOutlet.phone || '+91 80565 44622';
    navigator.clipboard.writeText(phoneToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Tapriwala team, I am reaching out regarding the ${currentOutlet.name} branch with a question/order query.`
  );
  const whatsappUrl = `https://wa.me/91${cleanNumberWithoutCountry}?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#261710]/75 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#FAF6EF] rounded-3xl shadow-2xl border border-[#E4D6C2] overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] bg-paper-grain"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-[#E4D6C2] relative bg-[#F7F1E7]">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-5 right-5 p-2 rounded-full text-[#302019]/60 hover:text-[#302019] hover:bg-[#E4D6C2]/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-[#B95032] mb-2">
                <span className="p-1 rounded-md bg-[#B95032]/10">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
                  Direct Cafe Helpline
                </span>
              </div>

              <h2 id="contact-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#302019]">
                Call Our Outlets
              </h2>
              <p className="text-xs sm:text-sm text-[#8C7E74] mt-1">
                Reach our team directly for table bookings, inquiries, or fresh orders across all Coimbatore locations.
              </p>
            </div>

            {/* Outlet Selector Tabs */}
            <div className="px-6 sm:px-7 pt-5 pb-3 border-b border-[#E4D6C2]/60 bg-[#FAF6EF]">
              <div className="flex flex-wrap items-center gap-2" role="tablist">
                {OUTLETS.map((outlet) => (
                  <button
                    key={outlet.id}
                    type="button"
                    role="tab"
                    aria-selected={activeOutletId === outlet.id}
                    onClick={() => {
                      setActiveOutletId(outlet.id);
                      setCopied(false);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer border flex items-center space-x-2 ${
                      activeOutletId === outlet.id
                        ? 'bg-[#302019] text-[#F7F1E7] border-[#302019] shadow-sm'
                        : 'bg-[#F7F1E7] text-[#302019]/75 hover:text-[#302019] hover:bg-[#E4D6C2]/40 border-[#E4D6C2]'
                    }`}
                  >
                    <span>{outlet.name.split(/[-—]/)[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-5">
              
              {/* Outlet Summary Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#302019]">
                    {currentOutlet.name}
                  </h3>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#B95032]/10 text-[#B95032] border border-[#B95032]/20">
                    {currentOutlet.featuredPill}
                  </span>
                </div>
              </div>

              {/* Neat Write-up / Hospitality message */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F1E7] border border-[#E4D6C2] text-[#302019]">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-[#FAF6EF] border border-[#E4D6C2] text-[#B95032] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C7E74] mb-1">
                      How we can help you
                    </h4>
                    <p className="text-xs sm:text-sm text-[#302019]/90 leading-relaxed">
                      {currentOutlet.callWriteup ||
                        'Have a question about table reservations, our board games collection, Jain food preparations, custom chai orders, or takeout? We’re just a call away — our team is happy to assist you!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prominent Phone Number Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#E4D6C2] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E74]">
                    Branch Phone Number
                  </span>
                  {currentOutlet.hours && (
                    <div className="flex items-center space-x-1.5 text-xs text-[#728064] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{currentOutlet.hours.split(':')[1]?.trim() || '11 AM – 10:30 PM'}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#302019]">
                    {currentOutlet.phone || '+91 80565 44622'}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      copied
                        ? 'bg-[#728064] text-white shadow-sm'
                        : 'bg-[#F7F1E7] hover:bg-[#E4D6C2] text-[#302019] border border-[#E4D6C2]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8C7E74]" />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons: Direct Call & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Dial link for mobile / devices with phone apps */}
                <a
                  href={`tel:${rawPhone}`}
                  className="flex items-center justify-center space-x-2.5 px-4 py-3 rounded-xl bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md active:scale-98 text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call from Phone</span>
                </a>

                {/* WhatsApp Chat link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2.5 px-4 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/30 font-semibold text-xs tracking-wider uppercase transition-all active:scale-98 text-center"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>

              {/* Location Reference */}
              <div className="pt-3 border-t border-[#E4D6C2]/80 flex items-start justify-between gap-4 text-xs">
                <div className="flex items-start space-x-2 text-[#8C7E74]">
                  <MapPin className="w-3.5 h-3.5 text-[#B95032] shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-relaxed text-[#302019]/80 font-medium">
                    {currentOutlet.address}
                  </span>
                </div>
                <a
                  href={currentOutlet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[#B95032] hover:underline font-semibold shrink-0"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Map</span>
                </a>
              </div>

            </div>

            {/* Footer Note */}
            <div className="px-6 sm:px-7 py-3.5 bg-[#F7F1E7] border-t border-[#E4D6C2] flex items-center justify-between text-[11px] text-[#8C7E74]">
              <span>Walk-ins always welcome · Jain preparations available</span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-[#302019] hover:text-[#B95032] cursor-pointer"
              >
                Done
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
