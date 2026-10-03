import React from 'react';
import { Star, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/tapriwalaData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF6EF] border-b border-[#E4D6C2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-[#E4D6C2] pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
              <span className="w-8 h-[1px] bg-[#B95032]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                Customer Voices
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#302019] tracking-tight">
              Loved across{' '}
              <span className="italic font-normal text-[#B95032]">Coimbatore.</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3 bg-[#F7F1E7] px-4 py-2 rounded-xl border border-[#E4D6C2]">
            <div className="flex items-center text-[#D49A3D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#302019]">
              4.4 / 5 Rating on Google Maps & Swiggy
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {GOOGLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#F7F1E7] p-6 sm:p-8 rounded-2xl border border-[#E4D6C2] hover:border-[#B95032] transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars and Highlight Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-[#D49A3D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B95032] bg-[#B95032]/10 px-2.5 py-0.5 rounded-full border border-[#B95032]/20">
                    {review.highlight}
                  </span>
                </div>

                {/* Quote Icon & Text */}
                <div className="relative mb-6">
                  <MessageSquareQuote className="w-8 h-8 text-[#E4D6C2] absolute -top-2 -left-2 -z-0 opacity-40" />
                  <p className="text-sm sm:text-base text-[#302019]/85 leading-relaxed italic relative z-10">
                    "{review.comment}"
                  </p>
                </div>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#E4D6C2]/70 flex items-center justify-between text-xs text-[#8C7E74]">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#B95032] text-[#F7F1E7] flex items-center justify-center font-bold text-xs uppercase">
                    {review.author[0]}
                  </div>
                  <div>
                    <span className="font-bold text-[#302019] block">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-[#8C7E74]">
                      {review.outlet}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[#728064]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">Verified Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
