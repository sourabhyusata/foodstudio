const SESSION_TTL_SECONDS = 60 * 60 * 8;

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toHex(signature);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function createAdminSessionToken(username: string, secret: string): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${username}.${expiresAt}`;
  const signature = await signPayload(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string, secret: string): Promise<boolean> {
  const [username, expiresAt, signature] = token.split('.');

  if (!username || !expiresAt || !signature) {
    return false;
  }

  const expiresAtNumber = Number(expiresAt);
  if (!Number.isInteger(expiresAtNumber) || expiresAtNumber < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = `${username}.${expiresAt}`;
  const expectedSignature = await signPayload(payload, secret);

  return safeEqual(signature, expectedSignature);
}
