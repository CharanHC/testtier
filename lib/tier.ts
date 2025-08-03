export const tierLevels = ['free', 'silver', 'gold', 'platinum'];

export function getVisibleTiers(userTier: string) {
  const idx = tierLevels.indexOf(userTier);
  return tierLevels.slice(0, idx + 1);
}
