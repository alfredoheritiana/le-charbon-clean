import React from 'react';
import { Locale } from '../data/content';
import { ASSET_MAP } from '../data/mediaManifest';
import { Heart, MessageCircle, Send, Bookmark, Play } from 'lucide-react';

export interface InstagramPostData {
  id: string;
  conceptName: string;
  displayName: string;
  handle: string;
  avatarUrl: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  posterUrl?: string;
  hasPlayableVideo?: boolean;
  location: {
    fr: string;
    en: string;
  };
  caption: {
    fr: string;
    en: string;
  };
  hashtags: string[];
  verifiedProfileUrl?: string;
  verifiedPostUrl?: string;
  isPreview: boolean;
}

interface InstagramPreviewCardProps {
  post: InstagramPostData;
  locale: Locale;
  className?: string;
  style?: React.CSSProperties;
}

export const InstagramPreviewCard: React.FC<InstagramPreviewCardProps> = ({
  post,
  locale,
  className = '',
  style,
}) => {
  const isFr = locale === 'fr';

  const viewProfileText = isFr ? 'Voir le profil' : 'View profile';
  const viewOnInstagramText = isFr ? 'Voir plus sur Instagram' : 'View on Instagram';
  const previewTagText = isFr ? 'Aperçu éditorial' : 'Editorial preview';

  return (
    <article
      style={style}
      className={`group relative bg-white text-[#262626] rounded-2xl border border-[#DBDBDB] shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-[#0095F6] w-full max-w-[340px] mx-auto select-none ${className}`}
    >
      {/* ============================================================ */}
      {/* 1. INSTAGRAM-STYLE HEADER                                    */}
      {/* ============================================================ */}
      <header className="flex items-center justify-between p-3.5 border-b border-[#EFEFEF] bg-white z-10">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Circular avatar with Instagram gradient ring */}
          <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shrink-0">
            <div className="w-full h-full rounded-full bg-white p-[1.5px] overflow-hidden">
              <img
                src={post.avatarUrl || ASSET_MAP.LOGO_WITH_BG}
                alt={post.displayName}
                className="w-full h-full object-cover rounded-full bg-[#0B0B0B]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Account name & location/metadata */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-bold text-xs sm:text-[13px] text-[#262626] tracking-tight truncate">
                {post.displayName}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#737373] font-sans truncate">
              {post.location[locale]}
            </span>
          </div>
        </div>

        {/* View profile action */}
        {post.verifiedProfileUrl ? (
          <a
            href={post.verifiedProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#0095F6] hover:text-[#00376B] transition-colors shrink-0 px-1 py-1 focus-visible:outline-none focus-visible:underline"
          >
            {viewProfileText}
          </a>
        ) : (
          <span
            className="text-[11px] font-medium text-[#0095F6] shrink-0 px-1 py-0.5"
            title={isFr ? 'Compte officiel en cours de raccordement' : 'Official profile preview'}
          >
            {viewProfileText}
          </span>
        )}
      </header>

      {/* ============================================================ */}
      {/* 2. LARGE MEDIA REGION (4:5 VERTICAL COMPOSITION)             */}
      {/* ============================================================ */}
      <div className="relative aspect-4/5 w-full bg-[#0B0B0B] overflow-hidden">
        <img
          src={post.mediaUrl}
          alt={post.caption[locale]}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] will-change-transform"
          loading="lazy"
        />

        {/* Play button overlay: ONLY present if real playable video is configured */}
        {post.mediaType === 'video' && post.hasPlayableVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Subtle concept preview pill in top corner */}
        {post.isPreview && (
          <div className="absolute top-2.5 right-2.5 pointer-events-none">
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono-pp uppercase tracking-wider text-white/90 border border-white/10">
              {previewTagText}
            </span>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. INSTAGRAM-STYLE FOOTER & ACTION BAR                       */}
      {/* ============================================================ */}
      <footer className="p-3.5 bg-white flex flex-col gap-2.5 border-t border-[#F2F2F2]">
        {/* Familiar Instagram icon row (decorative icons, not misleading clickable controls) */}
        <div className="flex items-center justify-between text-[#262626]" aria-hidden="true">
          <div className="flex items-center gap-4">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] hover:text-[#ED4956] transition-colors cursor-default" />
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] hover:text-[#737373] transition-colors cursor-default" />
            <Send className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] hover:text-[#737373] transition-colors cursor-default" />
          </div>
          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] hover:text-[#737373] transition-colors cursor-default" />
        </div>

        {/* Caption text */}
        <div className="text-[12px] sm:text-[13px] leading-relaxed text-[#262626] font-sans">
          <span className="font-bold mr-1.5 text-[#121212]">
            {post.handle}
          </span>
          <span className="text-[#333333]">
            {post.caption[locale]}
          </span>
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="mt-1 text-[#00376B] text-[11px] font-normal flex flex-wrap gap-1">
              {post.hashtags.map((tag, i) => (
                <span key={i} className="hover:underline">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* View on Instagram link / preview note */}
        <div className="pt-2 border-t border-[#EFEFEF] flex items-center justify-between text-[11px]">
          {post.verifiedPostUrl ? (
            <a
              href={post.verifiedPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0095F6] hover:text-[#00376B] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {viewOnInstagramText} →
            </a>
          ) : (
            <span className="text-[#8E8E8E] font-medium">
              {viewOnInstagramText}
            </span>
          )}

          <span className="text-[10px] text-[#A8A8A8] font-mono-pp uppercase tracking-wider">
            {post.conceptName}
          </span>
        </div>
      </footer>
    </article>
  );
};
