import { img } from '../utils/assets';
export interface AchievementStat {
  value: string;
  unit?: string;
  label: string;
  description: string;
}

export interface AchievementStory {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  year: string;
  dynastyOrLeader: string;
  heroImage: string;
  secondaryImage: string;
  accentColor: string;
  overview: string;
  editorialQuote: {
    text: string;
    source: string;
  };
  stats: AchievementStat[];
  sections: {
    heading: string;
    body: string;
    tag?: string;
  }[];
  composition: 'monumental-apex' | 'architectural-megastructure' | 'gold-relic-depth' | 'maritime-artery' | 'rock-cut-colossal' | 'futuristic-skyline' | 'ceremonial-pageant' | 'classical-scholarship' | 'solar-field' | 'high-speed-rail' | 'rural-renewal';
  coordinates?: string;
  modernSignificance: string;
}

export const ACHIEVEMENTS_DATA: AchievementStory[] = [
  {
    id: 'great-pyramid',
    title: 'The Great Pyramid of Khufu',
    subtitle: 'The Solitary Surviving Ancient Wonder of the World',
    era: 'Old Kingdom',
    year: 'c. 2560 BCE',
    dynastyOrLeader: 'Pharaoh Khufu (Dynasty IV)',
    heroImage: img('pyramids_cinematic_full_1790606922175'),
    secondaryImage: img('egypt_giza_pyramids_1790512734462'),
    accentColor: '#d4af37',
    composition: 'monumental-apex',
    overview:
      'Engineered over 4,500 years ago by royal architect Hemiunu, the Great Pyramid of Giza represents the pinnacle of ancient logistical mobilization, astronomical alignment, and stone ashlar mastery. For over 3,800 years, it stood as the tallest artificial structure on planet Earth.',
    editorialQuote: {
      text: 'Man fears time, but time fears the Pyramids. It is the geometric anchor of human eternity.',
      source: 'Ancient Nilotic Chronicle'
    },
    stats: [
      {
        value: '146.6',
        unit: 'M',
        label: 'Original Height',
        description: 'Tallest structure created by mankind until Lincoln Cathedral in 1311 CE.'
      },
      {
        value: '2.3',
        unit: 'M',
        label: 'Dressed Blocks',
        description: 'Limestone and granite blocks averaging 2.5 to 15 tons each.'
      },
      {
        value: '0.05',
        unit: '°',
        label: 'True North Margin',
        description: 'Aligned with celestial precision to astronomical true north.'
      },
      {
        value: '3,800+',
        unit: 'YRS',
        label: 'World Record Height',
        description: 'Held the record for world’s tallest architecture for nearly four millennia.'
      }
    ],
    sections: [
      {
        heading: 'Astronomical & Mathematical Prowess',
        body: 'The base perimeter divided by twice its height yields an approximation of π (3.14159) within a fractional error margin. The four cardinal faces slope inward slightly, creating an eight-sided optical phenomenon visible only at the equinoxes.',
        tag: 'MATHEMATICS'
      },
      {
        heading: 'Sovereign Mobilization of Free Builders',
        body: 'Excavations by the Egyptian Antiquities Ministry proved that the pyramids were built not by enslaved labor, but by tens of thousands of skilled free Egyptian workers, fed on high-protein rations and honored with permanent tombs adjacent to the pharaoh.',
        tag: 'STATEHOOD'
      }
    ],
    coordinates: '29.9792° N, 31.1342° E · Giza Plateau',
    modernSignificance: 'The foundational architectural DNA that informs contemporary Egyptian mega-planning—from the New Administrative Capital to the Grand Egyptian Museum.'
  },
  {
    id: 'grand-egyptian-museum',
    title: 'The Grand Egyptian Museum',
    subtitle: 'The World’s Largest Archaeological Complex Dedicated to One Civilization',
    era: 'Modern Sovereign Republic',
    year: '2024–2026 CE',
    dynastyOrLeader: 'President Abdel Fattah el-Sisi',
    heroImage: img('egypt_gem_museum_1790512748235'),
    secondaryImage: img('ramses_front_cutout_1790513072024'),
    accentColor: '#d2ff00',
    composition: 'architectural-megastructure',
    overview:
      'Spanning 500,000 square meters two kilometers from the Giza Pyramids, the Grand Egyptian Museum (GEM) is a monumental triumph of modern Egyptian state engineering. Its translucent alabaster facade aligns geometrically with the apexes of Khufu and Menkaure, unifying ancient eternity with the 21st-century republic.',
    editorialQuote: {
      text: 'A gift from Egypt to all humanity. The place where the ancestors step forward to greet their modern descendants.',
      source: 'State Inaugural Declaration'
    },
    stats: [
      {
        value: '500,000',
        unit: 'M²',
        label: 'Total Facility Area',
        description: 'The largest single-civilization museum complex ever constructed on Earth.'
      },
      {
        value: '100,000+',
        label: 'Archived Masterpieces',
        description: 'Chronicles pre-dynastic genesis through Greco-Roman Egypt under one roof.'
      },
      {
        value: '5,398',
        label: 'Tutankhamun Relics',
        description: 'The complete royal tomb inventory displayed intact for the first time in history.'
      },
      {
        value: '11',
        unit: 'M',
        label: 'Colossus of Ramesses',
        description: 'A 3,200-year-old, 83-ton granite giant commanding the grand atrium.'
      }
    ],
    sections: [
      {
        heading: 'Direct Sightlines to the Horizon',
        body: 'Designed by Heneghan Peng, the architectural geometry casts diagonal radiating axes straight to the three Pyramids of Giza, creating an unbroken optical bridge across four millennia of stone.',
        tag: 'ARCHITECTURE'
      },
      {
        heading: 'Conservation & Nanotechnology Center',
        body: 'Houses the Middle East’s most advanced non-destructive archaeological laboratories, using multi-spectral imaging and organic climate stabilization to preserve millennia-old papyri and gold foil.',
        tag: 'SCIENCE'
      }
    ],
    coordinates: '29.9950° N, 31.1195° E · Pyramids Road, Giza',
    modernSignificance: 'The ultimate physical realization of Egypt’s cultural sovereignty and global curatorial supremacy.'
  },
  {
    id: 'tutankhamun-mask',
    title: 'The Golden Nemes of Tutankhamun',
    subtitle: '10 Kilograms of Solid Beaten Gold & Lapis Lazuli Masterwork',
    era: 'New Kingdom',
    year: 'c. 1323 BCE',
    dynastyOrLeader: 'Pharaoh Tutankhamun (Dynasty XVIII)',
    heroImage: img('tutankhamun_mask_1790764945287'),
    secondaryImage: img('egypt_gold_cartouche_1790512762879'),
    accentColor: '#f59e0b',
    composition: 'gold-relic-depth',
    overview:
      'Discovered by Howard Carter in Tomb KV62 in the Valley of the Kings, the funerary mask of the Boy King is universally acknowledged as humanity’s highest gold metallurgical and spiritual achievement. Inlaid with imported Afghan lapis lazuli, obsidian, carnelian, and turquoise.',
    editorialQuote: {
      text: 'At first I could see nothing, the hot air escaping causing the candle flame to flicker; but presently... strange animals, statues, and gold—everywhere the glint of gold.',
      source: 'Howard Carter’s Tomb Diary, 1922'
    },
    stats: [
      {
        value: '10.23',
        unit: 'KG',
        label: 'Pure Solid Gold',
        description: 'Crafted from two layers of high-karat gold beaten and burnished to perfection.'
      },
      {
        value: '54',
        unit: 'CM',
        label: 'Sculptural Height',
        description: 'Modeled directly to reflect the idealized youthful features of the King.'
      },
      {
        value: '3,300+',
        unit: 'YRS',
        label: 'Age of Preservation',
        description: 'Preserved without oxidation inside sealed nested quartz sarcophagi.'
      },
      {
        value: 'Spell 151b',
        label: 'Book of the Dead',
        description: 'Inscribed on the back and shoulders to protect the senses in the afterlife.'
      }
    ],
    sections: [
      {
        heading: 'Sacred Metallurgy & Dual Protection',
        body: 'The forehead displays the Dual Sovereignty: the Vulture goddess Nekhbet of Upper Egypt and the Cobra goddess Wadjet of Lower Egypt, unified upon the royal Nemes stripes.',
        tag: 'ICONOGRAPHY'
      },
      {
        heading: 'Global Diplomatic Emissary',
        body: 'Having toured major world capitals in the 20th century to record-breaking museum audiences, the mask now rests permanently in Egypt at the Grand Egyptian Museum, never to leave Egyptian territory again.',
        tag: 'HERITAGE'
      }
    ],
    coordinates: 'Grand Egyptian Museum, Hall of Tutankhamun',
    modernSignificance: 'The global visual emblem of ancient majesty and Egypt’s inalienable historical treasures.'
  },
  {
    id: 'new-suez-canal',
    title: 'The New Suez Canal Corridor',
    subtitle: '35 Kilometers of Parallel Navigable Waterway Dredged in 12 Months',
    era: 'Modern Sovereign Republic',
    year: '2015 CE',
    dynastyOrLeader: 'President Abdel Fattah el-Sisi',
    heroImage: img('suez_canal_ships_1790765066192'),
    secondaryImage: img('suez_canal_inauguration_1790765258740'),
    accentColor: '#38bdf8',
    composition: 'maritime-artery',
    overview:
      'In August 2014, the Egyptian presidency announced an unprecedented national challenge: dredging a 35-kilometer parallel channel and deepening 37 kilometers of existing waterway within a single year instead of the projected three years. Funded entirely by $8.5 billion in certificates purchased by Egyptian citizens in eight days.',
    editorialQuote: {
      text: 'The Suez Canal is not just a passage for commerce; it is an artery of Egyptian honor, dug twice with the blood and resolve of our people.',
      source: 'Canal Opening Address, Ismailia'
    },
    stats: [
      {
        value: '12',
        unit: 'MO',
        label: 'Record Execution Time',
        description: 'Executed in 12 months using 75% of the world’s entire dredging dredge fleet.'
      },
      {
        value: '11',
        unit: 'HRS',
        label: 'Transit Time',
        description: 'Reduced southbound ship transit time from 18 hours down to 11 hours.'
      },
      {
        value: '97',
        unit: 'SHIPS',
        label: 'Daily Vessel Capacity',
        description: 'Doubled maximum daily transit throughput from 49 to 97 cargo vessels.'
      },
      {
        value: '12',
        unit: '%',
        label: 'Global Maritime Trade',
        description: 'Channels over one-eighth of all sea freight and 30% of global container traffic.'
      }
    ],
    sections: [
      {
        heading: 'Two-Way Seamless Navigation',
        body: 'Eliminated ship waiting periods at the Ballah bypass, enabling continuous simultaneous two-way traffic for ultra-large container vessels (ULCVs) of up to 240,000 deadweight tonnage.',
        tag: 'ENGINEERING'
      },
      {
        heading: 'Suez Canal Economic Zone (SCZone)',
        body: 'Catalyzed 460 square kilometers of new industrial parks, green hydrogen export terminals, and logistics hubs along the Mediterranean and Red Sea gateways.',
        tag: 'GEOPOLITICS'
      }
    ],
    coordinates: '30.5852° N, 32.2654° E · Ismailia & Great Bitter Lakes',
    modernSignificance: 'Proof of modern Egyptian rapid execution and strategic control over international sea routes.'
  },
  {
    id: 'new-administrative-capital',
    title: 'The New Administrative Capital',
    subtitle: 'The Iconic Tower & Smart Sovereign Urban Horizon',
    era: 'Modern Sovereign Republic',
    year: '2016–2026 CE',
    dynastyOrLeader: 'President Abdel Fattah el-Sisi',
    heroImage: img('iconic_tower_capital_1790765221938'),
    secondaryImage: img('egypt_gem_museum_1790512748235'),
    accentColor: '#d2ff00',
    composition: 'futuristic-skyline',
    overview:
      'Located 45 kilometers east of Cairo on 700 square kilometers (an area larger than Singapore), the New Administrative Capital represents Egypt’s boldest urban expansion since the founding of Memphis. Anchored by the 393.8-meter Iconic Tower—the tallest skyscraper in Africa—and the Octagon strategic command center.',
    editorialQuote: {
      text: 'We are not merely constructing buildings; we are announcing the birth of the Second Republic.',
      source: 'Presidency of Egypt'
    },
    stats: [
      {
        value: '393.8',
        unit: 'M',
        label: 'Iconic Tower Height',
        description: 'Tallest architectural skyscraper on the African continent with 77 storeys.'
      },
      {
        value: '700',
        unit: 'KM²',
        label: 'Total City Footprint',
        description: 'Smart urban planning designed for 6.5 million residents.'
      },
      {
        value: '35',
        unit: 'KM',
        label: 'Green River Linear Park',
        description: 'Central botanical axis double the length of New York’s Central Park.'
      },
      {
        value: '100',
        unit: '%',
        label: 'Smart Grid & Solar',
        description: 'Fully automated fiber infrastructure, zero-emission monorail, and solar integration.'
      }
    ],
    sections: [
      {
        heading: 'The Central Business District (CBD)',
        body: 'Constructed in partnership with CSCEC featuring 20 state-of-the-art office towers with sustainable aerodynamic facades inspired by lotus bud geometry.',
        tag: 'URBANISM'
      },
      {
        heading: 'City of Arts & Culture',
        body: 'Home to the largest opera house in the Middle East, monumental archival libraries, and modern galleries connecting antique tradition to future generations.',
        tag: 'CULTURE'
      }
    ],
    coordinates: '30.0131° N, 31.7500° E · Eastern Desert, Cairo Governorate',
    modernSignificance: 'A 21st-century sovereign capital decongesting historic Cairo while projecting Egyptian state power.'
  },
  {
    id: 'abu-simbel',
    title: 'The Great Temple of Ramesses II',
    subtitle: 'Rock-Cut Colossi & The Miraculous Solar Alignment at Abu Simbel',
    era: 'New Kingdom',
    year: 'c. 1279 BCE',
    dynastyOrLeader: 'Pharaoh Ramesses II (Dynasty XIX)',
    heroImage: img('abu_simbel_1790764959741'),
    secondaryImage: img('ramses_front_cutout_1790513072024'),
    accentColor: '#eab308',
    composition: 'rock-cut-colossal',
    overview:
      'Two temples carved into the solid sandstone mountain of Nubia, fronted by four 20-meter colossal seated statues of Ramesses II wearing the Double Crown. Inside, the sanctuary is engineered so that on February 22 and October 22, the rising sun illuminates three seated gods while leaving Ptah, god of the underworld, in shadow.',
    editorialQuote: {
      text: 'I have made monuments in stone to endure like the heavens; my name shall shine across the south unto the ends of earth.',
      source: 'Rock Stela of Ramesses the Great'
    },
    stats: [
      {
        value: '20',
        unit: 'M',
        label: 'Colossi Seated Height',
        description: 'Four monumental sandstone portraits carved into the mountain facade.'
      },
      {
        value: '2x',
        unit: '/YR',
        label: 'Solar Alignment',
        description: 'Sunlight pierces 65 meters deep into the sanctuary only on two specific days.'
      },
      {
        value: '65',
        unit: 'M',
        label: 'Relocation Elevation',
        description: 'Dismantled into 1,035 blocks and raised 65 meters in 1968 to escape Lake Nasser.'
      },
      {
        value: '3,200',
        unit: 'YRS',
        label: 'Nubian Sentinel',
        description: 'Guardians of Egypt’s southern border and international prestige.'
      }
    ],
    sections: [
      {
        heading: 'The Solar Illumination Miracle',
        body: 'On Ramesses’ birthday and coronation day, the sun’s rays travel through the hypostyle hall of eight Osiride pillars to illuminate Ra-Horakhty, Amun-Ra, and Ramesses deified.',
        tag: 'ASTRONOMY'
      },
      {
        heading: '1968 UNESCO Engineering Salvage',
        body: 'When the Aswan High Dam threatened to submerge the temples, international teams sawed the entire mountain into blocks of up to 30 tons, reconstructing them inside an artificial concrete dome.',
        tag: 'RESTORATION'
      }
    ],
    coordinates: '22.3372° N, 31.6258° E · Lake Nasser, Aswan',
    modernSignificance: 'The enduring testament to pharaonic colossal ambition and modern heritage preservation.'
  },
  {
    id: 'pharaohs-golden-parade',
    title: 'The Pharaohs’ Golden Parade',
    subtitle: '22 Royal Monarchs Escorted by the President Through Illuminated Cairo',
    era: 'Contemporary Milestone',
    year: '2021 CE',
    dynastyOrLeader: 'President Abdel Fattah el-Sisi',
    heroImage: img('pharaohs_golden_parade_1790765233060'),
    secondaryImage: img('egypt_gold_cartouche_1790512762879'),
    accentColor: '#d2ff00',
    composition: 'ceremonial-pageant',
    overview:
      'On April 3, 2021, the world watched in awe as 22 royal mummies (including 18 kings and 4 queens such as Seqenenre Tao, Hatshepsut, Thutmose III, and Ramesses II) were transported from the Tahrir Museum to the National Museum of Egyptian Civilization (NMEC). President Abdel Fattah el-Sisi welcomed each sovereign with full state military honors.',
    editorialQuote: {
      text: 'With immense pride, I welcome the kings and queens of Egypt as they complete their journey to their new resting place.',
      source: 'President Abdel Fattah el-Sisi at NMEC'
    },
    stats: [
      {
        value: '22',
        label: 'Pharaohs Escorted',
        description: '18 Kings and 4 Queens representing the golden dynasties XVII to XX.'
      },
      {
        value: '21',
        unit: 'GUN',
        label: 'Presidential Salute',
        description: 'Military artillery salutes fired to honor the ancient heads of state.'
      },
      {
        value: '60+',
        label: 'Global Broadcasts',
        description: 'Streamed live across over 60 international networks to hundreds of millions.'
      },
      {
        value: '40',
        unit: 'MIN',
        label: 'Golden Journey',
        description: 'Carried upon shock-absorbing nitrogen-sealed golden ceremonial vehicles.'
      }
    ],
    sections: [
      {
        heading: 'Sovereign Protocol Across Millennia',
        body: 'Each royal vehicle bore the pharaoh’s name inscribed in hieroglyphic cartouche, Arabic, and English, accompanied by mounted cavalry, royal guards, and an orchestra performing ancient Egyptian hymns.',
        tag: 'CEREMONY'
      },
      {
        heading: 'Symbol of Unbroken Continuity',
        body: 'The event marked the definitive moment where the modern Republic formally honored the ancient Empire, crystallizing the Pharaoh-President continuum into global living memory.',
        tag: 'CONTINUITY'
      }
    ],
    coordinates: 'Tahrir Square to Fustat, Cairo',
    modernSignificance: 'The modern ceremonial summit where ancient pharaonic royalty and modern presidential authority converged.'
  },
  {
    id: 'karnak-temple',
    title: 'The Great Hypostyle Hall of Karnak',
    subtitle: '134 Towering Papyrus Columns in the World’s Largest Religious Sanctuary',
    era: 'New Kingdom',
    year: 'c. 1290 BCE',
    dynastyOrLeader: 'Seti I & Ramesses II',
    heroImage: img('karnak_hypostyle_1790765112848'),
    secondaryImage: img('egypt_timeline_relic_1790511702998'),
    accentColor: '#d4af37',
    composition: 'classical-scholarship',
    overview:
      'The religious heartbeat of Thebes for over 1,500 years. Its Great Hypostyle Hall covers 5,000 square meters, supported by 134 stone columns reaching up to 21 meters in height with capitals broad enough to support 50 standing persons.',
    editorialQuote: {
      text: 'A forest of stone grown by the Nile, where heaven meets the sacred earth in eternal praise.',
      source: 'Praise of Amun at Thebes'
    },
    stats: [
      {
        value: '134',
        label: 'Massive Columns',
        description: 'Arranged in 16 rows, representing the primeval papyrus thicket of creation.'
      },
      {
        value: '21',
        unit: 'M',
        label: 'Central Column Height',
        description: 'Crowned with open papyrus flower capitals 5.4 meters across.'
      },
      {
        value: '1,500',
        unit: 'YRS',
        label: 'Construction Period',
        description: 'Expanded continuously across 30 successive pharaohs and emperors.'
      },
      {
        value: '200+',
        unit: 'ACRES',
        label: 'Total Precinct',
        description: 'The largest religious complex ever constructed in the ancient world.'
      }
    ],
    sections: [
      {
        heading: 'Restoration of Original Polychrome Colors',
        body: 'A joint Egyptian-international restoration project initiated in 2021 stripped millennia of sand and soot, revealing vibrant turquoise, red ochre, and gold pigments unseen for 3,000 years.',
        tag: 'RESTORATION'
      },
      {
        heading: 'The Avenue of Sphinxes',
        body: 'In November 2021, the 2.7-kilometer paved ceremonial dromos flanked by 1,057 ram-headed and human-headed sphinxes connecting Karnak to Luxor Temple was officially reopened.',
        tag: 'CIVIC'
      }
    ],
    coordinates: '25.7188° N, 32.6573° E · Luxor, Upper Egypt',
    modernSignificance: 'The grandest architectural forest of stone in human history, restored to pristine majesty.'
  },
  {
    id: 'narmer-palette',
    title: 'The Narmer Palette',
    subtitle: 'The Foundational Charter of the World’s First Nation-State',
    era: 'Early Dynastic Period',
    year: 'c. 3100 BCE',
    dynastyOrLeader: 'King Narmer (Dynasty I)',
    heroImage: img('narmer_palette_1790765008513'),
    secondaryImage: img('egypt_timeline_relic_1790511702998'),
    accentColor: '#C5A059',
    composition: 'gold-relic-depth',
    overview:
      'Discovered at the ancient cult center of Nekhen (Hierakonpolis), the Narmer Palette is universally celebrated as the foundational diplomatic and political document of unified Egypt. Carved from a single shield-shaped slab of grey-green siltstone, it immortalizes King Narmer wearing both the White Crown of Upper Egypt (Hedjet) and the Red Crown of Lower Egypt (Deshret).',
    editorialQuote: {
      text: 'From the two lands, one heart; from divided kingdoms, an eternal realm under Ma’at.',
      source: 'Foundational Inscription of the Unified Realm'
    },
    stats: [
      {
        value: '64',
        unit: 'CM',
        label: 'Siltstone Height',
        description: 'Carved in low relief with extraordinary anatomical and heraldic precision.'
      },
      {
        value: '5,100+',
        unit: 'YRS',
        label: 'Age of Document',
        description: 'The earliest definitive record of cohesive sovereign nationhood on Earth.'
      },
      {
        value: '1st',
        label: 'Unified Sovereign',
        description: 'Narmer stands as the premier Pharaoh of the First Unified Dynasty.'
      },
      {
        value: '1898',
        label: 'Discovery Year',
        description: 'Unearthed by Quibell and Green in the Main Deposit at Hierakonpolis.'
      }
    ],
    sections: [
      {
        heading: 'Iconography of the Two Crowns',
        body: 'On the obverse, the sovereign smites the western delta chieftain under the gaze of Horus. On the reverse, he processes behind four provincial standard-bearers, beholding two intertwined serpopards symbolizing the harnessed cosmic unity of Upper and Lower Egypt.',
        tag: 'HERALDRY'
      },
      {
        heading: 'Birth of Memphis and National Bureaucracy',
        body: 'Following the consolidation celebrated on the palette, Narmer established the White Wall capital of Memphis at the apex of the Nile Delta, securing administration over trade, tax grain silos, and hydraulic irrigation networks.',
        tag: 'STATEHOOD'
      }
    ],
    coordinates: '25.0971° N, 32.7844° E · Nekhen (Hierakonpolis)',
    modernSignificance: 'The premier artifact consecrating Egypt as humanity’s very first unified nation-state.'
  },
  {
    id: 'step-pyramid',
    title: 'The Step Pyramid of Djoser',
    subtitle: 'Humanity’s First Colossal Monument of Dressed Ashlar Stone',
    era: 'Old Kingdom',
    year: 'c. 2670 BCE',
    dynastyOrLeader: 'Pharaoh Djoser & Architect Imhotep (Dynasty III)',
    heroImage: img('step_pyramid_1790764974602'),
    secondaryImage: img('pyramids_fore_dunes_1790606956827'),
    accentColor: '#d4af37',
    composition: 'monumental-apex',
    overview:
      'Conceived and engineered by the polymath Imhotep at Saqqara, the Step Pyramid of Djoser revolutionized human architecture. Rising in six stepped tiers to a height of 62.5 meters, it transformed traditional mudbrick mastabas into an immortal stone stairway connecting Pharaoh to the circumpolar stars.',
    editorialQuote: {
      text: 'Imhotep raised a stairway to heaven in limestone, that the King might ascend into the company of the Indestructibles.',
      source: 'Saqqara Archival Papyrus'
    },
    stats: [
      {
        value: '62.5',
        unit: 'M',
        label: 'Monument Height',
        description: 'The world’s tallest stone edifice at the dawn of the third millennium BCE.'
      },
      {
        value: '6',
        label: 'Ascending Tiers',
        description: 'Stack of progressively diminishing limestone mastaba terraces.'
      },
      {
        value: '5.7',
        unit: 'KM',
        label: 'Subterranean Labyrinth',
        description: 'Shafts, galleries, and turquoise-tiled chambers carved beneath the bedrock.'
      },
      {
        value: '330,400',
        unit: 'M³',
        label: 'Limestone Volume',
        description: 'Quarried locally and precisely dressed with bronze and flint chiseled faces.'
      }
    ],
    sections: [
      {
        heading: 'Imhotep: The First Architect in History',
        body: 'Imhotep was the first architect, physician, and royal chancellor recorded by name in human history. Deified two millennia later as the god of medicine and wisdom, his genius established the principles of stone masonry adopted worldwide.',
        tag: 'GENIUS'
      },
      {
        heading: 'Subterranean Turquoise Faience Chambers',
        body: 'Beneath the pyramid lies a 28-meter deep central shaft leading to the King’s burial vault lined with Aswan pink granite and adorned with over 36,000 turquoise faience wall tiles mimicking reed matting.',
        tag: 'LABYRINTH'
      }
    ],
    coordinates: '29.8713° N, 31.2164° E · Saqqara Necropolis',
    modernSignificance: 'The birth of monumental stone architecture that paved the direct path to the Great Pyramids.'
  },
  {
    id: 'great-sphinx',
    title: 'The Great Sphinx of Giza',
    subtitle: 'The Solitary Limestone Colossus Guarding the Eternal Plateau',
    era: 'Old Kingdom',
    year: 'c. 2500 BCE',
    dynastyOrLeader: 'Pharaoh Khafre (Dynasty IV)',
    heroImage: img('great_sphinx_1790764993662'),
    secondaryImage: img('pyramids_cinematic_full_1790606922175'),
    accentColor: '#d2ff00',
    composition: 'monumental-apex',
    overview:
      'Carved directly from a single natural limestone ridge (yardang) on the Giza Plateau, the Great Sphinx represents the composite embodiment of royal pharaonic intellect and feline solar majesty. With the body of a lion and the crowned nemes head of Khafre, it faces directly due east toward the rising equinoctial sun.',
    editorialQuote: {
      text: 'I am the eternal sentinel. The centuries wash over my paws like grains of desert sand.',
      source: 'The Dream Stele of Thutmose IV'
    },
    stats: [
      {
        value: '73',
        unit: 'M',
        label: 'Colossus Length',
        description: 'Stretching from outstretched front paws to the curving tail.'
      },
      {
        value: '20',
        unit: 'M',
        label: 'Peak Height',
        description: 'Rising to the crown of the royal nemes headdress.'
      },
      {
        value: '0.0',
        unit: '°',
        label: 'True East Orientation',
        description: 'Aligned precisely with the vernal and autumnal sunrise points.'
      },
      {
        value: '19.3',
        unit: 'M',
        label: 'Head Breadth',
        description: 'Sculpted from harder limestone stratum than the softer body bedrock.'
      }
    ],
    sections: [
      {
        heading: 'The Dream Stele of Thutmose IV',
        body: 'Erected between the paws of the Sphinx around 1401 BCE, this granite slab records how Prince Thutmose rested beneath the sand-buried colossus, which promised him the dual crown of Egypt if he cleared the dunes.',
        tag: 'DREAM STELE'
      },
      {
        heading: 'Conservation and Bedrock Stabilisation',
        body: 'Modern digital laser-scanning and non-destructive acoustic tomography have mapped the natural geology, ensuring the preservation of this 4,500-year-old guardian for future centuries.',
        tag: 'CONSERVATION'
      }
    ],
    coordinates: '29.9753° N, 31.1376° E · Giza Plateau',
    modernSignificance: 'The universal global emblem of mystery, sovereignty, and endurance.'
  },
  {
    id: 'rosetta-stone',
    title: 'The Rosetta Stone',
    subtitle: 'The Trilingual Decree that Unlocked Egyptian Antiquity',
    era: 'Ptolemaic Period',
    year: '196 BCE',
    dynastyOrLeader: 'Ptolemy V Epiphanes (Ptolemaic Dynasty)',
    heroImage: img('rosetta_stone_1790765022209'),
    secondaryImage: img('egypt_gold_cartouche_1790512762879'),
    accentColor: '#8ba832',
    composition: 'classical-scholarship',
    overview:
      'Inscribed with a priestly synod decree in three distinct scripts—Sacred Hieroglyphs for divine ritual, Demotic for civil administration, and Ancient Greek for government governance—the Rosetta Stone became the definitive intellectual key that allowed Jean-François Champollion in 1822 to unlock Egypt’s 3,000-year written history.',
    editorialQuote: {
      text: 'I have got it! In the royal cartouche of Ptolemy and Cleopatra lies the spoken voice of Egypt.',
      source: 'Jean-François Champollion, 1822'
    },
    stats: [
      {
        value: '112.3',
        unit: 'CM',
        label: 'Granodiorite Height',
        description: 'Compact igneous slab weighing approximately 760 kilograms.'
      },
      {
        value: '3',
        label: 'Parallel Scripts',
        description: 'Hieroglyphic (14 lines), Demotic (32 lines), and Greek (54 lines).'
      },
      {
        value: '1822',
        label: 'Decipherment Year',
        description: 'Champollion announces the phonetic-ideographic grammar of hieroglyphs.'
      },
      {
        value: '1799',
        label: 'Fort Julien Discovery',
        description: 'Found by engineer Pierre-François Bouchard during the French expedition.'
      }
    ],
    sections: [
      {
        heading: 'Cracking the Royal Cartouches',
        body: 'Champollion recognized that the oval loops (cartouches) enclosed royal names spelled out phonetically. Matching P-T-O-L-M-Y-S with Greek text proved Egyptian hieroglyphs combined alphabet, syllables, and determinatives.',
        tag: 'PHILOLOGY'
      },
      {
        heading: 'The Decree of Memphis',
        body: 'Issued by the general council of priests gathered at Memphis on the first anniversary of the coronation of Ptolemy V, it repealed taxes, granted temple endowments, and affirmed royal justice across the land.',
        tag: 'DECREE'
      }
    ],
    coordinates: '31.4011° N, 30.4194° E · Rashid (Rosetta), Nile Delta',
    modernSignificance: 'The single most decisive linguistic discovery in human history.'
  },
  {
    id: 'library-alexandria',
    title: 'The Great Library of Alexandria',
    subtitle: 'The Universal Sanctuary of Ancient Wisdom & Alexandria Bibliotheca',
    era: 'Ptolemaic & Modern Republic',
    year: 'c. 283 BCE – 2002 CE',
    dynastyOrLeader: 'Ptolemy I Soter & Modern Republic of Egypt',
    heroImage: img('alexandria_library_1790765096622'),
    secondaryImage: img('egypt_gem_museum_1790512748235'),
    accentColor: '#4da8da',
    composition: 'classical-scholarship',
    overview:
      'Part of the Mouseion complex founded by Ptolemy I, the Great Library of Alexandria was humanity’s premier universal research institution, collecting an estimated 400,000 to 700,000 papyrus scrolls. In 2002, Egypt resurrected this legacy with the Bibliotheca Alexandrina—a monumental tilted sun disc carved with scripts of the world.',
    editorialQuote: {
      text: 'Collect all the books of the earth; let no ship leave the harbor without its scrolls copied for the great house.',
      source: 'Ptolemaic Royal Edict'
    },
    stats: [
      {
        value: '700,000',
        label: 'Ancient Scrolls',
        description: 'Containing the sum total of ancient Mediterranean, Mesopotamian, and Nilotic science.'
      },
      {
        value: '160',
        unit: 'M',
        label: 'Modern Disc Diameter',
        description: 'Tilted circular granite roof facing out into the Mediterranean Sea.'
      },
      {
        value: '120+',
        label: 'World Scripts Carved',
        description: 'Aswan granite exterior wall engraved with alphabets from across human civilizations.'
      },
      {
        value: '8,000,000',
        label: 'Modern Book Capacity',
        description: 'State-of-the-art multilingual archival repository, planetarium, and manuscript restoration center.'
      }
    ],
    sections: [
      {
        heading: 'Pioneers of Universal Science',
        body: 'Within Alexandria’s porticoes, Eratosthenes calculated Earth’s circumference within 2% margin, Euclid penned the Elements of Geometry, Aristarchus proposed the heliocentric cosmos, and Callimachus invented the library cataloging system (Pinakes).',
        tag: 'SCHOLARS'
      },
      {
        heading: 'Resurrection: The Modern Sun Disc',
        body: 'Designed by Snøhetta and opened in October 2002, the new Bibliotheca Alexandrina stands on the historic eastern harbor, re-establishing Egypt as the intellectual bridge between Africa, Europe, and Asia.',
        tag: 'RESURRECTION'
      }
    ],
    coordinates: '31.2089° N, 29.9092° E · Alexandria, Mediterranean Coast',
    modernSignificance: 'The enduring beacon of human curiosity, literature, and global dialogue.'
  },
  {
    id: 'al-azhar-university',
    title: 'Al-Azhar Mosque & University',
    subtitle: 'The World’s Oldest Continuously Operating Degree-Granting University',
    era: 'Islamic Golden Age',
    year: '970 CE – Present',
    dynastyOrLeader: 'Fatimid Caliphate & Centuries of Scholar Guilds',
    heroImage: img('al_azhar_mosque_1790765036448'),
    secondaryImage: img('saladin_citadel_1790765050014'),
    accentColor: '#10b981',
    composition: 'architectural-megastructure',
    overview:
      'Commissioned in 970 CE by Fatimid general Jawhar al-Siqilli upon the founding of Cairo, Al-Azhar evolved from a grand congregational mosque into the premier institutional center of Islamic jurisprudence, Arabic grammar, astronomy, and philosophy for over a millennium.',
    editorialQuote: {
      text: 'Its arcades have sheltered learners from every horizon for a thousand years without sunset.',
      source: 'Ibn Khaldun, The Muqaddimah'
    },
    stats: [
      {
        value: '1,050+',
        unit: 'YRS',
        label: 'Continuous Scholarship',
        description: 'Founded in 970 CE, older than Oxford, Cambridge, and Bologna.'
      },
      {
        value: '500,000+',
        label: 'Enrolled Scholars',
        description: 'Educating students from over 100 nations across theology, medicine, and engineering.'
      },
      {
        value: '5',
        label: 'Iconic Minarets',
        description: 'Reflecting Fatimid, Mamluk, and Ottoman imperial architectural layers.'
      },
      {
        value: '40,000+',
        label: 'Rare Manuscripts',
        description: 'One of the richest collections of medieval scientific and philosophical codices.'
      }
    ],
    sections: [
      {
        heading: 'The Five Minarets and Layered Architecture',
        body: 'The central courtyard’s keel-arched stuccos date to the 10th century, flanked by Sultan Qaytbay’s double-headed minaret (1495) and Sultan al-Ghuri’s soaring minaret (1510), showing an architectural continuum across dynasties.',
        tag: 'ARCHITECTURE'
      },
      {
        heading: 'Global Center for Moderation & Science',
        body: 'Pioneered by scholars such as Ibn al-Haytham (father of modern optics) who worked in Cairo, Al-Azhar remains the leading global authority for moderate Islamic thought, interfaith summits, and scientific education.',
        tag: 'GLOBAL'
      }
    ],
    coordinates: '30.0457° N, 31.2627° E · Historic Cairo (UNESCO)',
    modernSignificance: 'The millennium-old intellectual heartbeat of the Arab and Islamic world.'
  },
  {
    id: 'saladin-citadel',
    title: 'The Citadel of Cairo',
    subtitle: 'The Sovereign Mountain Fortress Guarding the Nile Valley',
    era: 'Ayyubid, Mamluk & Ottoman',
    year: '1176 – 1848 CE',
    dynastyOrLeader: 'Salah ad-Din al-Ayyubi & Muhammad Ali Pasha',
    heroImage: img('saladin_citadel_1790765050014'),
    secondaryImage: img('al_azhar_mosque_1790765036448'),
    accentColor: '#f59e0b',
    composition: 'rock-cut-colossal',
    overview:
      'Perched atop the Muqattam limestone hills overlooking Cairo, the Citadel was conceived by Sultan Saladin in 1176 CE as an impregnable fortress uniting Cairo and Fustat. For nearly 700 years, it served as the sovereign seat of Egyptian government, culminating in Muhammad Ali’s iconic alabaster mosque.',
    editorialQuote: {
      text: 'He who holds the Citadel holds Egypt; from its battlements, one sees seven thousand years spread to the horizon.',
      source: 'Chronicles of Egyptian Statehood'
    },
    stats: [
      {
        value: '85',
        unit: 'M',
        label: 'Spiral Well of Joseph',
        description: 'Dug through solid limestone bedrock to reach the Nile water table.'
      },
      {
        value: '84',
        unit: 'M',
        label: 'Alabaster Twin Minarets',
        description: 'Tallest minarets in Cairo, visible across the entire metropolis.'
      },
      {
        value: '700',
        unit: 'YRS',
        label: 'Seat of Government',
        description: 'Executive capital from the Ayyubids through the Mamluks to the Khedivate.'
      },
      {
        value: '3.5',
        unit: 'KM',
        label: 'Rampart Walls',
        description: 'Massive curtain walls and semi-circular artillery bastions.'
      }
    ],
    sections: [
      {
        heading: 'The Hydraulic Feat: Bir Yusuf',
        body: 'Saladin’s engineers carved an 85-meter spiral ramp well through living limestone with two tiers of oxen-driven water wheels (saqiyas) lifting fresh groundwater to supply the garrison during sieges.',
        tag: 'ENGINEERING'
      },
      {
        heading: 'The Great Alabaster Mosque',
        body: 'Constructed between 1830 and 1848 by Muhammad Ali Pasha, its grand central dome, cascading semi-domes, and gleaming Egyptian alabaster veneer dominate Cairo’s skyline, symbolizing modern sovereign renewal.',
        tag: 'ALABASTER'
      }
    ],
    coordinates: '30.0299° N, 31.2612° E · Cairo, Egypt',
    modernSignificance: 'The supreme military and architectural acropolis of medieval and modern Cairo.'
  },
  {
    id: 'suez-canal-opening',
    title: 'The Suez Canal of 1869',
    subtitle: 'The Global Gateway Shortening Continents by 7,000 Kilometers',
    era: 'Modernizing Era',
    year: '1869 CE',
    dynastyOrLeader: 'Khedive Ismail & Egyptian Laborers',
    heroImage: img('suez_canal_inauguration_1790765258740'),
    secondaryImage: img('suez_canal_ships_1790765066192'),
    accentColor: '#06b6d4',
    composition: 'maritime-artery',
    overview:
      'Connecting the Mediterranean Sea at Port Said with the Red Sea at Suez, the 1869 opening of the Suez Canal carved a maritime highway through the Isthmus of Suez, eliminating the treacherous journey around the Cape of Good Hope and transforming global trade forever.',
    editorialQuote: {
      text: 'My country is no longer in Africa only; we are now part of Europe and the entire world.',
      source: 'Khedive Ismail at the Opening Gala, November 1869'
    },
    stats: [
      {
        value: '164',
        unit: 'KM',
        label: 'Initial Canal Length',
        description: 'Direct sea-level water corridor without a single lock gate.'
      },
      {
        value: '1.5',
        unit: 'M',
        label: 'Egyptian Builders',
        description: 'Over a million Egyptian workers moved 74 million cubic meters of earth.'
      },
      {
        value: '7,000',
        unit: 'KM',
        label: 'Distance Saved',
        description: 'Slashed maritime travel between London and Mumbai by 43%.'
      },
      {
        value: '1869',
        label: 'Inauguration Year',
        description: 'Celebrated with royal delegations and the opening of Cairo’s Khedivial Opera House with Verdi’s Rigoletto.'
      }
    ],
    sections: [
      {
        heading: 'The Ancient Pharaohs’ Precursor: Canal of the Pharaohs',
        body: 'The concept originated 3,800 years earlier under Senusret III and Necho II, who connected the Nile to the Red Sea. The modern direct channel fulfilled this ancient dream with industrial engineering.',
        tag: 'HERITAGE'
      },
      {
        heading: 'Sovereign Nationalization in 1956',
        body: 'On July 26, 1956, President Gamal Abdel Nasser nationalized the Suez Canal Company, returning full sovereignty and toll revenues of this vital waterway to the Egyptian people.',
        tag: 'SOVEREIGNTY'
      }
    ],
    coordinates: '30.9700° N, 32.3200° E · Port Said to Suez',
    modernSignificance: 'The indispensable vascular artery of global maritime commerce.'
  },
  {
    id: 'aswan-high-dam',
    title: 'The Aswan High Dam',
    subtitle: 'Mastering the Sacred Flood & Powering Egyptian Modernization',
    era: 'Modern Republic',
    year: '1960 – 1970 CE',
    dynastyOrLeader: 'President Gamal Abdel Nasser',
    heroImage: img('aswan_high_dam_1790765082792'),
    secondaryImage: img('suez_canal_ships_1790765066192'),
    accentColor: '#3b82f6',
    composition: 'architectural-megastructure',
    overview:
      'Constructed across the Nile at Aswan between 1960 and 1970, the Aswan High Dam is one of the 20th century’s crowning engineering triumphs. It ended thousands of years of destructive drought and catastrophic flooding cycles, creating Lake Nasser and generating massive hydroelectric energy for Egyptian industry.',
    editorialQuote: {
      text: 'In antiquity we built the Pyramids for the dead; today we build the High Dam for the living.',
      source: 'Commemorative Dedication at Aswan, 1964'
    },
    stats: [
      {
        value: '3,830',
        unit: 'M',
        label: 'Crest Length',
        description: 'Rock-fill embankment dam holding back the entire discharge of the Nile.'
      },
      {
        value: '111',
        unit: 'M',
        label: 'Dam Height',
        description: 'Towering above the ancient granite riverbed at the First Cataract.'
      },
      {
        value: '2,100',
        unit: 'MW',
        label: 'Hydroelectric Power',
        description: '12 massive turbines that electrified rural Egyptian villages across the delta and valley.'
      },
      {
        value: '168',
        unit: 'BCM',
        label: 'Lake Nasser Reservoir',
        description: 'One of the world’s largest artificial reservoirs, securing water security.'
      }
    ],
    sections: [
      {
        heading: 'UNESCO International Rescue Campaign',
        body: 'The creation of Lake Nasser prompted UNESCO’s greatest heritage rescue in history, disassembling and relocating 22 ancient temples—including Abu Simbel and Philae—stone by stone above the rising waters.',
        tag: 'HERITAGE RESCUE'
      },
      {
        heading: 'Agricultural Renaissance & Flood Security',
        body: 'The dam allowed the conversion of 700,000 feddans to perennial multi-crop irrigation, insulating Egypt from devastating Sahelian droughts in the 1980s and securing national food production.',
        tag: 'WATER SECURITY'
      }
    ],
    coordinates: '23.9697° N, 32.8778° E · Aswan, Upper Egypt',
    modernSignificance: 'The monumental engineering feat that secured Egypt’s modern water and energy sovereignty.'
  },
  {
    id: 'kadesh-peace-treaty',
    title: 'The Silver Treaty of Kadesh',
    subtitle: 'The Earliest Extant International Peace Treaty in Recorded History',
    era: 'New Kingdom',
    year: '1259 BCE',
    dynastyOrLeader: 'Ramesses II & Hattusili III (Dynasty XIX)',
    heroImage: img('treaty_of_kadesh_1790765243959'),
    secondaryImage: img('ramses_front_cutout_1790513072024'),
    accentColor: '#eab308',
    composition: 'gold-relic-depth',
    overview:
      'Negotiated sixteen years after the epic Battle of Kadesh between Pharaoh Ramesses the Great and Hittite King Hattusili III, the Treaty of Kadesh is humanity’s oldest surviving international peace treaty. Concluded on engraved silver tablets, it established non-aggression, mutual military assistance, and extradition of refugees.',
    editorialQuote: {
      text: 'Behold, Ramesses, Beloved of Amun, has made a treaty by silver tablet with Hattusili, that brother shall not transgress against brother for eternity.',
      source: 'Hieroglyphic Inscription at Karnak & Ramesseum'
    },
    stats: [
      {
        value: '3,285+',
        unit: 'YRS',
        label: 'Diplomatic Age',
        description: 'Concluded in the 21st regnal year of Ramesses II (1259 BCE).'
      },
      {
        value: '2',
        label: 'Great Empires',
        description: 'United the Nilotic and Anatolian superpowers in perpetual brotherhood.'
      },
      {
        value: '1970',
        label: 'UN Display',
        description: 'A bronze replica is proudly displayed at the United Nations Headquarters in New York.'
      },
      {
        value: '100%',
        label: 'Bilingual Text',
        description: 'Preserved in Egyptian Hieroglyphs at Karnak and Akkadian Cuneiform clay tablets at Hattusa.'
      }
    ],
    sections: [
      {
        heading: 'Pioneering International Law Principles',
        body: 'The treaty established mutual defense pacts, mutual boundary guarantees, trade guarantees, and humane treatment for political refugees—foundations of modern international diplomacy.',
        tag: 'DIPLOMACY'
      },
      {
        heading: 'Diplomatic Marriage and Eternal Brotherhood',
        body: 'The accord was sealed thirteen years later when Hattusili’s eldest daughter traveled in grand procession to Pi-Ramesses to become Great Royal Wife Maathorneferure.',
        tag: 'ALLIANCE'
      }
    ],
    coordinates: '25.7188° N, 32.6573° E · Inscribed at Karnak & Ramesseum',
    modernSignificance: 'The cornerstone artifact displayed at the UN celebrating humanity’s first treaty of peace.'
  },
  {
    id: 'fayum-portraits',
    title: 'The Fayum Mummy Portraits',
    subtitle: 'The Living Faces of Antiquity in Luminous Encaustic Wax',
    era: 'Roman Egypt',
    year: 'c. 50 BCE – 250 CE',
    dynastyOrLeader: 'Greco-Roman Nilotic Synthesis',
    heroImage: img('fayum_mummy_portrait_1790765128062'),
    secondaryImage: img('egyptian_person_front_1790532880226'),
    accentColor: '#ec4899',
    composition: 'classical-scholarship',
    overview:
      'Painted on wooden panels using beeswax mixed with pigments (encaustic) and egg tempera, the Fayum Mummy Portraits were attached to mummies across the Faiyum oasis basin. With luminous eyes, delicate gold leaf jewelry, and naturalistic skin tones, they represent the only substantial body of classical panel painting to survive antiquity.',
    editorialQuote: {
      text: 'They look out across two thousand years with eyes so clear that time itself seems like a shallow veil.',
      source: 'Classical Art Chronicle'
    },
    stats: [
      {
        value: '1,000+',
        label: 'Surviving Portraits',
        description: 'Conserved in leading museums worldwide from Cairo to the Louvre and MET.'
      },
      {
        value: '2,000',
        unit: 'YRS',
        label: 'Preserved Pigments',
        description: 'Hot beeswax medium resisted fungal decay in the arid desert sands.'
      },
      {
        value: '1st-3rd',
        label: 'Centuries CE',
        description: 'A remarkable fusion of Egyptian funerary customs and Greco-Roman portraiture.'
      },
      {
        value: '3D',
        label: 'Naturalism',
        description: 'Precursor to Renaissance realism and Byzantine iconographic art.'
      }
    ],
    sections: [
      {
        heading: 'Encaustic Technique and Luminous Depth',
        body: 'Artists applied molten pigmented wax using spatulas (cauteria) and fine bristle brushes, creating impasto highlights on foreheads, lips, and gold wreaths that capture natural sunlight with lifelike immediacy.',
        tag: 'TECHNIQUE'
      },
      {
        heading: 'Cosmopolitan Nilotic Identity',
        body: 'The portraits depict doctors, teachers, athletes, and priestesses of Isis, reflecting Egypt’s vibrant multicultural society where Nilotic, Hellenic, and Roman traditions harmoniously intertwined.',
        tag: 'IDENTITY'
      }
    ],
    coordinates: '29.3084° N, 30.8428° E · Faiyum Oasis, Egypt',
    modernSignificance: 'The most intimate human portraits surviving from the ancient world.'
  },
  {
    id: 'st-catherine',
    title: 'Saint Catherine’s Monastery',
    subtitle: 'The Sacred Mountain Sanctuary & Oldest Continuous Christian Library',
    era: 'Byzantine & Early Islamic',
    year: '565 CE – Present',
    dynastyOrLeader: 'Emperor Justinian & The Prophet’s Ashtiname',
    heroImage: img('st_catherine_sinai_1790765146001'),
    secondaryImage: img('egypt_timeline_relic_1790511702998'),
    accentColor: '#8b5cf6',
    composition: 'architectural-megastructure',
    overview:
      'Built between 548 and 565 CE at the foot of Mount Sinai beneath the Burning Bush, Saint Catherine’s Monastery is the world’s oldest continuously inhabited Christian monastery. Protected throughout centuries by the Ashtiname of Muhammad (Covenant of Protection), its library preserves the second-largest collection of ancient codices after the Vatican.',
    editorialQuote: {
      text: 'Let this covenant stand as a shield for the monks of Sinai from the morning of this day to the end of time.',
      source: 'The Ashtiname of the Prophet Muhammad, 628 CE'
    },
    stats: [
      {
        value: '1,460+',
        unit: 'YRS',
        label: 'Continuous Worship',
        description: 'Fortress walls built of local granite by Emperor Justinian in 565 CE.'
      },
      {
        value: '3,300+',
        label: 'Ancient Manuscripts',
        description: 'Greek, Arabic, Syriac, Georgian, and Coptic manuscripts including the Codex Sinaiticus.'
      },
      {
        value: '2,000+',
        label: 'Pre-Iconoclastic Icons',
        description: 'The world’s supreme collection of 6th-century encaustic icons including Christ Pantocrator.'
      },
      {
        value: 'UNESCO',
        label: 'World Heritage',
        description: 'Inscribed in 2002 as a cultural landscape of global spiritual harmony.'
      }
    ],
    sections: [
      {
        heading: 'Christ Pantocrator of Sinai',
        body: 'The 6th-century encaustic icon of Christ Pantocrator is celebrated for its dual facial expression: one side serene and merciful, the other stern and judicial, symbolizing divine and human duality.',
        tag: 'ICONOGRAPHY'
      },
      {
        heading: 'The Ashtiname & Egyptian Inter-Faith Haven',
        body: 'When Arab armies entered Sinai in 628 CE, the Prophet Muhammad granted the monks a Charter of Protection (Ashtiname), stamped with his handprint. Later, the Fatimids constructed a mosque inside the monastery walls, establishing Egypt as an enduring beacon of peaceful coexistence.',
        tag: 'COEXISTENCE'
      }
    ],
    coordinates: '28.5559° N, 33.9760° E · South Sinai Peninsula',
    modernSignificance: 'The fortress of peace and ancient scholarship guarded in the heart of Sinai.'
  }
  ,{
    id: 'benban-solar',
    title: 'Benban Solar Park',
    subtitle: 'One of the World’s Largest Solar Complexes, Risen from the Aswan Desert',
    era: 'Modern Sovereign Republic',
    year: '2018–2019 CE',
    dynastyOrLeader: 'New & Renewable Energy Authority (NREA)',
    heroImage: img('benban_solar_farm_1790800000001'),
    secondaryImage: img('aswan_high_dam_1790765082792'),
    accentColor: '#ffb400',
    composition: 'solar-field',
    overview: 'In the Western Desert about 40 km northwest of Aswan, Benban Solar Park spreads across 37.2 square kilometres as dozens of separate plants, tied to the national grid through four new substations. Launched under the Nubian Suns feed-in-tariff programme, its site was chosen using NASA and international solar studies.',
    editorialQuote: { text: 'Where the sun once crowned kings, it now lights villages.', source: 'Editorial line' },
    stats: [
      { value: '37.2', unit: 'KM²', label: 'Site Area', description: 'An entire stretch of desert turned into a power station.' },
      { value: '1.65', unit: 'GW', label: 'Planned Capacity', description: 'Roughly 90% of the Aswan High Dam’s 2,100 MW output, from sunlight alone.' },
      { value: '41', label: 'Solar Plants', description: 'Dozens of independent plants share one park, linked by four substations.' },
      { value: '2019', label: 'Completed', description: 'Finished in November 2019 under 25-year power-purchase agreements.' }
    ],
    sections: [
      { heading: 'Chosen by the Sun', body: 'Benban sits among the sunniest places on earth, about 2,300 kWh per square metre each year, beside the Nile valley grid and close to Aswan.', tag: 'SITING' },
      { heading: 'Private Capital, Public Grid', body: 'Through the Nubian Suns programme, independent producers built and own the plants and sell power to the Egyptian Electricity Transmission Company under 25-year contracts, part of Egypt’s push for a cleaner electricity mix.', tag: 'FINANCE' }
    ],
    coordinates: '24.456° N, 32.739° E · Benban, Aswan Governorate',
    modernSignificance: 'A desert turned power station, proof that Egypt’s oldest resource, sunlight, can carry its next century.'
  },
  {
    id: 'high-speed-rail',
    title: 'Egypt’s High-Speed Rail',
    subtitle: 'A 2,000 km Electric Spine Linking 60 Cities',
    era: 'Modern Sovereign Republic',
    year: '2021 – 2027 CE (in delivery)',
    dynastyOrLeader: 'National Authority for Tunnels · Siemens Mobility consortium',
    heroImage: img('high_speed_rail_egypt_1790800000002'),
    secondaryImage: img('iconic_tower_capital_1790765221938'),
    accentColor: '#d2ff00',
    composition: 'high-speed-rail',
    overview: 'Egypt’s first high-speed rail programme plans about 2,000 kilometres of fully electric track on three lines, designed to connect roughly 60 cities. The first 660 km line, “the Suez Canal on rails”, runs from Ain Sokhna on the Red Sea through the New Administrative Capital to Marsa Matrouh on the Mediterranean, with trains up to 230 km/h.',
    editorialQuote: { text: 'A railway is a river you can ride: it decides where a nation flows next.', source: 'Editorial line' },
    stats: [
      { value: '2,000', unit: 'KM', label: 'Planned Network', description: 'Three electrified lines designed to bring rail within reach of about 90% of Egyptians.' },
      { value: '230', unit: 'KM/H', label: 'Service Speed', description: 'Velaro trains are designed to run at up to 230 km/h in normal service.' },
      { value: '660', unit: 'KM', label: 'First Line', description: 'Ain Sokhna to Marsa Matrouh, with around 20 stations.' },
      { value: '70', unit: '%', label: 'Lower Emissions', description: 'Projected cut in carbon emissions versus the same journeys by car or bus.' }
    ],
    sections: [
      { heading: 'The Suez Canal on Rails', body: 'The first line joins the Red Sea and the Mediterranean, tying the Suez Canal economic zone, the New Administrative Capital, 6th of October City, Alexandria and the North Coast into one fast corridor.', tag: 'CORRIDOR' },
      { heading: 'Built with Egyptian Hands', body: 'Orascom Construction and The Arab Contractors lead construction alongside Siemens Mobility, with the consortium projecting up to 40,000 local jobs.', tag: 'INDUSTRY' }
    ],
    coordinates: 'Ain Sokhna → Marsa Matrouh · Egypt',
    modernSignificance: 'The next great artery: the canal moved ships across Egypt, and the railway will move its people.'
  },
  {
    id: 'decent-life',
    title: 'Decent Life — Hayah Karima',
    subtitle: 'The Largest Programme to Renew Egypt’s Countryside',
    era: 'Modern Sovereign Republic',
    year: '2019 CE – Present',
    dynastyOrLeader: 'Presidential Initiative · Hayah Karima Foundation',
    heroImage: img('decent_life_village_1790800000003'),
    secondaryImage: img('pyramids_fore_dunes_1790606956827'),
    accentColor: '#8fd14f',
    composition: 'rural-renewal',
    overview: 'Launched in January 2019 as a pilot for 375 of the poorest villages, Hayah Karima was expanded to more than 4,000 villages and around 58 million people, with the government announcing a budget above EGP 700 billion. It brings clean water, sanitation, schools, clinics, housing and jobs to the heartland of the Nile Valley.',
    editorialQuote: { text: 'Every village that gets clean water is a monument too.', source: 'Editorial line' },
    stats: [
      { value: '4,000+', label: 'Villages Targeted', description: 'Grown from a 375-village pilot in 2019 into a national programme.' },
      { value: '58', unit: 'M', label: 'People Reached', description: 'Announced target: roughly 58 million Egyptians across the countryside.' },
      { value: '700+', unit: 'EGP BN', label: 'Announced Budget', description: 'Government figure for the multi-year programme, about US$45 billion at the time.' },
      { value: '4', label: 'Pillars', description: 'Living standards, infrastructure, human-development services and economic development.' }
    ],
    sections: [
      { heading: 'Water, Schools, Clinics', body: 'The plan builds drinking-water and sanitation networks, classrooms, youth centres and health units; the 2021–22 plan alone listed over 10,000 classrooms and around 1,250 health units.', tag: 'SERVICES' },
      { heading: 'A New Republic of Villages', body: 'At the July 2021 launch, President Sisi called it the start of Egypt’s “new republic”, a bet that national renewal must reach the villages, not only the new cities.', tag: 'REPUBLIC' }
    ],
    coordinates: 'Nile Valley & Delta · Egypt',
    modernSignificance: 'Proof that a civilisation’s continuity is measured in its villages as much as its temples.'
  }

];
