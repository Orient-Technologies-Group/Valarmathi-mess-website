import React from 'react';
import { Sparkles, Calendar, Heart, Shield, CheckCircle2 } from 'lucide-react';
import { RestaurantInfo } from '../../../shared/types.js';

interface StoryPageProps {
  info: RestaurantInfo | null;
  onNavigate: (route: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ info, onNavigate }) => {
  return (
    <div className="py-12 lg:py-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-[#C8861B] uppercase mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Since 1986 in Coimbatore</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4F131C] tracking-tight">
            Our Story & Heritage
          </h1>
          <div className="font-tamil text-xl text-[#C8861B] font-semibold mt-1">
            எங்கள் பாரம்பரியம்
          </div>
          <p className="text-base sm:text-lg text-[#554E48] font-light mt-4 leading-relaxed">
            Native. Natural. Regional. Operating at CSI Compound, Race Course since 1986, Valarmathi Mess has
            remained steadfast in its pursuit of genuine Kongunadu flavours.
          </p>
        </div>

        {/* Hero Image Composition */}
        <div className="mb-16 rounded overflow-hidden border border-[#6B1D28]/15 shadow-xl bg-[#E8E1D5]">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Valarmathi Mess Coimbatore heritage and dining atmosphere"
            className="w-full h-80 sm:h-[440px] object-cover"
          />
        </div>

        {/* Section 1: Heritage Text (Editable Area) */}
        <section className="mb-16 bg-[#F4EFE7] p-8 sm:p-12 rounded border border-[#6B1D28]/15">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-[#C8861B]">
              <span className="w-8 h-[1.5px] bg-[#C8861B]" />
              <span>Heritage Overview (1986)</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4F131C]">
              Four Decades on Race Course
            </h2>

            <p className="text-base text-[#554E48] font-light leading-relaxed">
              When Valarmathi Mess began in 1986, the vision was clear and grounded: to offer the people of
              Coimbatore genuine home-cooked food reflective of the agrarian roots of the Kongu territory.
              Over the years, while the city transformed into an industrial and textile power, Valarmathi Mess
              retained its soul as an authentic neighbourhood mess.
            </p>

            <p className="text-base text-[#554E48] font-light leading-relaxed">
              We have consciously resisted corporate trends, artificial taste enhancers, and commercial shortcuts.
              Every batch of meat and poultry is butchered fresh every morning, and the gravies are made in small,
              vigilantly watched kettles.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs text-[#7A736C]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified historical milestone: Continuously active at Race Course, Coimbatore since 1986.</span>
            </div>
          </div>
        </section>

        {/* Section 2: Restaurant Philosophy */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#C8861B] uppercase">
                Ethos & Hospitality
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#4F131C]">
                The Banana Leaf Ethos
              </h2>
              <p className="text-sm text-[#554E48] font-light leading-relaxed">
                Serving food on a freshly cut green banana leaf is not a quaint novelty for us — it is an integral
                culinary philosophy. Hot steaming rice reacts with the natural polyphenols of the plantain leaf,
                imparting a subtle grassy aroma and aiding healthy digestion.
              </p>
              <p className="text-sm text-[#554E48] font-light leading-relaxed">
                In our dining room, everyone eats with their hands, relishing the textural intimacy of food.
                Generosity is our standard: our servers walk the rows with piping hot rasam, sambar, and meat
                gravies, ensuring no leaf remains empty.
              </p>
            </div>

            <div className="rounded overflow-hidden border border-[#6B1D28]/15 shadow-lg bg-[#E8E1D5]">
              <img
                src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"
                alt="Traditional Banana Leaf meals at Valarmathi Mess"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Cooking Philosophy */}
        <section className="mb-16 bg-[#FAF7F2] p-8 sm:p-12 rounded border border-[#6B1D28]/15 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#C8861B] uppercase">
              In The Kitchen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4F131C]">
              Cooking Philosophy: Respecting the Ingredients
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded bg-[#F4EFE7] border border-[#6B1D28]/10 space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#4F131C]">1. Chinna Vengayam</h4>
                <p className="text-xs text-[#554E48] font-light leading-relaxed">
                  We use native small onions exclusively. They yield a mellow, natural sweetness that complements
                  fresh Tellicherry black pepper.
                </p>
              </div>

              <div className="p-4 rounded bg-[#F4EFE7] border border-[#6B1D28]/10 space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#4F131C]">2. Cold-Pressed Oils</h4>
                <p className="text-xs text-[#554E48] font-light leading-relaxed">
                  Traditional gingelly (sesame) oil and country churned cow ghee are our primary cooking fats,
                  providing distinct regional depth.
                </p>
              </div>

              <div className="p-4 rounded bg-[#F4EFE7] border border-[#6B1D28]/10 space-y-2">
                <h4 className="font-serif text-lg font-bold text-[#4F131C]">3. Whole Roasting</h4>
                <p className="text-xs text-[#554E48] font-light leading-relaxed">
                  Whole spices are roasted dry or in small quantities of oil before grinding. Zero artificial food
                  colors or chemical tenderizers are ever permitted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <div className="text-center pt-4">
          <button
            onClick={() => {
              onNavigate('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded bg-[#4F131C] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#6B1D28] shadow transition-all"
          >
            Explore the Recipes
          </button>
        </div>
      </div>
    </div>
  );
};
