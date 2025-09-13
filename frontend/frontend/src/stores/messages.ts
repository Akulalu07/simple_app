import { writable, derived } from 'svelte/store';
import type { Message } from '../types';

export const messages = writable<Message[]>([]);
export const messagesLoading = writable(false);
export const messagesError = writable<string | null>(null);

export const messageCount = derived(messages, $messages => $messages.length);
export const hasMessages = derived(messages, $messages => $messages.length > 0);
