import { writable } from 'svelte/store';
import type { Theme } from '../types';

export const themes: Theme[] = [
  { name: 'Indigo', gradient: 'from-indigo-500 to-fuchsia-500', ring: 'focus:ring-indigo-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
  { name: 'Cyan', gradient: 'from-cyan-500 to-blue-500', ring: 'focus:ring-cyan-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
  { name: 'Rose', gradient: 'from-rose-500 to-pink-500', ring: 'focus:ring-rose-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
  { name: 'Violet', gradient: 'from-violet-500 to-fuchsia-500', ring: 'focus:ring-violet-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' },
  { name: 'Emerald', gradient: 'from-emerald-500 to-teal-500', ring: 'focus:ring-emerald-500/40', dotOk: 'bg-emerald-500', dotWarn: 'bg-amber-500' }
];

export const currentTheme = writable<Theme>(themes[0]);
