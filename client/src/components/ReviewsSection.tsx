import React from 'react';
import { Star, MessageSquareQuote, ExternalLink, CheckCircle } from 'lucide-react';
import { verifiedGoogleReviews } from '../../../shared/reviews.js';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F4EFE7] border-b border-[#6B1D28]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Real Guest Impressions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4F131C] tracking-tight">
            Loved Across Generations
          </h2>
          <div className="font-tamil text-base sm:text-lg text-[#C8861B] mt-1 font-medium">
            மக்களின் நன்மதிப்பு • கூகிள் சான்றளிக்கப்பட்ட மதிப்புரைகள்
          </div>

          {/* Real Google Rating Badge */}
          <div className="mt-5 inline-flex items-center space-x-2.5 bg-white px-4 py-2 rounded-full border border-[#C8861B]/30 shadow-xs text-xs">
            <div className="flex items-center space-x-1 text-[#C8861B]">
              <span className="font-bold text-sm text-[#4F131C]">4.3</span>
              <div className="flex text-[#C8861B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C8861B]" />
                ))}
              </div>
            </div>
            <span className="text-black/30">|</span>
            <span className="font-semibold text-[#4F131C]">13,400+ Verified Google Reviews</span>
            <span className="text-black/30">|</span>
            <span className="text-[#C8861B] font-medium">Race Course, Coimbatore</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedGoogleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF7F2] p-6 rounded-xl border border-[#6B1D28]/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative group"
            >
              <div>
                {/* Header: Stars & Google Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-0.5 text-[#C8861B]">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C8861B]" />
                    ))}
                  </div>

                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Google Review</span>
                  </span>
                </div>

                <div className="text-xs font-semibold text-[#4F131C] uppercase tracking-wider mb-2">
                  Fav: {review.dish_mentioned}
                </div>

                <p className="text-xs sm:text-sm text-[#554E48] font-light leading-relaxed italic mb-6">
                  "{review.review_text}"
                </p>
              </div>

              {/* Author & City */}
              <div className="pt-4 border-t border-[#6B1D28]/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#242220] tracking-wide">
                    {review.author_name}
                  </h4>
                  <span className="text-[10px] text-[#C8861B] font-medium block">
                    {review.reviewer_badge || 'Google Reviewer'}
                  </span>
                  <span className="text-[10px] text-[#7A736C]">
                    {review.city}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#9E968D] block">
                    Verified
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-emerald-700 font-semibold">
                    via Maps
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View on Google Maps Link Button */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.google.com/?q=Valarmathi+Kongunattu+Samayal+CSI+Compound+Race+Course+Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-white border border-[#6B1D28]/20 hover:border-[#C8861B] text-[#4F131C] text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all group"
          >
            <span>Read all 13,400+ Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C8861B] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
