import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation, ExternalLink, Calendar, Heart } from 'lucide-react';
import { RestaurantInfo, OpeningHour } from '../../../shared/types.js';
import { getLiveRestaurantStatus } from '../utils/helpers.js';

interface LocationBannerProps {
  info: RestaurantInfo | null;
  hours: OpeningHour[];
  onOpenReservation: () => void;
}

export const LocationBanner: React.FC<LocationBannerProps> = ({
  info,
  hours,
  onOpenReservation,
}) => {
  const status = getLiveRestaurantStatus(hours);
  const phone = info?.phone || '+91 422 427 1190';
  const mapsUrl =
    info?.google_maps_url ||
    'https://maps.google.com/?q=Valarmathi+Mess+207/A+Race+Course+Coimbatore+641018';

  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] border-b border-[#6B1D28]/10" id="visit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Destination Climax Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-3"
          >
            <Heart className="w-3.5 h-3.5 fill-[#C8861B]" />
            <span>The Journey's Destination</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#4F131C] tracking-tight leading-[1.08] uppercase"
          >
            Come Hungry. <br />
            <span className="italic font-normal text-[#242220]">Leave Happy.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-tamil text-lg text-[#C8861B] font-semibold mt-3"
          >
            நிறைவான விருந்து • கோவை பந்தய சாலை
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xs sm:text-base text-[#6B6661] mt-3 font-light max-w-lg mx-auto"
          >
            CSI Compound, 207/A, Race Course, Coimbatore. Walk-in dining for lunch and dinner every single day.
          </motion.p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Location, Contact & Live Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Live Service Card */}
            <div className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#6B1D28]/10">
                <div className="flex items-center space-x-2.5">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#4F131C]">
                      {status.message}
                    </h3>
                    <p className="text-xs text-[#7A736C]">{status.nextChange}</p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-[#C8861B] bg-[#F4EFE7] px-2.5 py-1 rounded">
                  All 7 Days Open
                </span>
              </div>

              {/* Hours Schedule */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 text-[#4A4540]">
                  <span className="font-semibold text-[#4F131C]">Lunch Service</span>
                  <span>12:00 PM – 04:00 PM (Daily)</span>
                </div>
                <div className="flex justify-between py-1 text-[#4A4540]">
                  <span className="font-semibold text-[#4F131C]">Dinner Service</span>
                  <span>07:00 PM – 11:00 PM (Daily)</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#6B1D28]/10 flex flex-wrap gap-3">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded bg-[#4F131C] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] shadow transition-all active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E09E2B]" />
                  <span>Call Now ({phone})</span>
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded bg-[#FAF7F2] border border-[#4F131C]/30 text-[#4F131C] text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EDE2] transition-all active:scale-[0.98]"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#C8861B]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Address & Landmark Details */}
            <div className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8861B] mb-1">
                  Full Postal Address
                </h4>
                <p className="font-serif text-xl font-bold text-[#4F131C]">
                  Valarmathi Mess
                </p>
                <p className="text-sm text-[#4A4540] font-light mt-0.5">
                  CSI Compound, 207/A, Race Course
                </p>
                <p className="text-sm text-[#4A4540] font-light">
                  Coimbatore, Tamil Nadu 641018
                </p>
              </div>

              <div className="pt-3 border-t border-[#6B1D28]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8861B] mb-1">
                  Landmark & Parking Note
                </h4>
                <p className="text-xs text-[#6F6B66] font-light leading-relaxed">
                  Located near CSI Christ Church in Race Course. Street parking available along Race Course
                  ring road. Peak lunch rush hours: 1:00 PM – 2:30 PM.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded bg-[#F4EFE7] hover:bg-[#EFE7D8] text-[#4F131C] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#6B1D28]/15"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C8861B]" />
                  <span>Submit Group / Family Dining Enquiry</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Progressive Map Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 h-full"
          >
            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/15 shadow-sm overflow-hidden flex flex-col h-full min-h-[440px]">
              <div className="relative flex-1 min-h-[340px] bg-[#E8E1D5]">
                <iframe
                  title="Valarmathi Mess Location Map Race Course Coimbatore"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.9650%2C11.0000%2C76.9850%2C11.0120&amp;layer=mapnik&amp;marker=11.0064%2C76.9745"
                />

                <div className="absolute top-3 left-3 bg-[#4F131C] text-[#FAF7F2] px-3 py-1.5 rounded shadow-lg text-xs font-semibold flex items-center space-x-1.5 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-[#E09E2B]" />
                  <span>Race Course, Coimbatore</span>
                </div>
              </div>

              <div className="p-4 bg-[#F5EFE6] border-t border-[#6B1D28]/10 flex items-center justify-between">
                <span className="text-xs text-[#7A736C]">
                  Coordinates: 11.0064° N, 76.9745° E (CSI Compound)
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#4F131C] hover:text-[#C8861B] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
