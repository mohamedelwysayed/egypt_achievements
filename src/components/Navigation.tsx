import React, { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ArrowUpRight, Compass, Shield, History, Globe, Sparkles, Landmark } from 'lucide-react';
import { useMagnetic, useRipple, RippleItem } from '../utils/animationEffects';
import { soundManager } from '../utils/soundEffects';
import { startScroll, stopScroll } from '../utils/smoothScroll';
import { thumbOf } from '../utils/assets';

import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { ACH_AR } from '../data/achievementsAr';

interface NavigationProps {
  currentSection: string;
  isAudioActive: boolean;
  onToggleAudio: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectAchievement?: (achievementId: string) => void;
  scrollProgress?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  isAudioActive,
  onToggleAudio,
  onNavigateSection,
  onSelectAchievement,
  scrollProgress = 0
}) => {
  const { tr, lang } = useLang(); void lang;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTab, setMenuTab] = useState<'sections' | 'achievements'>('sections');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [dockHoveredIndex, setDockHoveredIndex] = useState<number | null>(null);

  // 28. Magnetic buttons (#28)
  const magneticBrand = useMagnetic(0.2);
  const magneticArchive = useMagnetic(0.3);
  const magneticMenu = useMagnetic(0.3);
  const magneticAudio = useMagnetic(0.3);

  // 48. Ripple click effect (#48)
  const { ripples, addRipple } = useRipple();

  // Navigation Links
  const navLinks = [
    { id: 'hero', label: tr("01. Horizon"), icon: Compass },
    { id: 'marquee', label: tr("02. Message"), icon: Globe },
    { id: 'dialogue', label: tr("03. Continuum"), icon: Shield },
    { id: 'timeline', label: tr("04. Timeline"), icon: History },
    { id: 'arc', label: tr("05. Initiatives"), icon: Sparkles },
    { id: 'pyramids', label: tr("06. Pyramids"), icon: Landmark }
  ];

  // While the drawer is open the page behind it must not scroll; Escape closes it
  useEffect(() => {
    if (!menuOpen) return;
    stopScroll('nav-drawer');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      startScroll('nav-drawer');
    };
  }, [menuOpen]);

  // 47. Dock-style hover magnification items (#47)
  const dockIcons = [
    { id: 'hero', glyph: '𓈎', label: tr("Genesis") },
    { id: 'marquee', glyph: '𓅓', label: tr("Message") },
    { id: 'dialogue', glyph: '𓏏', label: tr("Continuum") },
    { id: 'timeline', glyph: '𓊖', label: tr("Timeline") },
    { id: 'monuments', glyph: '𓋹', label: tr("Monuments") }
  ];

  // 36. Morphing navbar + 38. Shrinking navbar on scroll + 39. Transparent-to-solid + 40. Blur effect (#36, #37, #38, #39, #40)
  const isScrolled = scrollProgress > 0.08;

  const handleLinkClick = (id: string, e: React.MouseEvent<HTMLElement>) => {
    addRipple(e);
    soundManager.playChime(420, 0.2);
    // 49. Active page transition (#49)
    onNavigateSection(id);
    setMenuOpen(false);
  };

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      (ACH_AR[a.id]?.title ?? '').includes(q) ||
      a.year.toLowerCase().includes(q) ||
      a.era.toLowerCase().includes(q) ||
      a.dynastyOrLeader.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* 37. Floating navbar (#37) */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] pointer-events-none transition-all duration-500 ease-out ${
          isScrolled ? 'py-2.5 px-4 sm:px-8' : 'py-5 px-6 sm:px-10'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-2xl ${
            isScrolled
              ? 'bg-[#f4f4ed]/85 backdrop-blur-md shadow-lg border border-[#111112]/15 px-4 py-2'
              : 'bg-transparent px-0 py-0'
          }`}
        >
          {/* Left Brand Lockup with Magnetic Physics (#28) & Hover Lift (#29) */}
          <div
            ref={magneticBrand.ref}
            onMouseMove={magneticBrand.handleMouseMove}
            onMouseLeave={magneticBrand.handleMouseLeave}
            style={{
              transform: `translate(${magneticBrand.position.x}px, ${magneticBrand.position.y}px)`
            }}
            className="transition-transform duration-150 ease-out"
          >
            <button
              onClick={(e) => handleLinkClick('hero', e)}
              className="flex flex-col text-left text-[#111112] hover:-translate-y-0.5 transition-all cursor-pointer select-none group relative overflow-hidden p-1 rounded"
            >
              {/* Ripple elements (#48) */}
              {ripples.map((r: RippleItem) => (
                <span
                  key={r.id}
                  className="absolute rounded-full bg-[#d2ff00]/40 pointer-events-none animate-ping"
                  style={{
                    left: r.x - 12,
                    top: r.y - 12,
                    width: 24,
                    height: 24
                  }}
                />
              ))}
              <span className="font-serif font-black text-xl sm:text-2xl tracking-tight uppercase leading-none group-hover:text-black">
                {tr("EGYPT")}
              </span>
              <span className="font-syne font-black text-[11px] sm:text-xs tracking-tighter uppercase leading-none mt-0.5 text-[#535450] group-hover:text-[#111112]">
                {tr("SOVEREIGN REPUBLIC")}
              </span>
            </button>
          </div>

          {/* Center Links (Desktop): 26. Smooth underline slide, 27. Expanding underline, 32. Active indicator slide, 41. Tab sliding indicator */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/5 p-1 rounded-full border border-black/10 relative">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              const isHovered = hoveredLink === link.id;

              return (
                <button
                  key={link.id}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#111112]' : 'text-[#535450] hover:text-[#111112]'
                  }`}
                >
                  {/* 41. Tab sliding indicator (#41) & 32. Active indicator slide (#32) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-[#d2ff00] rounded-full -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* 26 & 27. Smooth Expanding Underline on Hover (#26, #27) */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverNavUnderline"
                      className="absolute bottom-1 inset-x-3 h-[2px] bg-[#111112]/40 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {/* 50. Hover icon rotation (#50) */}
                    <link.icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? 'rotate-45 text-[#111112]' : ''}`} />
                    {link.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Magnetic Buttons (#28), Hover Tilt (#30), Hover Glow (#31) */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle with Magnetic physics (#28) & Hover Icon Rotation (#50) */}
            <div
              ref={magneticAudio.ref}
              onMouseMove={magneticAudio.handleMouseMove}
              onMouseLeave={magneticAudio.handleMouseLeave}
              style={{
                transform: `translate(${magneticAudio.position.x}px, ${magneticAudio.position.y}px)`
              }}
              className="transition-transform duration-150 ease-out"
            >
              <button
                onClick={(e) => {
                  addRipple(e);
                  onToggleAudio();
                }}
                aria-label={isAudioActive ? 'Mute Atmosphere' : 'Enable Atmosphere'}
                className="w-10 h-10 rounded-lg border border-[#111112]/20 bg-white/70 backdrop-blur-sm text-[#111112] flex items-center justify-center hover:bg-[#d2ff00] hover:shadow-[0_0_15px_#d2ff00] hover:-translate-y-0.5 transition-all cursor-pointer shadow-xs group"
              >
                {isAudioActive ? (
                  <Volume2 className="w-4 h-4 text-[#111112] group-hover:scale-110 transition-transform" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[#535450] group-hover:scale-110 transition-transform" />
                )}
              </button>
            </div>

            {/* 31. Hover Glow & 29. Hover Lift: Electric Lime "ARCHIVE" Button (#31, #29) */}
            <div
              ref={magneticArchive.ref}
              onMouseMove={magneticArchive.handleMouseMove}
              onMouseLeave={magneticArchive.handleMouseLeave}
              style={{
                transform: `translate(${magneticArchive.position.x}px, ${magneticArchive.position.y}px)`
              }}
              className="transition-transform duration-150 ease-out"
            >
              <button
                onClick={() => {
                  setMenuTab('achievements');
                  setMenuOpen(true);
                  soundManager.playAchievementOpen();
                }}
                className="px-4 py-2.5 rounded-lg bg-[#d2ff00] text-[#111112] border border-[#111112]/20 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_20px_#d2ff00] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>{tr("23 ACHIEVEMENTS")}</span>
                <ArrowUpRight className="w-3.5 h-3.5 hover:rotate-45 transition-transform" />
              </button>
            </div>

            {/* 35. Hamburger morph (#35) into 'X' + 46. Circular Menu Expansion Trigger (#46) */}
            <div
              ref={magneticMenu.ref}
              onMouseMove={magneticMenu.handleMouseMove}
              onMouseLeave={magneticMenu.handleMouseLeave}
              style={{
                transform: `translate(${magneticMenu.position.x}px, ${magneticMenu.position.y}px)`
              }}
              className="transition-transform duration-150 ease-out"
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={tr("Toggle Navigation Menu")}
                aria-expanded={menuOpen}
                className="w-10 h-10 rounded-lg border border-[#111112]/25 bg-white/70 backdrop-blur-sm text-[#111112] flex items-center justify-center hover:bg-[#111112] hover:text-[#d2ff00] hover:-translate-y-0.5 transition-all cursor-pointer shadow-xs"
              >
                <div className="w-4 h-4 flex flex-col justify-center items-center relative">
                  {/* Top Bar Morphing */}
                  <span
                    className={`block h-[2px] w-4 bg-current rounded-full transition-all duration-300 transform ${
                      menuOpen ? 'rotate-45 translate-y-[2px]' : '-translate-y-1'
                    }`}
                  />
                  {/* Bottom Bar Morphing */}
                  <span
                    className={`block h-[2px] w-4 bg-current rounded-full transition-all duration-300 transform ${
                      menuOpen ? '-rotate-45 -translate-y-[0px]' : 'translate-y-1'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 42. Mega-menu reveal & 45. Sliding sidebar menu (#42, #45) with 33. Menu fade in (#33) & 34. Stagger reveal (#34) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[190] bg-black/65 backdrop-blur-md flex justify-end"
            onClick={() => setMenuOpen(false)}
          >
            {/* Sliding Sidebar Drawer (#45) */}
            <motion.div
              initial={{ x: lang === 'ar' ? '-100%' : '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: lang === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:w-[480px] h-full bg-[#f4f4ed] text-[#111112] shadow-2xl border-s border-[#111112]/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto overscroll-contain"
              data-lenis-prevent
            >
              {/* Header inside flyout */}
              <div>
                <div className="flex items-center justify-between border-b border-[#111112]/15 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#535450] font-bold block">
                      {tr("ARCHIVAL INDEX & ROSTER")}
                    </span>
                    <h3 className="font-serif font-black text-xl uppercase tracking-tight">
                      {tr("Egyptian Heritage Index")}
                    </h3>
                  </div>
                  {/* Circular badge */}
                  <div className="w-10 h-10 rounded-full bg-[#d2ff00] border border-[#111112]/20 flex items-center justify-center font-bold text-sm shadow-xs">
                    𓈎
                  </div>
                </div>

                {/* Tab Switcher: Sections vs All 23 Achievements */}
                <div className="grid grid-cols-2 gap-2 bg-black/5 p-1 rounded-xl mb-5 border border-black/10">
                  <button
                    onClick={() => {
                      soundManager.playHoverTick();
                      setMenuTab('sections');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      menuTab === 'sections'
                        ? 'bg-[#111112] text-[#d2ff00] shadow-xs'
                        : 'text-[#535450] hover:text-[#111112]'
                    }`}
                  >
                    {tr("Act Navigation")}
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playHoverTick();
                      setMenuTab('achievements');
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                      menuTab === 'achievements'
                        ? 'bg-[#d2ff00] text-[#111112] shadow-xs'
                        : 'text-[#535450] hover:text-[#111112]'
                    }`}
                  >
                    {tr("23 Achievements")}
                  </button>
                </div>

                {menuTab === 'sections' ? (
                  /* Sections Navigation */
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link, idx) => {
                      const Icon = link.icon;
                      const isActive = currentSection === link.id;

                      return (
                        <motion.button
                          key={link.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.25 }}
                          onClick={(e) => handleLinkClick(link.id, e)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-left font-mono text-sm uppercase tracking-wider font-bold transition-all group cursor-pointer ${
                            isActive
                              ? 'bg-[#d2ff00] border-[#111112] text-[#111112] shadow-xs'
                              : 'bg-white/80 border-[#111112]/10 hover:border-[#111112] hover:bg-white text-[#111112]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                            <span>{link.label}</span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  /* 23 Achievements Explorer */
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder={tr("Search 23 achievements, eras, rulers...")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#111112]/15 text-sm font-mono text-[#111112] placeholder-[#535450]/60 focus:outline-none focus:border-[#111112] focus:ring-1 focus:ring-[#111112]"
                    />

                    <div className="max-h-[50vh] overflow-y-auto overscroll-contain space-y-2 pr-1" data-lenis-prevent>
                      {filteredAchievements.map((ach, idx) => (
                        <div
                          key={ach.id}
                          onClick={() => {
                            soundManager.playAchievementOpen();
                            onSelectAchievement?.(ach.id);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 border border-[#111112]/10 hover:border-[#111112] hover:bg-[#d2ff00]/15 transition-all cursor-pointer group"
                        >
                          <img
                            src={thumbOf(ach.heroImage)}
                            alt={lang === 'ar' ? ACH_AR[ach.id]?.title ?? ach.title : ach.title}
                            loading="lazy"
                            decoding="async"
                            width={48}
                            height={48}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover border border-[#111112]/15 shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#535450] font-bold truncate">
                                {lang === 'ar' ? `${ACH_AR[ach.id]?.year ?? ach.year} · ${ACH_AR[ach.id]?.era ?? ach.era}` : `${ach.year} · ${ach.era}`}
                              </span>
                              <span className="text-xs font-mono text-[#535450] font-semibold shrink-0">
                                #{String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h4 className="font-syne font-bold text-base text-[#111112] truncate group-hover:text-black">
                              {lang === 'ar' ? ACH_AR[ach.id]?.title ?? ach.title : ach.title}
                            </h4>
                            <p className="text-sm text-[#535450] truncate font-sans">
                              {lang === 'ar' ? ACH_AR[ach.id]?.subtitle ?? ach.subtitle : ach.subtitle}
                            </p>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#535450] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom: 47. Dock-style hover magnification (#47) */}
              <div className="mt-6 border-t border-[#111112]/15 pt-5">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#535450] font-bold block mb-2">
                  {tr("QUICK EPOCH SCRUBBER (DOCK)")}
                </span>
                <div className="flex items-center justify-between bg-black/5 p-2 rounded-xl border border-black/10">
                  {dockIcons.map((d, index) => {
                    const isHovered = dockHoveredIndex === index;
                    const isAdjacent =
                      dockHoveredIndex !== null && Math.abs(dockHoveredIndex - index) === 1;

                    return (
                      <button
                        key={d.id}
                        onMouseEnter={() => setDockHoveredIndex(index)}
                        onMouseLeave={() => setDockHoveredIndex(null)}
                        onClick={(e) => handleLinkClick(d.id, e)}
                        className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 cursor-pointer"
                        style={{
                          transform: isHovered
                            ? 'scale(1.4) translateY(-4px)'
                            : isAdjacent
                            ? 'scale(1.15) translateY(-2px)'
                            : 'scale(1)'
                        }}
                      >
                        <span className="text-lg leading-none font-bold text-[#111112]">
                          {d.glyph}
                        </span>
                        <span className="text-[8px] font-mono uppercase text-[#535450] mt-1">
                          {d.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
