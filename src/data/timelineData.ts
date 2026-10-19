export interface TimelineEpoch {
  id: string;
  eraTitle: string;
  eraDates: string;
  dynastySpan: string;
  hieroglyph: string;
  subtitle: string;
  summary: string;
  colorAccent: string;
  backgroundTheme: 'sand' | 'pyramids' | 'gold' | 'islamic' | 'skyline';
  touchpoints: {
    id: string;
    title: string;
    category: 'Ruler' | 'Monument' | 'Artifact' | 'Milestone';
    year: string;
    teaser: string;
    description: string;
    details: {
      significance: string;
      provenance: string;
      modernParallels?: string;
    };
  }[];
  quote: {
    text: string;
    author: string;
  };
}

export const TIMELINE_EPOCHS: TimelineEpoch[] = [
  {
    id: 'predynastic',
    eraTitle: 'Predynastic Period',
    eraDates: 'c. 6000 – 3100 BCE',
    dynastySpan: 'Badarian & Naqada Cultures',
    hieroglyph: '𓈎𓅓𓏏𓊖',
    subtitle: 'The Nilotic Genesis & Proto-State Settlements',
    summary:
      'Human settlements along the fertile Nile basin domesticate agriculture, engineer copper metallurgy, and establish the cosmological foundation of divine solar order (Ma’at).',
    colorAccent: '#D2B48C',
    backgroundTheme: 'sand',
    touchpoints: [
      {
        id: 'naqada-ivory',
        title: 'Gebel el-Arak Carved Knife',
        category: 'Artifact',
        year: 'c. 3300 BCE',
        teaser: 'Masterwork of ripple-flaked flint and carved hippopotamus ivory handle.',
        description:
          'Depicts mythological naval combat on papyrus reed boats and the Master of Animals motif, signaling early Nilotic martial and cosmological dominance.',
        details: {
          significance: 'Earliest depiction of coordinated naval warfare and leadership iconography.',
          provenance: 'Abydos region; conserved at the Louvre Museum.',
          modernParallels: 'Early emergence of the Egyptian armed forces doctrine.'
        }
      },
      {
        id: 'scorpion-macehead',
        title: 'Macehead of King Scorpion II',
        category: 'Artifact',
        year: 'c. 3150 BCE',
        teaser: 'Ceremonial limestone macehead commemorating irrigation canal opening.',
        description:
          'Carved with the king holding a hoe to open a sacred water furrow, inaugurating 5,000 years of royal stewardship over the annual Nile inundation.',
        details: {
          significance: 'Establishes the sovereign ruler as supreme civil engineer and water guardian.',
          provenance: 'Nekhen (Hierakonpolis) temple cache.',
          modernParallels: 'Modern state irrigation and mega-agricultural reclamation schemes.'
        }
      }
    ],
    quote: {
      text: 'Hail to thee, O Nile! Thou springest forth from the earth to nurture Egypt.',
      author: 'Hymn to the Inundation'
    }
  },
  {
    id: 'early-dynastic',
    eraTitle: 'Early Dynastic Period',
    eraDates: 'c. 3100 – 2686 BCE',
    dynastySpan: 'Dynasties I – II',
    hieroglyph: '𓇓𓏏𓊖',
    subtitle: 'The Sacred Unification of Upper & Lower Egypt',
    summary:
      'King Narmer unifies Upper and Lower Egypt into the world’s first nation-state, establishing the white-walled administrative capital of Memphis at the apex of the Nile Delta.',
    colorAccent: '#C5A059',
    backgroundTheme: 'sand',
    touchpoints: [
      {
        id: 'narmer-palette',
        title: 'The Narmer Palette',
        category: 'Artifact',
        year: 'c. 3100 BCE',
        teaser: 'The foundational diplomatic and statecraft document of unified Egypt.',
        description:
          'Siltstone slab depicting Narmer wearing both the White Crown of Upper Egypt and the Red Crown of Lower Egypt, consecrating national unity.',
        details: {
          significance: 'First definitive formulation of unified Egyptian sovereign statecraft.',
          provenance: 'Main Deposit at Nekhen; housed in Egyptian Museum Tahrir.',
          modernParallels: 'The foundational genesis of Egypt as an unbroken sovereign entity.'
        }
      },
      {
        id: 'memphis-foundation',
        title: 'Foundation of Memphis (Ineb-Hedj)',
        category: 'Milestone',
        year: 'c. 3100 BCE',
        teaser: 'The "White Walls" strategic administrative fortress at the Nile apex.',
        description:
          'Founded to control transit between Upper Egypt, the Mediterranean Delta, and the Sinai copper routes, establishing centralized bureaucracy.',
        details: {
          significance: 'First recorded purpose-built geopolitical capital city.',
          provenance: 'Mit Rahina, south of modern Cairo.',
          modernParallels: 'Direct spiritual predecessor of Cairo and the New Administrative Capital.'
        }
      }
    ],
    quote: {
      text: 'He unified the Two Lands in peace, binding the frontiers from the cataracts unto the sea.',
      author: 'Palermo Stone Royal Annals'
    }
  },
  {
    id: 'old-kingdom',
    eraTitle: 'The Old Kingdom',
    eraDates: 'c. 2686 – 2181 BCE',
    dynastySpan: 'Dynasties III – VI',
    hieroglyph: '𓉐𓉻',
    subtitle: 'The Age of Pyramids & Ashlar Stone Geometry',
    summary:
      'An epoch of cosmic engineering and immortal architecture. Imhotep invents monumental stone masonry at Saqqara, leading directly to the celestial mathematics of the Giza Plateau.',
    colorAccent: '#E5C158',
    backgroundTheme: 'pyramids',
    touchpoints: [
      {
        id: 'step-pyramid',
        title: 'Step Pyramid of Djoser',
        category: 'Monument',
        year: 'c. 2670 BCE',
        teaser: 'The world’s first monumental stone complex engineered by Imhotep.',
        description:
          'Six stacked limestone mastabas rising 62 meters, permanently replacing sun-dried mudbrick with eternal ashlar stone architecture.',
        details: {
          significance: 'Birthplace of monumental stone engineering on planet Earth.',
          provenance: 'Saqqara Necropolis.',
          modernParallels: 'Inspiration for modern geometric mega-structures.'
        }
      },
      {
        id: 'great-pyramid',
        title: 'The Great Pyramid of Khufu',
        category: 'Monument',
        year: 'c. 2560 BCE',
        teaser: '2.3 million dressed limestone and granite blocks aligned to true celestial north.',
        description:
          'The solitary surviving Wonder of the Ancient World. Engineered with microscopic precision by royal architect Hemiunu.',
        details: {
          significance: 'The ultimate summit of Old Kingdom logistical prowess and mathematical astronomy.',
          provenance: 'Giza Plateau.',
          modernParallels: 'Universal emblem of human architectural triumph.'
        }
      },
      {
        id: 'great-sphinx',
        title: 'The Great Sphinx of Giza',
        category: 'Monument',
        year: 'c. 2500 BCE',
        teaser: 'The eternal guardian: human intellect merged with leonine strength.',
        description:
          'Monolithic sculpture carved directly from a limestone ridge, wearing the royal Nemes headdress and guarding the eastern horizon.',
        details: {
          significance: 'Timeless guardian spirit of the Nile valley.',
          provenance: 'Giza Plateau.',
          modernParallels: 'The official national symbol of vigilance and protection.'
        }
      }
    ],
    quote: {
      text: 'Man fears time, but time fears the Pyramids.',
      author: 'Ancient Arab Proverb on Giza'
    }
  },
  {
    id: 'middle-kingdom',
    eraTitle: 'The Middle Kingdom',
    eraDates: 'c. 2055 – 1650 BCE',
    dynastySpan: 'Dynasties XI – XIII',
    hieroglyph: '𓇳𓏤',
    subtitle: 'The Classical Renaissance of Arts & Water Engineering',
    summary:
      'Reunified by Pharaoh Mentuhotep II from Thebes. Revered as Egypt’s literary Golden Age, marked by profound agricultural hydraulic mastery in the Faiyum oasis and ethical statecraft.',
    colorAccent: '#C8963E',
    backgroundTheme: 'pyramids',
    touchpoints: [
      {
        id: 'faiyum-hydraulics',
        title: 'Lake Moeris Hydraulic Dykes',
        category: 'Milestone',
        year: 'c. 1850 BCE',
        teaser: 'Pharaoh Amenemhat III reclaims 150,000 acres of fertile farmland.',
        description:
          'Engineered floodgates and canals diverting Nile overflow into the Faiyum depression, securing food sovereignty through drought cycles.',
        details: {
          significance: 'The world’s earliest large-scale sovereign hydraulic reclamation system.',
          provenance: 'Faiyum Basin.',
          modernParallels: 'Direct ancestor of the Aswan High Dam and Toshka New Valley project.'
        }
      },
      {
        id: 'sinuhe-papyrus',
        title: 'The Tale of Sinuhe',
        category: 'Artifact',
        year: 'c. 1875 BCE',
        teaser: 'The definitive literary masterpiece of Egyptian identity and devotion.',
        description:
          'Classic narrative of an Egyptian courtier who roams abroad but yearns unceasingly to return and die upon his sacred homeland soil.',
        details: {
          significance: 'Canon of classical Egyptian literature and patriotic belonging.',
          provenance: 'Theban papyri.',
          modernParallels: 'Reflects the timeless bond of the Egyptian diaspora.'
        }
      }
    ],
    quote: {
      text: 'Do justice whilst thou dwellest upon earth; comfort the weeper and oppress not the widow.',
      author: 'Instruction of King Kheti'
    }
  },
  {
    id: 'new-kingdom',
    eraTitle: 'The New Kingdom',
    eraDates: 'c. 1550 – 1069 BCE',
    dynastySpan: 'Dynasties XVIII – XX',
    hieroglyph: '𓇓𓏏𓈖𓅆',
    subtitle: 'The Imperial Zenith & Golden Pharaonic Empire',
    summary:
      'The golden pinnacle of Egyptian sovereign power, military might, and diplomacy. Hatshepsut, Thutmose III, Akhenaten, Tutankhamun, and Ramesses II rule an empire spanning the Euphrates to the 4th Cataract.',
    colorAccent: '#F59E0B',
    backgroundTheme: 'gold',
    touchpoints: [
      {
        id: 'tutankhamun-mask',
        title: 'Golden Mask of Tutankhamun',
        category: 'Artifact',
        year: 'c. 1323 BCE',
        teaser: '11 kg of solid gold inlaid with lapis lazuli, turquoise, and carnelian.',
        description:
          'The ultimate masterwork of ancient goldsmithing, capturing the immortal visage of the young king with the royal Nemes stripes and cobra deity.',
        details: {
          significance: 'Universal symbol of pharaonic perfection; crown jewel of the Grand Egyptian Museum.',
          provenance: 'Tomb KV62, Valley of the Kings.',
          modernParallels: 'Egypt’s most celebrated cultural ambassador to humanity.'
        }
      },
      {
        id: 'kadesh-peace-treaty',
        title: 'Silver Treaty of Ramesses II',
        category: 'Milestone',
        year: 'c. 1259 BCE',
        teaser: 'The world’s first recorded formal bilateral peace treaty.',
        description:
          'Bilateral non-aggression and mutual defense pact between Pharaoh Ramesses the Great and Hittite King Hattusili III, establishing permanent fraternity.',
        details: {
          significance: 'Foundational treaty of international diplomatic law; replica displayed at UN Headquarters.',
          provenance: 'Karnak Temple walls & Hattusa archives.',
          modernParallels: 'Egypt’s historic role as chief regional peacemaker.'
        }
      },
      {
        id: 'abu-simbel',
        title: 'Colossi of Abu Simbel',
        category: 'Monument',
        year: 'c. 1264 BCE',
        teaser: 'Four colossal seated statues of Ramesses II carved into the cliff of Nubia.',
        description:
          'Astronomically calibrated so the rising sun penetrates 65 meters into the mountain sanctuary twice a year to illuminate the royal throne.',
        details: {
          significance: 'Pinnacle of rock-cut architecture, saved by international UNESCO rescue.',
          provenance: 'Lake Nasser, Aswan.',
          modernParallels: 'Exemplifies monumental national resilience.'
        }
      }
    ],
    quote: {
      text: 'I have made the frontiers of Egypt as wide as the circle of the sun.',
      author: 'Inscriptions of Thutmose III at Karnak'
    }
  },
  {
    id: 'late-period',
    eraTitle: 'The Late Period',
    eraDates: 'c. 664 – 332 BCE',
    dynastySpan: 'Dynasties XXVI – XXX',
    hieroglyph: '𓎛𓎛𓏏',
    subtitle: 'The Saite Renaissance & Archaic Revival',
    summary:
      'Under the Saite 26th Dynasty, Egypt experiences a cultural rebirth, deliberately revitalizing Old Kingdom art, monumental bronze casting, and circumnavigating Africa via Phoenician naval fleets.',
    colorAccent: '#CD7F32',
    backgroundTheme: 'gold',
    touchpoints: [
      {
        id: 'saite-bronzes',
        title: 'Saite Royal Bronze Statuary',
        category: 'Artifact',
        year: 'c. 600 BCE',
        teaser: 'Precision hollow-cast bronzes inlaid with electrum and silver hieroglyphs.',
        description:
          'Revived classical canons from Memphis with unprecedented metallurgy, sculpting Osirian bronzes and cat deities of Bubastis.',
        details: {
          significance: 'Refined bronze metallurgy influencing early classical Greek sculpture.',
          provenance: 'Delta sanctuaries (Sais & Bubastis).',
          modernParallels: 'Preservation and revival of ancient artistic heritage.'
        }
      },
      {
        id: 'africa-circumnavigation',
        title: 'Necho II Circumnavigation of Africa',
        category: 'Milestone',
        year: 'c. 600 BCE',
        teaser: 'Pharaoh Necho II commissions the first recorded naval voyage around Africa.',
        description:
          'A three-year expedition sailing south through the Red Sea and returning via Gibraltar, centuries before the European Age of Discovery.',
        details: {
          significance: 'Pioneered maritime exploration and charted world coastlines.',
          provenance: 'Recorded by Herodotus (Histories IV.42).',
          modernParallels: 'Forebear of Egypt’s strategic command of maritime waterways.'
        }
      }
    ],
    quote: {
      text: 'They sailed the southern ocean, planting grain on whatever shore they touched.',
      author: 'Herodotus on Pharaoh Necho’s Fleet'
    }
  },
  {
    id: 'ptolemaic',
    eraTitle: 'The Ptolemaic Dynasty',
    eraDates: '332 – 30 BCE',
    dynastySpan: 'Macedonian & Ptolemaic Dynasties',
    hieroglyph: '𓂋𓈖𓊖',
    subtitle: 'The Intellectual Lighthouse of Alexandria & Rosetta Key',
    summary:
      'Alexander the Great founds Alexandria on the Mediterranean coast. Under the Ptolemies and Cleopatra VII, Egypt becomes the intellectual capital of the ancient world with the Great Library and Mouseion.',
    colorAccent: '#38BDF8',
    backgroundTheme: 'gold',
    touchpoints: [
      {
        id: 'rosetta-stone',
        title: 'The Rosetta Stone',
        category: 'Artifact',
        year: '196 BCE',
        teaser: 'The trilingual royal decree that unlocked ancient Egyptian hieroglyphs.',
        description:
          'Granodiorite stele inscribed in Hieroglyphic, Demotic, and Ancient Greek under Ptolemy V, allowing Champollion to decipher the ancient tongue in 1822.',
        details: {
          significance: 'The greatest linguistic key in human archaeological science.',
          provenance: 'Rashid (Rosetta) in the Nile Delta.',
          modernParallels: 'Crossroad of civilizations and global scholarship.'
        }
      },
      {
        id: 'library-alexandria',
        title: 'The Great Library of Alexandria',
        category: 'Milestone',
        year: 'c. 280 BCE',
        teaser: 'The universal repository aiming to collect the entirety of world literature.',
        description:
          'Commissioned by Ptolemy I Soter, hosting Eratosthenes (who measured the Earth’s circumference) and Euclid (father of geometry).',
        details: {
          significance: 'Birthplace of empirical science, textual criticism, and scholarly indexing.',
          provenance: 'Royal Quarter of Alexandria.',
          modernParallels: 'Reincarnated in the modern Bibliotheca Alexandrina.'
        }
      }
    ],
    quote: {
      text: 'Age cannot wither her, nor custom stale her infinite variety.',
      author: 'Historical Chronicle of the Ptolemaic Court'
    }
  },
  {
    id: 'roman-egypt',
    eraTitle: 'Roman & Byzantine Egypt',
    eraDates: '30 BCE – 641 CE',
    dynastySpan: 'Imperial Roman & Byzantine Provinces',
    hieroglyph: '𓏠𓈖𓏏',
    subtitle: 'The Mediterranean Granary & Desert Monasticism',
    summary:
      'Egypt serves as the breadbasket of the Roman Empire, sending grain fleets to Rome. Simultaneously, Egyptian Christian monasticism is born in the Eastern Desert, while Philae preserves the final hieroglyphs.',
    colorAccent: '#94A3B8',
    backgroundTheme: 'gold',
    touchpoints: [
      {
        id: 'fayum-portraits',
        title: 'Fayum Mummy Encaustic Portraits',
        category: 'Artifact',
        year: 'c. 100 CE',
        teaser: 'Hyper-realistic encaustic wax funerary portraits with striking expressive eyes.',
        description:
          'Synthesized Roman naturalistic portraiture with Egyptian mummification beliefs, creating the world’s earliest preserved realistic oil/wax portraits.',
        details: {
          significance: 'Bridge between ancient pharaonic afterlife rituals and Greco-Roman classical painting.',
          provenance: 'Faiyum Oasis Necropolises.',
          modernParallels: 'Foundations of portrait realism and human individuality.'
        }
      },
      {
        id: 'st-catherine',
        title: 'Saint Catherine’s Monastery (Sinai)',
        category: 'Monument',
        year: '548 CE',
        teaser: 'The world’s oldest continuously inhabited Christian monastery.',
        description:
          'Constructed by Emperor Justinian at the foot of Mount Sinai, housing the world’s oldest Christian icons and second largest historic manuscript library.',
        details: {
          significance: 'Unbroken beacon of faith, manuscript preservation, and peaceful coexistence.',
          provenance: 'Sinai Peninsula.',
          modernParallels: 'Symbol of Egyptian interfaith harmony and Sinai sovereignty.'
        }
      }
    ],
    quote: {
      text: 'The sacred Nile nourishes the lands and supplies the bread of the world.',
      author: 'Roman Imperial Annals'
    }
  },
  {
    id: 'islamic-egypt',
    eraTitle: 'Islamic & Medieval Golden Age',
    eraDates: '641 – 1517 CE',
    dynastySpan: 'Fatimid, Ayyubid & Mamluk Sultanates',
    hieroglyph: '𓊖𓏏𓈖',
    subtitle: 'The City of a Thousand Minarets & Al-Azhar',
    summary:
      'With the founding of Fustat (641 CE) and Al-Qahira (Cairo) in 969 CE, Egypt becomes the paramount cultural, architectural, and educational center of the Islamic world.',
    colorAccent: '#10B981',
    backgroundTheme: 'islamic',
    touchpoints: [
      {
        id: 'al-azhar-university',
        title: 'Al-Azhar Mosque & University',
        category: 'Monument',
        year: '970 CE',
        teaser: 'One of the world’s oldest continuously operating institutions of higher learning.',
        description:
          'Founded by Fatimid general Jawhar al-Siqilli, flourishing as the global heart of Arabic literature, Islamic jurisprudence, astronomy, and theology.',
        details: {
          significance: 'Universal beacon of moderate scholarship and philosophical inquiry.',
          provenance: 'Historic Cairo (UNESCO World Heritage Site).',
          modernParallels: 'Supreme diplomatic and moral institution of Egypt.'
        }
      },
      {
        id: 'saladin-citadel',
        title: 'The Citadel of Saladin',
        category: 'Monument',
        year: '1176 CE',
        teaser: 'Impregnable mountain fortress atop the Muqattam Hills overlooking Cairo.',
        description:
          'Constructed by Salah al-Din using stone from Giza to safeguard the capital, functioning as the continuous seat of Egyptian governance for 700 years.',
        details: {
          significance: 'Defensive bastion ensuring Egyptian sovereignty against foreign invasions.',
          provenance: 'Muqattam ridge, Cairo.',
          modernParallels: 'Historic anchor for Egypt’s military resilience.'
        }
      }
    ],
    quote: {
      text: 'He who has not seen Cairo has not seen the world; her Nile is a wonder, her soil is gold.',
      author: 'Ibn Battuta (Travels, 1326 CE)'
    }
  },
  {
    id: 'ottoman-egypt',
    eraTitle: 'Ottoman Egypt',
    eraDates: '1517 – 1867 CE',
    dynastySpan: 'Ottoman Eyalet to Khedivate Transition',
    hieroglyph: '𓋹𓊖',
    subtitle: 'The Strategic Crossroads & Scientific Rediscovery',
    summary:
      'Positioned as the vital transit nexus connecting the Mediterranean to the Indian Ocean spice corridors. The 1798 French expedition triggers the scientific decipherment of hieroglyphics and Egyptology.',
    colorAccent: '#E11D48',
    backgroundTheme: 'islamic',
    touchpoints: [
      {
        id: 'description-de-legypte',
        title: 'Description de l’Égypte',
        category: 'Artifact',
        year: '1809 CE',
        teaser: 'Monumental 23-volume scientific atlas documenting Egyptian flora, fauna, and antiquities.',
        description:
          'Produced by 160 scientists and scholars, inaugurating the modern academic discipline of scientific Egyptology across the globe.',
        details: {
          significance: 'Ignited global fascination with ancient Egyptian architecture and engineering.',
          provenance: 'Institut d’Égypte, Cairo.',
          modernParallels: 'Modern archival preservation of national heritage.'
        }
      },
      {
        id: 'sabil-kuttabs',
        title: 'Ottoman Sabils & Historic Caravanserais',
        category: 'Monument',
        year: 'c. 1750 CE',
        teaser: 'Public water dispensaries and primary schools adorning Cairo’s thoroughfares.',
        description:
          'Intricately carved gilded bronze grilles offering free chilled water to all Nilotic travelers alongside Quranic calligraphy.',
        details: {
          significance: 'Exemplifies the sacred Egyptian social contract of universal water hospitality.',
          provenance: 'Al-Mu’izz Street, Cairo.',
          modernParallels: 'Egyptian humanitarian solidarity initiatives.'
        }
      }
    ],
    quote: {
      text: 'Soldiers, from the height of these pyramids, forty centuries look down upon you.',
      author: 'Address at the Battle of the Pyramids (1798)'
    }
  },
  {
    id: 'muhammad-ali',
    eraTitle: 'Muhammad Ali Dynasty',
    eraDates: '1805 – 1953 CE',
    dynastySpan: 'Khedivate, Sultanate & Kingdom of Egypt',
    hieroglyph: '𓎛𓎛𓏏',
    subtitle: 'The Industrial Awakening & The Suez Canal Gateway',
    summary:
      'Muhammad Ali Pasha, father of modern Egypt, industrializes the economy, builds naval arsenals, and reforms irrigation. In 1869, the Suez Canal connects world trade forever through Egyptian waters.',
    colorAccent: '#6366F1',
    backgroundTheme: 'skyline',
    touchpoints: [
      {
        id: 'suez-canal-opening',
        title: 'Opening of the Suez Canal',
        category: 'Milestone',
        year: '1869 CE',
        teaser: '193 kilometers connecting the Mediterranean directly to the Red Sea.',
        description:
          'Excavated by Egyptian laborers, eliminating 7,000 km of sea transit around Africa and altering the course of global commerce.',
        details: {
          significance: 'The world’s most critical maritime choke point and sovereignty cornerstone.',
          provenance: 'Isthmus of Suez.',
          modernParallels: 'Expanded with the New Suez Canal channel under the current administration.'
        }
      },
      {
        id: 'opera-aida-khedivial',
        title: 'Khedivial Opera House & Verdi’s Aida',
        category: 'Milestone',
        year: '1871 CE',
        teaser: 'Verdi composes the definitive operatic ode to pharaonic grandeur.',
        description:
          'Commissioned by Khedive Ismail to celebrate the modernization of Cairo, marrying ancient Nilotic lore with European classical opera.',
        details: {
          significance: 'Established Cairo as the cosmopolitan opera and theatrical hub of the region.',
          provenance: 'Ezbekiya, Cairo.',
          modernParallels: 'Continued in the City of Arts in the New Capital.'
        }
      }
    ],
    quote: {
      text: 'My country is no longer merely in Africa; we are now an integral engine of world commerce.',
      author: 'Khedive Ismail at the Suez Canal Opening'
    }
  },
  {
    id: 'modern-egypt',
    eraTitle: 'The Modern Republic',
    eraDates: '1953 – 2014 CE',
    dynastySpan: 'The Sovereign Republic',
    hieroglyph: '𓈎𓅓𓏏𓊖',
    subtitle: 'Sovereignty, The High Dam & Regional Leadership',
    summary:
      'Following the 1952 Revolution, Egypt abolishes the monarchy, declares the Republic, nationalizes the Suez Canal, and constructs the colossal Aswan High Dam, electrifying the nation.',
    colorAccent: '#0284C7',
    backgroundTheme: 'skyline',
    touchpoints: [
      {
        id: 'aswan-high-dam',
        title: 'The Aswan High Dam (El-Sadd El-Aali)',
        category: 'Monument',
        year: '1970 CE',
        teaser: 'Mega-rockfill dam containing 43 million cubic meters of material.',
        description:
          'Tamed the unpredictable Nile flood, generated clean hydroelectric power for national industry, and created Lake Nasser, securing food safety.',
        details: {
          significance: 'Modern engineering feat guaranteeing eternal water security.',
          provenance: 'Aswan, Upper Egypt.',
          modernParallels: 'Direct successor to Middle Kingdom Lake Moeris hydraulic mastery.'
        }
      },
      {
        id: 'suez-nationalization',
        title: 'Suez Canal Nationalization',
        category: 'Milestone',
        year: '1956 CE',
        teaser: 'Full restoration of the maritime waterway to Egyptian sovereign ownership.',
        description:
          'Historic declaration asserting Egypt’s sole right over its territory and revenues, inspiring decolonization movements across Africa and the Arab world.',
        details: {
          significance: 'Pivotal milestone in 20th-century geopolitical sovereignty.',
          provenance: 'Manshiya Square, Alexandria.',
          modernParallels: 'Core tenet of contemporary non-aligned foreign policy.'
        }
      }
    ],
    quote: {
      text: 'We dig the canal with our sweat and blood, and it shall be operated by Egyptian hands for eternity.',
      author: 'Declaration of Suez Canal Sovereignty'
    }
  },
  {
    id: 'present-era',
    eraTitle: 'The Present Horizon',
    eraDates: '2014 – Present Day',
    dynastySpan: 'The Modern Sovereign Megastate',
    hieroglyph: '𓋹𓍑𓋴',
    subtitle: 'The Grand Egyptian Museum, New Capital & Pharaonic Continuity',
    summary:
      'Under contemporary state leadership, Egypt unites seven thousand years of ancestral majesty with 21st-century infrastructure: the New Administrative Capital, the Grand Egyptian Museum, and the Pharaohs’ Golden Parade.',
    colorAccent: '#D2FF00',
    backgroundTheme: 'skyline',
    touchpoints: [
      {
        id: 'grand-egyptian-museum',
        title: 'The Grand Egyptian Museum (GEM)',
        category: 'Monument',
        year: '2024–Present',
        teaser: 'The world’s largest museum dedicated to a single civilization, facing Giza.',
        description:
          'Spanning 500,000 square meters, housing over 100,000 artifacts including the complete intact tomb treasures of King Tutankhamun for the first time in history.',
        details: {
          significance: 'The modern state’s architectural tribute honoring 7,000 years of unbroken continuity.',
          provenance: 'Giza Plateau adjacent.',
          modernParallels: 'Direct physical link between the President and the Pharaoh.'
        }
      },
      {
        id: 'pharaohs-golden-parade',
        title: 'The Pharaohs’ Golden Parade',
        category: 'Milestone',
        year: '2021 CE',
        teaser: '22 Royal Mummies escorted through Cairo by the President of Egypt.',
        description:
          'Historic state procession where President Abdel Fattah el-Sisi formally welcomed 18 kings and 4 queens to their eternal sanctuary at NMEC with a 21-gun military salute.',
        details: {
          significance: 'The real-world manifestation of the President and Pharaoh continuity.',
          provenance: 'Tahrir Square to National Museum of Egyptian Civilization.',
          modernParallels: 'The definitive inspiration for this interactive portal.'
        }
      },
      {
        id: 'new-administrative-capital',
        title: 'The New Administrative Capital & Octagon',
        category: 'Monument',
        year: '2016–Present',
        teaser: 'A 700 sq km futuristic smart capital featuring the Iconic Tower (393m).',
        description:
          'Engineered east of Cairo to lead the digital transformation of Egypt’s civil administration, hosting the highest skyscraper in Africa and the Green River linear park.',
        details: {
          significance: 'Most ambitious urban statecraft project since the founding of Memphis 5,000 years ago.',
          provenance: 'Cairo East Governorate.',
          modernParallels: 'The 21st-century Memphis of modern Egypt.'
        }
      }
    ],
    quote: {
      text: 'Egypt has never been merely a country; Egypt is the dawn of human conscience and the cradle of civilization.',
      author: 'State Address by President Abdel Fattah el-Sisi'
    }
  }
];
