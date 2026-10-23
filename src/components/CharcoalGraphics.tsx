import React from 'react';

/**
 * Le Charbon official brand badges and ember graphics.
 * Built with rich SVG gradients, ember glows, and distinctive premium craftsmanship styling.
 */

/**
 * Circular Brand Badge: Charcoal & Braise Craft Seal
 */
export const CharcoalCraftBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 110,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-label="Le Charbon Craft Badge"
  >
    <defs>
      <path id="circlePathCraft" d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
      <radialGradient id="badgeCraftDark" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#2A1C14" />
        <stop offset="60%" stopColor="#141414" />
        <stop offset="100%" stopColor="#0B0B0B" />
      </radialGradient>
      <radialGradient id="craftEmber" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F2A34A" />
        <stop offset="60%" stopColor="#E57A2E" />
        <stop offset="100%" stopColor="#C6401C" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#badgeCraftDark)" stroke="#E57A2E" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="50" stroke="#F2A34A" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

    <text fill="#F3EDE2" fontSize="7.8" fontWeight="700" letterSpacing="2" textAnchor="middle">
      <textPath href="#circlePathCraft" startOffset="50%">
        ★ LE CHARBON ★ FEU & BRAISE
      </textPath>
    </text>

    {/* Center Flame Icon */}
    <g transform="translate(42, 42)">
      <path
        d="M18 4 C 18 10, 10 14, 10 22 C 10 28, 14 32, 18 32 C 22 32, 26 28, 26 22 C 26 14, 22 10, 18 4 Z"
        fill="url(#craftEmber)"
      />
      <path
        d="M18 14 C 18 18, 14 20, 14 25 C 14 28, 16 30, 18 30 C 20 30, 22 28, 22 25 C 22 20, 20 18, 18 14 Z"
        fill="#F2A34A"
      />
      <path
        d="M18 22 C 18 24, 16 25, 16 27 C 16 29, 17 30, 18 30 C 19 30, 20 29, 20 27 C 20 25, 19 24, 18 22 Z"
        fill="#FFF7E3"
      />
    </g>
  </svg>
);

/**
 * Circular Brand Badge 1: Wagyu Signature
 */
export const WagyuSignatureBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 110,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <defs>
      <path id="circlePathWagyu" d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
      <radialGradient id="badgeGold" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#1E1914" />
        <stop offset="100%" stopColor="#0B0B0B" />
      </radialGradient>
    </defs>
    {/* Outer Ring */}
    <circle cx="60" cy="60" r="56" fill="url(#badgeGold)" stroke="#F2A34A" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="50" stroke="#C6401C" strokeWidth="1" strokeDasharray="3 3" />

    {/* Rotating Curved Text */}
    <text fill="#F3EDE2" fontSize="8.2" fontWeight="700" letterSpacing="2.2" textAnchor="middle">
      <textPath href="#circlePathWagyu" startOffset="50%">
        ★ LE CHARBON ★ WAGYU NOIRE
      </textPath>
    </text>

    {/* Center Emblem */}
    <circle cx="60" cy="60" r="28" fill="#161616" stroke="#F2A34A" strokeWidth="1.5" />
    <text x="60" y="56" fill="#F2A34A" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="1">
      SIGNATURE
    </text>
    <text x="60" y="70" fill="#F3EDE2" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="0.5">
      835 MUR
    </text>
  </svg>
);

/**
 * Circular Brand Badge 2: Fire & Charcoal Grilled
 */
export const CharcoalFireBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 110,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <defs>
      <path id="circlePathFire" d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
      <radialGradient id="badgeFire" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#2A1810" />
        <stop offset="100%" stopColor="#0B0B0B" />
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#badgeFire)" stroke="#E57A2E" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="50" stroke="#E57A2E" strokeWidth="1" opacity="0.4" />

    <text fill="#F3EDE2" fontSize="8" fontWeight="700" letterSpacing="2.5" textAnchor="middle">
      <textPath href="#circlePathFire" startOffset="50%">
        • CUISSON À LA BRAISE • BURGERS
      </textPath>
    </text>

    {/* Flame Icon */}
    <g transform="translate(42, 42)">
      <path
        d="M18 4 C 18 10, 10 14, 10 22 C 10 28, 14 32, 18 32 C 22 32, 26 28, 26 22 C 26 14, 22 10, 18 4 Z"
        fill="#E57A2E"
      />
      <path
        d="M18 14 C 18 18, 14 20, 14 25 C 14 28, 16 30, 18 30 C 20 30, 22 28, 22 25 C 22 20, 20 18, 18 14 Z"
        fill="#F2A34A"
      />
      <path
        d="M18 22 C 18 24, 16 25, 16 27 C 16 29, 17 30, 18 30 C 19 30, 20 29, 20 27 C 20 25, 19 24, 18 22 Z"
        fill="#FFF7E3"
      />
    </g>
  </svg>
);

/**
 * Circular Brand Badge 3: Crispers Fries Badge
 */
export const CrispersBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 110,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <defs>
      <path id="circlePathCrispers" d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
    </defs>
    <circle cx="60" cy="60" r="56" fill="#161616" stroke="#F2A34A" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="50" stroke="#2A2A2A" strokeWidth="1" />

    <text fill="#F3EDE2" fontSize="8" fontWeight="700" letterSpacing="2.2" textAnchor="middle">
      <textPath href="#circlePathCrispers" startOffset="50%">
        ★ CRISPERS FRIES ★ 100 MUR
      </textPath>
    </text>

    <text x="60" y="58" fill="#F2A34A" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1">
      GOLDEN
    </text>
    <text x="60" y="72" fill="#F3EDE2" fontSize="9" fontWeight="700" textAnchor="middle" letterSpacing="1.5">
      CRISP
    </text>
  </svg>
);

/**
 * Charcoal Texture Pattern Tile SVG Data URL generator / Background overlay
 */
export const CharcoalTextureOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      opacity,
      backgroundImage: `radial-gradient(#F2A34A 0.75px, transparent 0.75px), radial-gradient(#C6401C 0.75px, #0B0B0B 0.75px)`,
      backgroundSize: '30px 30px',
      backgroundPosition: '0 0, 15px 15px',
    }}
  />
);
