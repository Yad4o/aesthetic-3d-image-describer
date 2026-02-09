import { createClient } from '@blinkdotnew/sdk';

function getProjectId(): string {
  const envId = process.env.NEXT_PUBLIC_BLINK_PROJECT_ID || process.env.BLINK_PROJECT_ID;
  if (envId) return envId;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const match = hostname.match(/^([^.]+)\.sites\.blink\.new$/);
  if (match) return match[1];
  return 'demo-project';
}

export const blink = createClient({
  projectId: getProjectId(),
  publishableKey: process.env.NEXT_PUBLIC_BLINK_PUBLISHABLE_KEY,
  secretKey: process.env.BLINK_SECRET_KEY, // Server-side only
  auth: { mode: 'managed' },
});
