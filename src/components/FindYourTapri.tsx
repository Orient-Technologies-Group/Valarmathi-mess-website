import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Coffee, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OUTLETS } from '../data/tapriwalaData';
import { ScrollReveal } from './ScrollReveal';

export const FindYourTapri: React.FC = () => {
  const [selectedOutletId, setSelectedOutletId] = useState<string>(OUTLETS[0].id);

  const currentOutlet = OUTLETS.find((o) => o.id === selectedOutletId) || OUTLETS[0];

  return (
    <section id="outlets" className="py-20 lg:py-28 bg-[#F7F1E7] border-b border-[#E4D6C2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
              <span className="w-6 h-[1px] bg-[#B95032]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Coimbatore Locations
              </span>
              <span className="w-6 h-[1px] bg-[#B95032]" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight mb-4">
              Find your Tapri.
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-base text-[#8C7E74]">
              Three convenient locations across Coimbatore. Choose an outlet to see exact address, live hours, and direct navigation:
            </p>
          </ScrollReveal>
        </div>

        {/* Outlet Switcher Tabs */}
        <ScrollReveal animation="fade-up" delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12" role="tablist">
            {OUTLETS.map((outlet) => (
              <button
                key={outlet.id}
                type="button"
                role="tab"
                aria-selected={selectedOutletId === outlet.id}
                onClick={() => setSelectedOutletId(outlet.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer border flex items-center space-x-2.5 ${
                  selectedOutletId === outlet.id
                    ? 'bg-[#302019] text-[#F7F1E7] border-[#302019] shadow-md scale-102'
                    : 'bg-[#FAF6EF] text-[#302019]/80 hover:text-[#302019] hover:bg-[#E4D6C2]/40 border-[#E4D6C2]'
                }`}
              >
                <MapPin className={`w-4 h-4 ${selectedOutletId === outlet.id ? 'text-[#D49A3D]' : 'text-[#B95032]'}`} />
                <span>{outlet.name}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Selected Outlet Detailed Card with Smooth Transition */}
        <ScrollReveal animation="zoom-in" delay={0.4} duration={0.8}>
          <div className="bg-[#FAF6EF] rounded-3xl border border-[#E4D6C2] shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOutlet.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                
                {/* Left: Outlet Information & Actions */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Pill */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#B95032]/10 text-[#B95032] text-xs font-semibold tracking-wide border border-[#B95032]/20">
                        {currentOutlet.featuredPill}
                      </span>
                      <span className="text-xs text-[#8C7E74]">
                        {currentOutlet.type}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#302019] mb-4">
                      {currentOutlet.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#302019]/80 leading-relaxed mb-8">
                      {currentOutlet.detail}
                    </p>

                    {/* Info List */}
                    <div className="space-y-4 mb-8">
                      
                      {/* Address */}
                      <div className="flex items-start space-x-3.5">
                        <div className="p-2 rounded-lg bg-[#F7F1E7] border border-[#E4D6C2] text-[#B95032] shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E74] block">
                            Address
                          </span>
                          <p className="text-sm text-[#302019] font-medium leading-relaxed">
                            {currentOutlet.address}
                          </p>
                        </div>
                      </div>

                      {/* Hours */}
                      {currentOutlet.hours ? (
                        <div className="flex items-start space-x-3.5">
                          <div className="p-2 rounded-lg bg-[#F7F1E7] border border-[#E4D6C2] text-[#728064] shrink-0 mt-0.5">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E74] block">
                              Opening Hours
                            </span>
                            <p className="text-sm text-[#302019] font-medium">
                              {currentOutlet.hours}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-3.5">
                          <div className="p-2 rounded-lg bg-[#F7F1E7] border border-[#E4D6C2] text-[#8C7E74] shrink-0 mt-0.5">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E74] block">
                              Operating Timings
                            </span>
                            <p className="text-sm text-[#8C7E74] italic">
                              Quick grab-and-go kiosk — please check counter timings on-site.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Phone */}
                      {currentOutlet.phone ? (
                        <div className="flex items-start space-x-3.5">
                          <div className="p-2 rounded-lg bg-[#F7F1E7] border border-[#E4D6C2] text-[#D49A3D] shrink-0 mt-0.5">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E74] block">
                              Contact Number
                            </span>
                            <a
                              href={`tel:${currentOutlet.phone.replace(/\s+/g, '')}`}
                              className="text-sm font-semibold text-[#B95032] hover:underline"
                            >
                              {currentOutlet.phone}
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-3.5">
                          <div className="p-2 rounded-lg bg-[#F7F1E7] border border-[#E4D6C2] text-[#8C7E74] shrink-0 mt-0.5">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C7E74] block">
                              Telephone
                            </span>
                            <p className="text-sm text-[#8C7E74] italic">
                              Direct counter service only.
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 border-t border-[#E4D6C2] flex flex-wrap items-center gap-3">
                    <a
                      href={currentOutlet.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#302019]"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </a>

                    {currentOutlet.phone && (
                      <a
                        href={`tel:${currentOutlet.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center space-x-2 px-5 py-3 bg-[#F7F1E7] hover:bg-[#E4D6C2]/40 text-[#302019] border border-[#8C7E74]/40 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#B95032]"
                      >
                        <Phone className="w-4 h-4 text-[#B95032]" />
                        <span>Call this outlet</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Real Outlet Photography Frame */}
                <div className="lg:col-span-5 bg-[#302019] relative min-h-[300px] lg:min-h-full overflow-hidden group">
                  <img
                    src={currentOutlet.image}
                    alt={`${currentOutlet.name} storefront in Coimbatore`}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Verified Badge */}
                  <div className="absolute top-4 right-4 bg-[#FAF6EF]/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-semibold text-[#302019] shadow-sm flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#728064]" />
                    <span>Verified Coimbatore Outlet</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-[#F7F1E7]">
                    <p className="font-serif text-lg font-bold">
                      {currentOutlet.name}
                    </p>
                    <p className="text-xs text-[#E4D6C2]/80 mt-0.5">
                      Tapriwala — The Contemporary Tea Cafe
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Cost For Two Callout */}
        <ScrollReveal animation="fade-up" delay={0.5}>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FAF6EF] border border-[#E4D6C2] text-xs sm:text-sm text-[#8C7E74] shadow-2xs">
              <Coffee className="w-4 h-4 text-[#B95032]" />
              <span>
                An easy chai break for two: <strong className="text-[#302019]">approximately ₹200–₹400.</strong>
              </span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
