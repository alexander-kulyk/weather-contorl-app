export const getSearchInputDescribedBy = (
  showErrorText: boolean,
  errorId: string,
): string | undefined => (showErrorText ? errorId : undefined);
