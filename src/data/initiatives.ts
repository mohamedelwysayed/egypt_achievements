import { img } from '../utils/assets';

export interface Initiative {
  id: string; achievementId: string; image: string;
  en: { title: string; tag: string; year: string; blurb: string };
  ar: { title: string; tag: string; year: string; blurb: string };
}

/** Egypt's modern national initiatives (centre card first in the fan = index 2). */
export const INITIATIVES: Initiative[] = [
  { id: 'parade', achievementId: 'pharaohs-golden-parade', image: img('pharaohs_golden_parade_1790765233060'),
    en: { title: 'Pharaohs’ Golden Parade', tag: 'HERITAGE DIPLOMACY', year: '2021', blurb: '22 royal mummies carried in state from Tahrir to the new National Museum of Egyptian Civilization.' },
    ar: { title: 'موكب المومياوات الملكية', tag: 'دبلوماسية التراث', year: '٢٠٢١', blurb: 'ثنتان وعشرون مومياء ملكية تعبر القاهرة في موكب مهيب إلى متحف الحضارة.' } },
  { id: 'suez', achievementId: 'new-suez-canal', image: img('suez_canal_ships_1790765066192'),
    en: { title: 'New Suez Canal', tag: 'MARITIME ARTERY', year: '2015', blurb: 'A 35 km parallel channel dug in one year, letting ships transit in both directions at once.' },
    ar: { title: 'قناة السويس الجديدة', tag: 'شريان الملاحة', year: '٢٠١٥', blurb: 'مجرى موازٍ بطول ٣٥ كم حُفر في عام واحد ليعبر فيه الاتجاهان معًا.' } },
  { id: 'benban', achievementId: 'benban-solar', image: img('benban_solar_farm_1790800000001'),
    en: { title: 'Benban Solar Park', tag: 'CLEAN POWER', year: '2019', blurb: '37 km² of Aswan desert turned into one of the world’s largest solar complexes.' },
    ar: { title: 'مجمع بنبان للطاقة الشمسية', tag: 'طاقة نظيفة', year: '٢٠١٩', blurb: '37 كم² من صحراء أسوان تتحول إلى واحد من أكبر مجمعات الطاقة الشمسية في العالم.' } },
  { id: 'gem', achievementId: 'grand-egyptian-museum', image: img('egypt_gem_museum_1790512748235'),
    en: { title: 'Grand Egyptian Museum', tag: 'MEGASTRUCTURE', year: '2026', blurb: 'The largest museum on earth devoted to a single civilisation, framing the Giza pyramids.' },
    ar: { title: 'المتحف المصري الكبير', tag: 'صرح عالمي', year: '٢٠٢٦', blurb: 'أكبر متحف في العالم مخصص لحضارة واحدة، يطل مباشرة على أهرام الجيزة.' } },
  { id: 'capital', achievementId: 'new-administrative-capital', image: img('iconic_tower_capital_1790765221938'),
    en: { title: 'New Administrative Capital', tag: 'NEW CAPITAL', year: '2016 →', blurb: 'A planned smart city east of Cairo, home to Africa’s tallest tower, the Iconic Tower.' },
    ar: { title: 'العاصمة الإدارية الجديدة', tag: 'عاصمة المستقبل', year: '٢٠١٦ ←', blurb: 'مدينة ذكية مخططة شرق القاهرة تضم أطول برج في أفريقيا، البرج الأيقوني.' } },
  { id: 'rail', achievementId: 'high-speed-rail', image: img('high_speed_rail_egypt_1790800000002'),
    en: { title: 'High-Speed Rail', tag: 'NEW ARTERY', year: '2027 →', blurb: 'A 2,000 km electric network designed to link about 60 cities at up to 230 km/h.' },
    ar: { title: 'القطار فائق السرعة', tag: 'شريان جديد', year: '٢٠٢٧ ←', blurb: 'شبكة كهربائية بطول 2000 كم لربط نحو 60 مدينة بسرعة تصل إلى 230 كم/ساعة.' } },
  { id: 'decent', achievementId: 'decent-life', image: img('decent_life_village_1790800000003'),
    en: { title: 'Decent Life', tag: 'THE COUNTRYSIDE', year: '2019 →', blurb: 'Clean water, schools and clinics for more than 4,000 Egyptian villages.' },
    ar: { title: 'حياة كريمة', tag: 'قلب الريف', year: '٢٠١٩ ←', blurb: 'مياه نظيفة ومدارس ووحدات صحية لأكثر من 4000 قرية مصرية.' } },
];
