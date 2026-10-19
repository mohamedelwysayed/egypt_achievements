import type React from 'react';
import type { SceneProps } from './shared';
import * as A from './scenesA';
import * as B from './scenesB';
import * as C from './scenesC';
import * as D from './scenesD';
import * as E from './scenesE';

/** One hand-built animated scene per story id. */
export const SCENES: Record<string, React.FC<SceneProps>> = {
  'great-pyramid': D.Pyramid, 'grand-egyptian-museum': E.Museum, 'tutankhamun-mask': D.Mask, 'new-suez-canal': D.Canal,
  'new-administrative-capital': E.Skyline, 'abu-simbel': D.Sunbeam, 'pharaohs-golden-parade': E.Parade, 'karnak-temple': D.Columns,
  'narmer-palette': D.Crowns, 'step-pyramid': E.Tiers, 'great-sphinx': D.SphinxScene, 'rosetta-stone': B.Scripts,
  'library-alexandria': D.Scrolls, 'al-azhar-university': B.Arches, 'saladin-citadel': B.Fortress, 'suez-canal-opening': B.Isthmus,
  'aswan-high-dam': C.Dam, 'kadesh-peace-treaty': C.Tablets, 'fayum-portraits': D.Portrait, 'st-catherine': D.Bush,
  'benban-solar': C.Solar, 'high-speed-rail': C.Rail, 'decent-life': C.Village,
};
