import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Lang = 'en' | 'ar';
type CtxT = { lang: Lang; t: (en: string, ar?: string) => string; tr: (en: string) => string; toggle: () => void };
const Ctx = createContext<CtxT>({ lang: 'en', t: (en) => en, tr: (en) => en, toggle: () => {} });
export const useLang = () => useContext(Ctx);

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en');
  useEffect(() => {
    const h = document.documentElement;
    h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', lang); } catch { /* private mode */ }
  }, [lang]);
  const t = useCallback((en: string, ar?: string) => (lang === 'ar' && ar ? ar : en), [lang]);
  const tr = useCallback((en: string) => (lang === 'ar' ? trAr(en) : en), [lang]);
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'ar' : 'en')), []);
  return <Ctx.Provider value={{ lang, t, tr, toggle }}>{children}</Ctx.Provider>;
};

export const LangToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, toggle } = useLang();
  return (
    <button onClick={toggle} aria-label="Switch language / تبديل اللغة"
      className={`rounded-full border border-current/30 bg-[#d2ff00] text-[#111112] px-3.5 py-1.5 text-[11px] font-bold tracking-wider cursor-pointer hover:scale-105 transition-transform ${className}`}>
      {lang === 'en' ? 'العربية' : 'EN'}
    </button>
  );
};

/** Arabic titles for the 20 story pages (content bodies stay English). */
export const AR_TITLES: Record<string, string> = {
  'great-pyramid': 'الهرم الأكبر لخوفو', 'grand-egyptian-museum': 'المتحف المصري الكبير',
  'tutankhamun-mask': 'قناع توت عنخ آمون الذهبي', 'new-suez-canal': 'قناة السويس الجديدة',
  'new-administrative-capital': 'العاصمة الإدارية الجديدة', 'abu-simbel': 'معبد رمسيس الثاني في أبو سمبل',
  'pharaohs-golden-parade': 'موكب المومياوات الملكية', 'karnak-temple': 'قاعة الأعمدة الكبرى بالكرنك',
  'narmer-palette': 'لوحة نعرمر', 'step-pyramid': 'هرم زوسر المدرّج', 'great-sphinx': 'أبو الهول بالجيزة',
  'rosetta-stone': 'حجر رشيد', 'library-alexandria': 'مكتبة الإسكندرية القديمة',
  'al-azhar-university': 'الجامع الأزهر وجامعته', 'saladin-citadel': 'قلعة صلاح الدين',
  'suez-canal-opening': 'قناة السويس ١٨٦٩', 'aswan-high-dam': 'السد العالي بأسوان',
  'kadesh-peace-treaty': 'معاهدة قادش الفضية', 'fayum-portraits': 'بورتريهات الفيوم',
  'st-catherine': 'دير سانت كاترين',
};

const ROMAN: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
const DICT: Record<string, string> = {
  'Since the dawn of civilization along the banks of the Nile, sovereignty has remained continuous, unbroken across the horizons of time.': 'منذ فجر الحضارة على ضفاف النيل، ظلت السيادة متصلة لا تنقطع عبر آفاق الزمن.',
  OPEN: 'افتح', WATCH: 'شاهد', VIEW: 'عرض',
  // navigation
  'EGYPT': 'مصر', 'SOVEREIGN REPUBLIC': 'الجمهورية السيادية', '23 ACHIEVEMENTS': '23 إنجازًا', 'ARCHIVAL INDEX & ROSTER': 'الفهرس الأرشيفي والسجل', 'Egyptian Heritage Index': 'فهرس التراث المصري',
  'Act Navigation': 'التنقل بين الفصول', '23 Achievements': '23 إنجازًا', 'QUICK EPOCH SCRUBBER (DOCK)': 'التنقل السريع بين العصور',
  '01. Horizon': '01. الأفق', '02. Message': '02. الرسالة', '03. Continuum': '03. الاستمرارية', '04. Timeline': '04. الخط الزمني', '05. Initiatives': '05. المبادرات', '06. Pyramids': '06. الأهرام',
  'Genesis': 'التكوين', 'Message': 'الرسالة', 'Continuum': 'الاستمرارية', 'Timeline': 'الخط الزمني', 'Monuments': 'الآثار', 'Toggle Navigation Menu': 'فتح القائمة',
  'Search 23 achievements, eras, rulers...': 'ابحث في 23 إنجازًا وعصرًا وحاكمًا...',
  // hero
  'President of Egypt': 'رئيس مصر', 'Pharaoh Ramesses II': 'الفرعون رمسيس الثاني', 'Pharaoh of Egypt': 'فرعون مصر',
  // marquee
  'ACT II · MESSAGE FROM THE SACRED NILE': 'الفصل الثاني · رسالة من النيل المقدس', 'SEVEN MILLENNIA AT HOME · FROM MEMPHIS TO CAIRO ·': 'سبعة آلاف عام في الوطن · من منف إلى القاهرة ·', 'CONTINUITY WILL LIVE FOREVER · THE ETERNAL CROWN ·': 'الاستمرارية ستبقى للأبد · التاج الخالد ·',
  // dual (stacked headings read top→bottom, so the Arabic pair is swapped)
  'ANCIENT': 'كمت', 'KEMET': 'القديمة', 'Kemet': 'كمت', 'MODERN': 'الدولة', 'STATE': 'الحديثة',
  'The foundation of statehood, architectural mastery, and imperial diplomacy along the sacred Nile.': 'أساس الدولة والإتقان المعماري والدبلوماسية الإمبراطورية على ضفاف النيل المقدس.',
  'The contemporary sovereign republic, mega-infrastructure, the Grand Museum, and regional stability.': 'الجمهورية السيادية المعاصرة والمشروعات العملاقة والمتحف الكبير والاستقرار الإقليمي.',
  // timeline
  'ACT III · CHRONOLOGY & ASYMMETRIC HORIZON': 'الفصل الثالث · التسلسل الزمني والأفق غير المتماثل', 'Seven Millennia Side-Scroll': 'سبعة آلاف عام بالتمرير الأفقي', 'FOUNDATIONAL MOTTO': 'الشعار التأسيسي',
  'MONUMENTAL': 'عظيم', 'DEDICATED STORY': 'قصة مستقلة', 'EXPLORE': 'استكشف', 'MEMPHIS UNIFICATION': 'توحيد منف', 'GRAND MUSEUM & CAPITAL': 'المتحف الكبير والعاصمة', 'Previous milestone': 'المحطة السابقة', 'Next milestone': 'المحطة التالية',
  'where': 'من أين', "It doesn't matter ": 'ليس المهم ', " you start, it's ": ' تبدأ، بل ', 'how': 'كيف', ' you progress from there.': ' تتقدم من هناك.',
  // pyramids
  'PYRAMIDS': 'الأهرام', 'The Pyramids of Giza': 'أهرامات الجيزة', 'Unify layers': 'توحيد الطبقات', 'Explode layers': 'تفكيك الطبقات',
  // monuments
  'ACT VI · ETERNAL ARCHIVAL INDEX': 'الفصل السادس · الفهرس الأرشيفي الخالد', 'SEVEN': 'سبعة آلاف', 'MILLENNIA': 'عام من', 'SOVEREIGN': 'السيادة',
  'Celebrate this monumental lineage designed by kings, builders, and scholars who never stopped creating. Each achievement is preserved with its own dedicated historical story.': 'احتفوا بهذا النسب العظيم الذي صنعه ملوك وبنّاؤون وعلماء لم يتوقفوا عن الإبداع. وكل إنجاز محفوظ بقصته التاريخية المستقلة.',
  'LAUNCH GRAND EXHIBIT': 'افتح المعرض الأكبر', '2026 CE · MEGASTRUCTURE': '2026م · صرح عالمي', 'Grand Egyptian Museum': 'المتحف المصري الكبير', 'OPEN DEDICATED STORY': 'افتح القصة', 'ROYAL GOLD RELIC': 'أثر ذهبي ملكي', 'Golden Mask': 'القناع الذهبي', '2560 BCE · GIZA': '2560 ق.م · الجيزة', 'The Great Pyramid': 'الهرم الأكبر',
  'From the first unification under Narmer to the New Administrative Capital, every story opens with a cinematic scene, key numbers, chapters, and a closing reflection on why it still matters today.': 'من أول توحيد للبلاد على يد نعرمر إلى العاصمة الإدارية الجديدة، تبدأ كل قصة بمشهد سينمائي وأرقام رئيسية وفصول، وتنتهي بتأمل في سبب بقائها مهمة حتى اليوم.',
  // epochs
  'Old Kingdom': 'الدولة القديمة', 'New Kingdom': 'الدولة الحديثة', 'Ptolemaic Golden Age': 'العصر الذهبي البطلمي', 'Ptolemaic Period': 'العصر البطلمي', 'Greco-Roman Era': 'العصر اليوناني الروماني', 'Byzantine Era': 'العصر البيزنطي',
  'Islamic Golden Age': 'العصر الذهبي الإسلامي', 'Ayyubid & Mamluk': 'الأيوبي والمملوكي', 'Modern Renaissance': 'عصر النهضة الحديث', 'Modern Republic': 'الجمهورية الحديثة', 'Contemporary Republic': 'الجمهورية المعاصرة',
  // places
  'HIERAKONPOLIS': 'نخن (هيراكونبوليس)', 'SAQQARA': 'سقارة', 'GIZA': 'الجيزة', 'GIZA PLATEAU': 'هضبة الجيزة', 'VALLEY OF THE KINGS': 'وادي الملوك', 'PI-RAMESSES': 'بر-رمسيس', 'ASWAN': 'أسوان', 'THEBES': 'طيبة', 'ALEXANDRIA': 'الإسكندرية', 'RASHID': 'رشيد',
  'FAYUM OASIS': 'واحة الفيوم', 'MOUNT SINAI': 'جبل سيناء', 'HISTORIC CAIRO': 'القاهرة التاريخية', 'CAIRO CITADEL': 'قلعة القاهرة', 'ISTHMUS OF SUEZ': 'برزخ السويس', 'SUEZ CANAL': 'قناة السويس', 'CAIRO': 'القاهرة', 'NEW CAPITAL': 'العاصمة الجديدة',
  // footer & new sections
  'KEMET · 3100 BCE': 'كمت · 3100 ق.م', 'MEMPHIS · WHITE WALLS': 'منف · الجدران البيضاء', 'THEBES · KARNAK': 'طيبة · الكرنك', 'ALEXANDRIA · SEAT OF SCHOLARS': 'الإسكندرية · مقر العلماء', 'HISTORIC CAIRO · AL-AZHAR': 'القاهرة التاريخية · الأزهر', 'NEW ADMINISTRATIVE CAPITAL · 2026 CE': 'العاصمة الإدارية الجديدة · 2026م',
};
const YR = (s: string) => s.replace(/\bBCE\b/g, 'ق.م').replace(/\bCE\b/g, 'م');
/** Arabic for any UI string: exact dictionary hit, "PLACE, 123 BCE", "Dynasty IV", or a bare year. */
export function trAr(en: string): string {
  if (DICT[en]) return DICT[en];
  let m = en.match(/^(.+), (\d[\d,]* (?:BCE|CE))$/);
  if (m) return `${DICT[m[1]] ?? m[1]}، ${YR(m[2])}`;
  m = en.match(/^Dynasty ([IVX]+)$/);
  if (m && ROMAN[m[1]]) return `الأسرة ${ROMAN[m[1]]}`;
  if (/^\d[\d,]* (?:BCE|CE)$/.test(en)) return YR(en);
  return en;
}
