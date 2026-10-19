import type { NextConfig } from 'next';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function publicApiBaseUrl() {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const file = readFileSync(resolve(process.cwd(), '../../.env.pk47online'), 'utf8');
    const line = file.split(/\r?\n/).map((item) => item.trim()).find((item) => item.startsWith('NEXT_PUBLIC_API_BASE_URL='));
    const value = line?.slice('NEXT_PUBLIC_API_BASE_URL='.length).trim();
    if (!value) return undefined;
    return value.replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_match, doubleQuoted: string | undefined, singleQuoted: string | undefined) => doubleQuoted ?? singleQuoted ?? '');
  } catch {
    return undefined;
  }
}

const apiBaseUrl = publicApiBaseUrl();
const config: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  ...(apiBaseUrl ? { env: { NEXT_PUBLIC_API_BASE_URL: apiBaseUrl } } : {}),
};
export default config;
