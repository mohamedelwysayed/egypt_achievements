import React from 'react';
import { useLang } from '../i18n';
import { ArrowUpRight, Eye } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { ContourBackground } from './ContourBackground';
import { BoxReveal } from './BoxReveal';
import { TiltCard } from './TiltCard';
import { Magnetic } from './Magnetic';
import { img } from '../utils/assets';

interface MonumentsShowcaseProps {
  onSelectAchievement: (achievementId: string) => void;
}

export const MonumentsShowcase: React.FC<MonumentsShowcaseProps> = ({
  onSelectAchievement
}) => {
  const { tr, lang } = useLang(); void lang;
  return (
    <section className="relative w-full min-h-screen bg-[#efefe5] text-[#111112] py-24 px-6 sm:px-12 flex items-center justify-center overflow-hidden border-t border-[#111112]/10 select-none">
      {/* Topographic Contour Lines */}
      <ContourBackground dark={false} opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Stacked Monumental Typography */}
        <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-8">
          <BoxReveal isVisible={true} delay={0.05} boxColor="bg-[#111112]" duration={0.6}>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#535450] font-bold block mb-3">
              {tr("ACT VI · ETERNAL ARCHIVAL INDEX")}
            </span>
          </BoxReveal>

          {/* Monumental Headline Stack with BoxReveal */}
          <div className="flex flex-col mb-6">
            <BoxReveal isVisible={true} delay={0.12} boxColor="bg-[#111112]" duration={0.7} textOffset={-24}>
              <h2 className="font-syne font-black uppercase tracking-tight text-[#111112] text-5xl sm:text-6xl md:text-7xl leading-[0.88]">
                {tr("SEVEN")}
              </h2>
            </BoxReveal>
            <BoxReveal isVisible={true} delay={0.22} boxColor="bg-[#111112]" duration={0.7} textOffset={24}>
              <h2 className="font-syne font-black uppercase tracking-tight text-[#111112] text-5xl sm:text-6xl md:text-7xl leading-[0.88]">
                {tr("MILLENNIA")}
              </h2>
            </BoxReveal>
            <BoxReveal isVisible={true} delay={0.32} boxColor="bg-[#d2ff00]" duration={0.7} textOffset={-20}>
              <h2 className="font-serif italic font-normal tracking-normal text-[#2b2d24] text-5xl sm:text-6xl md:text-7xl leading-[0.88]">
                {tr("SOVEREIGN")}
              </h2>
            </BoxReveal>
          </div>

          <p className="text-base sm:text-lg text-[#3d3e3a] font-sans leading-relaxed max-w-lg mb-8">
            {tr("Celebrate this monumental lineage designed by kings, builders, and scholars who never stopped creating. Each achievement is preserved with its own dedicated historical story.")}
          </p>

          <p className="text-base sm:text-lg text-[#3d3e3a] font-sans leading-relaxed max-w-lg mb-8">
            {tr("From the first unification under Narmer to the New Administrative Capital, every story opens with a cinematic scene, key numbers, chapters, and a closing reflection on why it still matters today.")}
          </p>

          {/* Electric Lime Button with Magnetic Pull */}
          <Magnetic strength={0.3}>
            <button
              onClick={() => {
                soundManager.playAchievementOpen();
                onSelectAchievement('grand-egyptian-museum');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#d2ff00] text-[#111112] font-mono text-xs uppercase font-extrabold tracking-wider hover:bg-[#111112] hover:text-[#d2ff00] transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
            >
              <span>{tr("LAUNCH GRAND EXHIBIT")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Magnetic>
        </div>

        {/* Right Column: Overlapping Editorial Display Cards with 3D Tilt */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px]">
          {/* Main Central Card: Grand Egyptian Museum Modern Facade */}
          <TiltCard
            maxTilt={6}
            onClick={() => {
              soundManager.playAchievementOpen();
              onSelectAchievement('grand-egyptian-museum');
            }}
            className="relative z-10 w-[260px] sm:w-[320px] h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-[#111112]/15 bg-white shadow-2xl cursor-pointer group"
          >
            <img loading="lazy" decoding="async"
              src={img('egypt_gem_museum_1790512748235')}
              alt="Grand Egyptian Museum"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#d2ff00] font-bold block mb-1">
                {tr("2026 CE · MEGASTRUCTURE")}
              </span>
              <span className="text-base sm:text-lg font-syne font-bold block leading-tight">
                {tr("Grand Egyptian Museum")}
              </span>
              <div className="mt-2 flex items-center gap-1 text-[10px] font-mono uppercase text-white/80 group-hover:text-[#d2ff00] transition-colors">
                <Eye className="w-3.5 h-3.5" />
                <span>{tr("OPEN DEDICATED STORY")}</span>
              </div>
            </div>
          </TiltCard>

          {/* Top-Right Golden Relief Card */}
          <div className="absolute top-0 right-2 sm:right-6 z-20">
            <TiltCard
              maxTilt={8}
              onClick={() => {
                soundManager.playAchievementOpen();
                onSelectAchievement('tutankhamun-mask');
              }}
              className="w-[160px] sm:w-[200px] h-[130px] sm:h-[160px] rounded-xl overflow-hidden border border-[#d4af37]/40 bg-[#d4af37] shadow-xl cursor-pointer group"
            >
              <img loading="lazy" decoding="async"
                src={img('egypt_gold_cartouche_1790512762879')}
                alt="Gold Cartouche"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                <span className="text-[8px] font-mono uppercase tracking-widest text-amber-200 font-bold block">
                  {tr("ROYAL GOLD RELIC")}
                </span>
                <span className="text-xs font-syne font-bold text-white leading-tight">
                  {tr("Golden Mask")}
                </span>
              </div>
            </TiltCard>
          </div>

          {/* Bottom-Left Overlapping Pyramids Card */}
          <div className="absolute bottom-0 left-0 sm:left-4 z-20">
            <TiltCard
              maxTilt={8}
              onClick={() => {
                soundManager.playAchievementOpen();
                onSelectAchievement('great-pyramid');
              }}
              className="w-[170px] sm:w-[210px] h-[140px] sm:h-[170px] rounded-xl overflow-hidden border border-[#111112]/20 bg-[#1c1d18] shadow-xl cursor-pointer group"
            >
              <img loading="lazy" decoding="async"
                src={img('egypt_giza_pyramids_1790512734462')}
                alt="Giza Pyramids"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#d2ff00] font-bold block">
                  {tr("2560 BCE · GIZA")}
                </span>
                <span className="text-xs font-syne font-bold text-white leading-tight">
                  {tr("The Great Pyramid")}
                </span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
