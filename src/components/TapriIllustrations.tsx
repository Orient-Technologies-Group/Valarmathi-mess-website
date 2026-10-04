import React from 'react';

// Lightweight, crisp SVG motifs inspired by Indian chai stalls & cafe culture
export const KulhadIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Steam wisps */}
    <path d="M42 22c-3-6 2-12-1-18" strokeDasharray="3 2" opacity="0.7" />
    <path d="M52 24c-4-7 3-14 0-20" opacity="0.85" />
    <path d="M62 23c-3-6 2-12-1-18" strokeDasharray="3 2" opacity="0.7" />
    {/* Rim */}
    <ellipse cx="50" cy="34" rx="28" ry="6" />
    {/* Inner Chai level */}
    <ellipse cx="50" cy="36" rx="24" ry="4" strokeDasharray="2 2" opacity="0.6" />
    {/* Terracotta Body */}
    <path d="M23 35c2 24 9 52 14 65h26c5-13 12-41 14-65" />
    {/* Base rim */}
    <ellipse cx="50" cy="100" rx="14" ry="3.5" />
    {/* Traditional wheel etched rings */}
    <path d="M29 55c6 3 14 4.5 21 4.5s15-1.5 21-4.5" opacity="0.4" />
    <path d="M33 72c5 2.5 11 3.5 17 3.5s12-1 17-3.5" opacity="0.4" />
  </svg>
);

export const KettleIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 140 130"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Traditional Top Handle */}
    <path d="M45 42C45 16 95 16 95 42" strokeWidth="2.2" />
    <path d="M62 20h16" strokeWidth="2.8" />
    {/* Lid Knob & Lid */}
    <circle cx="70" cy="38" r="3.5" />
    <ellipse cx="70" cy="44" rx="20" ry="4.5" />
    {/* Body */}
    <path d="M50 44c-18 6-25 24-25 44 0 20 18 28 45 28s45-8 45-28c0-20-7-38-25-44" />
    {/* Base */}
    <ellipse cx="70" cy="116" rx="28" ry="4.5" />
    {/* Spout on Left */}
    <path d="M30 65c-15-4-24 6-22 26 5 2 12-1 17-10" />
    <path d="M12 73c-2-6 3-10 8-8" />
    {/* Subtle heat badge line */}
    <path d="M44 88c8 4 17 6 26 6s18-2 26-6" opacity="0.35" />
  </svg>
);

export const BotanicalBotanicsIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Mint stem & leaves */}
    <path d="M60 110C60 70 75 40 95 20" />
    {/* Mint Leaf Top */}
    <path d="M95 20c-12 0-22 10-18 24 14 0 22-10 18-24z" />
    {/* Mint Leaf Left */}
    <path d="M72 50c-14-3-22 6-18 18 13 1 20-7 18-18z" />
    {/* Cardamom pod 1 */}
    <path d="M35 85c-12-8-12-22 0-30 12 8 12 22 0 30z" />
    <path d="M35 55v30" opacity="0.4" strokeDasharray="2 2" />
    {/* Cardamom pod 2 bruised */}
    <path d="M48 95c-10-6-10-18 0-24 10 6 10 18 0 24z" />
    {/* Fresh Ginger root knot outline */}
    <path d="M20 30c6-6 16-2 18 8 2 10 12 12 12 20-5 6-14 4-18-2-4-6-16-2-16-12 0-8 2-12 4-14z" opacity="0.5" />
  </svg>
);

export const CanopyStallIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 140 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Awning Scallops */}
    <path d="M10 35 Q25 20 40 35 Q55 20 70 35 Q85 20 100 35 Q115 20 130 35" />
    <path d="M10 35v12 Q25 55 40 47 Q55 55 70 47 Q85 55 100 47 Q115 55 130 47v-12" />
    {/* Slanted awning frame */}
    <line x1="10" y1="35" x2="35" y2="10" />
    <line x1="40" y1="35" x2="55" y2="10" />
    <line x1="70" y1="35" x2="70" y2="10" />
    <line x1="100" y1="35" x2="85" y2="10" />
    <line x1="130" y1="35" x2="105" y2="10" />
    <line x1="35" y1="10" x2="105" y2="10" />
    {/* Stall support posts */}
    <line x1="18" y1="47" x2="18" y2="90" strokeDasharray="3 3" opacity="0.4" />
    <line x1="122" y1="47" x2="122" y2="90" strokeDasharray="3 3" opacity="0.4" />
  </svg>
);

export const StreetPlateIllustration: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 120 70"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Outer saucer ellipse */}
    <ellipse cx="60" cy="35" rx="52" ry="24" />
    {/* Inner plate depression */}
    <ellipse cx="60" cy="36" rx="38" ry="16" strokeDasharray="3 2" opacity="0.5" />
    {/* Base rim */}
    <ellipse cx="60" cy="45" rx="30" ry="12" opacity="0.3" />
  </svg>
);

export const ChaiSealStamp: React.FC<{ className?: string }> = ({ className = 'w-28 h-28' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric circular borders */}
    <circle cx="60" cy="60" r="54" strokeDasharray="4 2" />
    <circle cx="60" cy="60" r="48" />
    <circle cx="60" cy="60" r="36" strokeDasharray="2 2" opacity="0.6" />
    
    {/* Center Kulhad Silhouette */}
    <path
      d="M48 52h24l-3 24h-18l-3-24z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M52 46c-1-3 1-5 0-8M60 45c-1-3 1-5 0-8M68 46c-1-3 1-5 0-8" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Subtle Star details */}
    <circle cx="34" cy="60" r="1.5" fill="currentColor" />
    <circle cx="86" cy="60" r="1.5" fill="currentColor" />
  </svg>
);
