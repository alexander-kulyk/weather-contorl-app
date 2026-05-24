export const getFavoriteButtonLabel = (
  cityName: string,
  isFavorite: boolean,
): string =>
  isFavorite
    ? `Remove ${cityName} from favorites`
    : `Add ${cityName} to favorites`;
