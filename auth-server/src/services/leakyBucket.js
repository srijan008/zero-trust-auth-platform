export function applyLeakyBucket(
  { water, lastLeakTs },
  capacity,
  leakRatePerSec
) {
  const now = Date.now();

  const leaked =
    ((now - lastLeakTs) / 1000) * leakRatePerSec;

  const newWater = Math.max(0, water - leaked);

  if (newWater + 1 > capacity) {
    return { allowed: false };
  }

  return {
    allowed: true,
    water: newWater + 1,
    lastLeakTs: now,
  };
}
