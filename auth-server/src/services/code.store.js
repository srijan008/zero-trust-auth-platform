import { randomUUID } from "crypto";

const authCodes = new Map();

export function createAuthCode(data) {
  const code = randomUUID();

  authCodes.set(code, {
    ...data,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  return code;
}


export function consumeAuthCode(code) {
  const record = authCodes.get(code);

  if (!record) return null;

  if (Date.now() > record.expiresAt) {
    authCodes.delete(code);
    return null;
  }

  authCodes.delete(code);
  return record;
}
