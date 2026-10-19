import { BufferAttribute, BufferGeometry, Color, DoubleSide, Mesh, PerspectiveCamera, Scene, ShaderMaterial, Vector3, Vector4, WebGLRenderer } from 'three';
import type { Shape4 } from './types';

const U = 128, V = 64, TAU = Math.PI * 2;
type P3 = [number, number, number];
const sgn = (a: number) => (a < 0 ? -1 : 1);
const sph = (u: number, v: number): P3 => { const th = u * TAU, ph = v * Math.PI; return [Math.sin(ph) * Math.cos(th), Math.cos(ph), Math.sin(ph) * Math.sin(th)]; };
const cube = (u: number, v: number): P3 => { const [x, y, z] = sph(u, v), f = (a: number) => sgn(a) * Math.pow(Math.abs(a), 2 / 9) * 0.88; return [f(x), f(y), f(z)]; };
const pyr = (u: number, v: number): P3 => {
  const th = u * TAU, c = Math.cos(th), s = Math.sin(th), q = (a: number) => sgn(a) * Math.pow(Math.abs(a), 0.25);
  if (v <= 0.86) { const k = v / 0.86, r = k * 1.05; return [q(c) * r, 1.05 - 2.1 * k, q(s) * r]; }
  const k = (v - 0.86) / 0.14, r = 1.05 * (1 - k); return [q(c) * r, -1.05, q(s) * r];
};
const tor = (u: number, v: number): P3 => { const th = u * TAU, ph = v * TAU, R = 0.7, r = 0.32; return [(R + r * Math.cos(ph)) * Math.cos(th), r * Math.sin(ph), (R + r * Math.cos(ph)) * Math.sin(th)]; };

function build(fn: (u: number, v: number) => P3, kind: 'pole' | 'wrap') {
  const n = (U + 1) * (V + 1), pos = new Float32Array(n * 3), idx: number[] = [];
  for (let j = 0; j <= V; j++) for (let i = 0; i <= U; i++) { const p = fn(i / U, j / V), o = (j * (U + 1) + i) * 3; pos[o] = p[0]; pos[o + 1] = p[1]; pos[o + 2] = p[2]; }
  for (let j = 0; j < V; j++) for (let i = 0; i < U; i++) { const a = j * (U + 1) + i, b = a + 1, c = a + U + 1, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new BufferGeometry(); g.setAttribute('position', new BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
  const nr = g.getAttribute('normal').array as Float32Array;
  const avg = (a: number, b: number) => { for (let k = 0; k < 3; k++) { const m = (nr[a * 3 + k] + nr[b * 3 + k]) / 2; nr[a * 3 + k] = m; nr[b * 3 + k] = m; } };
  for (let j = 0; j <= V; j++) avg(j * (U + 1), j * (U + 1) + U);
  if (kind === 'wrap') for (let i = 0; i <= U; i++) avg(i, V * (U + 1) + i);
  else for (const j of [0, V]) { let sx = 0, sy = 0, sz = 0; for (let i = 0; i <= U; i++) { const o = (j * (U + 1) + i) * 3; sx += nr[o]; sy += nr[o + 1]; sz += nr[o + 2]; } for (let i = 0; i <= U; i++) { const o = (j * (U + 1) + i) * 3; nr[o] = sx / (U + 1); nr[o + 1] = sy / (U + 1); nr[o + 2] = sz / (U + 1); } }
  // make normals point outward (sample a vertex whose outward direction is known)
  const si = kind === 'wrap' ? 8 : Math.floor(U / 8), sj = kind === 'wrap' ? 0 : Math.floor(V * 0.5), o = (sj * (U + 1) + si) * 3, th = (si / U) * TAU;
  const out: P3 = kind === 'wrap' ? [Math.cos(th), 0, Math.sin(th)] : [pos[o], 0, pos[o + 2]];
  const flip = nr[o] * out[0] + nr[o + 1] * out[1] + nr[o + 2] * out[2] < 0;
  if (flip) for (let i = 0; i < nr.length; i++) nr[i] = -nr[i];
  return { pos, nrm: nr, idx };
}

const VERT = /* glsl */ `
attribute vec3 p1; attribute vec3 p2; attribute vec3 p3;
attribute vec3 n0; attribute vec3 n1; attribute vec3 n2; attribute vec3 n3;
uniform vec4 uW; varying vec3 vN; varying vec3 vV;
void main(){
  vec3 p = position*uW.x + p1*uW.y + p2*uW.z + p3*uW.w;
  vec3 n = normalize(n0*uW.x + n1*uW.y + n2*uW.z + n3*uW.w);
  vN = normalize(normalMatrix * n);
  vec4 mv = modelViewMatrix * vec4(p,1.0);
  vV = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;
const FRAG = /* glsl */ `
precision highp float;
uniform vec3 uBase; uniform vec3 uDot; uniform vec3 uHi; uniform vec3 uLight; uniform float uCell;
varying vec3 vN; varying vec3 vV;
void main(){
  vec3 N = normalize(vN);
  float d = dot(N, normalize(uLight))*0.5+0.5;
  float rim = pow(1.0 - max(dot(N, normalize(vV)), 0.0), 2.5);
  float lum = clamp(d - rim*0.12, 0.0, 1.0);
  float c = 0.70710678; mat2 R = mat2(c,-c,c,c);
  vec2 g = fract(R*gl_FragCoord.xy/uCell) - 0.5;
  float rad = (1.0 - lum)*0.80, aa = 1.3/uCell;
  float ink = 1.0 - smoothstep(rad-aa, rad+aa, length(g));
  vec3 col = mix(uBase, uDot, ink);
  col = mix(col, uHi, smoothstep(0.90, 0.97, d)*0.9);
  col = mix(col, uDot, smoothstep(0.80, 0.97, rim)*0.9);
  gl_FragColor = vec4(col, 1.0);
}`;

/** Halftone-shaded 3D orb that morphs between sphere, pyramid, torus and cube (all in one vertex shader). */
export class Orb {
  renderer: WebGLRenderer; scene = new Scene(); cam: PerspectiveCamera; mesh: Mesh; mat: ShaderMaterial; W: number; H: number;
  constructor(canvas: HTMLCanvasElement, W: number, H: number, light: [number, number, number] = [-0.5, 0.7, 0.8], cell = 11) {
    this.W = W; this.H = H;
    this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(1); this.renderer.setSize(W, H, false); this.renderer.setClearColor(0x000000, 0);
    const fov = 35; this.cam = new PerspectiveCamera(fov, W / H, 10, 6000); this.cam.position.z = H / 2 / Math.tan((fov * Math.PI) / 360);
    const shapes = [build(sph, 'pole'), build(pyr, 'pole'), build(tor, 'wrap'), build(cube, 'pole')];
    const g = new BufferGeometry(); g.setIndex(shapes[0].idx);
    g.setAttribute('position', new BufferAttribute(shapes[0].pos, 3)); g.setAttribute('p1', new BufferAttribute(shapes[1].pos, 3)); g.setAttribute('p2', new BufferAttribute(shapes[2].pos, 3)); g.setAttribute('p3', new BufferAttribute(shapes[3].pos, 3));
    shapes.forEach((s, i) => g.setAttribute('n' + i, new BufferAttribute(s.nrm, 3)));
    this.mat = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, side: DoubleSide, uniforms: { uW: { value: new Vector4(1, 0, 0, 0) }, uBase: { value: new Color('#d2ff00') }, uDot: { value: new Color('#111112') }, uHi: { value: new Color('#f4f4ed') }, uLight: { value: new Vector3(...light) }, uCell: { value: cell } } });
    this.mesh = new Mesh(g, this.mat); this.mesh.frustumCulled = false; this.scene.add(this.mesh);
  }
  set(x: number, y: number, r: number, w: Shape4, spin: number, tilt: number, roll: number, base: string, dot: string) {
    const m = this.mesh; m.position.set(x - this.W / 2, this.H / 2 - y, 0); m.scale.setScalar(Math.max(0.001, r)); m.rotation.set(tilt, spin, roll);
    (this.mat.uniforms.uW.value as Vector4).set(w[0], w[1], w[2], w[3]);
    (this.mat.uniforms.uBase.value as Color).set(base); (this.mat.uniforms.uDot.value as Color).set(dot);
    m.visible = r > 0.5;
  }
  draw() { this.renderer.render(this.scene, this.cam); }
  dispose() { this.mesh.geometry.dispose(); this.mat.dispose(); this.renderer.dispose(); this.renderer.forceContextLoss(); }
}
