// Simple in-memory fixed-window rate limiter.
// It is per server process: good enough for a single instance, but use a
// shared store (e.g. Redis) if the app is ever scaled to several instances.

type Entry = { count: number; resetAt: number };

const globalForRateLimit = globalThis as unknown as {
  rateLimitStore?: Map<string, Entry>;
};

const store: Map<string, Entry> =
  globalForRateLimit.rateLimitStore ??
  (globalForRateLimit.rateLimitStore = new Map());

function purgeExpired(now: number) {
  if (store.size < 5000) return;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

/** Current number of hits for `key` inside its window. */
export function getHits(key: string): number {
  const entry = store.get(key);
  if (!entry || entry.resetAt <= Date.now()) return 0;
  return entry.count;
}

/** Records one hit for `key` and returns the new count. */
export function addHit(key: string, windowMs: number): number {
  const now = Date.now();
  purgeExpired(now);

  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return 1;
  }

  entry.count += 1;
  return entry.count;
}

export function resetHits(key: string) {
  store.delete(key);
}
