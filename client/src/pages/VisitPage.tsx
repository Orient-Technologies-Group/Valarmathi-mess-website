import React from 'react';
import { RestaurantInfo, OpeningHour } from '../../../shared/types.js';
import { getLiveRestaurantStatus } from '../utils/helpers.js';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar, Car, Bus } from 'lucide-react';

interface VisitPageProps {
  info: RestaurantInfo | null;
  hours: OpeningHour[];
  onOpenReservation: () => void;
}

export const VisitPage: React.FC<VisitPageProps> = ({ info, hours, onOpenReservation }) => {
  const status = getLiveRestaurantStatus(hours);
  const phone = info?.phone || '+91 422 427 1190';
  const mapsUrl =
    info?.google_maps_url ||
    'https://maps.google.com/?q=Valarmathi+Mess+207/A+Race+Course+Coimbatore+641018';

  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Finding Your Table</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F131C] tracking-tight">
            Visit Valarmathi Mess
          </h1>
          <div className="font-tamil text-lg text-[#C8861B] font-semibold mt-1">
            இருப்பிடம் & வேலை நேரம்
          </div>
          <p className="text-sm sm:text-base text-[#6B6661] mt-3 font-light">
            Conveniently situated in the green heart of Race Course, Coimbatore. Walk-in guests and families are
            always welcome.
          </p>
        </div>

        {/* Primary Contact & Action Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Location & Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#FAF7F2] p-8 rounded border border-[#6B1D28]/15 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8861B]">
                  Official Address
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#4F131C] mt-1">
                  Valarmathi Mess
                </h2>
                <div className="mt-2 text-base text-[#4A4540] space-y-0.5 font-light">
                  <p>CSI Compound, 207/A, Race Course</p>
                  <p>Coimbatore, Tamil Nadu 641018</p>
                  <p className="text-xs text-[#7A736C] pt-1">Landmark: Near CSI Christ Church</p>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-5 rounded bg-[#4F131C] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] shadow transition-all"
                >
                  <Phone className="w-4 h-4 text-[#E09E2B]" />
                  <span>Call Restaurant</span>
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-5 rounded bg-[#FAF7F2] border border-[#4F131C]/30 text-[#4F131C] text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EDE2] transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#C8861B]" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Phone display */}
              <div className="pt-4 border-t border-[#6B1D28]/10 flex items-center justify-between text-xs text-[#554E48]">
                <span>Direct Telephone:</span>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-bold text-[#4F131C] hover:underline">
                  {phone}
                </a>
              </div>
            </div>

            {/* Travel & Parking Guidance */}
            <div className="bg-[#F4EFE7] p-6 rounded border border-[#6B1D28]/15 space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#4F131C]">
                Guest Information & Parking
              </h3>

              <div className="space-y-3 text-xs text-[#554E48] font-light">
                <div className="flex items-start space-x-3">
                  <Car className="w-4 h-4 text-[#C8861B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-[#242220]">Vehicle Parking:</strong>
                    <p className="mt-0.5">
                      Curbside two-wheeler and four-wheeler parking is available along the peaceful Race Course ring
                      road and inside CSI compound during designated lunch/dinner hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Bus className="w-4 h-4 text-[#C8861B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-[#242220]">Public Transit:</strong>
                    <p className="mt-0.5">
                      Easily accessible from Gandhipuram Central Bus Stand (approx. 3.5 km) and Coimbatore Junction
                      Railway Station (approx. 2.5 km).
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="w-full py-2.5 rounded bg-white text-[#4F131C] border border-[#6B1D28]/20 text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors"
                >
                  Book Table / Catering Enquiry
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Weekly Schedule & Map Preview */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hours Table */}
            <div className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#6B1D28]/10 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#C8861B]" />
                  <h3 className="font-serif text-xl font-bold text-[#4F131C]">
                    Service Schedule
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {status.message}
                </span>
              </div>

              <div className="divide-y divide-[#6B1D28]/10 text-xs">
                {hours.map((h) => {
                  const nowDay = new Date().getDay();
                  const isToday = h.day_of_week === nowDay;
                  return (
                    <div
                      key={h.id}
                      className={`py-2.5 flex items-center justify-between ${
                        isToday ? 'bg-[#F4EFE7]/80 -mx-2 px-2 rounded font-semibold text-[#4F131C]' : 'text-[#554E48]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{h.day_name}</span>
                        {isToday && (
                          <span className="text-[10px] text-[#C8861B] uppercase font-bold tracking-wider">
                            (Today)
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <div>
                          <span>Lunch: {h.lunch_open} – {h.lunch_close}</span>
                        </div>
                        <div className="text-[11px] text-[#7A736C]">
                          <span>Dinner: {h.dinner_open} – {h.dinner_close}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embedded Map Panel (No API Key Required) */}
            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/15 shadow-sm overflow-hidden">
              <div className="h-64 bg-[#E8E1D5] relative">
                <iframe
                  title="Valarmathi Mess Location"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.9650%2C11.0000%2C76.9850%2C11.0120&amp;layer=mapnik&amp;marker=11.0064%2C76.9745"
                />
              </div>
              <div className="p-3 bg-[#F4EFE7] flex justify-between items-center text-xs">
                <span className="text-[#6B6661]">CSI Compound, Race Course</span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#4F131C] hover:text-[#C8861B] flex items-center space-x-1"
                >
                  <span>Open Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
