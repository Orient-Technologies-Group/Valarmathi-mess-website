import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OUTLETS } from '../data/tapriwalaData';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

export const OutletsPage: React.FC = () => {
  const [selectedOutletId, setSelectedOutletId] = useState<string>(OUTLETS[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentOutlet = OUTLETS.find((o) => o.id === selectedOutletId) || OUTLETS[0];

  const faqs = [
    {
      q: 'Do you offer Jain food preparations?',
      a: 'Yes! We have dedicated Jain options available across our chai, sandwiches, street chaats, and Maggi. Please inform our counter team when placing your order.'
    },
    {
      q: 'Are the board games free to play at the R.S. Puram flagship?',
      a: 'Yes, completely complimentary! Jenga, Scrabble, Uno, and other games are available for all guests dining in at our R.S. Puram cafe.'
    },
    {
      q: 'Can I order online for home delivery?',
      a: 'Absolutely. Tapriwala is actively listed on both Swiggy and Zomato for delivery across R.S. Puram, Saibaba Colony, Peelamedu, and surrounding Coimbatore neighbourhoods.'
    },
    {
      q: 'Is two-wheeler and four-wheeler parking available?',
      a: 'Two-wheeler street parking is readily available near all three outlets. For cars, roadside parking along Lokamanya Street and DB Road is convenient during day and evening hours.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F7F1E7] min-h-screen relative bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fade-down" delay={0.1} className="py-12 border-b border-[#E4D6C2] mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
            <span className="w-6 h-[1px] bg-[#B95032]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              Find Your Nearest Spot
            </span>
            <span className="w-6 h-[1px] bg-[#B95032]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#302019] tracking-tight mb-4">
            Our Coimbatore Outlets
          </h1>

          <p className="text-base sm:text-lg text-[#8C7E74] leading-relaxed">
            Three distinct destinations across the city. From our expansive flagship cafe with board games to our fast grab-and-go kiosk.
          </p>
        </ScrollReveal>

        {/* Tab Switcher */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12" role="tablist">
            {OUTLETS.map((outlet) => (
              <button
                key={outlet.id}
                type="button"
                role="tab"
                aria-selected={selectedOutletId === outlet.id}
                onClick={() => setSelectedOutletId(outlet.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer border flex items-center space-x-2.5 ${
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

        {/* Selected Outlet Detailed Showcase */}
        <ScrollReveal animation="zoom-in" delay={0.3} duration={0.8} className="bg-[#FAF6EF] rounded-3xl border border-[#E4D6C2] shadow-xl overflow-hidden mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOutlet.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              
              {/* Info Column */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
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

                {/* Actions */}
                <div className="pt-6 border-t border-[#E4D6C2] flex flex-wrap items-center gap-3">
                  <a
                    href={currentOutlet.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>

                  {currentOutlet.phone && (
                    <a
                      href={`tel:${currentOutlet.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center space-x-2 px-5 py-3 bg-[#F7F1E7] hover:bg-[#E4D6C2]/40 text-[#302019] border border-[#8C7E74]/40 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#B95032]" />
                      <span>Call Outlet</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Photo Column */}
              <div className="lg:col-span-5 bg-[#302019] relative min-h-[320px] lg:min-h-full overflow-hidden group">
                <img
                  src={currentOutlet.image}
                  alt={`${currentOutlet.name} storefront in Coimbatore`}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 right-4 bg-[#FAF6EF]/90 px-3 py-1.5 rounded-full text-xs font-semibold text-[#302019] shadow-sm flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#728064]" />
                  <span>Verified Coimbatore Outlet</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-[#F7F1E7]">
                  <h3 className="font-serif text-2xl font-bold">
                    {currentOutlet.name}
                  </h3>
                  <p className="text-xs text-[#E4D6C2]/80 mt-1">
                    Tapriwala — The Contemporary Tea Cafe
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </ScrollReveal>

        {/* FAQs Section with StaggerContainer */}
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-down" delay={0.1} className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B95032] block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#302019]">
              Visiting Tapriwala
            </h2>
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.12}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <StaggerItem key={i} animation="fade-up">
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-2xl bg-[#FAF6EF] border border-[#E4D6C2] shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-[#B95032] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#302019] mb-1">
                        {faq.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8C7E74] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </div>
  );
};
