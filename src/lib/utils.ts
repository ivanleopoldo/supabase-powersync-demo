import * as Crypto from 'expo-crypto';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function uuid() {
  return Crypto.randomUUID();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
