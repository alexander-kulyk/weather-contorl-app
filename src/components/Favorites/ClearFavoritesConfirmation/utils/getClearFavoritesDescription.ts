export const getClearFavoritesDescription = (favoritesCount: number): string => {
  const cityLabel = favoritesCount === 1 ? 'saved city' : 'saved cities';
  const targetLabel = favoritesCount === 1 ? 'it' : 'them';

  return `This will remove all ${favoritesCount} ${cityLabel}. You can re-add ${targetLabel} any time.`;
};
