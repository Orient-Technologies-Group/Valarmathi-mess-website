import React from 'react';
import { Phone, Navigation, UtensilsCrossed, Calendar } from 'lucide-react';

interface MobileActionFooterProps {
  onNavigate: (route: string) => void;
  onOpenReservation: () => void;
  googleMapsUrl?: string;
  phone?: string;
}

export const MobileActionFooter: React.FC<MobileActionFooterProps> = ({
  onNavigate,
  onOpenReservation,
  googleMapsUrl = 'https://maps.google.com/?q=Valarmathi+Mess+207/A+Race+Course+Coimbatore+641018',
  phone = '+91 422 427 1190',
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#6B1D28]/20 shadow-[0_-4px_16px_rgba(79,19,28,0.12)]">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        {/* CALL */}
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center text-[#4F131C] active:bg-[#F3EDE2] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#4F131C]/10 flex items-center justify-center mb-0.5">
            <Phone className="w-4 h-4 text-[#4F131C]" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase">Call</span>
        </a>

        {/* DIRECTIONS */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-[#4F131C] active:bg-[#F3EDE2] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#C8861B]/15 flex items-center justify-center mb-0.5">
            <Navigation className="w-4 h-4 text-[#C8861B]" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase">Directions</span>
        </a>

        {/* MENU */}
        <button
          onClick={() => {
            onNavigate('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center text-[#4F131C] active:bg-[#F3EDE2] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#4F131C] text-[#FAF7F2] flex items-center justify-center mb-0.5 shadow-sm">
            <UtensilsCrossed className="w-4 h-4 text-[#FAF7F2]" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase">Menu</span>
        </button>

        {/* RESERVE */}
        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center justify-center text-[#4F131C] active:bg-[#F3EDE2] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#4F131C]/10 flex items-center justify-center mb-0.5">
            <Calendar className="w-4 h-4 text-[#4F131C]" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase">Enquiry</span>
        </button>
      </div>
    </div>
  );
};
