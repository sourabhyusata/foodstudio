import { timingSafeEqual, scryptSync } from 'node:crypto';

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(':');

  if (!salt || !key) {
    return false;
  }

  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');

  if (hashedBuffer.length !== keyBuffer.length) {
    return false;
  }

  return timingSafeEqual(hashedBuffer, keyBuffer);
}
