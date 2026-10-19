import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { BoxReveal } from './BoxReveal';
import { ContourBackground } from './ContourBackground';
import { img } from '../utils/assets';

interface FannedCardItem {
  id: string;
  achievementId: string;
  title: string;
  category: string;
  year: string;
  image: string;
  baseRotate: number;
  baseTranslateY: number;
  baseTranslateX: number;
}

interface FannedSocialsArcProps {
  onSelectAchievement: (id: string) => void;
}

export const FannedSocialsArc: React.FC<FannedSocialsArcProps> = ({ onSelectAchievement }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 7 cards fanned out in an arc (Matching Reference Image 2!)
  const fannedCards: FannedCardItem[] = [
    {
      id: 'karnak',
      achievementId: 'karnak-temple',
      title: 'Hypostyle Hall',
      category: 'SANCTUARY',
      year: '1290 BCE',
      image: img('karnak_hypostyle_1790765112848'),
      baseRotate: -24,
      baseTranslateY: 48,
      baseTranslateX: -140
    },
    {
      id: 'abu-simbel',
      achievementId: 'abu-simbel',
      title: 'Colossi of Abu Simbel',
      category: 'MOUNTAIN TEMPLE',
      year: '1279 BCE',
      image: img('abu_simbel_1790764959741'),
      baseRotate: -16,
      baseTranslateY: 26,
      baseTranslateX: -85
    },
    {
      id: 'giza-pyramid',
      achievementId: 'great-pyramid',
      title: 'The Great Pyramid',
      category: 'ANCIENT WONDER',
      year: '2560 BCE',
      image: img('pyramids_cinematic_full_1790606922175'),
      baseRotate: -8,
      baseTranslateY: 10,
      baseTranslateX: -40
    },
    {
      id: 'gem-museum',
      achievementId: 'grand-egyptian-museum',
      title: 'Grand Egyptian Museum',
      category: 'MEGASTRUCTURE',
      year: '2026 CE',
      image: img('egypt_gem_museum_1790512748235'),
      baseRotate: 0,
      baseTranslateY: 0,
      baseTranslateX: 0
    },
    {
      id: 'tutankhamun',
      achievementId: 'tutankhamun-mask',
      title: 'Mask of Tutankhamun',
      category: 'ROYAL GOLD',
      year: '1323 BCE',
      image: img('tutankhamun_mask_1790764945287'),
      baseRotate: 8,
      baseTranslateY: 10,
      baseTranslateX: 40
    },
    {
      id: 'suez-canal',
      achievementId: 'new-suez-canal',
      title: 'New Suez Canal',
      category: 'MARITIME ARTERY',
      year: '2015 CE',
      image: img('suez_canal_ships_1790765066192'),
      baseRotate: 16,
      baseTranslateY: 26,
      baseTranslateX: 85
    },
    {
      id: 'iconic-tower',
      achievementId: 'new-administrative-capital',
      title: 'The Iconic Tower',
      category: 'NEW CAPITAL',
      year: '2026 CE',
      image: img('iconic_tower_capital_1790765221938'),
      baseRotate: 24,
      baseTranslateY: 48,
      baseTranslateX: 140
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#f4f4ed] text-[#111112] py-24 px-4 sm:px-8 overflow-hidden select-none border-t border-[#111112]/10 flex flex-col justify-between">
      {/* Topographic Background */}
      <ContourBackground dark={false} opacity={0.35} />

      <div className="max-w-7xl mx-auto w-full text-center relative z-20 mb-8">
        <BoxReveal isVisible={true} delay={0.1} boxColor="bg-[#111112]" duration={0.65}>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#535450] font-bold block mb-2">
            ACT IV · PERSPECTIVE ARC GALLERY
          </span>
        </BoxReveal>

        {/* Editorial Headline matching Reference Image 2 ("WHAT'S UP ON SOCIALS") */}
        <div className="flex flex-col items-center">
          <BoxReveal isVisible={true} delay={0.2} boxColor="bg-[#111112]" duration={0.7}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-syne font-black uppercase tracking-tight text-[#111112] leading-[0.9]">
              WHAT'S BEYOND
            </h2>
          </BoxReveal>
          <BoxReveal isVisible={true} delay={0.3} boxColor="bg-[#d2ff00]" duration={0.7} className="mt-1">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif italic text-[#111112] leading-[0.9]">
              THE HORIZON
            </h2>
          </BoxReveal>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-[#535450] max-w-md mx-auto leading-relaxed">
          Hover to inspect the fanned monuments across millennia. Click any card to launch its full dedicated story.
        </p>
      </div>

      {/* 3D Fanned Arc Container (Exact match to Reference Image 2 layout!) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto h-[440px] sm:h-[520px] md:h-[580px] flex items-center justify-center my-auto">
        <div className="relative w-full h-full flex items-center justify-center">
          {fannedCards.map((card, idx) => {
            const isHovered = hoveredCard === card.id;
            const isCenter = card.id === 'gem-museum';

            // Z-index calculation: center is highest, edges cascade down; hovered becomes supreme
            const zIndex = isHovered ? 40 : 20 - Math.abs(idx - 3);

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => {
                  soundManager.playHoverTick();
                  setHoveredCard(card.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  soundManager.playAchievementOpen();
                  onSelectAchievement(card.achievementId);
                }}
                initial={{
                  rotateZ: card.baseRotate,
                  y: card.baseTranslateY,
                  x: card.baseTranslateX,
                  scale: isCenter ? 1.05 : 0.95
                }}
                animate={{
                  rotateZ: isHovered ? 0 : card.baseRotate,
                  y: isHovered ? -35 : card.baseTranslateY,
                  x: isHovered ? card.baseTranslateX * 0.7 : card.baseTranslateX,
                  scale: isHovered ? 1.18 : isCenter ? 1.05 : 0.95
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 24
                }}
                style={{ zIndex }}
                className={`absolute w-[180px] sm:w-[230px] md:w-[270px] h-[290px] sm:h-[370px] md:h-[440px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-2 cursor-pointer group bg-[#111112] will-change-transform transition-all duration-300 ${
                  isHovered
                    ? 'border-[#d2ff00] shadow-[0_30px_60px_rgba(210,255,0,0.35)]'
                    : 'border-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.18)]'
                }`}
              >
                <img loading="lazy" decoding="async"
                  src={card.image}
                  alt={card.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[8px] sm:text-[9px] font-mono uppercase font-bold tracking-wider">
                    {card.category}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#d2ff00] text-[#111112] flex items-center justify-center font-bold text-[10px]">
                    𓈎
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#d2ff00] font-bold block mb-1">
                    {card.year}
                  </span>
                  <h3 className="font-syne font-black text-sm sm:text-base leading-tight">
                    {card.title}
                  </h3>

                  {/* Hover Reveal Trigger */}
                  <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold text-white/80 group-hover:text-[#d2ff00] transition-colors">
                    <span>EXPLORE ARCHIVE</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[#535450]">
        CLICK ANY PERSPECTIVE CARD TO ENTER DEDICATED ARCHIVAL EXHIBIT
      </div>
    </section>
  );
};
