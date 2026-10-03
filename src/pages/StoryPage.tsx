import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { BRAND_PROMISES } from '../data/tapriwalaData';

export const StoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-[#F7F1E7] min-h-screen relative bg-paper-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="py-12 border-b border-[#E4D6C2] mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[#B95032] mb-3">
            <span className="w-6 h-[1px] bg-[#B95032]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              Heritage & Culinary Philosophy
            </span>
            <span className="w-6 h-[1px] bg-[#B95032]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#302019] tracking-tight mb-6">
            The soul of a tapri.{' '}
            <span className="block italic font-normal text-[#B95032]">
              The warmth of your favourite cafe.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#8C7E74] leading-relaxed">
            How a humble tea stall idea in Mumbai blossomed into a vibrant, beloved cafe chain in Coimbatore, Tamil Nadu.
          </p>
        </div>

        {/* Narrative Section 1: The Founding Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-[#302019]/85 text-base sm:text-lg leading-relaxed font-normal">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302019]">
              Reimagining the Roadside Chai Break
            </h2>
            <p>
              In India, the roadside <em>tapri</em> isn't merely a place to grab tea; it is a sacred cultural ritual. It's where colleagues decompress after a long shift, where college friends plot their futures, and where the rich aroma of crushed ginger and cardamom welcomes everyone as equals.
            </p>
            <p>
              However, traditional street stalls often lack comfortable seating, hygienic kitchens, and peaceful spaces to sit for hours. <strong>Tapriwala</strong> was founded with a singular conviction: <em>why should you have to sacrifice the comfort of a cafe to enjoy the unpretentious, soul-warming flavours of a desi tea stall?</em>
            </p>
            <p>
              Opening our flagship cafe on Diwan Bahadur (DB) Road in R.S. Puram, Coimbatore, we built an unhurried haven. We brought together authentic clay kulhads, authentic Mumbai street chaat recipes, thick Surat cold cocoa, and board games on every table.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF]">
              <img
                src="/images/kulhad-chai.jpg"
                alt="Boiling tea in clay kulhads with whole spices"
                className="w-full aspect-4/5 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-[#F7F1E7]">
                <span className="font-serif text-xl font-bold block mb-1">
                  Clay Kulhad Brewing
                </span>
                <p className="text-xs text-[#E4D6C2]/90">
                  Infusing natural mineral earthiness into every Assam tea leaf
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Four Kitchen Pillars Detailed */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl bg-[#FAF6EF] border border-[#E4D6C2] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B95032] block mb-2">
              Our Non-Negotiables
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302019]">
              The Four Kitchen Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BRAND_PROMISES.map((promise) => (
              <div key={promise.id} className="p-6 rounded-2xl bg-[#F7F1E7] border border-[#E4D6C2] flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-[#FAF6EF] text-[#B95032] border border-[#E4D6C2] shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#728064]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#302019] mb-2">
                    {promise.title}
                  </h3>
                  <p className="text-sm text-[#8C7E74] leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Section 2: Why Kulhad Matters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-20">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF6EF]">
              <img
                src="/images/cafe-ambience.jpg"
                alt="Coimbatore community enjoying tea and conversations at Tapriwala"
                className="w-full aspect-4/5 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-[#F7F1E7]">
                <span className="font-serif text-xl font-bold block mb-1">
                  Community First
                </span>
                <p className="text-xs text-[#E4D6C2]/90">
                  Where strangers become table companions over a game of Jenga
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-[#302019]/85 text-base sm:text-lg leading-relaxed font-normal">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302019]">
              Rooted in Coimbatore's Cafe Culture
            </h2>
            <p>
              Coimbatore has an illustrious appreciation for quality food and genuine hospitality. When Tapriwala opened its doors, local college students, entrepreneurs, and families embraced the concept wholeheartedly.
            </p>
            <p>
              We treat our menu as a love letter to Bombay street food: from the tangy garlic thecha in our Vada Pav to slow-simmered buttery Pav Bhaji. Each dish is prepared fresh on order—crisp bread straight from the griddle, chutney ground each morning, and tea brewed to your preferred sweetness.
            </p>
          </div>
        </div>

        {/* Narrative Section 3: Founder's Story & The Pushcart Heritage */}
        <div className="my-20 p-8 sm:p-12 rounded-3xl bg-[#FAF6EF] border border-[#E4D6C2] relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B95032] block mb-2">
              The Founder’s Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#302019] mb-4">
              From PSG Tech & Illinois to R.S. Puram
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#302019]/80 leading-relaxed font-normal">
              <p>
                Tapriwala was founded by <strong>Abhinav Surana</strong>. Born in Mumbai and raised in Coimbatore, Abhinav graduated in Robotics & Automation Engineering from <strong>PSG Tech, Coimbatore</strong>, followed by a postgraduate degree in Industrial Engineering from the <strong>University of Illinois at Urbana-Champaign (UIUC)</strong>.
              </p>
              <p>
                His love for the culinary craft started early—brewing tea for his grandfather as a child, and later cooking wholesome vegetarian meals for international friends while interning in Porto, Portugal. 
              </p>
              <p>
                In Tamil, <em>tapriwala</em> translates to <em>thalluvandikaran</em> (pushcart vendor). To pay authentic homage to this heritage, Abhinav installed an actual handcrafted pushcart directly inside the flagship outlet on West Lokamanya Street (D.B. Road Corner), where cutting chai is brewed fresh before your eyes.
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/menu"
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#B95032] hover:bg-[#993B22] text-[#F7F1E7] text-xs uppercase tracking-wider font-semibold rounded-md shadow-md transition-all cursor-pointer"
              >
                <span>Explore The Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
