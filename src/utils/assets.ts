/**
 * Central image registry.
 * Images are bundled (hashed + cached) by Vite, so they keep working in the production build
 * and on any host / sub-path — never reference '/src/assets/...' by string.
 *
 *   img('name')     -> full-size image url (.webp or .png, looked up by file name without extension)
 *   thumbOf(url)    -> small thumbnail for a url returned by img() (falls back to the url)
 *
 * If the same name exists as both .webp and .png, the .png wins.
 */
const modules = import.meta.glob('../assets/images/*.{webp,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const EXT_RE = /\.(webp|png)$/;

const byName: Record<string, string> = {};
Object.entries(modules)
  // .webp first, .png last, so a PNG overrides a WebP with the same name
  .sort(([a], [b]) => Number(a.endsWith('.png')) - Number(b.endsWith('.png')))
  .forEach(([path, url]) => {
    byName[path.split('/').pop()!.replace(EXT_RE, '')] = url;
  });

const thumbByUrl: Record<string, string> = {};
for (const [name, url] of Object.entries(byName)) {
  if (name.endsWith('_t')) continue;
  const t = byName[`${name}_t`];
  if (t) thumbByUrl[url] = t;
}

export const img = (name: string): string => {
  const url = byName[name];
  if (!url && import.meta.env.DEV) console.warn(`[assets] missing image: ${name}`);
  return url ?? '';
};

export const thumbOf = (url: string): string => thumbByUrl[url] ?? url;