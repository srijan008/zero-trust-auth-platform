import { randomUUID } from "crypto";

const refreshTokens = new Map();


export function createRefreshToken({ userId, client_id, sessionId }) {
  const token = randomUUID();

  refreshTokens.set(token, {
    userId,
    client_id,
    sessionId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  console.log(token, {
    userId,
    client_id,
    sessionId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })

  return token;
}

export function consumeRefreshToken(token) {
  const record = refreshTokens.get(token);
  if (!record) return null;

  if (Date.now() > record.expiresAt) {
    refreshTokens.delete(token);
    return null;
  }

  refreshTokens.delete(token);
  return record;
}

/**
 * GLOBAL REVOCATION
 */
export function revokeSessionTokens(sessionId) {
  for (const [token, data] of refreshTokens.entries()) {
    if (data.sessionId === sessionId) {
      refreshTokens.delete(token);
    }
  }
}
