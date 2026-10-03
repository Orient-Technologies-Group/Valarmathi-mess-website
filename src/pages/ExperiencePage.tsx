import React, { useState, useEffect } from 'react';
import { Gamepad2, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ScrollReveal';

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: 'Ambiance' | 'Games' | 'Food' | 'Outlets';
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    src: '/images/cafe-ambience.jpg',
    title: 'The Flagship Lounge',
    caption: 'Friends enjoying evening chai and Jenga at our R.S. Puram cafe.',
    tag: 'Games'
  },
  {
    id: 'g2',
    src: '/images/swiggy_rspuram.jpg',
    title: 'R.S. Puram Corner View',
    caption: 'Diwan Bahadur (DB) Road corner location with warm outdoor and indoor seating.',
    tag: 'Outlets'
  },
  {
    id: 'g3',
    src: '/images/kulhad-chai.jpg',
    title: 'Signature Kulhad Brew',
    caption: 'Earthy clay kulhads filled with Assam tea, fresh ginger, and mint.',
    tag: 'Food'
  },
  {
    id: 'g4',
    src: '/images/cold-cocoa.jpg',
    title: 'Surat Special Cold Cocoa',
    caption: 'Ultra-thick chilled chocolate ganache crowned with dark chocolate curls.',
    tag: 'Food'
  },
  {
    id: 'g5',
    src: '/images/real/real_dineout_ambience1.jpg',
    title: 'Cozy Table Nooks',
    caption: 'Intimate seating corners ideal for reading, studying, or relaxed chatter.',
    tag: 'Ambiance'
  },
  {
    id: 'g6',
    src: '/images/bombay-toast.jpg',
    title: 'Toasted Street Treats',
    caption: 'Golden Bombay Masala Toast served hot with tangy chutneys and sev.',
    tag: 'Food'
  },
  {
    id: 'g7',
    src: '/images/real/real_dineout_ambience2.jpg',
    title: 'Wooden Benches & Warm Tones',
    caption: 'Warm incandescent pendant lighting and earthy terracotta tones.',
    tag: 'Ambiance'
  },
  {
    id: 'g8',
    src: '/images/swiggy_saibaba.jpg',
    title: 'Saibaba Colony Outlet',
    caption: 'Our lively neighborhood cafe on Alagesan Road.',
    tag: 'Outlets'
  }
];

export const ExperiencePage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<'All' | 'Ambiance' | 'Games' | 'Food' | 'Outlets'>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPhotos = selectedTag === 'All' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(p => p.tag === selectedTag);

  return (
    <div className="pt-24 pb-20 bg-dark-grain text-[#F7F1E7] min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fade-down" delay={0.1} className="py-12 border-b border-[#E4D6C2]/15 mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-[#D49A3D] mb-3">
            <span className="w-6 h-[1px] bg-[#D49A3D]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">
              The Cafe Culture
            </span>
            <span className="w-6 h-[1px] bg-[#D49A3D]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F7F1E7] mb-6">
            Some conversations need{' '}
            <span className="italic font-normal text-[#D49A3D]">
              a second cup.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#E4D6C2]/80 leading-relaxed">
            Board games on the tables, warm ambient lighting, mellow acoustic playlists, and an unspoken rule that no one ever rushes you out.
          </p>
        </ScrollReveal>

        {/* Board Games Feature Section with ScrollReveal */}
        <ScrollReveal animation="zoom-in" delay={0.2} className="p-8 sm:p-12 rounded-3xl bg-[#3D2920]/80 border border-[#E4D6C2]/20 mb-20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D49A3D]/20 text-[#D49A3D] text-xs font-semibold">
                <Gamepad2 className="w-4 h-4" />
                <span>Complimentary Games at R.S. Puram</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F1E7]">
                Unplug. Pick a Game. Order a Chai.
              </h2>
              
              <p className="text-sm sm:text-base text-[#E4D6C2]/85 leading-relaxed font-normal">
                At our R.S. Puram flagship, every table is an invitation to play. We have curated a board games library featuring <strong>Jenga, Scrabble, Uno, Chess, and Monopoly</strong>. Whether you are settling who pays for the next round of Vada Pav or spending an easy Sunday evening, games are free for all guests.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['Jenga Tower', 'Classic Uno', 'Scrabble', 'Chess', 'Monopoly'].map((game) => (
                  <span key={game} className="px-3 py-1.5 rounded-lg bg-[#FAF6EF]/10 border border-[#E4D6C2]/20 text-xs font-semibold text-[#F7F1E7]">
                    🎲 {game}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden border-2 border-[#E4D6C2]/20 shadow-xl aspect-4/3 group"
              >
                <img
                  src="/images/cafe-ambience.jpg"
                  alt="Jenga game on table at Tapriwala"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Filterable Photo Lightbox Gallery */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <ScrollReveal animation="fade-right" delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F1E7]">
                Atmosphere & Moments Gallery
              </h2>
            </ScrollReveal>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1" role="tablist">
              {(['All', 'Games', 'Ambiance', 'Food', 'Outlets'] as const).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#B95032] text-[#F7F1E7]'
                      : 'bg-[#FAF6EF]/10 text-[#E4D6C2]/70 hover:text-[#F7F1E7] hover:bg-[#FAF6EF]/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid with Stagger */}
          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredPhotos.map((photo) => (
              <StaggerItem key={photo.id} animation="fade-up">
                <motion.div
                  whileHover={{ y: -6, borderColor: '#D49A3D' }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setLightboxPhoto(photo)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-[#3D2920] border border-[#E4D6C2]/15 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between h-full"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-black/40">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#302019]/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="absolute top-3 left-3 bg-[#302019]/80 backdrop-blur-xs px-2.5 py-0.5 rounded text-[10px] font-semibold text-[#D49A3D] border border-white/10">
                      {photo.tag}
                    </div>

                    <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-[#FAF6EF]/80 text-[#302019] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-serif font-bold text-base text-[#F7F1E7] mb-1 group-hover:text-[#D49A3D] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#E4D6C2]/70 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>

      {/* Lightbox Dialog */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setLightboxPhoto(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-[#302019] rounded-2xl overflow-hidden border border-[#E4D6C2]/30 shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#302019]/80 text-[#F7F1E7] hover:bg-[#B95032] transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-16/10 rounded-xl overflow-hidden">
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 text-xs text-[#D49A3D] font-bold uppercase tracking-wider mb-1">
                  <span>{lightboxPhoto.tag}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#F7F1E7] mb-2">
                  {lightboxPhoto.title}
                </h3>
                <p className="text-sm text-[#E4D6C2]/80 leading-relaxed">
                  {lightboxPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
