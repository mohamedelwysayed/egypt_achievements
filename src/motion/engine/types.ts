import type { EaseName } from './ease';

export type Shape4 = [number, number, number, number]; // weights: sphere, pyramid, torus, cube
export interface OrbKey { t: number; x: number; y: number; r: number; w: Shape4; spin?: number; tilt?: number; roll?: number; base: string; dot: string; ease?: EaseName }

interface Base { t0: number; t1: number; depth?: number }
export interface TypeA extends Base { k: 'type'; text: string; x: number; y: number; size: number; font: 'display' | 'serif' | 'mono'; color: string; align?: 'l' | 'c' | 'r'; stagger?: number; track?: number; lh?: number; mark?: string; weight?: number; opacity?: number }
export interface CountA extends Base { k: 'count'; from: number; to: number; dur: number; x: number; y: number; size: number; font: 'display' | 'serif' | 'mono'; color: string; align?: 'l' | 'c' | 'r'; suffix?: string; opacity?: number; dec?: number }
export interface HalfA extends Base { k: 'half'; img: string; x: number; y: number; w: number; h: number; cell: number; color: string; mode: 'light' | 'dark'; reveal: [number, number]; drift?: [number, number]; gain?: number }
export interface RingsA extends Base { k: 'rings'; x: number; y: number; r0: number; r1: number; n: number; color: string; lw?: number; d?: number }
export interface RulerA extends Base { k: 'ruler'; x0: number; x1: number; y: number; ticks: number; color: string; l0?: string; l1?: string; size?: number; d?: number }
export interface RouteA extends Base { k: 'route'; pts: [number, number][]; color: string; lw?: number; d?: number; dot?: string }
export interface GridA extends Base { k: 'grid'; x: number; y: number; cols: number; rows: number; gap: number; r: number; color: string; d?: number }
export interface BracketsA extends Base { k: 'brackets'; x0: number; y0: number; x1: number; y1: number; len: number; color: string; lw?: number; d?: number }
export interface ArcA extends Base { k: 'arc'; x: number; y: number; r: number; color: string; lw?: number; spin?: number; dash?: [number, number]; d?: number }
export type Actor = TypeA | CountA | HalfA | RingsA | RulerA | RouteA | GridA | BracketsA | ArcA;

export interface Scene { t0: number; t1: number; bg: string }
export interface Cue { t: number; k: 'whoosh' | 'bell' | 'tick' | 'hit' }
export interface Spec { dur: number; W: number; H: number; scenes: Scene[]; actors: Actor[]; orb: OrbKey[]; wipes: string[][]; cues: Cue[]; light?: [number, number, number] }
