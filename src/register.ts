/**
 * Picks the octave placement of a pitch class closest to `previousPitch`,
 * constrained to `[range.min, range.max]` — basic single-voice voice-
 * leading, reused by every monophonic string-instrument sample plugin
 * (violin/viola/cello).
 */
export function closestToneInRange(
  toneClasses: number[],
  previousPitch: number,
  range: { min: number; max: number },
): number {
  let best = previousPitch;
  let bestDistance = Infinity;

  const firstOctaveBase = range.min - (((range.min % 12) + 12) % 12);
  for (const toneClass of toneClasses) {
    for (let octaveBase = firstOctaveBase; octaveBase <= range.max; octaveBase += 12) {
      const candidate = octaveBase + toneClass;
      if (candidate < range.min || candidate > range.max) continue;

      const distance = Math.abs(candidate - previousPitch);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    }
  }

  return best;
}
